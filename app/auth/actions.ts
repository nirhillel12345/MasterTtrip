"use server";

/**
 * Email signup verification: Resend (`sendEmail`) + Prisma `VerificationToken`.
 *
 * Dashboard: Supabase → Authentication → Providers → Email — turn **off** “Confirm email” if you
 * still see double emails during testing with `auth.signUp`.
 * Server-only: `SUPABASE_SERVICE_ROLE_KEY` is used for manual confirmation.
 */

import { timingSafeEqual } from "node:crypto";
import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";
import { AUTH_RETURN_PATH_COOKIE, authReturnPathCookieOptions, safeNextPath } from "@/lib/auth-redirect";
import { syncAuthUserToPrisma } from "@/lib/auth-user-sync";
import { sendEmail } from "@/lib/email";
import { prisma } from "@/lib/prisma";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export type AuthFormState = { error?: string; success?: string } | null;

function mapSupabaseAuthError(message: string, code?: string): string {
  const m = message.toLowerCase();
  if (m.includes("invalid login credentials") || code === "invalid_credentials") {
    return "אימייל או סיסמה שגויים.";
  }
  if (m.includes("email not confirmed") || code === "email_not_confirmed") {
    return "יש לאשר את כתובת האימייל לפני ההתחברות (בדקו את תיבת הדואר).";
  }
  if (m.includes("user already registered") || m.includes("already been registered") || code === "user_already_exists") {
    return "כתובת האימייל כבר רשומה במערכת. נסו להתחבר.";
  }
  if (m.includes("password") && m.includes("least")) {
    return "הסיסמה חייבת להכיל לפחות 6 תווים.";
  }
  if (m.includes("invalid email")) {
    return "כתובת האימייל אינה תקינה.";
  }
  if (m.includes("signup") && m.includes("disabled")) {
    return "ההרשמה עם אימייל וסיסמה אינה זמינה כרגע.";
  }
  return message || "אירעה שגיאה, נסו שוב.";
}

function isEmailNotConfirmed(message: string, code?: string): boolean {
  const m = message.toLowerCase();
  return code === "email_not_confirmed" || m.includes("email not confirmed");
}

function generateVerificationCode(): string {
  return String(Math.floor(100000 + Math.random() * 900000));
}

function masterTripVerificationEmailHtml(code: string): string {
  return `<!DOCTYPE html>
<html lang="he" dir="rtl">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"></head>
<body style="margin:0;font-family:system-ui,-apple-system,sans-serif;background:#f8fafc;color:#0f172a;line-height:1.6;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="padding:24px;">
    <tr><td align="center">
      <table role="presentation" style="max-width:480px;background:#ffffff;border-radius:12px;padding:28px 24px;box-shadow:0 1px 3px rgba(0,0,0,.08);">
        <tr><td style="text-align:center;font-size:17px;">
          קוד האימות שלך ל-MasterTrip הוא: <strong style="font-size:22px;letter-spacing:.15em;color:#0d9488;">${code}</strong>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

function safeEqualCode(a: string, b: string): boolean {
  const enc = new TextEncoder();
  const ba = enc.encode(a);
  const bb = enc.encode(b);
  if (ba.length !== bb.length) return false;
  return timingSafeEqual(ba, bb);
}

/**
 * Finds Supabase Auth user id for this email (token row, or paginated admin listUsers).
 */
async function resolveAuthUserIdForEmail(email: string): Promise<string | null> {
  const normalized = email.trim().toLowerCase();
  const row = await prisma.verificationToken.findUnique({
    where: { email: normalized },
    select: { authUserId: true },
  });
  if (row?.authUserId) return row.authUserId;

  const admin = createSupabaseAdminClient();
  let page = 1;
  const perPage = 1000;
  for (;;) {
    const { data, error } = await admin.auth.admin.listUsers({ page, perPage });
    if (error) {
      console.error("[auth] resolveAuthUserIdForEmail listUsers failed:", error.message);
      return null;
    }
    const users = data?.users ?? [];
    const match = users.find((u) => u.email?.toLowerCase() === normalized);
    if (match) return match.id;
    if (users.length < perPage) break;
    page += 1;
  }
  return null;
}

type AuthLookupUser = {
  id: string;
  email?: string;
  user_metadata?: Record<string, unknown>;
};

async function findSupabaseUserByEmail(email: string): Promise<AuthLookupUser | null> {
  const normalized = email.trim().toLowerCase();
  const admin = createSupabaseAdminClient();
  let page = 1;
  const perPage = 1000;
  for (;;) {
    const { data, error } = await admin.auth.admin.listUsers({ page, perPage });
    if (error) {
      console.error("[auth] findSupabaseUserByEmail listUsers failed:", error.message);
      return null;
    }
    const users = (data?.users ?? []) as AuthLookupUser[];
    const match = users.find((u) => u.email?.toLowerCase() === normalized);
    if (match) return match;
    if (users.length < perPage) break;
    page += 1;
  }
  return null;
}

async function saveVerificationTokenAndEmail(
  email: string,
  authUserId: string,
  code: string,
  expiresAt: Date
): Promise<void> {
  const normalized = email.trim().toLowerCase();
  await prisma.verificationToken.upsert({
    where: { email: normalized },
    create: {
      email: normalized,
      token: code,
      expiresAt,
      authUserId,
    },
    update: {
      token: code,
      expiresAt,
      authUserId,
    },
  });
}

/** Persists pending app user row; OTP lives in `VerificationToken` only. */
async function upsertPendingAppUser(email: string, fullName?: string | null) {
  const normalized = email.trim().toLowerCase();
  await prisma.user.upsert({
    where: { email: normalized },
    update: {
      ...(fullName ? { name: fullName } : {}),
      emailVerified: false,
      verificationCode: null,
      verificationCodeSentAt: null,
      verificationCodeExpiresAt: null,
    },
    create: {
      email: normalized,
      name: fullName ?? null,
      emailVerified: false,
    },
  });
}

async function sendVerificationCodeEmail(to: string, code: string): Promise<void> {
  try {
    await sendEmail({
      to,
      subject: "קוד אימות MasterTrip",
      html: masterTripVerificationEmailHtml(code),
      text: `קוד האימות שלך ל-MasterTrip הוא: ${code}`,
    });
  } catch (err) {
    console.error(
      "[auth] sendEmail FAILED (Resend verification code):",
      err instanceof Error ? err.message : err,
      err instanceof Error ? err.stack : ""
    );
    throw err;
  }
}

export async function signInWithGoogle(formData: FormData) {
  const supabase = await createSupabaseServerClient();
  const origin = await siteOriginFromHeaders();
  const next = safeNextPath(String(formData.get("next") ?? ""));

  const cookieStore = await cookies();
  cookieStore.set(AUTH_RETURN_PATH_COOKIE, next, authReturnPathCookieOptions());

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: `${origin}/auth/callback`,
    },
  });

  if (error || !data.url) {
    redirect(toLoginError("ההתחברות עם Google נכשלה"));
  }

  redirect(data.url);
}

export async function signInWithPassword(_prev: AuthFormState, formData: FormData): Promise<AuthFormState> {
  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  const password = String(formData.get("password") ?? "");
  const next = safeNextPath(String(formData.get("next") ?? ""));

  if (!email) {
    return { error: "יש להזין כתובת אימייל." };
  }
  if (password.length < 6) {
    return { error: "הסיסמה חייבת להכיל לפחות 6 תווים." };
  }

  const supabase = await createSupabaseServerClient();
  const { error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    if (isEmailNotConfirmed(error.message, error.code)) {
      const resendRes = await resendVerificationCodeEmailOnly(email);
      if (resendRes?.error) return resendRes;
      const qs = new URLSearchParams();
      qs.set("email", email);
      qs.set("error", "עליך לאמת את המייל לפני ההתחברות");
      if (next !== "/") qs.set("next", next);
      redirect(`/auth/verify?${qs.toString()}`);
    }
    return { error: mapSupabaseAuthError(error.message, error.code) };
  }

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user?.email) {
    return { error: "לא נמצא אימייל בחשבון. נסו שוב." };
  }

  try {
    await syncAuthUserToPrisma(user);
  } catch (e) {
    console.error("[auth] prisma sync after password login", e);
    return { error: "שגיאה בסנכרון המשתמש. נסו שוב." };
  }

  redirect(next === "/" ? "/" : next);
}

/** Registers the user and persists verification token before sending email. */
export async function signUpWithPassword(_prev: AuthFormState, formData: FormData): Promise<AuthFormState> {
  const fullName = String(formData.get("full_name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  const password = String(formData.get("password") ?? "");
  const next = safeNextPath(String(formData.get("next") ?? "/"));

  if (fullName.length < 2) {
    return { error: "נא להזין שם מלא (לפחות 2 תווים)." };
  }
  if (!email) {
    return { error: "יש להזין כתובת אימייל תקינה." };
  }
  if (password.length < 6) {
    return { error: "הסיסמה חייבת להכיל לפחות 6 תווים." };
  }

  const existing = await prisma.user.findUnique({
    where: { email },
    select: { id: true, emailVerified: true },
  });
  if (existing?.emailVerified) {
    return { error: "האימייל כבר קיים במערכת, נסו להתחבר" };
  }
  if (existing && !existing.emailVerified) {
    const resendRes = await resendVerificationCodeEmailOnly(email);
    if (resendRes?.error) return resendRes;
    const qs = new URLSearchParams();
    qs.set("email", email);
    qs.set("success", "verification-code-sent");
    if (next !== "/") qs.set("next", next);
    redirect(`/auth/verify?${qs.toString()}`);
  }

  const supabaseAdmin = createSupabaseAdminClient();
  const { data: created, error } = await supabaseAdmin.auth.admin.createUser({
    email,
    password,
    email_confirm: false,
    user_metadata: {
      full_name: fullName,
    },
  });

  if (error || !created?.user?.id) {
    const msg = error?.message ?? "";
    const mapped = mapSupabaseAuthError(msg, error?.code);
    if (
      mapped.includes("כבר רשומה") ||
      error?.code === "user_already_exists" ||
      msg.toLowerCase().includes("already registered") ||
      msg.toLowerCase().includes("already been registered")
    ) {
      return { error: "האימייל כבר קיים במערכת, נסו להתחבר" };
    }
    console.error("[auth] admin.createUser failed:", msg, error?.code);
    return { error: mapped };
  }

  const authUserId = created.user.id;
  const code = generateVerificationCode();

  try {
    await prisma.verificationToken.upsert({
      where: { email },
      update: {
        token: code,
        expiresAt: new Date(Date.now() + 15 * 60 * 1000),
        authUserId,
      },
      create: {
        email,
        token: code,
        expiresAt: new Date(Date.now() + 15 * 60 * 1000),
        authUserId,
      },
    });
    console.log(`Verification token saved for ${email}: ${code}`);
  } catch (e) {
    console.error("[auth] failed saving verification token:", e);
    return { error: "שמירת קוד האימות נכשלה. נסו שוב." };
  }

  try {
    await upsertPendingAppUser(email, fullName);
    await sendVerificationCodeEmail(email, code);
  } catch (e) {
    console.error("[auth] signup verification persist/send failed:", e);
    await prisma.verificationToken.deleteMany({ where: { email } }).catch(() => {});
    await prisma.user
      .deleteMany({
        where: { email, emailVerified: false },
      })
      .catch((delErr) => console.error("[auth] rollback pending User row failed:", delErr));
    return {
      error:
        "לא הצלחנו לשלוח את מייל האימות. בדקו את הגדרות Resend והטרמינל לשגיאות, ונסו שוב.",
    };
  }

  const qs = new URLSearchParams();
  qs.set("email", email);
  qs.set("success", "verification-code-sent");
  if (next !== "/") qs.set("next", next);
  redirect(`/auth/verify?${qs.toString()}`);
}

export async function verifySignupOtp(_prev: AuthFormState, formData: FormData): Promise<AuthFormState> {
  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  const token = String(formData.get("token") ?? "").trim();

  if (!email) {
    return { error: "חסר אימייל לאימות." };
  }
  if (!/^\d{6}$/.test(token)) {
    return { error: "יש להזין קוד אימות בן 6 ספרות." };
  }

  const row = await prisma.verificationToken.findUnique({
    where: { email },
  });

  if (!row) {
    return { error: "לא נמצא קוד אימות פעיל. נסו להירשם מחדש או לשלוח קוד חדש." };
  }

  const ok = safeEqualCode(token, row.token);
  if (!ok) {
    return { error: "קוד האימות שגוי. נסו שוב או שלחו קוד חדש." };
  }
  if (row.expiresAt.getTime() < Date.now()) {
    return { error: "פג תוקף הקוד. שלחו קוד חדש." };
  }

  const authUser = await findSupabaseUserByEmail(email);
  if (!authUser) {
    return { error: "לא נמצא משתמש Supabase עבור אימייל זה. נסו להירשם מחדש." };
  }

  const adminClient = createSupabaseAdminClient();
  const { error: confirmErr } = await adminClient.auth.admin.updateUserById(authUser.id, {
    email_confirm: true,
  });
  if (confirmErr) {
    console.error("[auth] admin.updateUserById email_confirm failed:", confirmErr.message);
    return { error: "אירעה שגיאה באימות החשבון. נסו שוב." };
  }

  const metadata = authUser.user_metadata ?? {};
  const fullName =
    typeof metadata.full_name === "string"
      ? metadata.full_name
      : typeof metadata.name === "string"
        ? metadata.name
        : null;
  const image =
    typeof metadata.avatar_url === "string"
      ? metadata.avatar_url
      : typeof metadata.picture === "string"
        ? metadata.picture
        : null;

  try {
    await prisma.user.upsert({
      where: { email },
      update: {
        email,
        name: fullName,
        image,
        emailVerified: true,
        verificationCode: null,
        verificationCodeSentAt: null,
        verificationCodeExpiresAt: null,
      },
      create: {
        email,
        name: fullName,
        image,
        emailVerified: true,
      },
    });
  } catch (e) {
    console.error("[auth] prisma.user.upsert after verify failed:", e);
    return { error: "האימות הצליח, אבל שמירת המשתמש נכשלה. נסו שוב." };
  }

  try {
    await prisma.verificationToken.delete({ where: { email } });
  } catch (e) {
    console.error("[auth] delete verification token failed:", e);
    return { error: "האימות הצליח, אך מחיקת קוד האימות נכשלה. נסו שוב." };
  }

  // Establish session without asking for password again by creating a magic link
  // and verifying its token hash server-side (sets cookies in this response).
  const { data: linkData, error: linkErr } = await adminClient.auth.admin.generateLink({
    type: "magiclink",
    email,
  });
  const tokenHash =
    (linkData?.properties as { hashed_token?: string; token_hash?: string } | undefined)?.hashed_token ??
    (linkData?.properties as { hashed_token?: string; token_hash?: string } | undefined)?.token_hash;
  if (linkErr || !tokenHash) {
    console.error("[auth] admin.generateLink magiclink failed:", linkErr?.message ?? "missing token hash");
    return { error: "האימות הצליח, אבל יצירת התחברות אוטומטית נכשלה. התחברו ידנית." };
  }

  const supabase = await createSupabaseServerClient();
  const { error: verifyErr } = await supabase.auth.verifyOtp({
    token_hash: tokenHash,
    type: "magiclink",
  });
  if (verifyErr) {
    console.error("[auth] verifyOtp after generateLink failed:", verifyErr.message, verifyErr.code);
    return { error: "האימות הצליח, אבל ההתחברות האוטומטית נכשלה. התחברו ידנית." };
  }

  redirect("/");
}

async function resendVerificationCodeEmailOnly(email: string): Promise<AuthFormState> {
  const normalized = email.trim().toLowerCase();
  const authUserId = await resolveAuthUserIdForEmail(normalized);
  if (!authUserId) {
    return { error: "לא נמצא משתמש לאימות. נסו להירשם מחדש." };
  }

  const code = generateVerificationCode();
  const expiresAt = new Date(Date.now() + 15 * 60 * 1000);

  try {
    await saveVerificationTokenAndEmail(normalized, authUserId, code, expiresAt);
    await sendVerificationCodeEmail(normalized, code);
  } catch (e) {
    console.error("[auth] resend verification sendEmail FAILED:", e instanceof Error ? e.message : e);
    return { error: "שליחת הקוד נכשלה. בדקו את הטרמינל והגדרות Resend, ונסו שוב." };
  }

  return { success: "קוד חדש נשלח למייל." };
}

export async function resendSignupOtp(_prev: AuthFormState, formData: FormData): Promise<AuthFormState> {
  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  if (!email) {
    return { error: "יש להזין אימייל תקין כדי לשלוח קוד חדש." };
  }
  return await resendVerificationCodeEmailOnly(email);
}

function toLoginError(message: string) {
  return `/auth/login?error=${encodeURIComponent(message)}`;
}

async function siteOriginFromHeaders(): Promise<string> {
  const headerStore = await headers();
  const fromEnv = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "");
  if (fromEnv) return fromEnv;
  const origin = headerStore.get("origin");
  if (origin) return origin.replace(/\/$/, "");
  const host = headerStore.get("host");
  const proto = headerStore.get("x-forwarded-proto") ?? "http";
  if (host) return `${proto}://${host}`.replace(/\/$/, "");
  return "http://localhost:3000";
}

export async function signOut() {
  const supabase = await createSupabaseServerClient();
  await supabase.auth.signOut();
  redirect("/");
}
