"use client";

import { Loader2, RotateCcw } from "lucide-react";
import { useActionState, useState } from "react";
import { resendSignupOtp, verifySignupOtp, type AuthFormState } from "@/app/auth/actions";

type Props = {
  email: string;
  nextPath: string;
};

export function VerifyForm({ email, nextPath }: Props) {
  const [verifyState, verifyAction, verifyPending] = useActionState<AuthFormState, FormData>(verifySignupOtp, null);
  const [resendState, resendAction, resendPending] = useActionState<AuthFormState, FormData>(resendSignupOtp, null);
  const [clientError, setClientError] = useState<string | null>(null);

  return (
    <div className="space-y-4">
      <form
        action={verifyAction}
        className="space-y-3"
        onSubmit={(e) => {
          setClientError(null);
          const fd = new FormData(e.currentTarget);
          const token = String(fd.get("token") ?? "").trim();
          if (!/^\d{6}$/.test(token)) {
            e.preventDefault();
            setClientError("יש להזין קוד בן 6 ספרות.");
          }
        }}
      >
        <input type="hidden" name="email" value={email} />
        <input type="hidden" name="next" value={nextPath} />

        {verifyState?.error ? (
          <div className="rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">{verifyState.error}</div>
        ) : null}
        {clientError ? (
          <div className="rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">{clientError}</div>
        ) : null}

        <label className="block text-right">
          <span className="mb-1 block text-sm font-medium text-slate-700">קוד אימות (6 ספרות)</span>
          <input
            name="token"
            type="text"
            inputMode="numeric"
            autoComplete="one-time-code"
            maxLength={6}
            required
            dir="ltr"
            placeholder="123456"
            className="w-full rounded-xl border border-slate-300 px-4 py-3 text-center text-lg tracking-[0.3em] outline-none transition placeholder:tracking-normal placeholder:text-slate-400 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200"
          />
        </label>

        <button
          type="submit"
          disabled={verifyPending}
          className="inline-flex w-full min-h-[48px] items-center justify-center gap-2 rounded-xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:opacity-60"
        >
          {verifyPending ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden /> : null}
          {verifyPending ? "מאמתים..." : "אימות"}
        </button>
      </form>

      <form action={resendAction} className="text-center">
        <input type="hidden" name="email" value={email} />
        {resendState?.error ? <p className="mb-2 text-sm text-rose-600">{resendState.error}</p> : null}
        {resendState?.success ? <p className="mb-2 text-sm text-emerald-700">{resendState.success}</p> : null}
        <button
          type="submit"
          disabled={resendPending}
          className="inline-flex items-center gap-2 text-sm font-semibold text-cyan-700 transition hover:text-cyan-800 hover:underline disabled:opacity-60"
        >
          {resendPending ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden /> : <RotateCcw className="h-4 w-4" aria-hidden />}
          {resendPending ? "שולחים קוד חדש..." : "שלח קוד חדש"}
        </button>
      </form>
    </div>
  );
}
