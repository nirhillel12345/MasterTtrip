"use client";

import { Loader2 } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { joinTransport, updateUserPhone } from "@/app/transports/actions";

type Props = {
  transportId: string;
  initialPhone?: string | null;
  disabled?: boolean;
};

function looksLikePhone(value: string): boolean {
  const normalized = value.replace(/[^\d+]/g, "");
  const digitsOnly = normalized.replace(/\D/g, "");
  return digitsOnly.length >= 9 && digitsOnly.length <= 15 && (normalized.startsWith("+") || normalized.startsWith("0"));
}

export function JoinTransportButton({ transportId, initialPhone = null, disabled = false }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showPhoneModal, setShowPhoneModal] = useState(false);
  const [phone, setPhone] = useState(initialPhone ?? "");
  const [phoneError, setPhoneError] = useState<string | null>(null);

  async function onJoin() {
    setPending(true);
    setError(null);
    const res = await joinTransport(transportId);
    setPending(false);

    if (!res.ok) {
      setError(res.error);
      return;
    }

    if (res.notifyWhatsAppUrl) {
      window.open(res.notifyWhatsAppUrl, "_blank", "noopener,noreferrer");
    }
    const params = new URLSearchParams(searchParams.toString());
    params.set("joined", "1");
    const nextUrl = params.toString() ? `${pathname}?${params.toString()}` : pathname;
    router.replace(nextUrl, { scroll: false });
  }

  async function onPrimaryClick() {
    setError(null);
    if (!initialPhone && !phone.trim()) {
      setShowPhoneModal(true);
      return;
    }
    if (!initialPhone) {
      setShowPhoneModal(true);
      return;
    }
    await onJoin();
  }

  async function onSaveAndJoin() {
    const trimmed = phone.trim();
    if (!looksLikePhone(trimmed)) {
      setPhoneError("הזינו מספר וואטסאפ תקין (כולל קידומת, למשל +972...).");
      return;
    }
    setPhoneError(null);
    setPending(true);
    const saveRes = await updateUserPhone(trimmed);
    if (!saveRes.ok) {
      setPending(false);
      setPhoneError(saveRes.error);
      return;
    }
    setShowPhoneModal(false);
    await onJoin();
  }

  return (
    <div className="w-full">
      <button
        type="button"
        onClick={() => void onPrimaryClick()}
        disabled={disabled || pending}
        className="inline-flex min-h-[48px] w-full items-center justify-center gap-2 rounded-xl bg-cyan-600 px-4 py-3 text-sm font-bold text-white shadow-md transition hover:bg-cyan-700 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60"
      >
        {pending ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
        {pending ? "מצרף..." : "הצטרפות לנסיעה"}
      </button>
      {error ? <p className="mt-2 text-right text-sm text-rose-600">{error}</p> : null}

      {showPhoneModal ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4" dir="rtl">
          <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-5 text-right shadow-2xl sm:p-6">
            <h3 className="text-lg font-bold text-slate-900">פרט אחרון ויוצאים לדרך</h3>
            <p className="mt-2 text-sm leading-relaxed text-slate-600">
              כדי שמארגן הנסיעה יוכל ליצור איתך קשר, חובה להזין מספר טלפון.
            </p>

            <label className="mt-4 block">
              <span className="mb-1.5 block text-sm font-semibold text-slate-700">מספר וואטסאפ</span>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                dir="ltr"
                placeholder="+972-50-1234567"
                className="w-full rounded-xl border border-slate-300 px-4 py-3 text-left text-sm outline-none transition placeholder:text-slate-400 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200"
              />
            </label>

            {phoneError ? <p className="mt-2 text-sm text-rose-600">{phoneError}</p> : null}

            <div className="mt-5 flex flex-wrap justify-end gap-2">
              <button
                type="button"
                onClick={() => {
                  if (!pending) setShowPhoneModal(false);
                }}
                disabled={pending}
                className="inline-flex min-h-[42px] items-center justify-center rounded-xl border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 disabled:opacity-60"
              >
                ביטול
              </button>
              <button
                type="button"
                onClick={() => void onSaveAndJoin()}
                disabled={pending}
                className="inline-flex min-h-[42px] items-center justify-center gap-2 rounded-xl bg-cyan-600 px-4 py-2 text-sm font-bold text-white transition hover:bg-cyan-700 disabled:opacity-60"
              >
                {pending ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
                Save & Join
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
