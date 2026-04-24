import { CalendarDays, ChevronRight, Clock3, MapPin, Users } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { JoinTransportButton } from "./join-transport-button";
import { RemoveParticipantButton } from "./remove-participant-button";
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

async function resolveSearchParams(
  searchParams?: PageProps["searchParams"],
): Promise<Record<string, string | string[] | undefined>> {
  if (!searchParams) return {};
  if ("then" in searchParams) return await searchParams;
  return searchParams;
}

function formatDate(d: Date) {
  return new Intl.DateTimeFormat("he-IL", { day: "numeric", month: "long", year: "numeric" }).format(d);
}

function formatPrice(n: number) {
  return `${n.toLocaleString("he-IL")} ₪`;
}

function formatTime(d: Date) {
  const hh = String(d.getUTCHours()).padStart(2, "0");
  const mm = String(d.getUTCMinutes()).padStart(2, "0");
  return `${hh}:${mm}`;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await resolveParams(params);
  const ride = await prisma.transport.findUnique({
    where: { id },
    select: { origin: true, destination: true },
  });
  if (!ride) return { title: "נסיעה לא נמצאה" };
  return {
    title: `${ride.origin} → ${ride.destination} | MasterTrip`,
    description: `נסיעה משותפת מ-${ride.origin} ל-${ride.destination}`,
  };
}

export default async function TransportDetailPage({ params, searchParams }: PageProps) {
  const { id } = await resolveParams(params);
  const sp = await resolveSearchParams(searchParams);
  const joinedParam =
    typeof sp.joined === "string" ? sp.joined : Array.isArray(sp.joined) ? sp.joined[0] : "";
  const showJoinedSuccess = joinedParam === "1";

  const ride = await prisma.transport.findUnique({
    where: { id },
    include: {
      creator: { select: { id: true, name: true, email: true } },
      joins: {
        orderBy: { createdAt: "asc" },
        include: { user: { select: { id: true, name: true, email: true, image: true } } },
      },
    },
  });
  if (!ride) notFound();

  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const authEmail = user?.email ?? null;
  const isLoggedIn = Boolean(authEmail);
  const dbCurrentUser = authEmail
    ? await prisma.user.findUnique({ where: { email: authEmail }, select: { id: true } })
    : null;
  const currentUserId = dbCurrentUser?.id ?? null;
  const isCreator = currentUserId === ride.creatorId;
  const alreadyJoined = currentUserId ? ride.joins.some((j) => j.userId === currentUserId) : false;
  const ridePath = `/transports/${ride.id}`;

  const creatorName = ride.creator.name?.trim() || ride.creator.email.split("@")[0];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900" dir="rtl">
      <header className="sticky top-0 z-30 border-b border-slate-200/90 bg-white/95 backdrop-blur-md supports-[backdrop-filter]:bg-white/90">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3.5 sm:px-6 sm:py-4">
          <Link
            href="/transports"
            className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 transition hover:text-slate-900"
          >
            <ChevronRight className="h-4 w-4 shrink-0 text-slate-400" />
            חזרה לכל הנסיעות
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 pb-20 pt-6 sm:px-6 sm:pt-8">
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_340px] lg:items-start lg:gap-8">
          <section className="space-y-5">
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-md shadow-slate-900/5 sm:p-7">
              <h1 className="text-right text-2xl font-bold leading-snug tracking-tight sm:text-3xl">
                {ride.origin} ← {ride.destination}
              </h1>
              <div className="mt-5 space-y-2 text-right text-sm text-slate-700 sm:text-base">
                <p className="inline-flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-cyan-600" />
                  מסלול: {ride.origin} → {ride.destination}
                </p>
                <p className="inline-flex items-center gap-2">
                  <CalendarDays className="h-4 w-4 text-cyan-600" />
                  תאריך: {formatDate(ride.date)}
                </p>
                <p className="inline-flex items-center gap-2">
                  <Clock3 className="h-4 w-4 text-cyan-600" />
                  שעת איסוף: {formatTime(ride.date)}
                </p>
                <p className="inline-flex items-center gap-2">
                  <Users className="h-4 w-4 text-cyan-600" />
                  מקומות פנויים: {ride.availableSeats} / {ride.totalSeats}
                </p>
              </div>
              <p className="mt-5 whitespace-pre-wrap text-right text-sm leading-relaxed text-slate-700 sm:text-base">
                {ride.description}
              </p>
            </div>

            <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-md shadow-slate-900/5 sm:p-7">
              <h2 className="text-right text-sm font-bold uppercase tracking-wider text-slate-500">משתתפים</h2>
              {ride.joins.length === 0 ? (
                <p className="mt-3 text-right text-sm text-slate-600">עדיין אין משתתפים בנסיעה.</p>
              ) : (
                <ul className="mt-4 space-y-3">
                  {ride.joins.map((join) => {
                    const name = join.user.name?.trim() || join.user.email.split("@")[0];
                    return (
                      <li
                        key={join.id}
                        className="flex items-center justify-between gap-3 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5"
                      >
                        {isCreator ? (
                          <RemoveParticipantButton transportId={ride.id} participantUserId={join.userId} />
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
                            <img
                              src={join.user.image}
                              alt=""
                              className="h-10 w-10 shrink-0 rounded-full object-cover ring-1 ring-slate-200"
                            />
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
          </section>

          <aside className="lg:sticky lg:top-24">
            <div className="rounded-2xl border border-slate-200 bg-white p-6 text-right shadow-xl shadow-slate-900/10">
              <p className="text-sm font-medium text-slate-500">מחיר למשתתף</p>
              <p className="mt-1 text-3xl font-bold text-slate-900">{formatPrice(ride.pricePerPerson)}</p>
              <p className="mt-4 text-sm text-slate-600">מארגן הנסיעה: {creatorName}</p>

              <div className="mt-6">
                {showJoinedSuccess ? (
                  <div className="mb-3 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-center text-sm font-semibold text-emerald-800">
                    נרשמת בהצלחה! הודעה נשלחה למארגן הנסיעה
                  </div>
                ) : null}
                {!isLoggedIn ? (
                  <Link
                    href={`/auth/login?next=${encodeURIComponent(ridePath)}`}
                    className="inline-flex min-h-[48px] w-full items-center justify-center rounded-xl bg-cyan-600 px-4 py-3 text-sm font-bold text-white shadow-md transition hover:bg-cyan-700 active:scale-[0.98]"
                  >
                    התחברו כדי להצטרף
                  </Link>
                ) : isCreator ? (
                  <div className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-center text-sm font-medium text-slate-700">
                    זו הנסיעה שפרסמת. כאן אפשר לנהל את המשתתפים.
                  </div>
                ) : alreadyJoined ? (
                  <div className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-center text-sm font-semibold text-emerald-800">
                    כבר הצטרפת לנסיעה הזאת 🎉
                  </div>
                ) : ride.availableSeats <= 0 ? (
                  <div className="rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-center text-sm font-semibold text-rose-700">
                    אין יותר מקומות פנויים בנסיעה הזו.
                  </div>
                ) : (
                  <JoinTransportButton transportId={ride.id} />
                )}
              </div>

              <p className="mt-4 text-xs leading-relaxed text-slate-500">
                לאחר הצטרפות, המערכת מפחיתה מקום פנוי ומעדכנת מיד את רשימת המשתתפים.
              </p>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}
