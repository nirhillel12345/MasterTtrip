"use client";

import { PenSquare, Van } from "lucide-react";
import { useState } from "react";
import { ListingForm } from "@/app/listings/new/listing-form";
import { TransportForm } from "@/app/transports/new/transport-form";

export function CreateSwitcher() {
  const [tab, setTab] = useState<"apartment" | "ride">("apartment");

  return (
    <div className="max-w-full overflow-x-hidden rounded-3xl border border-slate-200 bg-white p-6 shadow-xl shadow-slate-200/60 sm:p-8">
      <div className="mb-4 flex justify-end">
        <div className="inline-flex rounded-full border border-slate-200 bg-slate-100 p-1">
          <button
            type="button"
            onClick={() => setTab("apartment")}
            className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold transition sm:px-4 sm:text-sm ${
              tab === "apartment" ? "bg-white text-slate-900 shadow-sm" : "text-slate-600"
            }`}
          >
            <PenSquare className="h-4 w-4" />
            פרסום דירה
          </button>
          <button
            type="button"
            onClick={() => setTab("ride")}
            className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold transition sm:px-4 sm:text-sm ${
              tab === "ride" ? "bg-white text-slate-900 shadow-sm" : "text-slate-600"
            }`}
          >
            <Van className="h-4 w-4" />
            פרסום נסיעה
          </button>
        </div>
      </div>

      <div className="text-right">
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
          {tab === "apartment" ? "פרסמו דירה/סאבלט" : "פרסום נסיעה / שאטל"}
        </h1>
        <p className="mt-2 text-sm text-slate-600">
          {tab === "apartment"
            ? "טופס מהיר למציאת שותפים ישראלים לטיול הגדול."
            : "צרו נסיעה חדשה, הגדירו מקומות ומחיר, ואפשרו למטיילים להצטרף."}
        </p>
      </div>

      {/* key remount resets form state when switching tabs */}
      <div key={tab}>{tab === "apartment" ? <ListingForm mode="create" /> : <TransportForm />}</div>
    </div>
  );
}
