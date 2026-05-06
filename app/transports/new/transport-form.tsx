"use client";

import { useState, useTransition } from "react";
import { DestinationCombobox } from "@/app/components/destination-combobox";
import { localISODate } from "@/app/components/listing-date-range-fields";
import { createTransport, updateTransport } from "@/app/transports/actions";
import { isAllowedDestination } from "@/lib/travel-destinations";

export type TransportFormInitialValues = {
  origin: string;
  destination: string;
  date: string;
  pickupTime: string;
  totalSeats: string;
  pricePerPerson: string;
  description: string;
};

type TransportFormProps = {
  /** When set with initialValues, form submits an update instead of create */
  editTransportId?: string;
  initialValues?: TransportFormInitialValues;
};

export function TransportForm({ editTransportId, initialValues }: TransportFormProps) {
  const isEdit = Boolean(editTransportId && initialValues);
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  const [origin, setOrigin] = useState(initialValues?.origin ?? "");
  const [destination, setDestination] = useState(initialValues?.destination ?? "");
  const [date, setDate] = useState(initialValues?.date ?? localISODate(new Date()));
  const [pickupTime, setPickupTime] = useState(initialValues?.pickupTime ?? "09:00");
  const [totalSeats, setTotalSeats] = useState(initialValues?.totalSeats ?? "8");
  const [pricePerPerson, setPricePerPerson] = useState(initialValues?.pricePerPerson ?? "");
  const [description, setDescription] = useState(initialValues?.description ?? "");

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
      if (isEdit && editTransportId) {
        const res = await updateTransport(editTransportId, {
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
        return;
      }
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
    <form onSubmit={onSubmit} className="box-border max-w-full min-w-0 space-y-4 overflow-x-hidden">
      {error ? (
        <div className="rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
          {error}
        </div>
      ) : null}

      <div className="grid min-w-0 gap-4 sm:grid-cols-2">
        <DestinationCombobox value={origin} onChange={setOrigin} error={originError} />
        <DestinationCombobox value={destination} onChange={setDestination} error={destinationError} />
      </div>

      <div className="grid min-w-0 grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        <div className="flex w-full min-w-0 flex-col gap-4 md:col-span-2 md:grid md:grid-cols-2 md:gap-4 lg:col-span-2">
          <label className="block w-full min-w-0 text-right">
            <span className="mb-1 block text-sm font-medium text-slate-700">תאריך נסיעה</span>
            <input
              type="date"
              required
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="box-border block w-full min-w-0 max-w-full appearance-none rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200"
              style={{ maxWidth: "calc(100vw - 2rem)" }}
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
              className="box-border block w-full min-w-0 max-w-full appearance-none rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200"
              style={{ maxWidth: "calc(100vw - 2rem)" }}
              dir="ltr"
            />
          </label>
        </div>
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
            className="box-border block w-full min-w-0 max-w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200"
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
            className="box-border block w-full min-w-0 max-w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200"
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
        {pending ? (isEdit ? "שומר..." : "מפרסם נסיעה...") : isEdit ? "שמירת שינויים" : "פרסום נסיעה"}
      </button>
    </form>
  );
}
