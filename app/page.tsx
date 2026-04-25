import { Suspense } from "react";
import { AppNavbar } from "@/app/components/app-navbar";
import { HomeFeed } from "@/app/components/home-feed";
import { HomeFeedSkeleton } from "@/app/components/home-feed-skeleton";
import { HomeHero } from "@/app/components/home-hero";
import { HowItWorks } from "@/app/components/how-it-works";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { parseHomeFilters } from "@/lib/home-filters";

type HomePageProps = {
  searchParams?: Promise<Record<string, string | string[] | undefined>> | Record<string, string | string[] | undefined>;
};

async function resolveSearchParams(
  searchParams?: Promise<Record<string, string | string[] | undefined>> | Record<string, string | string[] | undefined>,
) {
  if (!searchParams) return {};
  if ("then" in searchParams) return await searchParams;
  return searchParams;
}

function suspenseKey(f: ReturnType<typeof parseHomeFilters>) {
  return [f.city, f.dateFrom, f.dateTo].join("|");
}

export default async function Home({ searchParams }: HomePageProps) {
  const raw = await resolveSearchParams(searchParams);
  const filters = parseHomeFilters(raw);
  const status = typeof raw.status === "string" ? raw.status : undefined;

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
    <div className="min-h-screen bg-slate-50 text-slate-900" dir="rtl">
      <AppNavbar
        user={
          user
            ? {
                displayName,
                avatar,
              }
            : null
        }
      />

      <main className="pb-6 sm:pb-8">
        {status === "listing-created" ? (
          <section className="mx-auto w-full max-w-6xl px-4 pt-5 sm:px-6 sm:pt-6">
            <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3.5 text-right text-sm font-medium text-emerald-800">
              המודעה פורסמה בהצלחה!
            </div>
          </section>
        ) : null}

        <Suspense fallback={<div className="mx-auto h-[28rem] max-w-6xl animate-pulse rounded-2xl bg-slate-200/80 px-4 sm:px-6" />}>
          <HomeHero />
        </Suspense>

        <HowItWorks />

        <section className="mx-auto w-full max-w-6xl px-4 pb-14 pt-2 sm:px-6 sm:pb-16 sm:pt-4">
          <Suspense key={suspenseKey(filters)} fallback={<HomeFeedSkeleton />}>
            <HomeFeed filters={filters} />
          </Suspense>
        </section>
      </main>
    </div>
  );
}
