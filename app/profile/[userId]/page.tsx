import { ChevronRight } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { InstagramMark } from "@/app/components/instagram-mark";
import { prisma } from "@/lib/prisma";
import { instagramProfileUrl } from "@/lib/instagram";

type PageProps = { params: Promise<{ userId: string }> | { userId: string } };

async function resolveParams(params: PageProps["params"]) {
  if (params && "then" in params) return await params;
  return params ?? { userId: "" };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { userId } = await resolveParams(params);
  const u = await prisma.user.findUnique({
    where: { id: userId },
    select: { name: true },
  });
  if (!u) return { title: "פרופיל | MasterTrip" };
  const name = u.name?.trim() || "מטייל";
  return {
    title: `${name} | MasterTrip`,
    description: `פרופיל ציבורי — ${name}`,
  };
}

export default async function PublicProfilePage({ params }: PageProps) {
  const { userId } = await resolveParams(params);

  const profile = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      id: true,
      name: true,
      image: true,
      bio: true,
      instagram: true,
      phone: true,
    },
  });

  if (!profile) notFound();

  const displayName = profile.name?.trim() || "מטייל";
  const ig = profile.instagram?.trim();
  const igUrl = ig ? instagramProfileUrl(ig) : "";

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
        <section className="rounded-2xl border border-slate-200/90 bg-white p-6 text-right shadow-md shadow-slate-900/5 sm:p-8">
          <div className="flex flex-col items-center gap-5 sm:flex-row sm:items-start sm:justify-end sm:gap-6">
            {profile.image ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={profile.image}
                alt=""
                className="h-28 w-28 shrink-0 rounded-full object-cover shadow-lg ring-2 ring-slate-100 sm:h-32 sm:w-32"
              />
            ) : (
              <div className="flex h-28 w-28 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-slate-200 to-slate-300 text-2xl font-bold text-slate-700 shadow-inner sm:h-32 sm:w-32">
                {displayName.slice(0, 1)}
              </div>
            )}
            <div className="min-w-0 flex-1 space-y-3 text-center sm:text-right">
              <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">{displayName}</h1>
              <p className="text-sm text-slate-500">חבר בקהילת MasterTrip</p>
              {igUrl ? (
                <a
                  href={igUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-gradient-to-br from-purple-600 to-pink-600 px-4 py-2.5 text-sm font-bold text-white shadow-md transition hover:opacity-95 active:scale-[0.99] sm:justify-start"
                >
                  <InstagramMark className="h-5 w-5 shrink-0" />
                  @{ig}
                </a>
              ) : null}
            </div>
          </div>

          {profile.bio?.trim() ? (
            <div className="mt-8 border-t border-slate-100 pt-8">
              <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500">קצת עליי</h2>
              <p className="mt-3 whitespace-pre-wrap text-[15px] leading-relaxed text-slate-700 sm:text-base">{profile.bio.trim()}</p>
            </div>
          ) : null}

          {profile.phone?.trim() ? (
            <div className="mt-8 border-t border-slate-100 pt-8">
              <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500">טלפון</h2>
              <p className="mt-2 text-lg font-semibold text-slate-900" dir="ltr">
                {profile.phone.trim()}
              </p>
            </div>
          ) : null}
        </section>
      </main>
    </div>
  );
}
