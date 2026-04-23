import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export const runtime = "nodejs";

export async function GET(request: Request) {
  console.log("!!! CALLBACK REACHED !!!", request.url); // שורה לבדיקה
  // תיקון חילוץ ה-URL והפרמטרים
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");
  const next = requestUrl.searchParams.get("next") ?? "/";

  // הגדרת ה-Base URL - אם קיים משתנה סביבה נשתמש בו, אחרת ב-origin של הבקשה
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || requestUrl.origin;

  if (!code) {
    return NextResponse.redirect(new URL("/auth/login?error=התחברות נכשלה", baseUrl));
  }

  const supabase = await createSupabaseServerClient();
  const { error } = await supabase.auth.exchangeCodeForSession(code);

  if (error) {
    return NextResponse.redirect(new URL("/auth/login?error=התחברות נכשלה", baseUrl));
  }

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user?.email) {
    return NextResponse.redirect(new URL("/auth/login?error=לא+נמצא+אימייל+בחשבון", baseUrl));
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
    return NextResponse.redirect(new URL("/auth/login?error=שגיאה+בסנכרון+המשתמש", baseUrl));
  }

  // הפניה סופית עם ה-baseUrl הנכון
  return NextResponse.redirect(new URL(next, baseUrl));
}