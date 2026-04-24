import type { ListingType, Prisma } from "@/generated/prisma";
import { prisma } from "@/lib/prisma";
import {
  getHomeSearchDateRange,
  listingBaseWhereFromFilters,
  listingWhereFromFilters,
  type HomeListingFilters,
} from "@/lib/home-filters";

const MS_PER_DAY = 86400000;
/** When exact matches fall below this count, also load flexible-date suggestions. */
const FEW_EXACT_THRESHOLD = 3;

export type HomeListingListItem = {
  id: string;
  title: string;
  location: string;
  price: number;
  type: ListingType;
  images: string[];
};

export type HomeFeedListings = {
  exact: HomeListingListItem[];
  flexible: HomeListingListItem[];
  usedDateFilter: boolean;
  /** True when a date range is applied, there are zero exact matches, but flexible suggestions exist. */
  suggestFlexibleMessaging: boolean;
};

const listingSelect = {
  id: true,
  title: true,
  location: true,
  price: true,
  type: true,
  images: true,
  startDate: true,
  endDate: true,
} as const;

type ListingRow = {
  id: string;
  title: string;
  location: string;
  price: number;
  type: ListingType;
  images: string[];
  startDate: Date;
  endDate: Date;
};

function toListItem(row: ListingRow): HomeListingListItem {
  return {
    id: row.id,
    title: row.title,
    location: row.location,
    price: row.price,
    type: row.type,
    images: row.images,
  };
}

function addDaysUtc(d: Date, days: number): Date {
  const x = new Date(d.getTime());
  x.setUTCDate(x.getUTCDate() + days);
  return x;
}

function isExactCover(Ls: Date, Le: Date, Us: Date, Ue: Date): boolean {
  return Ls.getTime() <= Us.getTime() && Le.getTime() >= Ue.getTime();
}

function overlapMs(Ls: Date, Le: Date, Us: Date, Ue: Date): number {
  const a = Math.max(Ls.getTime(), Us.getTime());
  const b = Math.min(Le.getTime(), Ue.getTime());
  return Math.max(0, b - a);
}

function userSpanMs(Us: Date, Ue: Date): number {
  return Math.max(Ue.getTime() - Us.getTime(), MS_PER_DAY);
}

function overlapRatio(Ls: Date, Le: Date, Us: Date, Ue: Date): number {
  return overlapMs(Ls, Le, Us, Ue) / userSpanMs(Us, Ue);
}

/** Positive gap (ms) when listing and user windows are disjoint; 0 when overlapping or touching. */
function edgeGapMs(Ls: Date, Le: Date, Us: Date, Ue: Date): number {
  if (Le.getTime() < Us.getTime()) return Us.getTime() - Le.getTime();
  if (Ls.getTime() > Ue.getTime()) return Ls.getTime() - Ue.getTime();
  return 0;
}

/**
 * Non-exact listing that either overlaps the requested window by ≥70%,
 * overlaps by at least 20% (partial fit), or is disjoint but within 3 days of the requested range.
 */
function qualifiesFlexible(
  Ls: Date,
  Le: Date,
  Us: Date,
  Ue: Date,
  expandedFrom: Date,
  expandedTo: Date,
): boolean {
  if (isExactCover(Ls, Le, Us, Ue)) return false;
  const inExpanded = Ls.getTime() <= expandedTo.getTime() && Le.getTime() >= expandedFrom.getTime();
  if (!inExpanded) return false;

  const ratio = overlapRatio(Ls, Le, Us, Ue);
  if (ratio >= 0.7) return true;

  const gap = edgeGapMs(Ls, Le, Us, Ue);
  if (gap > 0 && gap <= 3 * MS_PER_DAY) return true;

  if (ratio >= 0.2 && ratio < 0.7) return true;

  return false;
}

export async function getHomeFeedListings(filters: HomeListingFilters): Promise<HomeFeedListings> {
  const dateRange = getHomeSearchDateRange(filters);
  const exactWhere = listingWhereFromFilters(filters);

  const exactRows = await prisma.listing.findMany({
    where: exactWhere,
    orderBy: { createdAt: "desc" },
    select: listingSelect,
  });

  const exact = exactRows.map(toListItem);

  if (!dateRange) {
    return {
      exact,
      flexible: [],
      usedDateFilter: false,
      suggestFlexibleMessaging: false,
    };
  }

  const { fromAt, toAt } = dateRange;

  if (exact.length >= FEW_EXACT_THRESHOLD) {
    return {
      exact,
      flexible: [],
      usedDateFilter: true,
      suggestFlexibleMessaging: false,
    };
  }

  const expandedFrom = addDaysUtc(fromAt, -3);
  const expandedTo = addDaysUtc(toAt, 3);

  const base = listingBaseWhereFromFilters(filters);
  const candidateAnd: Prisma.ListingWhereInput[] = [
    { startDate: { lte: expandedTo }, endDate: { gte: expandedFrom } },
    {
      NOT: {
        AND: [{ startDate: { lte: fromAt } }, { endDate: { gte: toAt } }],
      },
    },
  ];
  if (Object.keys(base).length > 0) {
    candidateAnd.unshift(base);
  }

  const candidateRows = await prisma.listing.findMany({
    where: { AND: candidateAnd },
    orderBy: { createdAt: "desc" },
    take: 120,
    select: listingSelect,
  });

  const exactIds = new Set(exact.map((l) => l.id));

  const flexibleScored = candidateRows
    .filter((row) => !exactIds.has(row.id))
    .filter((row) =>
      qualifiesFlexible(row.startDate, row.endDate, fromAt, toAt, expandedFrom, expandedTo),
    )
    .map((row) => ({
      item: toListItem(row),
      score: overlapRatio(row.startDate, row.endDate, fromAt, toAt),
    }))
    .sort((a, b) => b.score - a.score);

  const flexible = flexibleScored.map(({ item }) => item);

  return {
    exact,
    flexible,
    usedDateFilter: true,
    suggestFlexibleMessaging: exact.length === 0 && flexible.length > 0,
  };
}
