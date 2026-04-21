import { Pencil, Plus } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { DeleteListingButton } from "./delete-listing-button";
import { ListingCard } from "@/app/components/listing-card";
import { prisma } from "@/lib/prisma";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export default async function MyListingsPage() {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user?.email) {
    redirect("/auth/login?error=" + encodeURIComponent("יש להתחבר כדי לצפות במודעות שלך"));
  }

  const dbUser = await prisma.user.findUnique({
    where: { email: user.email },
  });
  if (!dbUser) {
    redirect("/auth/login");
  }

  const listings = await prisma.listing.findMany({
    where: { userId: dbUser.id },
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      title: true,
      location: true,
      price: true,
      type: true,
      images: true,
    },
  });

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900" dir="rtl">
      <header className="border-b border-slate-200/90 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-4 sm:px-6">
          <div>
            <h1 className="text-xl font-bold text-slate-900 sm:text-2xl">המודעות שלי</h1>
            <p className="mt-1 text-sm text-slate-600">ניהול המודעות שפרסמת ב-MasterTrip</p>
          </div>
          <div className="flex flex-wrap items-center justify-end gap-2">
            <Link
              href="/"
              className="rounded-full border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 active:scale-[0.98]"
            >
              עמוד הבית
            </Link>
            <Link
              href="/listings/new"
              className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white shadow-md transition hover:bg-slate-800 active:scale-[0.98]"
            >
              <Plus className="h-4 w-4" />
              מודעה חדשה
            </Link>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-10">
        {listings.length === 0 ? (
          <div className="flex flex-col items-center rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center shadow-inner">
            <p className="text-slate-600">עדיין לא פרסמת מודעות.</p>
            <Link
              href="/listings/new"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-cyan-600 px-6 py-3 text-sm font-bold text-white shadow-lg transition hover:bg-cyan-700 active:scale-[0.98]"
            >
              <Plus className="h-4 w-4" />
              פרסמו מודעה ראשונה
            </Link>
          </div>
        ) : (
          <ul className="space-y-5 sm:space-y-6">
            {listings.map((listing) => (
              <li key={listing.id} className="flex flex-col gap-4 sm:flex-row sm:items-stretch sm:gap-5">
                <div className="min-w-0 flex-1">
                  <ListingCard
                    id={listing.id}
                    title={listing.title}
                    location={listing.location}
                    price={listing.price}
                    type={listing.type}
                    images={listing.images}
                  />
                </div>
                <div className="flex shrink-0 flex-row justify-stretch gap-2 sm:w-40 sm:flex-col sm:justify-center">
                  <Link
                    href={`/listings/${listing.id}/edit`}
                    className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-xs font-semibold text-slate-800 shadow-sm transition hover:border-cyan-400 hover:bg-cyan-50/40 active:scale-[0.98] sm:text-sm"
                  >
                    <Pencil className="h-3.5 w-3.5" />
                    עריכה
                  </Link>
                  <DeleteListingButton listingId={listing.id} title={listing.title} />
                </div>
              </li>
            ))}
          </ul>
        )}
      </main>
    </div>
  );
}
