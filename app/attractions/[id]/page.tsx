import { CalendarDays, ChevronRight, ExternalLink, MapPin, Users } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AttractionImageGallery } from "./attraction-image-gallery";
import { ContactAttractionButton } from "./contact-attraction-button";
import { JoinAttractionButton } from "./join-attraction-button";
import { LeaveAttractionButton } from "./leave-attraction-button";
import { RemoveAttractionParticipantButton } from "./remove-attraction-participant-button";
import { prisma } from "@/lib/prisma";
import { createSupabaseServerClient } from "@/lib/supabase/server";

type PageProps = {
  params: Promise<{ id: string }> | { id: string };
  searchParams?:
    | Promise<Record<string, string | string[] | undefined>>
    | Record<string, string | string[] | undefined>;
};

async function resolveParams(params: PageProps["params"]) {
  if (params && "then" in params) return await params;
  return params ?? { id: "" };
}

async function resolveSearchParams(searchParams?: PageProps["searchParams"]) {
  if (!searchParams) return {};
  if ("then" in searchParams) return await searchParams;
  return searchParams;
}

function formatDate(d: Date) {
  return new Intl.DateTimeFormat("he-IL", {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(d);
}

function formatPrice(price: number | null) {
  if (price == null) return "מחיר בפרטי";
  return `${price.toLocaleString("he-IL")} ₪`;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await resolveParams(params);
  const attraction = await prisma.attraction.findUnique({
    where: { id },
    select: { title: true, location: { select: { label: true } } },
  });
  if (!attraction) return { title: "אטרקציה לא נמצאה" };
  return {
    title: `${attraction.title} | MasterTrip`,
    description: `${attraction.location.label} · אטרקציה`,
  };
}

export default async function AttractionDetailPage({ params, searchParams }: PageProps) {
  const { id } = await resolveParams(params);
  const sp = await resolveSearchParams(searchParams);
  const statusParam = typeof sp.status === "string" ? sp.status : Array.isArray(sp.status) ? sp.status[0] : "";
  const updatedParam = typeof sp.updated === "string" ? sp.updated : Array.isArray(sp.updated) ? sp.updated[0] : "";
  const joinedParam = typeof sp.joined === "string" ? sp.joined : Array.isArray(sp.joined) ? sp.joined[0] : "";
  const leftParam = typeof sp.left === "string" ? sp.left : Array.isArray(sp.left) ? sp.left[0] : "";

  const attraction = await prisma.attraction.findUnique({
    where: { id },
    include: {
      location: { select: { label: true } },
      creator: { select: { id: true, name: true, email: true, phone: true } },
      joins: {
        orderBy: { createdAt: "asc" },
        include: { user: { select: { id: true, name: true, email: true, image: true } } },
      },
    },
  });
  if (!attraction) notFound();

  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const authEmail = user?.email ?? null;
  const isLoggedIn = Boolean(authEmail);
  const dbCurrentUser = authEmail
    ? await prisma.user.findUnique({
        where: { email: authEmail },
        select: { id: true, name: true, email: true, phone: true },
      })
    : null;
  const currentUserId = dbCurrentUser?.id ?? null;
  const isCreator = currentUserId === attraction.creatorId;
  const alreadyJoined = currentUserId ? attraction.joins.some((j) => j.userId === currentUserId) : false;
  const attractionPath = `/attractions/${attraction.id}`;
  const creatorName = attraction.creator.name?.trim() || attraction.creator.email.split("@")[0];

  const images = attraction.images.filter(Boolean);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900" dir="rtl">
      <header className="sticky top-0 z-30 border-b border-slate-200/90 bg-white/95 backdrop-blur-md supports-[backdrop-filter]:bg-white/90">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3.5 sm:px-6 sm:py-4">
          <Link
            href="/attractions"
            className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 transition hover:text-slate-900"
          >
            <ChevronRight className="h-4 w-4 shrink-0 text-slate-400" />
            חזרה לכל האטרקציות
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 pb-28 pt-6 sm:px-6 sm:pt-8 lg:pb-20">
        {statusParam === "created" ? (
          <div className="mb-4 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-center text-sm font-semibold text-emerald-800">
            האטרקציה פורסמה בהצלחה!
          </div>
        ) : null}
        {updatedParam === "1" ? (
          <div className="mb-4 rounded-xl border border-cyan-200 bg-cyan-50 px-4 py-3 text-center text-sm font-semibold text-cyan-800">
            השינויים נשמרו בהצלחה.
          </div>
        ) : null}
        {joinedParam === "1" ? (
          <div className="mb-4 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-center text-sm font-semibold text-emerald-800">
            נרשמת בהצלחה!
          </div>
        ) : null}
        {leftParam === "1" ? (
          <div className="mb-4 rounded-xl border border-slate-200 bg-slate-100 px-4 py-3 text-center text-sm font-semibold text-slate-700">
            ההרשמה בוטלה בהצלחה.
          </div>
        ) : null}
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_340px] lg:items-start lg:gap-8">
          <section className="space-y-5">
            <AttractionImageGallery title={attraction.title} images={images} />

            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-md shadow-slate-900/5 sm:p-7">
              <div className="mb-3 flex items-center justify-between">
                <span
                  className={`rounded-full px-3 py-1 text-xs font-semibold ${
                    attraction.type === "BUSINESS" ? "bg-cyan-100 text-cyan-900" : "bg-emerald-100 text-emerald-900"
                  }`}
                >
                  {attraction.type === "BUSINESS" ? "אטרקציה עסקית" : "אטרקציה פרטית"}
                </span>
              </div>
              <h1 className="text-right text-2xl font-bold leading-snug tracking-tight sm:text-3xl">{attraction.title}</h1>
              <p className="mt-2 text-right text-2xl font-extrabold text-slate-900">{formatPrice(attraction.price)}</p>
              <div className="mt-4 space-y-2 text-right text-sm text-slate-700 sm:text-base">
                <p className="inline-flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-cyan-600" />
                  {attraction.location.label}
                </p>
                {attraction.date ? (
                  <p className="inline-flex items-center gap-2">
                    <CalendarDays className="h-4 w-4 text-cyan-600" />
                    {formatDate(attraction.date)}
                  </p>
                ) : null}
                {attraction.maxParticipants != null ? (
                  <p className="inline-flex items-center gap-2">
                    <Users className="h-4 w-4 text-cyan-600" />
                    מקומות פנויים: {attraction.availableSlots ?? 0} / {attraction.maxParticipants}
                  </p>
                ) : null}
                {attraction.externalLink ? (
                  <a
                    href={attraction.externalLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 font-semibold text-cyan-700 underline-offset-2 hover:underline"
                  >
                    <ExternalLink className="h-4 w-4" />
                    קישור חיצוני
                  </a>
                ) : null}
              </div>
              {attraction.description ? (
                <p className="mt-5 whitespace-pre-wrap text-right text-sm leading-relaxed text-slate-700 sm:text-base">
                  {attraction.description}
                </p>
              ) : null}
            </div>

            {attraction.type === "PRIVATE" ? (
              <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-md shadow-slate-900/5 sm:p-7">
                <h2 className="text-right text-sm font-bold uppercase tracking-wider text-slate-500">משתתפים</h2>
                {attraction.joins.length === 0 ? (
                  <p className="mt-3 text-right text-sm text-slate-600">עדיין אין משתתפים באטרקציה הזו.</p>
                ) : (
                  <ul className="mt-4 space-y-3">
                    {attraction.joins.map((join) => {
                      const name = join.user.name?.trim() || join.user.email.split("@")[0];
                      return (
                        <li
                          key={join.id}
                          className="flex items-center justify-between gap-3 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5"
                        >
                          {isCreator ? (
                            <RemoveAttractionParticipantButton attractionId={attraction.id} participantUserId={join.userId} />
                          ) : (
                            <span className="text-xs text-slate-500">{new Date(join.createdAt).toLocaleDateString("he-IL")}</span>
                          )}
                          <div className="flex items-center gap-3">
                            <div className="text-right">
                              <p className="text-sm font-semibold text-slate-800">{name}</p>
                              <p className="text-xs text-slate-500">{join.user.email}</p>
                            </div>
                            {join.user.image ? (
                              // eslint-disable-next-line @next/next/no-img-element
                              <img src={join.user.image} alt="" className="h-10 w-10 shrink-0 rounded-full object-cover ring-1 ring-slate-200" />
                            ) : (
                              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-slate-200 text-xs font-bold text-slate-700">
                                {name.slice(0, 1)}
                              </div>
                            )}
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                )}
              </section>
            ) : null}
          </section>

          <aside className="hidden lg:sticky lg:top-24 lg:block">
            <div className="rounded-2xl border border-slate-200 bg-white p-6 text-right shadow-xl shadow-slate-900/10">
              <p className="text-sm font-medium text-slate-500">מחיר</p>
              <p className="mt-1 text-3xl font-bold text-slate-900">{formatPrice(attraction.price)}</p>
              <p className="mt-4 text-sm text-slate-600">מפרסם: {creatorName}</p>

              <div className="mt-6">
                {attraction.type === "BUSINESS" ? (
                  <ContactAttractionButton
                    organizerName={creatorName}
                    attractionTitle={attraction.title}
                    locationLabel={attraction.location.label}
                    phone={attraction.creator.phone ?? attraction.contactPhone}
                  />
                ) : !isLoggedIn ? (
                  <Link
                    href={`/auth/login?next=${encodeURIComponent(attractionPath)}`}
                    className="inline-flex min-h-[48px] w-full items-center justify-center rounded-xl bg-cyan-600 px-4 py-3 text-sm font-bold text-white shadow-md transition hover:bg-cyan-700 active:scale-[0.98]"
                  >
                    התחברו כדי להצטרף
                  </Link>
                ) : isCreator ? (
                  <div className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-center text-sm font-medium text-slate-700">
                    זו האטרקציה שפרסמת. כאן ניתן לנהל משתתפים.
                  </div>
                ) : alreadyJoined ? (
                  <LeaveAttractionButton attractionId={attraction.id} />
                ) : attraction.maxParticipants == null || attraction.availableSlots == null ? (
                  <div className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-center text-sm font-semibold text-amber-800">
                    ההרשמה לאטרקציה הזו עדיין לא זמינה.
                  </div>
                ) : (attraction.availableSlots ?? 0) <= 0 ? (
                  <div className="rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-center text-sm font-semibold text-rose-700">
                    האטרקציה מלאה כרגע.
                  </div>
                ) : (
                  <JoinAttractionButton attractionId={attraction.id} initialPhone={dbCurrentUser?.phone ?? null} />
                )}
              </div>
            </div>
          </aside>
        </div>
      </main>

      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-slate-200 bg-white/95 p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] shadow-[0_-10px_30px_-20px_rgba(15,23,42,0.5)] backdrop-blur lg:hidden">
        {attraction.type === "BUSINESS" ? (
          <ContactAttractionButton
            organizerName={creatorName}
            attractionTitle={attraction.title}
            locationLabel={attraction.location.label}
            phone={attraction.creator.phone ?? attraction.contactPhone}
          />
        ) : !isLoggedIn ? (
          <Link
            href={`/auth/login?next=${encodeURIComponent(attractionPath)}`}
            className="inline-flex min-h-[52px] w-full items-center justify-center rounded-xl bg-cyan-600 px-4 py-3 text-sm font-bold text-white shadow-md transition hover:bg-cyan-700 active:scale-[0.98]"
          >
            התחברו כדי להצטרף
          </Link>
        ) : isCreator ? (
          <div className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-center text-sm font-medium text-slate-700">
            זו האטרקציה שפרסמת. כאן ניתן לנהל משתתפים.
          </div>
        ) : alreadyJoined ? (
          <LeaveAttractionButton attractionId={attraction.id} />
        ) : attraction.maxParticipants == null || attraction.availableSlots == null ? (
          <div className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-center text-sm font-semibold text-amber-800">
            ההרשמה לאטרקציה הזו עדיין לא זמינה.
          </div>
        ) : (attraction.availableSlots ?? 0) <= 0 ? (
          <div className="rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-center text-sm font-semibold text-rose-700">
            האטרקציה מלאה כרגע.
          </div>
        ) : (
          <JoinAttractionButton attractionId={attraction.id} initialPhone={dbCurrentUser?.phone ?? null} />
        )}
      </div>
    </div>
  );
}
