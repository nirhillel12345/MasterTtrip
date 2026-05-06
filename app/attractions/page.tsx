import { Camera, MapPin, Plus } from "lucide-react";
import Link from "next/link";
import { AttractionsFilterBar } from "./attractions-filter-bar";
import { AppNavbar } from "@/app/components/app-navbar";
import type { AttractionType, Prisma } from "@/generated/prisma";
import { prisma } from "@/lib/prisma";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { isAllowedDestination } from "@/lib/travel-destinations";

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

function formatPrice(price: number | null) {
  if (price == null) return "מחיר בפרטי";
  return `${price.toLocaleString("he-IL")} ₪`;
}

function typeBadge(type: AttractionType) {
  if (type === "BUSINESS") {
    return { label: "עסקי", className: "border-cyan-200 bg-cyan-50 text-cyan-800" };
  }
  return { label: "פרטי", className: "border-emerald-200 bg-emerald-50 text-emerald-800" };
}

export default async function AttractionsPage({ searchParams }: PageProps) {
  const sp = await resolveSearchParams(searchParams);
  const one = (k: string) => {
    const v = sp[k];
    if (typeof v === "string") return v.trim();
    if (Array.isArray(v) && typeof v[0] === "string") return v[0].trim();
    return "";
  };

  const destination = one("destination");
  const typeParam = one("type");
  const type = typeParam === "BUSINESS" || typeParam === "PRIVATE" ? typeParam : "ALL";

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

  const where: Prisma.AttractionWhereInput = {};
  const and: Prisma.AttractionWhereInput[] = [];
  if (destination && isAllowedDestination(destination)) {
    and.push({ location: { label: destination } });
  }
  if (type !== "ALL") {
    and.push({ type });
  }
  if (and.length) where.AND = and;

  const attractions = await prisma.attraction.findMany({
    where,
    orderBy: [{ createdAt: "desc" }],
    select: {
      id: true,
      title: true,
      price: true,
      type: true,
      images: true,
      location: { select: { label: true } },
    },
  });

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900" dir="rtl">
      <AppNavbar user={user ? { displayName, avatar } : null} />
      <main className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 sm:py-10">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <div className="text-right">
            <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">אטרקציות</h1>
            <p className="mt-1.5 text-sm text-slate-600">מוצאים פעילויות, חוויות וסיורים שמתאימים לטיול שלכם.</p>
          </div>
          <Link
            href="/attractions/new"
            className="inline-flex min-h-[44px] items-center gap-2 rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white shadow-md transition hover:bg-slate-800 active:scale-[0.98]"
          >
            <Plus className="h-4 w-4" />
            פרסום אטרקציה
          </Link>
        </div>

        <AttractionsFilterBar initialDestination={destination} initialType={type} />

        {attractions.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-14 text-center shadow-inner">
            <Camera className="mx-auto h-10 w-10 text-slate-400" />
            <h2 className="mt-4 text-lg font-semibold text-slate-900">עדיין אין אטרקציות</h2>
            <p className="mt-2 text-sm text-slate-600">היו הראשונים לפרסם אטרקציה ולעזור למטיילים לתכנן חוויה מושלמת.</p>
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {attractions.map((attraction) => {
              const badge = typeBadge(attraction.type);
              const image = attraction.images[0] ?? null;
              return (
                <Link
                  key={attraction.id}
                  href={`/attractions/${attraction.id}`}
                  className="overflow-hidden rounded-2xl border border-slate-200 bg-white text-right shadow-sm transition hover:-translate-y-0.5 hover:shadow-md active:scale-[0.99]"
                >
                  <div className="relative aspect-[4/3] bg-slate-100">
                    {image ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={image} alt={attraction.title} className="h-full w-full object-cover" />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center text-slate-400">
                        <Camera className="h-8 w-8" />
                      </div>
                    )}
                  </div>
                  <div className="p-4">
                    <div className="mb-2 flex items-center justify-between gap-2">
                      <span className={`rounded-full border px-2.5 py-1 text-xs font-semibold ${badge.className}`}>{badge.label}</span>
                      <span className="inline-flex items-center gap-1 text-xs text-slate-500">
                        <MapPin className="h-3.5 w-3.5 text-cyan-600" />
                        {attraction.location.label}
                      </span>
                    </div>
                    <h2 className="line-clamp-2 text-lg font-bold text-slate-900">{attraction.title}</h2>
                    <p className="mt-3 text-base font-bold text-slate-900">{formatPrice(attraction.price)}</p>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
}
