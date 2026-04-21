"use client";

import { Check, ChevronDown, MapPin } from "lucide-react";
import { useEffect, useId, useMemo, useRef, useState } from "react";
import { filterDestinations, POPULAR_DESTINATIONS } from "@/lib/travel-destinations";

type Props = {
  value: string;
  onChange: (value: string) => void;
  error?: string;
  /** When false, parent is only updated on picking a list item or when the input is cleared (home filters). Default true (listing form). */
  typingClearsValue?: boolean;
  /** Show the built-in field label. Default true. */
  showLabel?: boolean;
  /** Override trigger padding classes. Default `px-4 py-3` (listing form). */
  triggerClassName?: string;
};

export function DestinationCombobox({
  value,
  onChange,
  error,
  typingClearsValue = true,
  showLabel = true,
  triggerClassName = "",
}: Props) {
  const id = useId();
  const listId = `${id}-list`;
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState(value);
  const containerRef = useRef<HTMLDivElement>(null);

  const filtered = useMemo(() => filterDestinations(query), [query]);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (!containerRef.current?.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  /** When the menu closes or the committed value changes from outside, align the input with the selection. */
  useEffect(() => {
    if (!open) {
      setQuery(value);
    }
  }, [value, open]);

  function selectDestination(dest: string) {
    onChange(dest);
    setQuery(dest);
    setOpen(false);
  }

  const padding = triggerClassName.trim() || "px-4 py-3";
  const triggerBase =
    `flex w-full items-center gap-2 rounded-xl border bg-white transition focus-within:border-cyan-500 focus-within:ring-2 focus-within:ring-cyan-200 ${padding}`;

  return (
    <div className="relative block w-full" ref={containerRef}>
      {showLabel ? (
        <span className="mb-1 block text-right text-sm font-medium text-slate-700">עיר / מיקום</span>
      ) : null}
      <div
        className={`${triggerBase} ${
          error ? "border-rose-400 focus-within:border-rose-500" : "border-slate-300"
        }`.trim()}
      >
        <MapPin className="h-4 w-4 shrink-0 text-slate-400" aria-hidden />
        <input
          id={id}
          type="text"
          role="combobox"
          aria-expanded={open}
          aria-controls={listId}
          aria-autocomplete="list"
          value={query}
          onChange={(e) => {
            const v = e.target.value;
            setQuery(v);
            if (typingClearsValue) {
              onChange("");
            } else if (v.trim() === "") {
              onChange("");
            }
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
          placeholder="הקלידו לסינון או בחרו מהרשימה"
          className="w-full bg-transparent text-right text-sm outline-none placeholder:text-slate-400"
          autoComplete="off"
        />
        <ChevronDown className={`h-4 w-4 shrink-0 text-slate-400 transition ${open ? "rotate-180" : ""}`} aria-hidden />
      </div>

      {open ? (
        <ul
          id={listId}
          role="listbox"
          dir="rtl"
          className="absolute z-[100] mt-1 max-h-56 w-full overflow-auto rounded-xl border border-slate-200 bg-white py-1 text-right shadow-lg"
        >
          {filtered.length === 0 && query.trim() ? (
            <li className="px-3 py-3 text-sm text-slate-500">לא נמצאו תוצאות — נסו מילה אחרת</li>
          ) : (
            (filtered.length ? filtered : [...POPULAR_DESTINATIONS]).map((dest) => (
              <li key={dest} role="option" aria-selected={value === dest}>
                <button
                  type="button"
                  className="flex w-full items-center justify-start gap-2 px-3 py-2.5 text-sm text-slate-800 hover:bg-slate-50 active:bg-slate-100"
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={() => selectDestination(dest)}
                >
                  <span className="min-w-0 flex-1 truncate">{dest}</span>
                  {value === dest ? <Check className="h-4 w-4 shrink-0 text-emerald-600" aria-hidden /> : null}
                </button>
              </li>
            ))
          )}
        </ul>
      ) : null}

      {error ? (
        <p className="mt-1.5 text-right text-sm text-rose-600" dir="rtl">
          {error}
        </p>
      ) : null}
    </div>
  );
}
