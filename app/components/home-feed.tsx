import { MapPin, Plus } from "lucide-react";
import Link from "next/link";
import { ListingCard } from "@/app/components/listing-card";
import { prisma } from "@/lib/prisma";
import { listingWhereFromFilters, type HomeListingFilters } from "@/lib/home-filters";

type Props = {
  filters: HomeListingFilters;
};

export async function HomeFeed({ filters }: Props) {
  const where = listingWhereFromFilters(filters);
  const hasActiveFilters = Boolean(
    filters.type || filters.city || filters.min || filters.max,
  );

  const listings = await prisma.listing.findMany({
    where,
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
    <>
      <div className="mb-6 flex flex-col gap-2 text-right sm:mb-8 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-slate-900 sm:text-2xl">מודעות אחרונות</h2>
          <p className="mt-1.5 text-sm leading-relaxed text-slate-600">
            דירות ושותפים שפורסמו לאחרונה בקהילה.
          </p>
        </div>
        {listings.length > 0 ? (
          <p className="text-sm font-medium text-slate-500">{listings.length} מודעות</p>
        ) : null}
      </div>

      {listings.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-white/90 px-5 py-14 text-center shadow-inner sm:rounded-3xl sm:px-8 sm:py-16">
          <div className="rounded-2xl bg-slate-100 p-4">
            <MapPin className="h-10 w-10 text-slate-400" />
          </div>
          <h3 className="mt-6 text-lg font-semibold text-slate-900 sm:text-xl">
            {hasActiveFilters ? "לא נמצאו מודעות" : "עדיין אין מודעות"}
          </h3>
          <p className="mt-2 max-w-md text-sm leading-relaxed text-slate-600">
            {hasActiveFilters
              ? "נסו לשנות את הסינון או לנקות את המסננים."
              : "היו הראשונים לפרסם — ועזרו למטיילים אחרים למצוא בית בטיול הגדול."}
          </p>
          <Link
            href="/listings/new"
            className="mt-8 inline-flex min-h-[48px] items-center gap-2 rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white shadow-md transition hover:bg-slate-800 active:scale-[0.98] active:bg-slate-900"
          >
            <Plus className="h-4 w-4" />
            {hasActiveFilters ? "פרסמו דירה/סאבלט" : "פרסמו את המודעה הראשונה"}
          </Link>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
          {listings.map((listing) => (
            <ListingCard
              key={listing.id}
              id={listing.id}
              title={listing.title}
              location={listing.location}
              price={listing.price}
              type={listing.type}
              images={listing.images}
            />
          ))}
        </div>
      )}
    </>
  );
}
