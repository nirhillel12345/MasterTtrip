import { Bus, CalendarDays, Clock3, MapPin, Plus, Users } from "lucide-react";
import Link from "next/link";
import { AppNavbar } from "@/app/components/app-navbar";
import { prisma } from "@/lib/prisma";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { isAllowedDestination } from "@/lib/travel-destinations";

function formatHebrewDate(d: Date): string {
  return new Intl.DateTimeFormat("he-IL", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(d);
}

function formatPrice(n: number) {
  return `${n.toLocaleString("he-IL")} ₪`;
}

function formatTime(d: Date): string {
  const hh = String(d.getUTCHours()).padStart(2, "0");
  const mm = String(d.getUTCMinutes()).padStart(2, "0");
  return `${hh}:${mm}`;
}

type PageProps = {
  searchParams?: Promise<Record<string, string | string[] | undefined>> | Record<string, string | string[] | undefined>;
};

async function resolveSearchParams(
  searchParams?: Promise<Record<string, string | string[] | undefined>> | Record<string, string | string[] | undefined>,
) {
  if (!searchParams) return {};
  if ("then" in searchParams) return await searchParams;
  return searchParams;
}

export default async function TransportsPage({ searchParams }: PageProps) {
  const sp = await resolveSearchParams(searchParams);
  const one = (k: string) => {
    const v = sp[k];
    if (typeof v === "string") return v.trim();
    if (Array.isArray(v) && typeof v[0] === "string") return v[0].trim();
    return "";
  };

  const origin = one("origin");
  const destination = one("destination");
  const date = one("date").slice(0, 10);
  const time = one("time").slice(0, 5);

  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const avatar =
    (typeof user?.user_metadata?.avatar_url === "string" && user.user_metadata.avatar_url) ||
    (typeof user?.user_metadata?.picture === "string" && user.user_metadata.picture) ||
    null;
  const displayName =
    (typeof user?.user_metadata?.name === "string" && user.user_metadata.name) ||
    (typeof user?.user_metadata?.full_name === "string" && user.user_metadata.full_name) ||
    "מטייל";

  const where: import("@/generated/prisma").Prisma.TransportWhereInput = {};
  const and: import("@/generated/prisma").Prisma.TransportWhereInput[] = [];
  if (origin && isAllowedDestination(origin)) {
    and.push({ origin });
  }
  if (destination && isAllowedDestination(destination)) {
    and.push({ destination });
  }
  if (/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    and.push({
      date: {
        gte: new Date(`${date}T00:00:00.000Z`),
        lt: new Date(`${date}T23:59:59.999Z`),
      },
    });
  }
  if (and.length) where.AND = and;

  let transports = await prisma.transport.findMany({
    where,
    orderBy: [{ date: "asc" }, { createdAt: "desc" }],
    select: {
      id: true,
      origin: true,
      destination: true,
      date: true,
      totalSeats: true,
      availableSeats: true,
      pricePerPerson: true,
      creator: { select: { name: true, email: true } },
    },
  });

  if (/^\d{2}:\d{2}$/.test(time)) {
    transports = transports.filter((ride) => {
      const hh = String(ride.date.getUTCHours()).padStart(2, "0");
      const mm = String(ride.date.getUTCMinutes()).padStart(2, "0");
      return `${hh}:${mm}` === time;
    });
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900" dir="rtl">
      <AppNavbar user={user ? { displayName, avatar } : null} />
      <main className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 sm:py-10">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <div className="text-right">
            <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">נסיעות ושאטלים</h1>
            <p className="mt-1.5 text-sm text-slate-600">מוצאים נסיעה משותפת, חוסכים כסף ומכירים מטיילים חדשים.</p>
          </div>
          <Link
            href="/transports/new"
            className="inline-flex min-h-[44px] items-center gap-2 rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white shadow-md transition hover:bg-slate-800 active:scale-[0.98]"
          >
            <Plus className="h-4 w-4" />
            פרסום נסיעה
          </Link>
        </div>
        {origin || destination || date || time ? (
          <div className="mb-5 rounded-xl border border-cyan-200 bg-cyan-50 px-4 py-3 text-right text-sm text-cyan-900">
            מציגים תוצאות עבור החיפוש שלכם.
          </div>
        ) : null}

        {transports.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-14 text-center shadow-inner">
            <Bus className="mx-auto h-10 w-10 text-slate-400" />
            <h2 className="mt-4 text-lg font-semibold text-slate-900">עדיין אין נסיעות</h2>
            <p className="mt-2 text-sm text-slate-600">היו הראשונים לפרסם נסיעה ולעזור לקהילה להגיע בקלות.</p>
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {transports.map((ride) => (
              <Link
                key={ride.id}
                href={`/transports/${ride.id}`}
                className="rounded-2xl border border-slate-200 bg-white p-5 text-right shadow-sm transition hover:-translate-y-0.5 hover:shadow-md active:scale-[0.99]"
              >
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">נסיעה משותפת</p>
                <h2 className="mt-2 text-lg font-bold text-slate-900">
                  {ride.origin} ← {ride.destination}
                </h2>
                <div className="mt-4 space-y-2 text-sm text-slate-700">
                  <p className="inline-flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-cyan-600" />
                    {ride.origin} → {ride.destination}
                  </p>
                  <p className="inline-flex items-center gap-2">
                    <CalendarDays className="h-4 w-4 text-cyan-600" />
                    {formatHebrewDate(ride.date)}
                  </p>
                  <p className="inline-flex items-center gap-2">
                    <Clock3 className="h-4 w-4 text-cyan-600" />
                    שעת איסוף: {formatTime(ride.date)}
                  </p>
                  <p className="inline-flex items-center gap-2">
                    <Users className="h-4 w-4 text-cyan-600" />
                    נותרו {ride.availableSeats} מתוך {ride.totalSeats} מקומות
                  </p>
                </div>
                <div className="mt-4 flex items-center justify-between">
                  <span className="text-sm text-slate-500">
                    מפרסם: {ride.creator.name?.trim() || ride.creator.email.split("@")[0]}
                  </span>
                  <span className="text-base font-bold text-slate-900">{formatPrice(ride.pricePerPerson)}</span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
