"use client";

import { useActionState } from "react";
import { type ProfileActionState, updateProfile } from "./actions";

const MAX_BIO = 5000;

type Props = {
  initialBio: string | null;
  initialInstagram: string | null;
  initialPhone: string | null;
};

export function ProfileForm({ initialBio, initialInstagram, initialPhone }: Props) {
  const [state, formAction, pending] = useActionState<ProfileActionState, FormData>(updateProfile, null);

  return (
    <form action={formAction} className="space-y-6 text-right">
      {state?.error ? (
        <div className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm font-medium text-rose-800">
          {state.error}
        </div>
      ) : null}
      {state?.ok ? (
        <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-800">
          הפרטים נשמרו בהצלחה
        </div>
      ) : null}

      <label className="block">
        <span className="mb-1.5 block text-sm font-semibold text-slate-700">קצת עליי</span>
        <textarea
          name="bio"
          defaultValue={initialBio ?? ""}
          rows={5}
          maxLength={MAX_BIO}
          placeholder="ספרו למטיילים מי אתם, לאן נוסעים, מה מחפשים בשותף..."
          className="w-full resize-y rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm leading-relaxed text-slate-900 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200"
        />
        <span className="mt-1 block text-xs text-slate-500">עד {MAX_BIO} תווים</span>
      </label>

      <label className="block">
        <span className="mb-1.5 block text-sm font-semibold text-slate-700">שם משתמש באינסטגרם</span>
        <div dir="ltr" className="flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-left shadow-sm transition focus-within:border-cyan-500 focus-within:ring-2 focus-within:ring-cyan-200">
          <span className="shrink-0 text-sm text-slate-400">@</span>
          <input
            name="instagram"
            type="text"
            defaultValue={initialInstagram ?? ""}
            autoComplete="off"
            placeholder="username"
            className="min-w-0 flex-1 bg-transparent text-sm text-slate-900 outline-none placeholder:text-slate-400"
          />
        </div>
        <span className="mt-1 block text-xs text-slate-500">אופציונלי — יוצג במודעות ובפרופיל הציבורי</span>
      </label>

      <label className="block">
        <span className="mb-1.5 block text-sm font-semibold text-slate-700">מספר טלפון</span>
        <input
          name="phone"
          type="tel"
          defaultValue={initialPhone ?? ""}
          dir="ltr"
          placeholder="+972-50-0000000"
          className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-left text-sm text-slate-900 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200"
        />
        <span className="mt-1 block text-xs text-slate-500">אופציונלי — לבניית אמון עם שותפים פוטנציאליים</span>
      </label>

      <div className="flex flex-wrap justify-end gap-3 pt-2">
        <button
          type="submit"
          disabled={pending}
          className="inline-flex min-h-[48px] items-center justify-center rounded-2xl bg-slate-900 px-6 py-3 text-sm font-bold text-white shadow-md transition hover:bg-slate-800 disabled:opacity-60"
        >
          {pending ? "שומרים…" : "שמירת פרופיל"}
        </button>
      </div>
    </form>
  );
}
