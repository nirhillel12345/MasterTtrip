"use client";

import { useState, useTransition } from "react";
import { DestinationCombobox } from "@/app/components/destination-combobox";
import { localISODate } from "@/app/components/listing-date-range-fields";
import { createTransport } from "@/app/transports/actions";
import { isAllowedDestination } from "@/lib/travel-destinations";

export function TransportForm() {
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [date, setDate] = useState(localISODate(new Date()));
  const [pickupTime, setPickupTime] = useState("09:00");
  const [totalSeats, setTotalSeats] = useState("8");
  const [pricePerPerson, setPricePerPerson] = useState("");
  const [description, setDescription] = useState("");

  const [originError, setOriginError] = useState<string | undefined>();
  const [destinationError, setDestinationError] = useState<string | undefined>();

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setOriginError(undefined);
    setDestinationError(undefined);

    if (!isAllowedDestination(origin)) {
      setOriginError("יש לבחור מוצא מהרשימה.");
      return;
    }
    if (!isAllowedDestination(destination)) {
      setDestinationError("יש לבחור יעד מהרשימה.");
      return;
    }
    if (origin === destination) {
      setDestinationError("המוצא והיעד חייבים להיות שונים.");
      return;
    }

    startTransition(async () => {
      const res = await createTransport({
        origin,
        destination,
        date,
        pickupTime,
        totalSeats: Number(totalSeats),
        pricePerPerson: Number(pricePerPerson),
        description,
      });
      if (!res.ok) {
        setError(res.error);
      }
    });
  }

  return (
    <form onSubmit={onSubmit} className="max-w-full space-y-4 overflow-x-hidden">
      {error ? (
        <div className="rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
          {error}
        </div>
      ) : null}

      <div className="grid gap-4 sm:grid-cols-2">
        <DestinationCombobox value={origin} onChange={setOrigin} error={originError} />
        <DestinationCombobox value={destination} onChange={setDestination} error={destinationError} />
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        <label className="block w-full min-w-0 text-right">
          <span className="mb-1 block text-sm font-medium text-slate-700">תאריך נסיעה</span>
          <input
            type="date"
            required
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="box-border block w-full max-w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200"
            dir="ltr"
          />
        </label>
        <label className="block w-full min-w-0 text-right">
          <span className="mb-1 block text-sm font-medium text-slate-700">שעת איסוף</span>
          <input
            type="time"
            required
            value={pickupTime}
            onChange={(e) => setPickupTime(e.target.value)}
            className="box-border block w-full max-w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200"
            dir="ltr"
          />
        </label>
        <label className="block w-full min-w-0 text-right">
          <span className="mb-1 block text-sm font-medium text-slate-700">סה״כ מקומות</span>
          <input
            type="number"
            min="1"
            max="50"
            step="1"
            required
            value={totalSeats}
            onChange={(e) => setTotalSeats(e.target.value)}
            className="box-border block w-full max-w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200"
            dir="ltr"
          />
        </label>
        <label className="block w-full min-w-0 text-right">
          <span className="mb-1 block text-sm font-medium text-slate-700">מחיר למשתתף (₪)</span>
          <input
            type="number"
            min="0"
            step="0.01"
            required
            value={pricePerPerson}
            onChange={(e) => setPricePerPerson(e.target.value)}
            className="box-border block w-full max-w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200"
            dir="ltr"
          />
        </label>
      </div>

      <label className="block text-right">
        <span className="mb-1 block text-sm font-medium text-slate-700">תיאור</span>
        <textarea
          required
          minLength={5}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={4}
          placeholder="למשל: יוצאים בבוקר, מקום לציוד גדול, עדיפות לנקודת איסוף במרכז העיר."
          className="w-full resize-y rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none transition placeholder:text-slate-400 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200"
        />
      </label>

      <button
        type="submit"
        disabled={pending}
        className="inline-flex min-h-[48px] w-full items-center justify-center rounded-xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-70"
      >
        {pending ? "מפרסם נסיעה..." : "פרסום נסיעה"}
      </button>
    </form>
  );
}
