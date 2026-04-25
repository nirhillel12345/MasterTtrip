import { getHomeFeedListings } from "@/lib/home-listings";
import { getHomeTransports } from "@/lib/home-transports";
import { type HomeListingFilters } from "@/lib/home-filters";
import { HomeListingsClient } from "@/app/components/home-listings-client";

type Props = {
  filters: HomeListingFilters;
};

export async function HomeFeed({ filters }: Props) {
  const hasActiveFilters = Boolean(
    filters.city || filters.dateFrom || filters.dateTo,
  );

  const feed = await getHomeFeedListings(filters);
  const transports = await getHomeTransports();

  return <HomeListingsClient feed={feed} transports={transports} hasActiveFilters={hasActiveFilters} />;
}
