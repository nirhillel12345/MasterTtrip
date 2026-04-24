"use server";

import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";
import { AUTH_RETURN_PATH_COOKIE, authReturnPathCookieOptions, safeNextPath } from "@/lib/auth-redirect";
import { createSupabaseServerClient } from "@/lib/supabase/server";

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

export async function signInWithMagicLink(formData: FormData) {
  const email = String(formData.get("email") ?? "").trim();

  if (!email) {
    redirect(toLoginError("יש להזין כתובת אימייל תקינה"));
  }

  const supabase = await createSupabaseServerClient();
  const origin = await siteOriginFromHeaders();
  const next = safeNextPath(String(formData.get("next") ?? ""));

  const cookieStore = await cookies();
  cookieStore.set(AUTH_RETURN_PATH_COOKIE, next, authReturnPathCookieOptions());

  const { error } = await supabase.auth.signInWithOtp({
    email,
    options: {
      emailRedirectTo: `${origin}/auth/callback?next=${encodeURIComponent(next)}`,
    },
  });

  if (error) {
    redirect(toLoginError("שליחת קישור הקסם נכשלה, נסו שוב"));
  }

  redirect("/auth/login?success=magic-link-sent");
}

export async function signOut() {
  const supabase = await createSupabaseServerClient();
  await supabase.auth.signOut();
  redirect("/");
}
