import { getHomeFeedListings } from "@/lib/home-listings";
import { type HomeListingFilters } from "@/lib/home-filters";
import { HomeListingsClient } from "@/app/components/home-listings-client";

type Props = {
  filters: HomeListingFilters;
};

export async function HomeFeed({ filters }: Props) {
  const hasActiveFilters = Boolean(
    filters.type || filters.city || filters.dateFrom || filters.dateTo,
  );

  const feed = await getHomeFeedListings(filters);

  return <HomeListingsClient feed={feed} hasActiveFilters={hasActiveFilters} />;
}
