"use client";

import { CalendarDays } from "lucide-react";

export const ISO_DAY = /^\d{4}-\d{2}-\d{2}$/;

export function localISODate(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

export function addOneLocalDay(iso: string): string {
  const [y, mo, da] = iso.split("-").map(Number);
  const dt = new Date(y, mo - 1, da);
  dt.setDate(dt.getDate() + 1);
  return localISODate(dt);
}

export type ListingDateRangeValue = { startDate: string; endDate: string };

type Props = {
  startDate: string;
  endDate: string;
  onChange: (value: ListingDateRangeValue) => void;
  /** Listing form vs home search bar (spacing / label size) */
  variant?: "form" | "toolbar";
  onEnterSubmit?: () => void;
  className?: string;
};

export function ListingDateRangeFields({
  startDate,
  endDate,
  onChange,
  variant = "form",
  onEnterSubmit,
  className = "",
}: Props) {
  function handleStartChange(value: string) {
    let nextEnd = endDate;
    if (!nextEnd || nextEnd < value) nextEnd = addOneLocalDay(value);
    onChange({ startDate: value, endDate: nextEnd });
  }

  function handleEndChange(value: string) {
    if (value < startDate) {
      onChange({ startDate, endDate: addOneLocalDay(startDate) });
    } else {
      onChange({ startDate, endDate: value });
    }
  }

  const labelClass =
    variant === "form"
      ? "mb-1 block text-sm font-medium text-slate-700"
      : "mb-1.5 block text-right text-xs font-semibold text-slate-600 sm:text-sm";

  const shellClass =
    variant === "form"
      ? "flex items-center gap-2 rounded-xl border border-slate-300 px-4 py-3 focus-within:border-cyan-500 focus-within:ring-2 focus-within:ring-cyan-200"
      : "flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-3 py-2.5 focus-within:border-cyan-500 focus-within:ring-2 focus-within:ring-cyan-200 sm:py-3";

  const inputClass =
    variant === "form" ? "w-full text-sm outline-none" : "min-w-0 flex-1 text-sm outline-none";

  const gridClass =
    variant === "form"
      ? "grid gap-4 sm:grid-cols-2"
      : "grid min-w-0 grid-cols-2 gap-2 sm:gap-3";

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && onEnterSubmit) {
      e.preventDefault();
      onEnterSubmit();
    }
  };

  return (
    <div className={`${gridClass} ${className}`.trim()}>
      <label className="block min-w-0 text-right">
        <span className={labelClass}>תאריך התחלה</span>
        <div className={shellClass}>
          <CalendarDays className="h-4 w-4 shrink-0 text-slate-400" aria-hidden />
          <input
            type="date"
            required={variant === "form"}
            value={startDate}
            onChange={(e) => handleStartChange(e.target.value)}
            onKeyDown={onKeyDown}
            className={inputClass}
            dir="ltr"
          />
        </div>
      </label>
      <label className="block min-w-0 text-right">
        <span className={labelClass}>תאריך סיום</span>
        <div className={shellClass}>
          <CalendarDays className="h-4 w-4 shrink-0 text-slate-400" aria-hidden />
          <input
            type="date"
            required={variant === "form"}
            value={endDate}
            min={startDate || undefined}
            onChange={(e) => handleEndChange(e.target.value)}
            onKeyDown={onKeyDown}
            className={inputClass}
            dir="ltr"
          />
        </div>
      </label>
    </div>
  );
}
