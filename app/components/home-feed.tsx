import { getHomeListings } from "@/lib/home-listings";
import { type HomeListingFilters } from "@/lib/home-filters";
import { HomeListingsClient } from "@/app/components/home-listings-client";

type Props = {
  filters: HomeListingFilters;
};

export async function HomeFeed({ filters }: Props) {
  const hasActiveFilters = Boolean(
    filters.type || filters.city || filters.min || filters.max,
  );

  const listings = await getHomeListings(filters);

  return <HomeListingsClient listings={listings} hasActiveFilters={hasActiveFilters} />;
}
