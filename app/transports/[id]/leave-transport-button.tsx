"use client";

import { Loader2, UserMinus } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { leaveTransport } from "@/app/transports/actions";

type Props = {
  transportId: string;
};

export function LeaveTransportButton({ transportId }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onLeave() {
    setPending(true);
    setError(null);
    const res = await leaveTransport(transportId);
    setPending(false);

    if (!res.ok) {
      setError(res.error);
      return;
    }

    const params = new URLSearchParams(searchParams.toString());
    params.delete("joined");
    params.set("left", "1");
    const nextUrl = params.toString() ? `${pathname}?${params.toString()}` : pathname;
    router.replace(nextUrl, { scroll: false });
  }

  return (
    <div className="w-full">
      <button
        type="button"
        onClick={() => void onLeave()}
        disabled={pending}
        className="inline-flex min-h-[48px] w-full items-center justify-center gap-2 rounded-xl border border-rose-200 bg-white px-4 py-3 text-sm font-bold text-rose-700 shadow-sm transition hover:bg-rose-50 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60"
      >
        {pending ? <Loader2 className="h-4 w-4 animate-spin" /> : <UserMinus className="h-4 w-4" />}
        {pending ? "מבטל הרשמה..." : "ביטול הרשמה"}
      </button>
      {error ? <p className="mt-2 text-right text-sm text-rose-600">{error}</p> : null}
    </div>
  );
}
