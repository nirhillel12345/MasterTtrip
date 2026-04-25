import type { Prisma } from "@/generated/prisma";

const ISO_DAY = /^\d{4}-\d{2}-\d{2}$/;

function addOneDayUtcNoon(isoDate: string): string {
  const d = new Date(`${isoDate}T12:00:00.000Z`);
  d.setUTCDate(d.getUTCDate() + 1);
  return d.toISOString().slice(0, 10);
}

function normalizeAvailabilityRange(
  from: string,
  to: string,
): { from: string; to: string } | null {
  const a = from.trim().slice(0, 10);
  const b = to.trim().slice(0, 10);
  if (!ISO_DAY.test(a) || !ISO_DAY.test(b)) return null;
  const start = new Date(`${a}T12:00:00.000Z`);
  const end = new Date(`${b}T12:00:00.000Z`);
  if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime())) return null;
  const fromDay = a;
  let toDay = b;
  if (toDay < fromDay) toDay = addOneDayUtcNoon(fromDay);
  return { from: fromDay, to: toDay };
}

export type HomeListingFilters = {
  city: string;
  /** YYYY-MM-DD from URL `from` / `to`; both valid = availability filter */
  dateFrom: string;
  dateTo: string;
};

/** Location (+ only listings that offer a place / sublet). */
export function listingBaseWhereFromFilters(f: HomeListingFilters): Prisma.ListingWhereInput {
  const and: Prisma.ListingWhereInput[] = [{ type: "HAS_APARTMENT" }];

  if (f.city) {
    and.push({
      location: { contains: f.city, mode: "insensitive" },
    });
  }

  return and.length ? { AND: and } : {};
}

export function getHomeSearchDateRange(
  f: HomeListingFilters,
): { fromAt: Date; toAt: Date } | null {
  const range = normalizeAvailabilityRange(f.dateFrom, f.dateTo);
  if (!range) return null;
  const fromAt = new Date(`${range.from}T12:00:00.000Z`);
  const toAt = new Date(`${range.to}T12:00:00.000Z`);
  if (Number.isNaN(fromAt.getTime()) || Number.isNaN(toAt.getTime())) return null;
  return { fromAt, toAt };
}

export function parseHomeFilters(
  sp: Record<string, string | string[] | undefined>,
): HomeListingFilters {
  const g = (k: string) => {
    const v = sp[k];
    if (typeof v === "string") return v;
    if (Array.isArray(v) && v[0]) return v[0];
    return "";
  };
  const dateFrom = g("from").trim().slice(0, 10);
  const dateTo = g("to").trim().slice(0, 10);
  return {
    city: g("city").trim(),
    dateFrom,
    dateTo,
  };
}

export function listingWhereFromFilters(f: HomeListingFilters): Prisma.ListingWhereInput {
  const parts: Prisma.ListingWhereInput[] = [];
  const base = listingBaseWhereFromFilters(f);
  if (Object.keys(base).length > 0) {
    parts.push(base);
  }

  const dr = getHomeSearchDateRange(f);
  if (dr) {
    parts.push({
      startDate: { lte: dr.fromAt },
      endDate: { gte: dr.toAt },
    });
  }

  return parts.length ? { AND: parts } : {};
}
