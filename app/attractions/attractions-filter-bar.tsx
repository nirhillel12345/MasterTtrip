"use client";

import { FilterX } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
import { DestinationCombobox } from "@/app/components/destination-combobox";
import type { AttractionType } from "@/generated/prisma";

type Props = {
  initialDestination: string;
  initialType: "ALL" | AttractionType;
};

export function AttractionsFilterBar({ initialDestination, initialType }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [destination, setDestination] = useState(initialDestination);
  const [type, setType] = useState<"ALL" | AttractionType>(initialType);

  const hasFilters = useMemo(() => Boolean(destination || type !== "ALL"), [destination, type]);

  function updateParams(next: { destination: string; type: "ALL" | AttractionType }) {
    const params = new URLSearchParams(searchParams.toString());
    if (next.destination) params.set("destination", next.destination);
    else params.delete("destination");

    if (next.type !== "ALL") params.set("type", next.type);
    else params.delete("type");

    const href = params.toString() ? `${pathname}?${params.toString()}` : pathname;
    router.push(href);
  }

  return (
    <section className="mb-6 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
      <div className="grid gap-3 sm:grid-cols-[minmax(0,1fr)_260px_auto] sm:items-end">
        <DestinationCombobox
          value={destination}
          onChange={(value) => {
            setDestination(value);
            updateParams({ destination: value, type });
          }}
          showLabel={false}
          typingClearsValue={false}
          triggerClassName="px-3 py-3"
        />

        <div className="text-right">
          <span className="mb-1 block text-sm font-medium text-slate-700">סוג אטרקציה</span>
          <div className="flex gap-2 overflow-x-auto pb-1">
            {(
              [
                { id: "ALL", label: "הכול" },
                { id: "BUSINESS", label: "עסקי" },
                { id: "PRIVATE", label: "פרטי" },
              ] as const
            ).map((option) => (
              <button
                key={option.id}
                type="button"
                onClick={() => {
                  setType(option.id);
                  updateParams({ destination, type: option.id });
                }}
                className={`min-h-[44px] shrink-0 rounded-full border px-4 text-sm font-semibold transition ${
                  type === option.id
                    ? "border-cyan-400 bg-cyan-50 text-cyan-900"
                    : "border-slate-300 bg-white text-slate-700 hover:bg-slate-50"
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>

        <button
          type="button"
          disabled={!hasFilters}
          onClick={() => {
            setDestination("");
            setType("ALL");
            router.push(pathname);
          }}
          className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-xl border border-slate-300 px-3 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50"
        >
          <FilterX className="h-4 w-4" />
          נקה סינון
        </button>
      </div>
    </section>
  );
}
