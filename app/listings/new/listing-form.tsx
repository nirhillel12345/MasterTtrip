"use client";

import { Users } from "lucide-react";
import { useTransition, useState } from "react";
import { createListing, updateListing } from "@/app/listings/actions";
import { DestinationCombobox } from "@/app/components/destination-combobox";
import {
  ListingWhatsappPhoneInput,
  parseInitialWhatsappE164,
} from "@/app/components/listing-whatsapp-phone-input";
import { PropertyPhotos } from "./property-photos";
import { uploadListingImagesToStorage } from "./upload-listing-images";
import { isValidPhoneNumber } from "react-phone-number-input";
import { isAllowedDestination } from "@/lib/travel-destinations";
import type { ListingType } from "@/generated/prisma";
import {
  ListingDateRangeFields,
  localISODate,
} from "@/app/components/listing-date-range-fields";

export type ListingFormInitial = {
  title: string;
  location: string;
  price: number;
  startDate: string;
  endDate: string;
  whatsappNumber: string;
  roommatesNeeded: number;
  type: ListingType;
  images: string[];
};

type Props = {
  mode: "create" | "edit";
  listingId?: string;
  initial?: ListingFormInitial;
};

export function ListingForm({ mode, listingId, initial }: Props) {
  const [pending, startTransition] = useTransition();
  const [serverError, setServerError] = useState<string | null>(null);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [destinationError, setDestinationError] = useState<string | undefined>();

  const [title, setTitle] = useState(initial?.title ?? "");
  const [location, setLocation] = useState(initial?.location ?? "");
  const [price, setPrice] = useState(initial != null ? String(initial.price) : "");
  const [startDate, setStartDate] = useState(
    initial?.startDate ?? localISODate(new Date()),
  );
  const [endDate, setEndDate] = useState(
    initial?.endDate ??
      (() => {
        const t = new Date();
        t.setDate(t.getDate() + 1);
        return localISODate(t);
      })(),
  );
  const [whatsappNumber, setWhatsappNumber] = useState<string | undefined>(() =>
    parseInitialWhatsappE164(initial?.whatsappNumber),
  );
  const [roommatesNeeded, setRoommatesNeeded] = useState(
    initial != null ? String(initial.roommatesNeeded) : "",
  );
  const [listingType, setListingType] = useState<ListingType>(
    initial?.type ?? "LOOKING_FOR",
  );
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [existingImageUrls, setExistingImageUrls] = useState<string[]>(initial?.images ?? []);

  const maxNewPhotos = Math.max(0, 8 - existingImageUrls.length);

  function handleFilesChange(next: File[]) {
    const MAX_BYTES = 4 * 1024 * 1024;
    const tooBig = next.find((f) => f.size > MAX_BYTES);
    if (tooBig) {
      setUploadError("קובץ גדול מדי (מקסימום 4MB לתמונה)");
      return;
    }
    if (next.length > maxNewPhotos) {
      setUploadError(`ניתן להוסיף עד ${maxNewPhotos} תמונות חדשות`);
      return;
    }
    setUploadError(null);
    setImageFiles(next);
  }

  function removeExistingImage(url: string) {
    setExistingImageUrls((prev) => prev.filter((u) => u !== url));
  }

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setServerError(null);
    setDestinationError(undefined);

    if (!isAllowedDestination(location)) {
      setDestinationError("יש לבחור יעד מהרשימה (הקלידו ובחרו פריט)");
      return;
    }

    if (!whatsappNumber || !isValidPhoneNumber(whatsappNumber)) {
      setServerError("יש להזין מספר וואטסאפ תקין (כולל קידומת מדינה).");
      return;
    }

    startTransition(async () => {
      let newUrls: string[] = [];
      try {
        if (imageFiles.length > 0) {
          newUrls = await uploadListingImagesToStorage(imageFiles);
        }
      } catch (err) {
        setServerError(err instanceof Error ? err.message : "שגיאה בהעלאת תמונות");
        return;
      }

      const imageUrls = [...existingImageUrls, ...newUrls].slice(0, 8);

      const payload = {
        title,
        location,
        price: Number(price),
        startDate,
        endDate,
        whatsappNumber: whatsappNumber ?? "",
        roommatesNeeded: Number(roommatesNeeded),
        imageUrls,
        type: listingType,
      };

      if (mode === "edit") {
        if (!listingId) {
          setServerError("חסר מזהה מודעה");
          return;
        }
        const result = await updateListing(listingId, payload);
        if (result?.error) setServerError(result.error);
        return;
      }

      const result = await createListing(payload);
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

      <div>
        <span className="mb-2 block text-sm font-medium text-slate-700">סוג מודעה</span>
        <div className="flex flex-wrap justify-end gap-2">
          {(
            [
              { v: "LOOKING_FOR" as const, label: "מחפש דירה / שותפים" },
              { v: "HAS_APARTMENT" as const, label: "יש לי דירה / סאבלט" },
            ] as const
          ).map((opt) => (
            <button
              key={opt.v}
              type="button"
              onClick={() => setListingType(opt.v)}
              className={`rounded-full px-4 py-2 text-sm font-semibold transition active:scale-[0.98] ${
                listingType === opt.v
                  ? "bg-slate-900 text-white shadow-md"
                  : "border border-slate-300 bg-white text-slate-700 hover:border-cyan-400 hover:bg-cyan-50/50"
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      <label className="block text-right">
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

      <label className="block text-right">
        <span className="mb-1 block text-sm font-medium text-slate-700">מחיר ללילה/לחודש</span>
        <input
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          type="number"
          min="1"
          step="0.01"
          required
          placeholder="למשל: 120"
          dir="ltr"
          className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none transition placeholder:text-slate-400 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200"
        />
      </label>

      <ListingDateRangeFields
        variant="form"
        startDate={startDate}
        endDate={endDate}
        onChange={({ startDate: s, endDate: en }) => {
          setStartDate(s);
          setEndDate(en);
        }}
      />
      <p className="text-xs text-slate-500">תאריך הסיום לא יכול להיות לפני תאריך ההתחלה (יתעדכן אוטומטית במידת הצורך).</p>

      <div className="block text-right">
        <span className="mb-1.5 block text-sm font-medium text-slate-700">מספר וואטסאפ לתיאום</span>
        <p className="mb-2 text-xs leading-relaxed text-slate-500">
          בחרו מדינה (דגל וקידומת) ואז הזינו את המספר — יישמר בפורמט בינלאומי E.164.
        </p>
        <ListingWhatsappPhoneInput value={whatsappNumber} onChange={setWhatsappNumber} disabled={pending} />
      </div>

      <label className="block text-right">
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
            dir="ltr"
            className="w-full text-sm outline-none placeholder:text-slate-400"
          />
        </div>
      </label>

      {uploadError ? <p className="text-sm text-rose-600">{uploadError}</p> : null}

      {existingImageUrls.length > 0 ? (
        <div className="space-y-2 text-right">
          <span className="block text-sm font-medium text-slate-700">תמונות קיימות</span>
          <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            {existingImageUrls.map((url) => (
              <li
                key={url}
                className="group relative aspect-[4/3] overflow-hidden rounded-xl border border-slate-200 shadow-md"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={url} alt="" className="h-full w-full object-cover" />
                <button
                  type="button"
                  onClick={() => removeExistingImage(url)}
                  disabled={pending}
                  className="absolute start-2 top-2 rounded-full bg-slate-900/75 px-2 py-1 text-xs font-semibold text-white opacity-0 transition group-hover:opacity-100 active:scale-95"
                >
                  הסרה
                </button>
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      {maxNewPhotos > 0 ? (
        <PropertyPhotos
          files={imageFiles}
          onFilesChange={handleFilesChange}
          disabled={pending}
          maxFiles={maxNewPhotos}
        />
      ) : (
        <p className="text-right text-sm text-slate-500">הגעתם למקסימום 8 תמונות. הסירו תמונה קיימת כדי להוסיף חדשה.</p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="mt-2 inline-flex w-full min-h-[48px] items-center justify-center rounded-xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 active:scale-[0.99] active:bg-slate-950 disabled:cursor-not-allowed disabled:opacity-70"
      >
        {pending
          ? mode === "edit"
            ? "מעדכן..."
            : "שומר מודעה..."
          : mode === "edit"
            ? "עדכון מודעה"
            : "פרסום מודעה"}
      </button>
    </form>
  );
}
