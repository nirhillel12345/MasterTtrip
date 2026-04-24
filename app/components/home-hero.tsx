"use client";

import { DestinationCombobox } from "@/app/components/destination-combobox";
import {
  ISO_DAY,
  ListingDateRangeFields,
  addOneLocalDay,
} from "@/app/components/listing-date-range-fields";
import { isAllowedDestination } from "@/lib/travel-destinations";
import { Search, SlidersHorizontal, Star } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState, useTransition } from "react";

export function HomeHero() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [pending, startTransition] = useTransition();

  const modeParam = (searchParams.get("mode") as "listings" | "transports") || "listings";
  const cityParam = searchParams.get("city") ?? "";
  const dateFromParam = searchParams.get("from") ?? "";
  const dateToParam = searchParams.get("to") ?? "";
  const originParam = searchParams.get("origin") ?? "";
  const destinationParam = searchParams.get("destination") ?? "";
  const transportDateParam = searchParams.get("date") ?? "";
  const pickupTimeParam = searchParams.get("time") ?? "";

  const [mode, setMode] = useState<"listings" | "transports">(modeParam);
  const [city, setCity] = useState(cityParam);
  const [dateFrom, setDateFrom] = useState(dateFromParam);
  const [dateTo, setDateTo] = useState(dateToParam);
  const [origin, setOrigin] = useState(originParam);
  const [destination, setDestination] = useState(destinationParam);
  const [transportDate, setTransportDate] = useState(transportDateParam);
  const [pickupTime, setPickupTime] = useState(pickupTimeParam);

  useEffect(() => {
    setMode(modeParam);
    setCity(cityParam);
    setDateFrom(dateFromParam);
    setDateTo(dateToParam);
    setOrigin(originParam);
    setDestination(destinationParam);
    setTransportDate(transportDateParam);
    setPickupTime(pickupTimeParam);
  }, [modeParam, cityParam, dateFromParam, dateToParam, originParam, destinationParam, transportDateParam, pickupTimeParam]);

  const replaceUrl = useCallback(
    (patch: Record<string, string>) => {
      startTransition(() => {
        const params = new URLSearchParams(searchParams.toString());
        Object.entries(patch).forEach(([k, v]) => {
          if (v === "" || v == null) params.delete(k);
          else params.set(k, v);
        });
        const s = params.toString();
        router.replace(s ? `/?${s}` : "/", { scroll: false });
      });
    },
    [router, searchParams],
  );

  const applyFilters = useCallback(() => {
    if (mode === "transports") {
      const o = origin.trim();
      const d = destination.trim();
      const safeOrigin = !o || isAllowedDestination(o) ? o : "";
      const safeDestination = !d || isAllowedDestination(d) ? d : "";
      if (o && !isAllowedDestination(o)) setOrigin("");
      if (d && !isAllowedDestination(d)) setDestination("");

      const td = transportDate.trim().slice(0, 10);
      const pt = pickupTime.trim().slice(0, 5);
      const params = new URLSearchParams();
      if (safeOrigin) params.set("origin", safeOrigin);
      if (safeDestination) params.set("destination", safeDestination);
      if (ISO_DAY.test(td)) params.set("date", td);
      if (/^\d{2}:\d{2}$/.test(pt)) params.set("time", pt);
      const s = params.toString();
      startTransition(() => {
        router.push(s ? `/transports?${s}` : "/transports");
      });
      return;
    }

    const c = city.trim();
    const safeCity = !c || isAllowedDestination(c) ? c : "";
    if (c && !isAllowedDestination(c)) setCity("");
    const df = dateFrom.trim().slice(0, 10);
    const dt = dateTo.trim().slice(0, 10);
    const patch: Record<string, string> = {
      mode: "listings",
      city: safeCity,
      min: "",
      max: "",
      origin: "",
      destination: "",
      date: "",
      time: "",
    };
    if (ISO_DAY.test(df) && ISO_DAY.test(dt)) {
      patch.from = df;
      patch.to = dt < df ? addOneLocalDay(df) : dt;
    } else {
      patch.from = "";
      patch.to = "";
    }

    replaceUrl(patch);
  }, [replaceUrl, mode, city, dateFrom, dateTo, origin, destination, transportDate, pickupTime, router]);

  const setLocationFilter = useCallback(
    (next: string) => {
      const trimmed = next.trim();
      setCity(trimmed);
      const df = dateFrom.trim().slice(0, 10);
      const dt = dateTo.trim().slice(0, 10);
      const patch: Record<string, string> = {
        mode: "listings",
        city: trimmed,
        min: "",
        max: "",
        origin: "",
        destination: "",
        date: "",
        time: "",
      };
      if (ISO_DAY.test(df) && ISO_DAY.test(dt)) {
        patch.from = df;
        patch.to = dt < df ? addOneLocalDay(df) : dt;
      }

      replaceUrl(patch);
    },
    [replaceUrl, dateFrom, dateTo],
  );

  const clearFilters = useCallback(() => {
    setMode("listings");
    setCity("");
    setDateFrom("");
    setDateTo("");
    setOrigin("");
    setDestination("");
    setTransportDate("");
    setPickupTime("");
    startTransition(() => {
      const params = new URLSearchParams(searchParams.toString());
      ["mode", "type", "city", "min", "max", "from", "to", "origin", "destination", "date", "time"].forEach((k) =>
        params.delete(k),
      );
      const s = params.toString();
      router.replace(s ? `/?${s}` : "/", { scroll: false });
    });
  }, [router, searchParams]);

  return (
    <section className="mx-auto w-full max-w-6xl px-4 pb-8 pt-8 sm:px-6 sm:pb-10 sm:pt-12">
      <div className="rounded-2xl border border-slate-200 bg-gradient-to-br from-slate-950 via-slate-900 to-cyan-900 p-5 text-right text-white shadow-2xl shadow-slate-900/20 sm:rounded-3xl sm:p-8 md:p-10">
        <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 text-xs font-medium tracking-wide text-cyan-100 sm:mb-6">
          <Star className="h-3.5 w-3.5 fill-cyan-200 text-cyan-200" />
          אמון של מטיילים ישראלים ברחבי העולם
        </div>
        <h1 className="max-w-3xl text-2xl font-semibold leading-snug tracking-tight sm:text-4xl md:text-5xl">
          הפסיקו לגלול בוואטסאפ - מצאו בית בטיול הגדול
        </h1>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-slate-200 sm:mt-4 sm:text-base">
          גלו שותפים מאומתים, דירות מדויקות וחיבורים מעולים לטיול הבא שלכם בחיפוש אחד פשוט.
        </p>

        <div
          className={`mt-6 sm:mt-8 ${pending ? "opacity-90" : ""} transition-opacity duration-200`}
          dir="rtl"
        >
          <div className="rounded-2xl border border-white/20 bg-white/[0.97] p-4 text-slate-900 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.35)] ring-1 ring-white/40 backdrop-blur-md sm:p-5 md:p-6">
            <div className="mb-4 flex items-center justify-end gap-2 border-b border-slate-100 pb-3">
              <h2 className="text-sm font-bold text-slate-800 sm:text-base">
                {mode === "listings" ? "חיפוש מודעות" : "חיפוש נסיעות ושאטלים"}
              </h2>
              <SlidersHorizontal className="h-4 w-4 text-cyan-600 sm:h-5 sm:w-5" />
            </div>

            <div className="mb-4 flex justify-end border-b border-slate-100 pb-3">
              <div className="inline-flex rounded-full border border-slate-200 bg-slate-100 p-1">
                <button
                  type="button"
                  onClick={() => setMode("listings")}
                  className={`rounded-full px-3 py-1.5 text-xs font-semibold transition sm:px-4 sm:text-sm ${
                    mode === "listings" ? "bg-white text-slate-900 shadow-sm" : "text-slate-600"
                  }`}
                >
                  דירות
                </button>
                <button
                  type="button"
                  onClick={() => setMode("transports")}
                  className={`rounded-full px-3 py-1.5 text-xs font-semibold transition sm:px-4 sm:text-sm ${
                    mode === "transports" ? "bg-white text-slate-900 shadow-sm" : "text-slate-600"
                  }`}
                >
                  נסיעות ושאטלים
                </button>
              </div>
            </div>

            <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:gap-3 xl:gap-4">
              {mode === "listings" ? (
                <>
                  <div className="min-w-0 flex-1 text-right">
                    <span className="mb-1.5 block text-xs font-semibold text-slate-600 sm:text-sm">יעד</span>
                    <DestinationCombobox
                      value={city}
                      onChange={setLocationFilter}
                      typingClearsValue={false}
                      showLabel={false}
                      triggerClassName="px-3 py-2.5 sm:py-3"
                    />
                  </div>

                  <ListingDateRangeFields
                    variant="toolbar"
                    className="w-full min-w-0 lg:w-auto lg:max-w-[min(100%,22rem)] xl:max-w-[24rem]"
                    startDate={dateFrom}
                    endDate={dateTo}
                    onChange={({ startDate, endDate }) => {
                      setDateFrom(startDate);
                      setDateTo(endDate);
                    }}
                    onEnterSubmit={applyFilters}
                  />
                </>
              ) : (
                <>
                  <div className="min-w-0 flex-1 text-right">
                    <span className="mb-1.5 block text-xs font-semibold text-slate-600 sm:text-sm">מוצא</span>
                    <DestinationCombobox
                      value={origin}
                      onChange={setOrigin}
                      typingClearsValue={false}
                      showLabel={false}
                      triggerClassName="px-3 py-2.5 sm:py-3"
                    />
                  </div>
                  <div className="min-w-0 flex-1 text-right">
                    <span className="mb-1.5 block text-xs font-semibold text-slate-600 sm:text-sm">יעד</span>
                    <DestinationCombobox
                      value={destination}
                      onChange={setDestination}
                      typingClearsValue={false}
                      showLabel={false}
                      triggerClassName="px-3 py-2.5 sm:py-3"
                    />
                  </div>
                  <label className="block min-w-0 text-right">
                    <span className="mb-1.5 block text-xs font-semibold text-slate-600 sm:text-sm">תאריך</span>
                    <input
                      type="date"
                      value={transportDate}
                      onChange={(e) => setTransportDate(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          applyFilters();
                        }
                      }}
                      className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-sm outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200 sm:py-3"
                      dir="ltr"
                    />
                  </label>
                  <label className="block min-w-0 text-right">
                    <span className="mb-1.5 block text-xs font-semibold text-slate-600 sm:text-sm">שעת איסוף</span>
                    <input
                      type="time"
                      value={pickupTime}
                      onChange={(e) => setPickupTime(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          applyFilters();
                        }
                      }}
                      className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-sm outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200 sm:py-3"
                      dir="ltr"
                    />
                  </label>
                </>
              )}

              <div className="flex w-full shrink-0 flex-col gap-2 lg:w-auto lg:justify-end">
                <button
                  type="button"
                  onClick={applyFilters}
                  className="inline-flex min-h-[48px] w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-l from-cyan-500 to-cyan-400 px-5 py-3 text-sm font-bold text-slate-900 shadow-lg shadow-cyan-900/20 transition hover:from-cyan-400 hover:to-cyan-300 active:scale-[0.98] lg:min-h-[46px] lg:w-auto lg:px-6"
                >
                  <Search className="h-4 w-4 shrink-0" aria-hidden />
                  חיפוש
                </button>
              </div>
            </div>

            <div className="mt-4 flex justify-end border-t border-slate-100 pt-3">
              <button
                type="button"
                onClick={clearFilters}
                className="rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-xs font-semibold text-slate-600 transition hover:bg-slate-100 active:scale-[0.98] sm:text-sm"
              >
                נקה סינונים
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
