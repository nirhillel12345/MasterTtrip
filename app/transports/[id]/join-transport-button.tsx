"use client";

import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { joinTransport } from "@/app/transports/actions";

type Props = {
  transportId: string;
  disabled?: boolean;
};

export function JoinTransportButton({ transportId, disabled = false }: Props) {
  const router = useRouter();
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

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
    router.refresh();
  }

  return (
    <div className="w-full">
      <button
        type="button"
        onClick={() => void onJoin()}
        disabled={disabled || pending}
        className="inline-flex min-h-[48px] w-full items-center justify-center gap-2 rounded-xl bg-cyan-600 px-4 py-3 text-sm font-bold text-white shadow-md transition hover:bg-cyan-700 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60"
      >
        {pending ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
        {pending ? "מצרף..." : "הצטרפות לנסיעה"}
      </button>
      {error ? <p className="mt-2 text-right text-sm text-rose-600">{error}</p> : null}
    </div>
  );
}
