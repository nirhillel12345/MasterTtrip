import { Mail } from "lucide-react";
import { signInWithGoogle, signInWithMagicLink } from "@/app/auth/actions";

type LoginPageProps = {
  searchParams?: Promise<{ error?: string; success?: string }> | { error?: string; success?: string };
};

async function resolveParams(
  searchParams?: Promise<{ error?: string; success?: string }> | { error?: string; success?: string },
) {
  if (!searchParams) return {};
  if ("then" in searchParams) return await searchParams;
  return searchParams;
}

function GoogleIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
      <path
        fill="#EA4335"
        d="M12 10.2v3.9h5.5c-.2 1.2-1.4 3.7-5.5 3.7-3.3 0-6-2.7-6-6s2.7-6 6-6c1.9 0 3.2.8 3.9 1.4l2.7-2.6C16.9 3.1 14.7 2.2 12 2.2 6.8 2.2 2.6 6.4 2.6 11.6S6.8 21 12 21c6.9 0 9.2-4.8 9.2-7.3 0-.5-.1-.8-.1-1.1H12z"
      />
    </svg>
  );
}

export default async function LoginPage({ searchParams }: LoginPageProps) {
  const params = await resolveParams(searchParams);

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10 sm:px-6">
      <section className="mx-auto w-full max-w-md rounded-3xl border border-slate-200 bg-white p-6 shadow-xl shadow-slate-200/60 sm:p-8">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">ברוכים הבאים ל-MasterTrip</h1>
        <p className="mt-2 text-sm text-slate-600">
          התחברו כדי לפרסם מודעות, למצוא שותפים ולנהל את המסע שלכם.
        </p>

        {params.error ? (
          <div className="mt-4 rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
            {params.error}
          </div>
        ) : null}

        {params.success === "magic-link-sent" ? (
          <div className="mt-4 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
            קישור התחברות נשלח למייל שלך.
          </div>
        ) : null}

        <form action={signInWithGoogle} className="mt-6">
          <button
            type="submit"
            className="inline-flex w-full items-center justify-center gap-3 rounded-xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
          >
            <GoogleIcon />
            התחברות עם Google
          </button>
        </form>

        <div className="my-6 flex items-center gap-3 text-xs text-slate-400">
          <span className="h-px flex-1 bg-slate-200" />
          או עם קישור קסם
          <span className="h-px flex-1 bg-slate-200" />
        </div>

        <form action={signInWithMagicLink} className="space-y-3">
          <label className="block">
            <span className="mb-1 block text-sm font-medium text-slate-700">אימייל</span>
            <div className="flex items-center gap-2 rounded-xl border border-slate-300 px-4 py-3 focus-within:border-cyan-500 focus-within:ring-2 focus-within:ring-cyan-200">
              <Mail className="h-4 w-4 text-slate-400" />
              <input
                name="email"
                type="email"
                required
                dir="ltr"
                placeholder="you@example.com"
                className="w-full text-sm outline-none placeholder:text-slate-400"
              />
            </div>
          </label>

          <button
            type="submit"
            className="inline-flex w-full items-center justify-center rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm font-semibold text-slate-800 transition hover:bg-slate-100"
          >
            שלחו לי Magic Link
          </button>
        </form>
      </section>
    </main>
  );
}
