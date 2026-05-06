import { CalendarDays, Clock3, Pencil, Plus } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { DeleteTransportButton } from "./delete-transport-button";
import { TransportParticipantsModal, type ParticipantRow } from "./transport-participants-modal";
import { prisma } from "@/lib/prisma";
import { createSupabaseServerClient } from "@/lib/supabase/server";

function formatDate(d: Date) {
  return new Intl.DateTimeFormat("he-IL", { day: "numeric", month: "long", year: "numeric" }).format(d);
}

function formatTime(d: Date) {
  const hh = String(d.getUTCHours()).padStart(2, "0");
  const mm = String(d.getUTCMinutes()).padStart(2, "0");
  return `${hh}:${mm}`;
}

function formatPrice(n: number) {
  return `${n.toLocaleString("he-IL")} ₪`;
}

export default async function MyTransportsPage() {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user?.email) {
    redirect("/auth/login?error=" + encodeURIComponent("יש להתחבר כדי לצפות בהסעות שלך"));
  }

  const dbUser = await prisma.user.findUnique({
    where: { email: user.email },
  });
  if (!dbUser) {
    redirect("/auth/login");
  }

  const transports = await prisma.transport.findMany({
    where: { creatorId: dbUser.id },
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      origin: true,
      destination: true,
      date: true,
      totalSeats: true,
      availableSeats: true,
      pricePerPerson: true,
      joins: {
        orderBy: { createdAt: "asc" },
        select: {
          id: true,
          user: {
            select: {
              id: true,
              name: true,
              email: true,
              image: true,
            },
          },
        },
      },
    },
  });

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900" dir="rtl">
      <header className="border-b border-slate-200/90 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-4 sm:px-6">
          <div>
            <h1 className="text-xl font-bold text-slate-900 sm:text-2xl">ההסעות שלי</h1>
            <p className="mt-1 text-sm text-slate-600">ניהול ההסעות שפרסמת ב-MasterTrip</p>
          </div>
          <div className="flex flex-wrap items-center justify-end gap-2">
            <Link
              href="/"
              className="rounded-full border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 active:scale-[0.98]"
            >
              עמוד הבית
            </Link>
            <Link
              href="/transports/new"
              className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white shadow-md transition hover:bg-slate-800 active:scale-[0.98]"
            >
              <Plus className="h-4 w-4" />
              פרסם הסעה חדשה
            </Link>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-10">
        {transports.length === 0 ? (
          <div className="flex flex-col items-center rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center shadow-inner">
            <p className="max-w-sm text-slate-600">עדיין לא פרסמת הסעה? זה הזמן להתחיל</p>
            <Link
              href="/transports/new"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-cyan-600 px-6 py-3 text-sm font-bold text-white shadow-lg transition hover:bg-cyan-700 active:scale-[0.98]"
            >
              <Plus className="h-4 w-4" />
              פרסם הסעה ראשונה
            </Link>
          </div>
        ) : (
          <ul className="space-y-5 sm:space-y-6">
            {transports.map((t) => {
              const taken = t.totalSeats - t.availableSeats;
              const routeLabel = `${t.origin} → ${t.destination}`;
              const participants: ParticipantRow[] = t.joins.map((j) => ({
                id: j.id,
                name: j.user.name?.trim() || j.user.email.split("@")[0],
                email: j.user.email,
                image: j.user.image,
              }));

              return (
                <li key={t.id} className="flex flex-col gap-4 sm:flex-row sm:items-stretch sm:gap-5">
                  <div className="min-w-0 flex-1">
                    <Link
                      href={`/transports/${t.id}`}
                      className="group block rounded-2xl border border-slate-200 bg-white p-4 shadow-md shadow-slate-900/5 transition hover:border-cyan-200/80 hover:shadow-lg sm:p-5"
                    >
                      <h2 className="text-right text-lg font-bold leading-snug text-slate-900 sm:text-xl">
                        <span className="text-slate-500">מסלול:</span>{" "}
                        <span className="text-cyan-800 transition group-hover:text-cyan-700">
                          {t.origin} ← {t.destination}
                        </span>
                      </h2>
                      <div className="mt-3 space-y-1.5 text-right text-sm text-slate-700">
                        <p className="inline-flex flex-wrap items-center gap-2">
                          <CalendarDays className="h-4 w-4 shrink-0 text-cyan-600" />
                          <span>{formatDate(t.date)}</span>
                        </p>
                        <p className="inline-flex flex-wrap items-center gap-2">
                          <Clock3 className="h-4 w-4 shrink-0 text-cyan-600" />
                          <span>שעת איסוף: {formatTime(t.date)}</span>
                        </p>
                        <p className="pt-1 font-semibold tabular-nums text-slate-900">{formatPrice(t.pricePerPerson)} למשתתף</p>
                        <p className="text-slate-600">
                          {taken}/{t.totalSeats} מקומות תפוסים
                        </p>
                      </div>
                      <p className="mt-3 text-xs text-slate-400">לחצו לצפייה בפרטי ההסעה</p>
                    </Link>
                  </div>

                  <div className="flex shrink-0 flex-col gap-2 sm:w-44 sm:justify-center">
                    <TransportParticipantsModal routeLabel={routeLabel} participants={participants} />
                    <Link
                      href={`/transports/${t.id}/edit`}
                      className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-xs font-semibold text-slate-800 shadow-sm transition hover:border-cyan-400 hover:bg-cyan-50/40 active:scale-[0.98] sm:text-sm"
                    >
                      <Pencil className="h-3.5 w-3.5" />
                      עריכה
                    </Link>
                    <DeleteTransportButton transportId={t.id} routeLabel={routeLabel} />
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </main>
    </div>
  );
}
