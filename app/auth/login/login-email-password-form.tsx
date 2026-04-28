"use client";

import { Loader2 } from "lucide-react";
import { useActionState, useState } from "react";
import { signInWithPassword, type AuthFormState } from "@/app/auth/actions";
type Props = {
  nextPath: string;
};

export function LoginEmailPasswordForm({ nextPath }: Props) {
  const [state, formAction, pending] = useActionState<AuthFormState, FormData>(signInWithPassword, null);
  const [clientError, setClientError] = useState<string | null>(null);

  return (
    <form
      action={formAction}
      className="space-y-3"
      onSubmit={(e) => {
        setClientError(null);
        const fd = new FormData(e.currentTarget);
        const password = String(fd.get("password") ?? "");
        if (password.length < 6) {
          e.preventDefault();
          setClientError("הסיסמה חייבת להכיל לפחות 6 תווים.");
        }
      }}
    >
      <input type="hidden" name="next" value={nextPath} />
      {state?.error ? (
        <div className="rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">{state.error}</div>
      ) : null}
      {clientError ? (
        <div className="rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">{clientError}</div>
      ) : null}

      <label className="block text-right">
        <span className="mb-1 block text-sm font-medium text-slate-700">אימייל</span>
        <input
          name="email"
          type="email"
          required
          autoComplete="email"
          dir="ltr"
          placeholder="you@example.com"
          className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none transition placeholder:text-slate-400 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200"
        />
      </label>

      <label className="block text-right">
        <span className="mb-1 block text-sm font-medium text-slate-700">סיסמה</span>
        <input
          name="password"
          type="password"
          required
          autoComplete="current-password"
          minLength={6}
          dir="ltr"
          className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200"
        />
      </label>

      <button
        type="submit"
        disabled={pending}
        className="inline-flex w-full min-h-[48px] items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm font-semibold text-slate-900 transition hover:bg-slate-50 disabled:opacity-60"
      >
        {pending ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden /> : null}
        {pending ? "מתחברים…" : "התחברות"}
      </button>
    </form>
  );
}
