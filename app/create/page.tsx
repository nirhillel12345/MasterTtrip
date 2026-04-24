import Link from "next/link";
import { CreateSwitcher } from "./create-switcher";

export default function CreatePage() {
  return (
    <main className="min-h-screen bg-slate-50 px-4 py-8 sm:px-6 sm:py-12" dir="rtl">
      <section className="mx-auto w-full max-w-3xl">
        <div className="mb-4 flex items-center justify-between">
          <Link href="/" className="text-sm font-medium text-slate-600 hover:text-slate-900">
            חזרה לעמוד הבית
          </Link>
        </div>
        <CreateSwitcher />
      </section>
    </main>
  );
}
