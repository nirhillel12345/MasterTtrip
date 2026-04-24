import type { NextResponse } from "next/server";

/**
 * HttpOnly cookie: Supabase OAuth often drops `?next=` on `/auth/callback`, so we persist the path here.
 */
export const AUTH_RETURN_PATH_COOKIE = "mt_auth_return";

/** Options for setting `mt_auth_return` — keep path + sameSite aligned when clearing. */
export function authReturnPathCookieOptions(): {
  path: "/";
  maxAge: number;
  httpOnly: boolean;
  sameSite: "lax";
  secure: boolean;
} {
  return {
    path: "/",
    maxAge: 600,
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
  };
}

export function clearAuthReturnPathCookie(response: NextResponse) {
  response.cookies.set(AUTH_RETURN_PATH_COOKIE, "", {
    path: "/",
    maxAge: 0,
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
  });
}

/**
 * Sanitize post-login redirect path (relative only, no open redirects).
 */
export function safeNextPath(raw: string | null | undefined, fallback = "/"): string {
  if (raw == null || typeof raw !== "string") return fallback;
  const t = raw.trim();
  if (!t.startsWith("/") || t.startsWith("//")) return fallback;
  if (t.includes("://") || t.includes("..")) return fallback;
  return t || fallback;
}
