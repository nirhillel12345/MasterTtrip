"use client";

import dynamic from "next/dynamic";
import { LayoutList, Map, MapPin, Plus } from "lucide-react";
import Link from "next/link";
import { useMemo, useState } from "react";
import type { HomeFeedListings, HomeListingListItem } from "@/lib/home-listings";
import { ListingCard } from "@/app/components/listing-card";

const HomeMapLeaflet = dynamic(
  () => import("@/app/components/home-map-leaflet").then((m) => m.HomeMapLeaflet),
  {
    ssr: false,
    loading: () => (
      <div className="h-[min(70vh,560px)] w-full animate-pulse rounded-2xl border border-slate-200 bg-slate-100" />
    ),
  },
);

type Props = {
  feed: HomeFeedListings;
  hasActiveFilters: boolean;
};

function ListingGrid({ items }: { items: HomeListingListItem[] }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
      {items.map((listing) => (
        <ListingCard
          key={listing.id}
          id={listing.id}
          title={listing.title}
          location={listing.location}
          price={listing.price}
          type={listing.type}
          images={listing.images}
        />
      ))}
    </div>
  );
}

export function HomeListingsClient({ feed, hasActiveFilters }: Props) {
  const [mode, setMode] = useState<"list" | "map">("list");

  const { exact, flexible, usedDateFilter, suggestFlexibleMessaging } = feed;

  const totalCount = exact.length + flexible.length;

  const mapListings = useMemo(() => [...exact, ...flexible], [exact, flexible]);

  const listModeContent = usedDateFilter ? (
    <div className="space-y-10">
      {suggestFlexibleMessaging ? (
        <div className="rounded-xl border border-amber-200/90 bg-amber-50 px-4 py-3 text-right text-sm font-medium text-amber-950 shadow-sm">
          לא מצאנו בתאריכים המדוייקים שחיפשת , אבל מצאנו בשבילך תאריכים קרובים
        </div>
      ) : null}

      {exact.length > 0 ? (
        <section className="text-right" aria-labelledby="home-exact-heading">
          <h3
            id="home-exact-heading"
            className="mb-4 text-lg font-semibold tracking-tight text-slate-900 sm:text-xl"
          >
            Exact Matches
          </h3>
          <ListingGrid items={exact} />
        </section>
      ) : null}

      {flexible.length > 0 ? (
        <section className="text-right" aria-labelledby="home-flex-heading">
          <h3
            id="home-flex-heading"
            className={`mb-4 text-lg font-semibold tracking-tight text-slate-900 sm:text-xl ${
              exact.length > 0 ? "pt-2" : ""
            }`}
          >
            Flexible Dates
          </h3>
          <ListingGrid items={flexible} />
        </section>
      ) : null}
    </div>
  ) : (
    <ListingGrid items={exact} />
  );

  return (
    <>
      <div className="mb-6 flex flex-col gap-4 sm:mb-8 sm:flex-row sm:items-end sm:justify-between">
        <div className="text-right">
          <h2 className="text-xl font-semibold tracking-tight text-slate-900 sm:text-2xl">מודעות אחרונות</h2>
          <p className="mt-1.5 text-sm leading-relaxed text-slate-600">דירות וסאבלטים פנויים שפורסמו לאחרונה.</p>
        </div>
        <div className="flex flex-col items-stretch gap-2 sm:items-end">
          {totalCount > 0 ? (
            <p className="text-right text-sm font-medium text-slate-500">{totalCount} מודעות</p>
          ) : null}
          {totalCount > 0 ? (
            <div
              className="inline-flex rounded-full border border-slate-200/90 bg-slate-100/90 p-1 shadow-inner ring-1 ring-slate-200/50"
              role="group"
              aria-label="בחירת תצוגה"
              dir="rtl"
            >
              <button
                type="button"
                onClick={() => setMode("list")}
                className={`inline-flex items-center justify-center gap-1.5 rounded-full px-3 py-2 text-xs font-bold transition sm:px-4 sm:text-sm ${
                  mode === "list"
                    ? "bg-white text-slate-900 shadow-sm ring-1 ring-slate-200/80"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                <LayoutList className="h-4 w-4 shrink-0" aria-hidden />
                תצוגת רשימה
              </button>
              <button
                type="button"
                onClick={() => setMode("map")}
                className={`inline-flex items-center justify-center gap-1.5 rounded-full px-3 py-2 text-xs font-bold transition sm:px-4 sm:text-sm ${
                  mode === "map"
                    ? "bg-white text-slate-900 shadow-sm ring-1 ring-slate-200/80"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                <Map className="h-4 w-4 shrink-0" aria-hidden />
                תצוגת מפה
              </button>
            </div>
          ) : null}
        </div>
      </div>

      {totalCount === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-white/90 px-5 py-14 text-center shadow-inner sm:rounded-3xl sm:px-8 sm:py-16">
          <div className="rounded-2xl bg-slate-100 p-4">
            <MapPin className="h-10 w-10 text-slate-400" />
          </div>
          <h3 className="mt-6 text-lg font-semibold text-slate-900 sm:text-xl">
            {hasActiveFilters ? "לא נמצאו מודעות" : "עדיין אין מודעות"}
          </h3>
          <p className="mt-2 max-w-md text-sm leading-relaxed text-slate-600">
            {hasActiveFilters
              ? feed.usedDateFilter
                ? "לא נמצאו התאמות מדויקות או גמישות לטווח התאריכים. נסו טווח אחר או נקו את הסינון."
                : "נסו לשנות את הסינון או לנקות את המסננים."
              : "היו הראשונים לפרסם — ועזרו למטיילים אחרים למצוא בית בטיול הגדול."}
          </p>
          <Link
            href="/listings/new"
            className="mt-8 inline-flex min-h-[48px] items-center gap-2 rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white shadow-md transition hover:bg-slate-800 active:scale-[0.98] active:bg-slate-900"
          >
            <Plus className="h-4 w-4" />
            {hasActiveFilters ? "פרסמו דירה/סאבלט" : "פרסמו את המודעה הראשונה"}
          </Link>
        </div>
      ) : mode === "list" ? (
        listModeContent
      ) : (
        <HomeMapLeaflet listings={mapListings} />
      )}
    </>
  );
}
