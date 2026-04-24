import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";
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
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || requestUrl.origin;

  const cookieStore = await cookies();
  const fromCookie = cookieStore.get(AUTH_RETURN_PATH_COOKIE)?.value;
  const fromQuery = requestUrl.searchParams.get("next");

  console.log("[auth/callback] mt_auth_return cookie read:", fromCookie ?? "(absent)");
  console.log("[auth/callback] next query param:", fromQuery ?? "(absent)");

  const resolvedNext = safeNextPath(fromCookie ?? fromQuery);
  console.log("[auth/callback] resolvedNext after safeNextPath:", resolvedNext);

  if (!code) {
    const login = new URL("/auth/login", baseUrl);
    login.searchParams.set("error", "התחברות נכשלה");
    if (resolvedNext !== "/") {
      login.searchParams.set("next", resolvedNext);
    }
    const res = NextResponse.redirect(login);
    clearAuthReturnPathCookie(res);
    return res;
  }

  const supabase = await createSupabaseServerClient();
  const { error } = await supabase.auth.exchangeCodeForSession(code);

  if (error) {
    const login = new URL("/auth/login", baseUrl);
    login.searchParams.set("error", "התחברות נכשלה");
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

  const metadata = user.user_metadata ?? {};
  const name =
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
      where: { email: user.email },
      update: {
        name,
        image,
      },
      create: {
        email: user.email,
        name,
        image,
      },
    });
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
