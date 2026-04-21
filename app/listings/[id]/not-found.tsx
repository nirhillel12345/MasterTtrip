import { Home, MapPinOff } from "lucide-react";
import Link from "next/link";

export default function ListingNotFound() {
  return (
    <main
      dir="rtl"
      className="flex min-h-[70vh] flex-col items-center justify-center bg-slate-50 px-4 py-16 text-center"
    >
      <div className="rounded-3xl border border-slate-200 bg-white p-10 shadow-xl shadow-slate-200/50 sm:max-w-md">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-100">
          <MapPinOff className="h-8 w-8 text-slate-400" />
        </div>
        <h1 className="mt-6 text-2xl font-bold tracking-tight text-slate-900">המודעה לא נמצאה</h1>
        <p className="mt-3 text-sm leading-relaxed text-slate-600">
          ייתכן שהוסרה או שהקישור שגוי. חזרו לעמוד הבית כדי לגלות מודעות אחרות.
        </p>
        <Link
          href="/"
          className="mt-8 inline-flex items-center justify-center gap-2 rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
        >
          <Home className="h-4 w-4" />
          חזרה לעמוד הבית
        </Link>
      </div>
    </main>
  );
}
