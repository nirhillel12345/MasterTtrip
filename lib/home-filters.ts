import type { Prisma } from "@/generated/prisma";

export type HomeListingFilters = {
  type: "" | "LOOKING_FOR" | "HAS_APARTMENT";
  city: string;
  min: string;
  max: string;
};

export function parseHomeFilters(
  sp: Record<string, string | string[] | undefined>,
): HomeListingFilters {
  const g = (k: string) => {
    const v = sp[k];
    if (typeof v === "string") return v;
    if (Array.isArray(v) && v[0]) return v[0];
    return "";
  };
  const t = g("type");
  const type =
    t === "LOOKING_FOR" || t === "HAS_APARTMENT" ? (t as HomeListingFilters["type"]) : "";
  return {
    type,
    city: g("city").trim(),
    min: g("min").trim(),
    max: g("max").trim(),
  };
}

export function listingWhereFromFilters(f: HomeListingFilters): Prisma.ListingWhereInput {
  const and: Prisma.ListingWhereInput[] = [];

  if (f.type === "LOOKING_FOR" || f.type === "HAS_APARTMENT") {
    and.push({ type: f.type });
  }

  if (f.city) {
    and.push({
      location: { contains: f.city, mode: "insensitive" },
    });
  }

  const minN = f.min ? Number(f.min) : NaN;
  const maxN = f.max ? Number(f.max) : NaN;
  const price: { gte?: number; lte?: number } = {};
  if (!Number.isNaN(minN) && minN >= 0) price.gte = minN;
  if (!Number.isNaN(maxN) && maxN >= 0) price.lte = maxN;
  if (Object.keys(price).length) {
    and.push({ price });
  }

  return and.length ? { AND: and } : {};
}
