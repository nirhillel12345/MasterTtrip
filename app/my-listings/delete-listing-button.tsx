"use client";

import { Loader2, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { deleteListing } from "@/app/listings/actions";

type Props = {
  listingId: string;
  title: string;
};

export function DeleteListingButton({ listingId, title }: Props) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onConfirm() {
    setError(null);
    setPending(true);
    const res = await deleteListing(listingId);
    setPending(false);
    if (res?.error) {
      setError(res.error);
      return;
    }
    setOpen(false);
    router.refresh();
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="inline-flex items-center gap-1.5 rounded-xl border border-rose-200 bg-white px-3 py-2 text-xs font-semibold text-rose-700 shadow-sm transition hover:border-rose-300 hover:bg-rose-50 active:scale-[0.98] sm:text-sm"
      >
        <Trash2 className="h-3.5 w-3.5" />
        מחיקה
      </button>

      {open ? (
        <div
          className="fixed inset-0 z-[100] flex items-end justify-center bg-slate-900/50 p-4 backdrop-blur-sm sm:items-center"
          role="dialog"
          aria-modal="true"
          aria-labelledby="delete-listing-title"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setOpen(false);
              setError(null);
            }
          }}
        >
          <div
            className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 text-right shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 id="delete-listing-title" className="text-lg font-bold text-slate-900">
              למחוק את המודעה?
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-slate-600">
              פעולה זו תמחק לצמיתות את &quot;{title}&quot;. לא ניתן לשחזר את המודעה לאחר המחיקה.
            </p>
            {error ? <p className="mt-3 text-sm text-rose-600">{error}</p> : null}
            <div className="mt-6 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={() => {
                  setOpen(false);
                  setError(null);
                }}
                disabled={pending}
                className="rounded-xl border border-slate-300 px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 active:scale-[0.98] disabled:opacity-50"
              >
                ביטול
              </button>
              <button
                type="button"
                onClick={() => void onConfirm()}
                disabled={pending}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-rose-600 px-4 py-3 text-sm font-bold text-white shadow-md transition hover:bg-rose-700 active:scale-[0.98] disabled:opacity-70"
              >
                {pending ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
                מחיקה סופית
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
