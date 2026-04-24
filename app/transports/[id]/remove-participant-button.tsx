"use client";

import { Loader2, UserMinus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { removeTransportParticipant } from "@/app/transports/actions";

type Props = {
  transportId: string;
  participantUserId: string;
};

export function RemoveParticipantButton({ transportId, participantUserId }: Props) {
  const router = useRouter();
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onRemove() {
    setPending(true);
    setError(null);
    const res = await removeTransportParticipant(transportId, participantUserId);
    setPending(false);
    if (!res.ok) {
      setError(res.error);
      return;
    }
    router.refresh();
  }

  return (
    <div className="text-right">
      <button
        type="button"
        onClick={() => void onRemove()}
        disabled={pending}
        className="inline-flex items-center gap-1.5 rounded-lg border border-rose-200 bg-white px-3 py-1.5 text-xs font-semibold text-rose-700 transition hover:bg-rose-50 active:scale-[0.98] disabled:opacity-60"
      >
        {pending ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <UserMinus className="h-3.5 w-3.5" />}
        הסרה
      </button>
      {error ? <p className="mt-1 text-xs text-rose-600">{error}</p> : null}
    </div>
  );
}
