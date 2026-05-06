"use client";

import { useState, useTransition } from "react";
import { DestinationCombobox } from "@/app/components/destination-combobox";
import { ListingWhatsappPhoneInput, parseInitialWhatsappE164 } from "@/app/components/listing-whatsapp-phone-input";
import { PropertyPhotos } from "@/app/listings/new/property-photos";
import { uploadListingImagesToStorage } from "@/app/listings/new/upload-listing-images";
import { createAttraction, updateAttraction } from "@/app/attractions/actions";
import type { AttractionType } from "@/generated/prisma";
import { isAllowedDestination } from "@/lib/travel-destinations";
import { isValidPhoneNumber } from "react-phone-number-input";

export type AttractionFormInitialValues = {
  title: string;
  description: string;
  price: string;
  locationLabel: string;
  type: AttractionType;
  contactPhone: string;
  externalLink: string;
  date: string;
  maxParticipants: string;
  images: string[];
};

type Props = {
  editAttractionId?: string;
  initialValues?: AttractionFormInitialValues;
};

export function AttractionForm({ editAttractionId, initialValues }: Props) {
  const isEdit = Boolean(editAttractionId && initialValues);
  const [pending, startTransition] = useTransition();
  const [serverError, setServerError] = useState<string | null>(null);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [destinationError, setDestinationError] = useState<string | undefined>();

  const [title, setTitle] = useState(initialValues?.title ?? "");
  const [description, setDescription] = useState(initialValues?.description ?? "");
  const [price, setPrice] = useState(initialValues?.price ?? "");
  const [locationLabel, setLocationLabel] = useState(initialValues?.locationLabel ?? "");
  const [type, setType] = useState<AttractionType>(initialValues?.type ?? "BUSINESS");
  const [contactPhone, setContactPhone] = useState<string | undefined>(() =>
    parseInitialWhatsappE164(initialValues?.contactPhone),
  );
  const [externalLink, setExternalLink] = useState(initialValues?.externalLink ?? "");
  const [date, setDate] = useState(initialValues?.date ?? "");
  const [maxParticipants, setMaxParticipants] = useState(initialValues?.maxParticipants ?? "");
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [existingImageUrls, setExistingImageUrls] = useState<string[]>(initialValues?.images ?? []);

  const maxNewPhotos = Math.max(0, 8 - existingImageUrls.length);

  function removeExistingImage(url: string) {
    setExistingImageUrls((prev) => prev.filter((u) => u !== url));
  }

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

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setServerError(null);
    setDestinationError(undefined);

    if (!isAllowedDestination(locationLabel)) {
      setDestinationError("יש לבחור יעד מהרשימה.");
      return;
    }
    if (!contactPhone || !isValidPhoneNumber(contactPhone)) {
      setServerError("יש להזין מספר וואטסאפ תקין (כולל קידומת מדינה).");
      return;
    }
    if (type === "PRIVATE") {
      if (!maxParticipants.trim()) {
        setServerError("באטרקציה פרטית חובה להזין מספר משתתפים מקסימלי.");
        return;
      }
      const n = Number(maxParticipants);
      if (!Number.isInteger(n) || n < 1 || n > 500) {
        setServerError("מספר משתתפים מקסימלי חייב להיות בין 1 ל-500.");
        return;
      }
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

      const payload = {
        title,
        description,
        price: price.trim() ? Number(price) : null,
        locationLabel,
        type,
        contactPhone: contactPhone ?? "",
        externalLink: externalLink.trim() || null,
        date: date.trim() ? date : null,
        maxParticipants: type === "PRIVATE" && maxParticipants.trim() ? Number(maxParticipants) : null,
        images: [...existingImageUrls, ...newUrls].slice(0, 8),
      };

      if (isEdit && editAttractionId) {
        const res = await updateAttraction(editAttractionId, payload);
        if (!res.ok) setServerError(res.error);
        return;
      }
      const res = await createAttraction(payload);
      if (!res.ok) setServerError(res.error);
    });
  }

  return (
    <form onSubmit={onSubmit} className="box-border max-w-full min-w-0 space-y-5 overflow-x-hidden">
      {serverError ? (
        <div className="rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">{serverError}</div>
      ) : null}
      <section className="rounded-2xl border border-slate-200 bg-slate-50/60 p-4 sm:p-5">
        <p className="mb-3 text-right text-xs font-semibold tracking-wide text-slate-500">שלב 1: פרטי האטרקציה</p>
        <div className="space-y-4">
          <label className="block text-right">
            <span className="mb-1 block text-sm font-medium text-slate-700">כותרת</span>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="w-full rounded-xl border border-slate-300 px-4 py-3.5 text-sm outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200"
            />
          </label>

          <DestinationCombobox value={locationLabel} onChange={setLocationLabel} error={destinationError} />

          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block text-right">
              <span className="mb-1 block text-sm font-medium text-slate-700">סוג אטרקציה</span>
              <select
                value={type}
                onChange={(e) => setType(e.target.value as AttractionType)}
                className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3.5 text-sm outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200"
              >
                <option value="BUSINESS">עסקי</option>
                <option value="PRIVATE">פרטי</option>
              </select>
            </label>
            <label className="block text-right">
              <span className="mb-1 block text-sm font-medium text-slate-700">מחיר (אופציונלי)</span>
              <input
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                type="number"
                min="0"
                step="0.01"
                placeholder="אם ריק יוצג מחיר בפרטי"
                className="w-full rounded-xl border border-slate-300 px-4 py-3.5 text-sm outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200"
                dir="ltr"
              />
            </label>
          </div>

          <label className="block text-right">
            <span className="mb-1 block text-sm font-medium text-slate-700">תיאור (אופציונלי)</span>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
              className="w-full rounded-xl border border-slate-300 px-4 py-3.5 text-sm outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200"
            />
          </label>
        </div>
      </section>

      <section className="rounded-2xl border border-slate-200 bg-slate-50/60 p-4 sm:p-5">
        <p className="mb-3 text-right text-xs font-semibold tracking-wide text-slate-500">שלב 2: תיאום ופרטי קשר</p>
        <div className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block text-right">
              <span className="mb-1 block text-sm font-medium text-slate-700">תאריך ושעה (אופציונלי)</span>
              <input
                type="datetime-local"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full rounded-xl border border-slate-300 px-4 py-3.5 text-sm outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200"
                dir="ltr"
              />
            </label>
            <label className="block text-right">
              <span className="mb-1 block text-sm font-medium text-slate-700">קישור חיצוני (אופציונלי)</span>
              <input
                value={externalLink}
                onChange={(e) => setExternalLink(e.target.value)}
                placeholder="https://..."
                className="w-full rounded-xl border border-slate-300 px-4 py-3.5 text-sm outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200"
                dir="ltr"
              />
            </label>
          </div>

          <div className="block text-right">
            <span className="mb-1.5 block text-sm font-medium text-slate-700">טלפון ליצירת קשר</span>
            <ListingWhatsappPhoneInput value={contactPhone} onChange={setContactPhone} disabled={pending} />
          </div>

          {type === "PRIVATE" ? (
            <label className="block text-right">
              <span className="mb-1 block text-sm font-medium text-slate-700">מספר משתתפים מקסימלי</span>
              <input
                value={maxParticipants}
                onChange={(e) => setMaxParticipants(e.target.value)}
                type="number"
                min="1"
                max="500"
                step="1"
                required
                placeholder="למשל: 12"
                className="w-full rounded-xl border border-slate-300 px-4 py-3.5 text-sm outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200"
                dir="ltr"
              />
            </label>
          ) : null}
        </div>
      </section>

      {uploadError ? <p className="text-sm text-rose-600">{uploadError}</p> : null}

      {existingImageUrls.length > 0 ? (
        <div className="space-y-2 text-right">
          <span className="block text-sm font-medium text-slate-700">תמונות קיימות</span>
          <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            {existingImageUrls.map((url) => (
              <li key={url} className="group relative aspect-[4/3] overflow-hidden rounded-xl border border-slate-200 shadow-md">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={url} alt="" className="h-full w-full object-cover" />
                <button
                  type="button"
                  onClick={() => removeExistingImage(url)}
                  disabled={pending}
                  className="absolute start-2 top-2 rounded-full bg-slate-900/75 px-2 py-1 text-xs font-semibold text-white opacity-0 transition group-hover:opacity-100"
                >
                  הסרה
                </button>
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      <section className="rounded-2xl border border-slate-200 bg-slate-50/60 p-4 sm:p-5">
        <p className="mb-3 text-right text-xs font-semibold tracking-wide text-slate-500">שלב 3: תמונות</p>
        {maxNewPhotos > 0 ? (
          <PropertyPhotos
            files={imageFiles}
            onFilesChange={handleFilesChange}
            disabled={pending}
            maxFiles={maxNewPhotos}
            heading="תמונות אטרקציה (אופציונלי)"
          />
        ) : (
          <p className="text-right text-sm text-slate-500">הגעתם למקסימום 8 תמונות. הסירו תמונה קיימת כדי להוסיף חדשה.</p>
        )}
      </section>

      <button
        type="submit"
        disabled={pending}
        className="inline-flex min-h-[48px] w-full items-center justify-center rounded-xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-70"
      >
        {pending ? (isEdit ? "שומר..." : "מפרסם...") : isEdit ? "שמירת שינויים" : "פרסום אטרקציה"}
      </button>
    </form>
  );
}
