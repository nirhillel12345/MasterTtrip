import { Suspense } from "react";
import { HomeHero } from "@/app/components/home-hero";

export function DashboardFeed({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Suspense
        fallback={
          <div className="mx-auto h-52 max-w-6xl animate-pulse rounded-2xl bg-slate-200/80 px-4 sm:px-6" />
        }
      >
        <HomeHero variant="app" />
      </Suspense>
      {children}
    </>
  );
}
