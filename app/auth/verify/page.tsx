import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { safeNextPath } from "@/lib/auth-redirect";
import { VerifyForm } from "./verify-form";

export const metadata: Metadata = {
  title: "אימות מייל | MasterTrip",
  description: "אימות חשבון באמצעות קוד חד-פעמי",
};

type VerifyPageProps = {
  searchParams?:
    | Promise<{ email?: string; error?: string; success?: string; next?: string }>
    | { email?: string; error?: string; success?: string; next?: string };
};

async function resolveParams(
  searchParams?:
    | Promise<{ email?: string; error?: string; success?: string; next?: string }>
    | { email?: string; error?: string; success?: string; next?: string },
) {
  if (!searchParams) return {};
  if ("then" in searchParams) return await searchParams;
  return searchParams;
}

export default async function VerifyPage({ searchParams }: VerifyPageProps) {
  const params = await resolveParams(searchParams);
  const email = typeof params.email === "string" ? params.email.trim().toLowerCase() : "";
  const next = safeNextPath(typeof params.next === "string" ? params.next : undefined);
  if (!email) {
    redirect("/auth/login?error=" + encodeURIComponent("חסר אימייל לאימות. התחברו ונסו שוב."));
  }

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10 sm:px-6">
      <section className="mx-auto w-full max-w-md rounded-3xl border border-slate-200 bg-white p-6 shadow-xl shadow-slate-200/60 sm:p-8">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">אימות כתובת אימייל</h1>
        <p className="mt-2 text-sm text-slate-600">
          שלחנו קוד חד-פעמי למייל. הזינו את הקוד כדי להשלים את האימות.
        </p>

        {params.error ? (
          <div className="mt-4 rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">{params.error}</div>
        ) : null}
        {params.success === "verification-code-sent" ? (
          <div className="mt-4 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
            קוד אימות נשלח למייל שלכם.
          </div>
        ) : null}

        <div className="mt-6">
          <VerifyForm email={email} nextPath={next} />
        </div>

        <p className="mt-6 text-center text-sm text-slate-600">
          רוצים להתחבר בדרך אחרת?{" "}
          <Link href={`/auth/login?next=${encodeURIComponent(next)}`} className="font-semibold text-cyan-700 hover:underline">
            חזרה להתחברות
          </Link>
        </p>
      </section>
    </main>
  );
}
