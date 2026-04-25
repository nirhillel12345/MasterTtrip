"use client";

import dynamic from "next/dynamic";
import { Bus, CalendarDays, Clock3, LayoutList, Map, MapPin, Plus, Users } from "lucide-react";
import Link from "next/link";
import { useMemo, useState } from "react";
import type { HomeFeedListings, HomeListingListItem } from "@/lib/home-listings";
import type { HomeTransportListItem } from "@/lib/home-transports";
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
  transports: HomeTransportListItem[];
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

function formatPrice(n: number) {
  return `${n.toLocaleString("he-IL")} ₪`;
}

function formatHebrewDate(d: Date) {
  return new Intl.DateTimeFormat("he-IL", { day: "numeric", month: "long", year: "numeric" }).format(d);
}

function formatTime(d: Date) {
  const hh = String(d.getUTCHours()).padStart(2, "0");
  const mm = String(d.getUTCMinutes()).padStart(2, "0");
  return `${hh}:${mm}`;
}

function TransportGrid({ items }: { items: HomeTransportListItem[] }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
      {items.map((ride) => (
        <Link
          key={ride.id}
          href={`/transports/${ride.id}`}
          className="rounded-2xl border border-slate-200 bg-white p-5 text-right shadow-sm transition hover:-translate-y-0.5 hover:shadow-md active:scale-[0.99]"
        >
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">נסיעה משותפת</p>
          <h3 className="mt-2 text-lg font-bold text-slate-900">
            {ride.origin} ← {ride.destination}
          </h3>
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
            <span className="text-sm text-slate-500">מפרסם: {ride.creatorName}</span>
            <span className="text-base font-bold text-slate-900">{formatPrice(ride.pricePerPerson)}</span>
          </div>
        </Link>
      ))}
    </div>
  );
}

export function HomeListingsClient({ feed, transports, hasActiveFilters }: Props) {
  const [mode, setMode] = useState<"apartments" | "transports" | "map">("apartments");

  const { exact, flexible, usedDateFilter, suggestFlexibleMessaging } = feed;

  const totalCount = exact.length + flexible.length;
  const transportCount = transports.length;

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
          <p className="mt-1.5 text-sm leading-relaxed text-slate-600">
            דירות, סאבלטים והסעות לקהילת המטיילים.
          </p>
        </div>
        <div className="flex flex-col items-stretch gap-2 sm:items-end">
          <p className="text-right text-sm font-medium text-slate-500">
            {totalCount} דירות · {transportCount} הסעות
          </p>
        </div>
      </div>

      <div className="sticky top-[68px] z-10 mb-5 rounded-2xl border border-slate-200/90 bg-white/95 p-2 shadow-sm backdrop-blur supports-[backdrop-filter]:bg-white/85 sm:top-[74px]">
        <div className="grid grid-cols-3 gap-2" role="tablist" aria-label="בחירת תצוגת תוצאות">
          <button
            type="button"
            onClick={() => setMode("apartments")}
            className={`inline-flex min-h-[42px] items-center justify-center gap-1.5 rounded-xl px-2 py-2 text-xs font-bold transition sm:text-sm ${
              mode === "apartments"
                ? "bg-slate-900 text-cyan-200 shadow-sm"
                : "bg-slate-100 text-slate-700 hover:bg-slate-200"
            }`}
          >
            <LayoutList className="h-4 w-4 shrink-0" />
            רשימת דירות
          </button>
          <button
            type="button"
            onClick={() => setMode("transports")}
            className={`inline-flex min-h-[42px] items-center justify-center gap-1.5 rounded-xl px-2 py-2 text-xs font-bold transition sm:text-sm ${
              mode === "transports"
                ? "bg-slate-900 text-cyan-200 shadow-sm"
                : "bg-slate-100 text-slate-700 hover:bg-slate-200"
            }`}
          >
            <Bus className="h-4 w-4 shrink-0" />
            רשימת הסעות
          </button>
          <button
            type="button"
            onClick={() => setMode("map")}
            className={`inline-flex min-h-[42px] items-center justify-center gap-1.5 rounded-xl px-2 py-2 text-xs font-bold transition sm:text-sm ${
              mode === "map"
                ? "bg-slate-900 text-cyan-200 shadow-sm"
                : "bg-slate-100 text-slate-700 hover:bg-slate-200"
            }`}
          >
            <Map className="h-4 w-4 shrink-0" />
            תצוגת מפה
          </button>
        </div>
      </div>

      {mode === "apartments" && totalCount === 0 ? (
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
      ) : mode === "apartments" ? (
        <div className="min-h-[340px] transition-opacity duration-200">{listModeContent}</div>
      ) : mode === "transports" ? (
        <div className="min-h-[340px] transition-opacity duration-200">
          {transportCount > 0 ? (
            <TransportGrid items={transports} />
          ) : (
            <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-14 text-center shadow-inner">
              <Bus className="mx-auto h-10 w-10 text-slate-400" />
              <h3 className="mt-4 text-lg font-semibold text-slate-900">עדיין אין הסעות</h3>
              <p className="mt-2 text-sm text-slate-600">היו הראשונים לפרסם הסעה ולעזור לקהילה להגיע בקלות.</p>
              <Link
                href="/transports/new"
                className="mt-6 inline-flex min-h-[44px] items-center gap-2 rounded-full bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white shadow-md transition hover:bg-slate-800"
              >
                <Plus className="h-4 w-4" />
                פרסום נסיעה
              </Link>
            </div>
          )}
        </div>
      ) : (
        <div className="min-h-[340px] transition-opacity duration-200">
          <HomeMapLeaflet listings={mapListings} />
        </div>
      )}
    </>
  );
}
