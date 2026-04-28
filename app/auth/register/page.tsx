import type { Metadata } from "next";
import { signInWithGoogle } from "@/app/auth/actions";
import { safeNextPath } from "@/lib/auth-redirect";
import { GoogleIcon } from "@/app/auth/google-icon";
import { RegisterForm } from "./register-form";

export const metadata: Metadata = {
  title: "הרשמה | MasterTrip",
  description: "יצירת חשבון MasterTrip",
};

type RegisterPageProps = {
  searchParams?:
    | Promise<{ error?: string; next?: string }>
    | { error?: string; next?: string };
};

async function resolveParams(
  searchParams?: Promise<{ error?: string; next?: string }> | { error?: string; next?: string },
) {
  if (!searchParams) return {};
  if ("then" in searchParams) return await searchParams;
  return searchParams;
}

export default async function RegisterPage({ searchParams }: RegisterPageProps) {
  const params = await resolveParams(searchParams);
  const next = safeNextPath(typeof params.next === "string" ? params.next : undefined);

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10 sm:px-6">
      <section className="mx-auto w-full max-w-md rounded-3xl border border-slate-200 bg-white p-6 shadow-xl shadow-slate-200/60 sm:p-8">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">יצירת חשבון</h1>
        <p className="mt-2 text-sm text-slate-600">הצטרפו לקהילת MasterTrip — פרסמו דירות ונסיעות ומצאו שותפים.</p>

        {params.error ? (
          <div className="mt-4 rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">{params.error}</div>
        ) : null}

        <form action={signInWithGoogle} className="mt-6">
          <input type="hidden" name="next" value={next} />
          <button
            type="submit"
            className="inline-flex w-full min-h-[52px] items-center justify-center gap-3 rounded-xl bg-slate-900 px-4 py-3.5 text-sm font-bold text-white shadow-lg transition hover:bg-slate-800 active:scale-[0.99]"
          >
            <GoogleIcon />
            המשיכו עם Google
          </button>
        </form>

        <div className="my-6 flex items-center gap-3 text-xs font-medium text-slate-400">
          <span className="h-px flex-1 bg-slate-200" />
          או הרשמה עם אימייל
          <span className="h-px flex-1 bg-slate-200" />
        </div>

        <RegisterForm nextPath={next} />

        <p className="mt-6 text-center text-sm text-slate-600">
          כבר יש לכם חשבון?{" "}
          <a href={`/auth/login?next=${encodeURIComponent(next)}`} className="font-semibold text-cyan-700 hover:underline">
            התחברות
          </a>
        </p>
      </section>
    </main>
  );
}
