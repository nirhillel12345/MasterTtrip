import Link from "next/link";
import { ListingForm } from "./listing-form";

type NewListingPageProps = {
  searchParams?: Promise<{ error?: string }> | { error?: string };
};

async function resolveParams(
  searchParams?: Promise<{ error?: string }> | { error?: string },
) {
  if (!searchParams) return {};
  if ("then" in searchParams) return await searchParams;
  return searchParams;
}

export default async function NewListingPage({ searchParams }: NewListingPageProps) {
  const params = await resolveParams(searchParams);

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-8 sm:px-6 sm:py-12">
      <section className="mx-auto w-full max-w-2xl">
        <div className="mb-4 flex items-center justify-between">
          <Link href="/" className="text-sm font-medium text-slate-600 hover:text-slate-900">
            חזרה לעמוד הבית
          </Link>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xl shadow-slate-200/60 sm:p-8">
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            פרסמו דירה/סאבלט
          </h1>
          <p className="mt-2 text-sm text-slate-600">
            פרסמו דירה, סאבלט או חדר פנוי ומצאו שותפים — לא ניתן לפרסם כאן חיפוש דירה כמטייל.
          </p>

          {params.error ? (
            <div className="mt-4 rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
              {params.error}
            </div>
          ) : null}

          <ListingForm mode="create" />
        </div>
      </section>
    </main>
  );
}
