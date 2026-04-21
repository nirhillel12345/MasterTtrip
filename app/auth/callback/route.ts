import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export const runtime = "nodejs";

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const next = searchParams.get("next") ?? "/";

  if (!code) {
    return NextResponse.redirect(new URL("/auth/login?error=התחברות נכשלה", origin));
  }

  const supabase = await createSupabaseServerClient();
  const { error } = await supabase.auth.exchangeCodeForSession(code);

  if (error) {
    return NextResponse.redirect(new URL("/auth/login?error=התחברות נכשלה", origin));
  }

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user?.email) {
    return NextResponse.redirect(new URL("/auth/login?error=לא+נמצא+אימייל+בחשבון", origin));
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
  } catch {
    return NextResponse.redirect(new URL("/auth/login?error=שגיאה+בסנכרון+המשתמש", origin));
  }

  return NextResponse.redirect(new URL(next, origin));
}
