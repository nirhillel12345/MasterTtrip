import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { ListingForm, type ListingFormInitial } from "@/app/listings/new/listing-form";
import { prisma } from "@/lib/prisma";
import { createSupabaseServerClient } from "@/lib/supabase/server";

type PageProps = { params: Promise<{ id: string }> | { id: string } };

async function resolveParams(params: PageProps["params"]) {
  if (params && "then" in params) return await params;
  return params ?? { id: "" };
}

function toInputDate(d: Date): string {
  const x = new Date(d);
  const y = x.getFullYear();
  const m = String(x.getMonth() + 1).padStart(2, "0");
  const day = String(x.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

export default async function EditListingPage({ params }: PageProps) {
  const { id } = await resolveParams(params);

  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user?.email) {
    redirect("/auth/login?error=" + encodeURIComponent("יש להתחבר"));
  }

  const dbUser = await prisma.user.findUnique({ where: { email: user.email } });
  if (!dbUser) redirect("/auth/login");

  const listing = await prisma.listing.findUnique({
    where: { id },
  });

  if (!listing || listing.userId !== dbUser.id) {
    notFound();
  }

  const initial: ListingFormInitial = {
    title: listing.title,
    location: listing.location,
    price: listing.price,
    startDate: toInputDate(listing.startDate),
    endDate: toInputDate(listing.endDate),
    whatsappNumber: listing.whatsappNumber,
    roommatesNeeded: listing.roommatesNeeded,
    images: [...listing.images],
  };

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-8 sm:px-6 sm:py-12" dir="rtl">
      <section className="mx-auto w-full max-w-2xl">
        <div className="mb-4 flex items-center justify-between">
          <Link href="/my-listings" className="text-sm font-medium text-slate-600 transition hover:text-slate-900 active:opacity-80">
            חזרה להמודעות שלי
          </Link>
          <Link href={`/listings/${id}`} className="text-sm font-medium text-cyan-700 transition hover:text-cyan-900 active:opacity-80">
            צפייה במודעה
          </Link>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xl shadow-slate-200/60 sm:p-8">
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">עריכת מודעה</h1>
          <p className="mt-2 text-sm text-slate-600">
            עדכנו את הפרטים ושמרו — התמונות הקיימות נשמרות עד שתסירו אותן. כל המודעות כאן מוגדרות כדירה / סאבלט פנוי.
          </p>

          <ListingForm mode="edit" listingId={id} initial={initial} />
        </div>
      </section>
    </main>
  );
}
