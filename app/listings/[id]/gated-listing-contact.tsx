"use client";

import { Lock } from "lucide-react";
import { useRouter } from "next/navigation";
import type { ReactNode } from "react";

type Props = {
  unlocked: boolean;
  returnPath: string;
  className?: string;
  children: ReactNode;
};

export function GatedListingContact({ unlocked, returnPath, className = "", children }: Props) {
  const router = useRouter();

  if (unlocked) {
    return <div className={className}>{children}</div>;
  }

  const loginUrl = `/auth/login?next=${encodeURIComponent(returnPath)}`;

  return (
    <div className={`relative ${className}`}>
      <div className="pointer-events-none select-none blur-[2.5px] opacity-[0.68]" aria-hidden>
        {children}
      </div>
      <button
        type="button"
        onClick={() => router.push(loginUrl)}
        className="absolute inset-0 z-10 flex cursor-pointer items-center justify-center gap-2 rounded-[inherit] border-0 bg-slate-900/15 px-3 py-2 text-slate-900 backdrop-blur-[2px] transition hover:bg-slate-900/25 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-600"
        aria-label="התחבר כדי לקבל פרטים"
      >
        <Lock className="h-5 w-5 shrink-0 sm:h-6 sm:w-6" strokeWidth={2.25} aria-hidden />
        <span className="text-right text-sm font-semibold leading-snug sm:text-base">התחבר כדי לקבל פרטים</span>
      </button>
    </div>
  );
}
