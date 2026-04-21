"use client";

import { CalendarDays, MessageCircle, Users } from "lucide-react";
import { useTransition, useState } from "react";
import { createListing } from "./actions";
import { DestinationCombobox } from "./destination-combobox";
import { PropertyPhotos } from "./property-photos";
import { uploadListingImagesToStorage } from "./upload-listing-images";
import { isAllowedDestination } from "@/lib/travel-destinations";

function localISODate(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

function addOneLocalDay(iso: string): string {
  const [y, mo, da] = iso.split("-").map(Number);
  const dt = new Date(y, mo - 1, da);
  dt.setDate(dt.getDate() + 1);
  return localISODate(dt);
}

export function ListingForm() {
  const [pending, startTransition] = useTransition();
  const [serverError, setServerError] = useState<string | null>(null);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [destinationError, setDestinationError] = useState<string | undefined>();

  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [price, setPrice] = useState("");
  const [startDate, setStartDate] = useState(() => localISODate(new Date()));
  const [endDate, setEndDate] = useState(() => {
    const t = new Date();
    t.setDate(t.getDate() + 1);
    return localISODate(t);
  });
  const [whatsappNumber, setWhatsappNumber] = useState("");
  const [roommatesNeeded, setRoommatesNeeded] = useState("");
  const [imageFiles, setImageFiles] = useState<File[]>([]);

  function handleStartChange(value: string) {
    setStartDate(value);
    setEndDate((prev) => {
      if (!prev || prev < value) return addOneLocalDay(value);
      return prev;
    });
  }

  function handleEndChange(value: string) {
    if (value < startDate) {
      setEndDate(addOneLocalDay(startDate));
    } else {
      setEndDate(value);
    }
  }

  function handleFilesChange(next: File[]) {
    const MAX_BYTES = 4 * 1024 * 1024;
    const tooBig = next.find((f) => f.size > MAX_BYTES);
    if (tooBig) {
      setUploadError("קובץ גדול מדי (מקסימום 4MB לתמונה)");
      return;
    }
    if (next.length > 8) {
      setUploadError("ניתן להעלות עד 8 תמונות");
      return;
    }
    setUploadError(null);
    setImageFiles(next);
  }

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setServerError(null);
    setDestinationError(undefined);

    if (!isAllowedDestination(location)) {
      setDestinationError("יש לבחור יעד מהרשימה (הקלידו ובחרו פריט)");
      return;
    }

    startTransition(async () => {
      let imageUrls: string[] = [];
      try {
        imageUrls = await uploadListingImagesToStorage(imageFiles);
      } catch (err) {
        setServerError(err instanceof Error ? err.message : "שגיאה בהעלאת תמונות");
        return;
      }

      const result = await createListing({
        title,
        location,
        price: Number(price),
        startDate,
        endDate,
        whatsappNumber,
        roommatesNeeded: Number(roommatesNeeded),
        imageUrls,
      });
      if (result?.error) setServerError(result.error);
    });
  }

  return (
    <form onSubmit={onSubmit} className="mt-6 space-y-4">
      {serverError ? (
        <div className="rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
          {serverError}
        </div>
      ) : null}

      <label className="block">
        <span className="mb-1 block text-sm font-medium text-slate-700">כותרת המודעה</span>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          placeholder="למשל: מחפש/ת שותפ/ה לדירה בבנגקוק"
          className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none transition placeholder:text-slate-400 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200"
        />
      </label>

      <DestinationCombobox value={location} onChange={setLocation} error={destinationError} />

      <label className="block">
        <span className="mb-1 block text-sm font-medium text-slate-700">מחיר ללילה/לחודש</span>
        <input
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          type="number"
          min="1"
          step="0.01"
          required
          placeholder="למשל: 120"
          className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none transition placeholder:text-slate-400 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200"
        />
      </label>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block">
          <span className="mb-1 block text-sm font-medium text-slate-700">תאריך התחלה</span>
          <div className="flex items-center gap-2 rounded-xl border border-slate-300 px-4 py-3 focus-within:border-cyan-500 focus-within:ring-2 focus-within:ring-cyan-200">
            <CalendarDays className="h-4 w-4 text-slate-400" />
            <input
              type="date"
              required
              value={startDate}
              onChange={(e) => handleStartChange(e.target.value)}
              className="w-full text-sm outline-none"
            />
          </div>
        </label>

        <label className="block">
          <span className="mb-1 block text-sm font-medium text-slate-700">תאריך סיום</span>
          <div className="flex items-center gap-2 rounded-xl border border-slate-300 px-4 py-3 focus-within:border-cyan-500 focus-within:ring-2 focus-within:ring-cyan-200">
            <CalendarDays className="h-4 w-4 text-slate-400" />
            <input
              type="date"
              required
              value={endDate}
              min={startDate}
              onChange={(e) => handleEndChange(e.target.value)}
              className="w-full text-sm outline-none"
            />
          </div>
        </label>
      </div>

      <label className="block">
        <span className="mb-1 block text-sm font-medium text-slate-700">מספר לתיאום</span>
        <div className="flex items-center gap-2 rounded-xl border border-slate-300 px-4 py-3 focus-within:border-cyan-500 focus-within:ring-2 focus-within:ring-cyan-200">
          <MessageCircle className="h-4 w-4 text-slate-400" />
          <input
            value={whatsappNumber}
            onChange={(e) => setWhatsappNumber(e.target.value)}
            required
            dir="ltr"
            placeholder="+972501234567"
            className="w-full text-sm outline-none placeholder:text-slate-400"
          />
        </div>
      </label>

      <label className="block">
        <span className="mb-1 block text-sm font-medium text-slate-700">מספר שותפים חסרים</span>
        <div className="flex items-center gap-2 rounded-xl border border-slate-300 px-4 py-3 focus-within:border-cyan-500 focus-within:ring-2 focus-within:ring-cyan-200">
          <Users className="h-4 w-4 text-slate-400" />
          <input
            value={roommatesNeeded}
            onChange={(e) => setRoommatesNeeded(e.target.value)}
            type="number"
            min="0"
            step="1"
            required
            placeholder="למשל: 2"
            className="w-full text-sm outline-none placeholder:text-slate-400"
          />
        </div>
      </label>

      {uploadError ? <p className="text-sm text-rose-600">{uploadError}</p> : null}

      <PropertyPhotos files={imageFiles} onFilesChange={handleFilesChange} disabled={pending} />

      <button
        type="submit"
        disabled={pending}
        className="mt-2 inline-flex w-full items-center justify-center rounded-xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-70"
      >
        {pending ? "שומר מודעה..." : "פרסום מודעה"}
      </button>
    </form>
  );
}
