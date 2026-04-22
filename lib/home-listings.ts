import type { ListingType } from "@/generated/prisma";
import { prisma } from "@/lib/prisma";
import { listingWhereFromFilters, type HomeListingFilters } from "@/lib/home-filters";

export type HomeListingListItem = {
  id: string;
  title: string;
  location: string;
  price: number;
  type: ListingType;
  images: string[];
};

export async function getHomeListings(filters: HomeListingFilters): Promise<HomeListingListItem[]> {
  const where = listingWhereFromFilters(filters);
  return prisma.listing.findMany({
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
}
