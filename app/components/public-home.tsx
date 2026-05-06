import { Suspense } from "react";
import { HomeHero } from "@/app/components/home-hero";
import { HowItWorks } from "@/app/components/how-it-works";

export function PublicHome({
  isSearching,
  children,
}: {
  isSearching: boolean;
  children: React.ReactNode;
}) {
  return (
    <>
      <Suspense
        fallback={
          <div className="mx-auto h-[28rem] max-w-6xl animate-pulse rounded-2xl bg-slate-200/80 px-4 sm:px-6" />
        }
      >
        <HomeHero variant="landing" />
      </Suspense>
      {!isSearching ? <HowItWorks /> : null}
      {children}
    </>
  );
}
