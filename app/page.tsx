import {
  CalendarDays,
  LogOut,
  MapPin,
  Search,
  Star,
  Users,
  WandSparkles,
} from "lucide-react";
import Link from "next/link";
import { signOut } from "@/app/auth/actions";
import { createSupabaseServerClient } from "@/lib/supabase/server";

type Listing = {
  id: number;
  imageUrl: string;
  roommatesNeeded: number;
  city: string;
  dateRange: string;
  price: string;
};

type HomePageProps = {
  searchParams?: Promise<{ status?: string }> | { status?: string };
};

async function resolveParams(
  searchParams?: Promise<{ status?: string }> | { status?: string },
) {
  if (!searchParams) return {};
  if ("then" in searchParams) return await searchParams;
  return searchParams;
}

const featuredListings: Listing[] = [
  {
    id: 1,
    imageUrl:
      "https://images.unsplash.com/photo-1493558103817-58b2924bce98?auto=format&fit=crop&w=1200&q=80",
    roommatesNeeded: 2,
    city: "בנגקוק, תאילנד",
    dateRange: "5 במאי - 2 ביוני",
    price: "$24 ללילה",
  },
  {
    id: 2,
    imageUrl:
      "https://images.unsplash.com/photo-1526481280695-3c4691f22d2a?auto=format&fit=crop&w=1200&q=80",
    roommatesNeeded: 1,
    city: "צ׳אנגו, באלי",
    dateRange: "28 באפריל - 20 במאי",
    price: "$31 ללילה",
  },
  {
    id: 3,
    imageUrl:
      "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?auto=format&fit=crop&w=1200&q=80",
    roommatesNeeded: 3,
    city: "ליסבון, פורטוגל",
    dateRange: "3 ביוני - 1 ביולי",
    price: "$27 ללילה",
  },
  {
    id: 4,
    imageUrl:
      "https://images.unsplash.com/photo-1520277739336-7bf67edfa768?auto=format&fit=crop&w=1200&q=80",
    roommatesNeeded: 2,
    city: "מדיין, קולומביה",
    dateRange: "18 במאי - 18 ביוני",
    price: "$22 ללילה",
  },
  {
    id: 5,
    imageUrl:
      "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=1200&q=80",
    roommatesNeeded: 1,
    city: "ברצלונה, ספרד",
    dateRange: "4 ביולי - 29 ביולי",
    price: "$35 ללילה",
  },
  {
    id: 6,
    imageUrl:
      "https://images.unsplash.com/photo-1530789253388-582c481c54b0?auto=format&fit=crop&w=1200&q=80",
    roommatesNeeded: 4,
    city: "צ׳אנג מאי, תאילנד",
    dateRange: "12 במאי - 9 ביוני",
    price: "$19 ללילה",
  },
];

export default async function Home({ searchParams }: HomePageProps) {
  const params = await resolveParams(searchParams);
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

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <header className="sticky top-0 z-20 border-b border-slate-200/80 bg-white/90 backdrop-blur-md">
        <nav className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
          <Link href="/" className="flex items-center gap-2">
            <div className="rounded-xl bg-gradient-to-br from-emerald-400 to-cyan-500 p-2 text-white shadow-lg shadow-emerald-200">
              <WandSparkles className="h-4 w-4" />
            </div>
            <span className="text-lg font-bold tracking-tight">MasterTrip</span>
          </Link>

          <div className="flex items-center gap-2 sm:gap-3">
            {user ? (
              <>
                <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1.5">
                  {avatar ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={avatar}
                      alt={displayName}
                      className="h-7 w-7 rounded-full object-cover"
                    />
                  ) : (
                    <div className="flex h-7 w-7 items-center justify-center rounded-full bg-slate-200 text-xs font-semibold text-slate-700">
                      {displayName.slice(0, 1)}
                    </div>
                  )}
                  <span className="text-xs font-semibold text-slate-700 sm:text-sm">{displayName}</span>
                </div>
                <form action={signOut}>
                  <button
                    type="submit"
                    className="inline-flex items-center gap-1 rounded-full border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-slate-400 hover:bg-slate-100"
                  >
                    <LogOut className="h-4 w-4" />
                    יציאה
                  </button>
                </form>
              </>
            ) : (
              <Link
                href="/auth/login"
                className="rounded-full border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-slate-400 hover:bg-slate-100"
              >
                התחברות
              </Link>
            )}
            <Link
              href="/listings/new"
              className="rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800"
            >
              פרסמו דירה/סאבלט
            </Link>
          </div>
        </nav>
      </header>

      <main>
        {params.status === "listing-created" ? (
          <section className="mx-auto w-full max-w-6xl px-4 pt-6 sm:px-6">
            <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-800">
              המודעה פורסמה בהצלחה!
            </div>
          </section>
        ) : null}

        <section className="mx-auto w-full max-w-6xl px-4 pb-10 pt-10 sm:px-6 sm:pt-14">
          <div className="overflow-hidden rounded-3xl border border-slate-200 bg-gradient-to-br from-slate-950 via-slate-900 to-cyan-900 p-6 text-white shadow-2xl sm:p-10">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-medium tracking-wide text-cyan-100">
              <Star className="h-3.5 w-3.5 fill-cyan-200 text-cyan-200" />
              אמון של מטיילים ישראלים ברחבי העולם
            </div>
            <h1 className="max-w-3xl text-3xl font-semibold leading-tight tracking-tight sm:text-5xl">
              הפסיקו לגלול בוואטסאפ - מצאו בית בטיול הגדול
            </h1>
            <p className="mt-4 max-w-2xl text-sm text-slate-200 sm:text-base">
              גלו שותפים מאומתים, דירות מדויקות וחיבורים מעולים לטיול הבא שלכם
              בחיפוש אחד פשוט.
            </p>

            <div className="mt-8 grid gap-3 rounded-2xl border border-white/15 bg-white/10 p-3 backdrop-blur-sm sm:grid-cols-[1fr_1fr_auto] sm:gap-2 sm:p-4">
              <label className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/10 px-4 py-3">
                <MapPin className="h-4 w-4 text-cyan-200" />
                <input
                  type="text"
                  placeholder="יעד"
                  className="w-full bg-transparent text-sm text-white placeholder:text-slate-300 focus:outline-none"
                />
              </label>
              <label className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/10 px-4 py-3">
                <CalendarDays className="h-4 w-4 text-cyan-200" />
                <input
                  type="text"
                  placeholder="תאריכים"
                  className="w-full bg-transparent text-sm text-white placeholder:text-slate-300 focus:outline-none"
                />
              </label>
              <button className="inline-flex items-center justify-center gap-2 rounded-xl bg-cyan-400 px-5 py-3 text-sm font-semibold text-slate-900 transition hover:bg-cyan-300">
                <Search className="h-4 w-4" />
                חיפוש
              </button>
            </div>
          </div>
        </section>

        <section className="mx-auto w-full max-w-6xl px-4 pb-14 sm:px-6">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-semibold tracking-tight">
                דירות מובילות
              </h2>
              <p className="mt-1 text-sm text-slate-600">
                מקומות מעולים עם וייב טוב ושותפים איכותיים.
              </p>
            </div>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {featuredListings.map((listing) => (
              <article
                key={listing.id}
                className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="relative">
                  <img
                    src={listing.imageUrl}
                    alt={listing.city}
                    className="h-52 w-full object-cover transition duration-500 group-hover:scale-105"
                  />
                  <span className="absolute right-3 top-3 inline-flex items-center gap-1 rounded-full bg-slate-900/80 px-3 py-1 text-xs font-semibold text-white backdrop-blur">
                    <Users className="h-3.5 w-3.5" />
                    חסרים {listing.roommatesNeeded} שותפים
                  </span>
                </div>
                <div className="space-y-3 p-4">
                  <h3 className="text-base font-semibold">{listing.city}</h3>
                  <div className="space-y-1 text-sm text-slate-600">
                    <p className="flex items-center gap-2">
                      <CalendarDays className="h-4 w-4 text-slate-400" />
                      {listing.dateRange}
                    </p>
                    <p className="font-semibold text-slate-900">{listing.price}</p>
                  </div>
                  <button className="w-full rounded-xl border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-slate-300 hover:bg-slate-100">
                    לפרטים נוספים
                  </button>
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
