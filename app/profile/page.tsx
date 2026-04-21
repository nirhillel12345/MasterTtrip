import { ChevronRight } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { prisma } from "@/lib/prisma";
import { ProfileForm } from "./profile-form";

export const metadata: Metadata = {
  title: "הפרופיל שלי | MasterTrip",
  description: "עריכת פרטים אישיים ואמון בקהילת MasterTrip",
};

export default async function MyProfilePage() {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user?.email) {
    redirect("/auth/login?error=" + encodeURIComponent("יש להתחבר"));
  }

  const dbUser = await prisma.user.upsert({
    where: { email: user.email },
    update: {},
    create: {
      email: user.email,
      name:
        typeof user.user_metadata?.full_name === "string"
          ? user.user_metadata.full_name
          : typeof user.user_metadata?.name === "string"
            ? user.user_metadata.name
            : null,
      image:
        typeof user.user_metadata?.avatar_url === "string"
          ? user.user_metadata.avatar_url
          : typeof user.user_metadata?.picture === "string"
            ? user.user_metadata.picture
            : null,
    },
  });

  const displayName = dbUser.name?.trim() || user.email.split("@")[0] || "מטייל";

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900" dir="rtl">
      <header className="sticky top-0 z-30 border-b border-slate-200/90 bg-white/95 backdrop-blur-md supports-[backdrop-filter]:bg-white/90">
        <div className="mx-auto flex max-w-3xl items-center justify-between px-4 py-3.5 sm:px-6 sm:py-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 transition hover:text-slate-900"
          >
            <ChevronRight className="h-4 w-4 shrink-0 text-slate-400" aria-hidden />
            חזרה לעמוד הבית
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-4 py-8 sm:px-6 sm:py-10">
        <h1 className="text-right text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">הפרופיל שלי</h1>
        <p className="mt-2 text-right text-sm text-slate-600 sm:text-base">
          פרטים שיעזרו לשותפים פוטנציאליים להכיר אתכם — מה שתמלאו יוצג בפרופיל הציבורי (מלבד האימייל).
        </p>

        <section className="mt-8 rounded-2xl border border-slate-200/90 bg-white p-5 text-right shadow-md shadow-slate-900/5 sm:p-7">
          <h2 className="text-sm font-bold text-slate-800">חשבון Google</h2>
          <div className="mt-4 flex flex-col items-center gap-4 sm:flex-row sm:items-start sm:justify-end">
            {dbUser.image ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={dbUser.image}
                alt=""
                className="h-24 w-24 shrink-0 rounded-full object-cover shadow-lg ring-2 ring-slate-100 sm:h-28 sm:w-28"
              />
            ) : (
              <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-slate-200 to-slate-300 text-2xl font-bold text-slate-700 shadow-inner sm:h-28 sm:w-28">
                {displayName.slice(0, 1)}
              </div>
            )}
            <div className="min-w-0 flex-1 space-y-1 text-center sm:text-right">
              <p className="text-lg font-bold text-slate-900">{displayName}</p>
              <p className="break-all text-sm text-slate-500" dir="ltr">
                {user.email}
              </p>
              <p className="text-xs text-slate-400">התמונה והאימייל מגיעים מ-Google ולא ניתנים לעריכה כאן</p>
            </div>
          </div>
        </section>

        <section className="mt-6 rounded-2xl border border-slate-200/90 bg-white p-5 shadow-md shadow-slate-900/5 sm:p-7">
          <h2 className="text-right text-sm font-bold text-slate-800">פרטים ציבוריים</h2>
          <p className="mt-1 text-right text-xs text-slate-500 sm:text-sm">
            <Link href={`/profile/${dbUser.id}`} className="font-semibold text-cyan-700 underline-offset-2 hover:underline">
              צפייה בפרופיל הציבורי
            </Link>
          </p>
          <div className="mt-6">
            <ProfileForm
              initialBio={dbUser.bio}
              initialInstagram={dbUser.instagram}
              initialPhone={dbUser.phone}
            />
          </div>
        </section>
      </main>
    </div>
  );
}
