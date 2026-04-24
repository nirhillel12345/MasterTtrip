export type DestinationTag = "popular_israeli_destination";

export type DestinationCity = {
  country: string;
  city: string;
  /** Primary airport codes/names as provided by data source. */
  airports: string[];
  tags: DestinationTag[];
};

/**
 * Official destinations list (Hebrew), grouped by country.
 * UI uses the flattened `POPULAR_DESTINATIONS` values: "<city>, <country>".
 */
export const DESTINATIONS_BY_COUNTRY: ReadonlyArray<{
  country: string;
  cities: ReadonlyArray<{ city: string; airports: string[]; tags?: DestinationTag[] }>;
}> = [
  {
    country: "ארגנטינה",
    cities: [
      { city: "בואנוס איירס", airports: ["EZE", "AEP"], tags: ["popular_israeli_destination"] },
      { city: "קורדובה", airports: ["COR"] },
      { city: "מנדוסה", airports: ["MDZ"] },
      { city: "ברילוצ'ה", airports: ["BRC"] },
      { city: "אל קלפטה", airports: ["FTE"] },
      { city: "אל צ'אלטן (פיץ רוי)", airports: ["FTE"] },
      { city: "אושואיה", airports: ["USH"] },
      { city: "איגואסו", airports: ["IGR"] },
      { city: "סלטה", airports: ["SLA"] },
      { city: "חוחוי", airports: ["JUJ"] },
    ],
  },
  {
    country: "ברזיל",
    cities: [
      { city: "ריו דה ז'ניירו", airports: ["GIG", "SDU"], tags: ["popular_israeli_destination"] },
      { city: "סאו פאולו", airports: ["GRU", "CGH"] },
      { city: "פלוריאנופוליס (פלוריפה)", airports: ["FLN"] },
      { city: "אילהה גראנדה", airports: ["GIG"] },
      { city: "מורו דה סאו פאולו", airports: ["SSA", "VAL"] },
      { city: "פיפה", airports: ["NAT"] },
      { city: "ג'ריקוואקוארה", airports: ["JJD", "FOR"] },
      { city: "פוז דו איגואסו", airports: ["IGU"] },
    ],
  },
  {
    country: "צ'ילה",
    cities: [
      { city: "סנטיאגו", airports: ["SCL"] },
      { city: "סן פדרו דה אטקמה", airports: ["CJC"] },
      { city: "פוצ'ון", airports: ["ZPC", "ZCO"] },
      { city: "פוארטו נאטאלס (טורס דל פיינה)", airports: ["PNT"] },
    ],
  },
  {
    country: "פרו",
    cities: [
      { city: "לימה", airports: ["LIM"], tags: ["popular_israeli_destination"] },
      { city: "קוסקו", airports: ["CUZ"], tags: ["popular_israeli_destination"] },
      { city: "מאצ'ו פיצ'ו", airports: ["CUZ"] },
      { city: "וואראז", airports: ["ATA"] },
      { city: "וואקאצ'ינה", airports: ["LIM"] },
      { city: "מנקורה", airports: ["PIU", "TBP"] },
    ],
  },
  {
    country: "קולומביה",
    cities: [
      { city: "בוגוטה", airports: ["BOG"] },
      { city: "מדיין", airports: ["MDE"], tags: ["popular_israeli_destination"] },
      { city: "קרטחנה", airports: ["CTG"] },
      { city: "סנטה מרתה (טיירונה)", airports: ["SMR"] },
      { city: "סלנטו", airports: ["PEI"] },
    ],
  },
  {
    country: "בוליביה",
    cities: [
      { city: "לה פאז", airports: ["LPB"] },
      { city: "סלאר דה אויוני", airports: ["UYU"] },
      { city: "רונבאקה", airports: ["RBQ"] },
    ],
  },
  {
    country: "אקוודור",
    cities: [
      { city: "קיטו", airports: ["UIO"] },
      { city: "באניוס", airports: ["UIO"] },
      { city: "מונטניטה", airports: ["GYE"], tags: ["popular_israeli_destination"] },
      { city: "גלאפגוס", airports: ["GPS", "SCY"], tags: ["popular_israeli_destination"] },
    ],
  },
] as const;

export const DESTINATION_CITIES: DestinationCity[] = DESTINATIONS_BY_COUNTRY.flatMap((countryBlock) =>
  countryBlock.cities.map((city) => ({
    country: countryBlock.country,
    city: city.city,
    airports: [...city.airports],
    tags: city.tags ? [...city.tags] : [],
  })),
);

/** Backward-compatible flattened list consumed by combobox and validation. */
export const POPULAR_DESTINATIONS = DESTINATION_CITIES.map((d) => `${d.city}, ${d.country}`);

export type PopularDestination = string;

const destinationSet = new Set<string>(POPULAR_DESTINATIONS);

function destinationPriorityScore(label: string): number {
  const found = DESTINATION_CITIES.find((d) => `${d.city}, ${d.country}` === label);
  if (!found) return 1;
  return found.tags.includes("popular_israeli_destination") ? 0 : 1;
}

export function isAllowedDestination(value: string): boolean {
  return destinationSet.has(value.trim());
}

export function filterDestinations(query: string): string[] {
  const q = query.trim().toLowerCase();
  const base = q ? POPULAR_DESTINATIONS.filter((d) => d.toLowerCase().includes(q)) : [...POPULAR_DESTINATIONS];
  return base.sort((a, b) => {
    const p = destinationPriorityScore(a) - destinationPriorityScore(b);
    if (p !== 0) return p;
    return a.localeCompare(b, "he");
  });
}
