"use client";

import { Check, ChevronDown, MapPin } from "lucide-react";
import { useEffect, useId, useMemo, useRef, useState } from "react";
import { filterDestinations, POPULAR_DESTINATIONS } from "@/lib/travel-destinations";

type Props = {
  value: string;
  onChange: (value: string) => void;
  error?: string;
};

export function DestinationCombobox({ value, onChange, error }: Props) {
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

  function selectDestination(dest: string) {
    onChange(dest);
    setQuery(dest);
    setOpen(false);
  }

  return (
    <div className="relative block" ref={containerRef}>
      <span className="mb-1 block text-sm font-medium text-slate-700">עיר/מיקום</span>
      <div
        className={`flex items-center gap-2 rounded-xl border px-4 py-3 transition focus-within:ring-2 focus-within:ring-cyan-200 ${
          error ? "border-rose-400 focus-within:border-rose-500" : "border-slate-300 focus-within:border-cyan-500"
        }`}
      >
        <MapPin className="h-4 w-4 shrink-0 text-slate-400" />
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
            onChange("");
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
          placeholder="הקלידו לחיפוש או בחרו מהרשימה"
          className="w-full text-sm outline-none placeholder:text-slate-400"
          autoComplete="off"
        />
        <ChevronDown className={`h-4 w-4 shrink-0 text-slate-400 transition ${open ? "rotate-180" : ""}`} />
      </div>

      {open && (
        <ul
          id={listId}
          role="listbox"
          className="absolute z-30 mt-1 max-h-56 w-full overflow-auto rounded-xl border border-slate-200 bg-white py-1 shadow-lg"
        >
          {filtered.length === 0 && query.trim() ? (
            <li className="px-3 py-3 text-sm text-slate-500">לא נמצאו תוצאות — נסו מילה אחרת</li>
          ) : (
            (filtered.length ? filtered : [...POPULAR_DESTINATIONS]).map((dest) => (
              <li key={dest} role="option" aria-selected={value === dest}>
                <button
                  type="button"
                  className="flex w-full items-center justify-between gap-2 px-3 py-2.5 text-right text-sm text-slate-800 hover:bg-slate-50"
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={() => selectDestination(dest)}
                >
                  <span className="flex-1">{dest}</span>
                  {value === dest ? <Check className="h-4 w-4 shrink-0 text-emerald-600" /> : null}
                </button>
              </li>
            ))
          )}
        </ul>
      )}

      {error ? <p className="mt-1.5 text-sm text-rose-600">{error}</p> : null}
    </div>
  );
}
