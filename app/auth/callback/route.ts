import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { syncAuthUserToPrisma } from "@/lib/auth-user-sync";
import {
  AUTH_RETURN_PATH_COOKIE,
  clearAuthReturnPathCookie,
  safeNextPath,
} from "@/lib/auth-redirect";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export const runtime = "nodejs";

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");
  const tokenHash = requestUrl.searchParams.get("token_hash");
  const otpType = requestUrl.searchParams.get("type");
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || requestUrl.origin;

  const cookieStore = await cookies();
  const fromCookie = cookieStore.get(AUTH_RETURN_PATH_COOKIE)?.value;
  const fromQuery = requestUrl.searchParams.get("next");

  console.log("[auth/callback] mt_auth_return cookie read:", fromCookie ?? "(absent)");
  console.log("[auth/callback] next query param:", fromQuery ?? "(absent)");

  const resolvedNext = safeNextPath(fromCookie ?? fromQuery);
  console.log("[auth/callback] resolvedNext after safeNextPath:", resolvedNext);

  if (!code && !tokenHash) {
    const login = new URL("/auth/login", baseUrl);
    login.searchParams.set("error", "התחברות נכשלה 0 ");
    if (resolvedNext !== "/") {
      login.searchParams.set("next", resolvedNext);
    }
    const res = NextResponse.redirect(login);
    clearAuthReturnPathCookie(res);
    return res;
  }

  const supabase = await createSupabaseServerClient();
  let error: { message: string; status?: number; code?: string } | null = null;

  if (code) {
    console.log("[auth/callback] Exchanging code starting with:", code.substring(0, 5));
    const result = await supabase.auth.exchangeCodeForSession(code);
    error = result.error;
  } else if (tokenHash && otpType) {
    console.log("[auth/callback] Verifying OTP token hash for type:", otpType);
    const result = await supabase.auth.verifyOtp({
      token_hash: tokenHash,
      type: otpType as "magiclink" | "signup" | "invite" | "recovery" | "email_change" | "email",
    });
    error = result.error;
  } else {
    const login = new URL("/auth/login", baseUrl);
    login.searchParams.set("error", "קישור ההתחברות אינו תקין או חסר");
    if (resolvedNext !== "/") {
      login.searchParams.set("next", resolvedNext);
    }
    const res = NextResponse.redirect(login);
    clearAuthReturnPathCookie(res);
    return res;
  }

  if (error) {
    console.error("[auth/callback] Supabase Exchange Error:", error.message, error.status, error.code);
    const login = new URL("/auth/login", baseUrl);
    login.searchParams.set("error", `AuthError: ${error.message}`);
    if (resolvedNext !== "/") {
      login.searchParams.set("next", resolvedNext);
    }
    const res = NextResponse.redirect(login);
    clearAuthReturnPathCookie(res);
    return res;
  }

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user?.email) {
    const login = new URL("/auth/login", baseUrl);
    login.searchParams.set("error", "לא+נמצא+אימייל+בחשבון");
    if (resolvedNext !== "/") {
      login.searchParams.set("next", resolvedNext);
    }
    const res = NextResponse.redirect(login);
    clearAuthReturnPathCookie(res);
    return res;
  }

  try {
    await syncAuthUserToPrisma(user);
  } catch (err) {
    console.error("Prisma error:", err);
    const login = new URL("/auth/login", baseUrl);
    login.searchParams.set("error", "שגיאה+בסנכרון+המשתמש");
    if (resolvedNext !== "/") {
      login.searchParams.set("next", resolvedNext);
    }
    const res = NextResponse.redirect(login);
    clearAuthReturnPathCookie(res);
    return res;
  }

  const res = NextResponse.redirect(new URL(resolvedNext, baseUrl));
  clearAuthReturnPathCookie(res);
  return res;
}
