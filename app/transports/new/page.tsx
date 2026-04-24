import Link from "next/link";
import { redirect } from "next/navigation";
import { TransportForm } from "./transport-form";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export default async function NewTransportPage() {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user?.email) {
    redirect("/auth/login?error=" + encodeURIComponent("יש להתחבר כדי לפרסם נסיעה") + "&next=/transports/new");
  }

  return (
    <div className="min-h-screen overflow-x-hidden bg-slate-50 px-4 py-8 text-slate-900 sm:px-6 sm:py-10" dir="rtl">
      <section className="mx-auto w-full max-w-3xl overflow-x-hidden rounded-3xl border border-slate-200 bg-white p-6 shadow-xl shadow-slate-200/60 sm:p-8">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <div className="text-right">
            <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">פרסום נסיעה / שאטל</h1>
            <p className="mt-1.5 text-sm text-slate-600">צרו נסיעה חדשה, הגדירו מקומות ומחיר, ואפשרו למטיילים להצטרף.</p>
          </div>
          <Link
            href="/transports"
            className="rounded-full border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 active:scale-[0.98]"
          >
            לכל הנסיעות
          </Link>
        </div>
        <TransportForm />
      </section>
    </div>
  );
}
