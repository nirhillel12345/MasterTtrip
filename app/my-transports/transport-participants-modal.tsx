"use client";

import { Users } from "lucide-react";
import { useEffect, useState } from "react";

export type ParticipantRow = {
  id: string;
  name: string;
  email: string;
  image: string | null;
};

type Props = {
  routeLabel: string;
  participants: ParticipantRow[];
};

export function TransportParticipantsModal({ routeLabel, participants }: Props) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="inline-flex w-full items-center justify-center gap-1.5 rounded-xl border border-cyan-200 bg-cyan-50/80 px-3 py-2.5 text-xs font-semibold text-cyan-900 shadow-sm transition hover:border-cyan-400 hover:bg-cyan-50 active:scale-[0.98] sm:text-sm"
      >
        <Users className="h-3.5 w-3.5" />
        משתתפים
      </button>

      {open ? (
        <div
          className="fixed inset-0 z-[100] flex items-end justify-center bg-slate-900/50 p-4 backdrop-blur-sm sm:items-center"
          role="dialog"
          aria-modal="true"
          aria-labelledby="participants-modal-title"
          onClick={(e) => {
            if (e.target === e.currentTarget) setOpen(false);
          }}
        >
          <div
            className="max-h-[85vh] w-full max-w-md overflow-y-auto rounded-2xl border border-slate-200 bg-white p-6 text-right shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 id="participants-modal-title" className="text-lg font-bold text-slate-900">
              משתתפים
            </h2>
            <p className="mt-1 text-sm text-slate-600">{routeLabel}</p>

            {participants.length === 0 ? (
              <p className="mt-6 text-sm text-slate-600">עדיין אף אחד לא הצטרף להסעה הזו.</p>
            ) : (
              <ul className="mt-5 space-y-3">
                {participants.map((p) => (
                  <li
                    key={p.id}
                    className="flex items-center justify-between gap-3 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5"
                  >
                    <div className="flex min-w-0 flex-1 items-center gap-3">
                      {p.image ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={p.image}
                          alt=""
                          className="h-10 w-10 shrink-0 rounded-full object-cover ring-1 ring-slate-200"
                        />
                      ) : (
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-slate-200 text-xs font-bold text-slate-700">
                          {p.name.slice(0, 1)}
                        </div>
                      )}
                      <div className="min-w-0 text-right">
                        <p className="truncate text-sm font-semibold text-slate-800">{p.name}</p>
                        <p className="truncate text-xs text-slate-500">{p.email}</p>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}

            <button
              type="button"
              onClick={() => setOpen(false)}
              className="mt-6 w-full rounded-xl border border-slate-300 px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 active:scale-[0.98]"
            >
              סגירה
            </button>
          </div>
        </div>
      ) : null}
    </>
  );
}
