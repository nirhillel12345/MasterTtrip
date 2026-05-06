"use client";

import { Users } from "lucide-react";
import { useEffect, useState } from "react";

export type AttractionParticipantRow = {
  id: string;
  name: string;
  email: string;
  image: string | null;
};

type Props = {
  title: string;
  participants: AttractionParticipantRow[];
};

export function AttractionParticipantsModal({ title, participants }: Props) {
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
          className="fixed inset-0 z-[100] flex items-end justify-center bg-slate-900/50 p-0 backdrop-blur-sm sm:items-center sm:p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="attraction-participants-title"
          onClick={(e) => {
            if (e.target === e.currentTarget) setOpen(false);
          }}
        >
          <div
            className="h-[92vh] w-full overflow-y-auto rounded-t-3xl border border-slate-200 bg-white p-5 text-right shadow-2xl sm:h-auto sm:max-h-[85vh] sm:max-w-md sm:rounded-2xl sm:p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 id="attraction-participants-title" className="text-lg font-bold text-slate-900">
              משתתפים
            </h2>
            <p className="mt-1 text-sm text-slate-600">{title}</p>

            {participants.length === 0 ? (
              <p className="mt-6 text-sm text-slate-600">עדיין אף אחד לא נרשם לאטרקציה הזו.</p>
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
                        <img src={p.image} alt="" className="h-10 w-10 shrink-0 rounded-full object-cover ring-1 ring-slate-200" />
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
