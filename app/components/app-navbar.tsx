"use client";

import { Bus, CircleUser, Home, LayoutGrid, LogOut, Menu, PenSquare, WandSparkles, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { signOut } from "@/app/auth/actions";

export type AppNavbarUser = {
  displayName: string;
  avatar: string | null;
} | null;

type Props = {
  user: AppNavbarUser;
};

/** Mobile drawer: full-width row, RTL — text at inline-start (right), icon after */
const mobileDrawerLinkClass =
  "flex w-full items-center justify-start gap-3 rounded-xl px-4 py-3 text-base font-semibold text-slate-800 transition hover:bg-slate-100 active:scale-[0.99] active:bg-slate-200/80";

const desktopLinkClass =
  "rounded-full px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-cyan-400 hover:bg-cyan-50/50 active:scale-[0.98] border border-transparent hover:border-slate-300";

export function AppNavbar({ user }: Props) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
    <header className="sticky top-0 z-20 border-b border-slate-200/90 bg-white/95 backdrop-blur-md supports-[backdrop-filter]:bg-white/90">
      <nav
        className="mx-auto flex w-full max-w-6xl items-center justify-between gap-3 px-4 py-3.5 sm:px-6 sm:py-4"
        dir="rtl"
        aria-label="ניווט ראשי"
      >
        <Link
          href="/"
          className="flex min-w-0 flex-1 items-center gap-2 rounded-xl py-1 transition active:opacity-90 md:flex-none md:shrink-0"
          onClick={() => setOpen(false)}
        >
          <div className="shrink-0 rounded-xl bg-gradient-to-br from-emerald-400 to-cyan-500 p-2 text-white shadow-lg shadow-emerald-200">
            <WandSparkles className="h-4 w-4" aria-hidden />
          </div>
          <span className="min-w-0 truncate text-lg font-bold tracking-tight text-slate-900">MasterTrip</span>
        </Link>

        <div className="hidden min-w-0 flex-1 items-center justify-center gap-1 md:flex lg:gap-2">
          <Link href="/" className={desktopLinkClass}>
            <span className="inline-flex items-center gap-1.5">
              <Home className="h-4 w-4 text-slate-500" />
              דף הבית
            </span>
          </Link>
          <Link
            href="/listings/new"
            className="inline-flex items-center gap-1.5 rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white shadow-md transition hover:bg-slate-800 active:scale-[0.98]"
          >
            <PenSquare className="h-4 w-4 text-cyan-200" />
            פרסום מודעה
          </Link>
          <Link href="/transports" className={desktopLinkClass}>
            <span className="inline-flex items-center gap-1.5">
              <Bus className="h-4 w-4 text-slate-500" />
              נסיעות
            </span>
          </Link>
          {user ? (
            <Link href="/my-listings" className={desktopLinkClass}>
              <span className="inline-flex items-center gap-1.5">
                <LayoutGrid className="h-4 w-4 text-slate-500" />
                המודעות שלי
              </span>
            </Link>
          ) : null}
          {user ? (
            <Link href="/profile" className={desktopLinkClass}>
              <span className="inline-flex items-center gap-1.5">
                <CircleUser className="h-4 w-4 text-slate-500" />
                הפרופיל שלי
              </span>
            </Link>
          ) : null}
        </div>

        <div className="flex min-w-0 shrink-0 items-center justify-end gap-2">
          {!user ? (
            <Link
              href="/auth/login"
              className="inline-flex shrink-0 items-center justify-center rounded-full bg-gradient-to-l from-cyan-500 to-cyan-400 px-2.5 py-1.5 text-xs font-bold text-slate-900 shadow-md shadow-cyan-900/15 transition hover:from-cyan-400 hover:to-cyan-300 active:scale-[0.97] md:hidden"
              onClick={() => setOpen(false)}
            >
              נסו בחינם
            </Link>
          ) : null}

          <div className="hidden items-center gap-2 md:flex">
            {user ? (
              <>
                <div className="inline-flex max-w-[200px] items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1.5">
                  {user.avatar ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={user.avatar}
                      alt=""
                      className="h-8 w-8 shrink-0 rounded-full object-cover ring-1 ring-slate-100"
                    />
                  ) : (
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-slate-200 text-sm font-bold text-slate-700">
                      {user.displayName.slice(0, 1)}
                    </div>
                  )}
                  <span className="truncate text-sm font-semibold text-slate-800">{user.displayName}</span>
                </div>
                <form action={signOut}>
                  <button
                    type="submit"
                    className="inline-flex items-center gap-1.5 rounded-full border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-slate-400 hover:bg-slate-100 active:scale-[0.98]"
                  >
                    <LogOut className="h-4 w-4" />
                    יציאה
                  </button>
                </form>
              </>
            ) : (
              <Link
                href="/auth/login"
                className="rounded-full border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 active:scale-[0.98]"
              >
                התחברות
              </Link>
            )}
          </div>

          <button
            type="button"
            className="flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-800 shadow-sm transition hover:border-slate-300 hover:bg-slate-50 active:scale-95 md:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav-drawer"
            aria-label={open ? "סגירת תפריט" : "פתיחת תפריט"}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>
    </header>

      {/* Outside header so z-index stacks above page content */}
      <div
        className={`fixed inset-0 z-[60] bg-slate-900/45 backdrop-blur-[2px] transition-opacity duration-300 md:hidden ${
          open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        }`}
        aria-hidden={!open}
        onClick={() => setOpen(false)}
      />

      <div
        id="mobile-nav-drawer"
        className={`fixed inset-y-0 right-0 z-[70] flex w-[min(100%,20rem)] max-w-[min(100vw,20rem)] flex-col border-l border-slate-200/90 bg-white shadow-[-12px_0_40px_-8px_rgba(15,23,42,0.18)] transition-transform duration-300 ease-out md:hidden ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
        dir="rtl"
      >
        <div className="flex items-center justify-between border-b border-slate-100 px-4 py-4">
          <span className="text-sm font-bold text-slate-900">תפריט</span>
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="flex h-10 w-10 items-center justify-center rounded-xl text-slate-600 transition hover:bg-slate-100 active:scale-95"
            aria-label="סגירה"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {user ? (
          <div className="border-b border-slate-100 px-4 py-5">
            <div className="flex items-center gap-3">
              {user.avatar ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={user.avatar}
                  alt=""
                  className="h-14 w-14 shrink-0 rounded-full object-cover ring-2 ring-slate-100 shadow-md"
                />
              ) : (
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-slate-200 to-slate-300 text-lg font-bold text-slate-700 shadow-inner">
                  {user.displayName.slice(0, 1)}
                </div>
              )}
              <div className="min-w-0 flex-1 text-right">
                <p className="truncate text-base font-bold text-slate-900">{user.displayName}</p>
                <p className="text-xs text-slate-500">מחוברים ל-MasterTrip</p>
              </div>
            </div>
          </div>
        ) : null}

        <div className="flex flex-1 flex-col gap-1 overflow-y-auto px-4 py-4 pb-[max(1rem,env(safe-area-inset-bottom))]">
          <Link href="/" className={mobileDrawerLinkClass} onClick={() => setOpen(false)}>
            דף הבית
            <Home className="h-5 w-5 shrink-0 text-cyan-600" aria-hidden />
          </Link>
          <Link href="/listings/new" className={mobileDrawerLinkClass} onClick={() => setOpen(false)}>
            פרסום מודעה
            <PenSquare className="h-5 w-5 shrink-0 text-cyan-600" aria-hidden />
          </Link>
          <Link href="/transports" className={mobileDrawerLinkClass} onClick={() => setOpen(false)}>
            נסיעות ושאטלים
            <Bus className="h-5 w-5 shrink-0 text-cyan-600" aria-hidden />
          </Link>
          {user ? (
            <Link href="/my-listings" className={mobileDrawerLinkClass} onClick={() => setOpen(false)}>
              המודעות שלי
              <LayoutGrid className="h-5 w-5 shrink-0 text-cyan-600" aria-hidden />
            </Link>
          ) : null}
          {user ? (
            <Link href="/profile" className={mobileDrawerLinkClass} onClick={() => setOpen(false)}>
              הפרופיל שלי
              <CircleUser className="h-5 w-5 shrink-0 text-cyan-600" aria-hidden />
            </Link>
          ) : null}

          {!user ? (
            <Link href="/auth/login" className={mobileDrawerLinkClass} onClick={() => setOpen(false)}>
              התחברות
            </Link>
          ) : (
            <form action={signOut} className="w-full">
              <button type="submit" className={mobileDrawerLinkClass}>
                יציאה מהחשבון
                <LogOut className="h-5 w-5 shrink-0 text-cyan-600" aria-hidden />
              </button>
            </form>
          )}
        </div>
      </div>
    </>
  );
}
