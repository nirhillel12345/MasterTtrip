export type DestinationTag = "popular_israeli_destination";

export type DestinationCity = {
  country: string;
  city: string;
  /** Primary airport codes/names as provided by data source. */
  airports: string[];
  tags: DestinationTag[];
};

export type MapCoordinates = { lat: number; lng: number };

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

/** Canonical key for destinations across UI/search/map. */
export function destinationLabel(city: string, country: string): string {
  return `${city}, ${country}`;
}

/**
 * Canonical map coordinates by destination label.
 * Key format: `${city}, ${country}` (must match `POPULAR_DESTINATIONS` labels).
 */
export const DESTINATION_COORDS: Record<string, MapCoordinates> = {
  // Argentina
  "בואנוס איירס, ארגנטינה": { lat: -34.6037, lng: -58.3816 },
  "קורדובה, ארגנטינה": { lat: -31.4201, lng: -64.1888 },
  "מנדוסה, ארגנטינה": { lat: -32.8895, lng: -68.8458 },
  "ברילוצ'ה, ארגנטינה": { lat: -41.1335, lng: -71.3103 },
  "אל קלפטה, ארגנטינה": { lat: -50.3379, lng: -72.2648 },
  "אל צ'אלטן (פיץ רוי), ארגנטינה": { lat: -49.3315, lng: -72.8863 },
  "אושואיה, ארגנטינה": { lat: -54.8019, lng: -68.3030 },
  "איגואסו, ארגנטינה": { lat: -25.5972, lng: -54.5786 },
  "סלטה, ארגנטינה": { lat: -24.7829, lng: -65.4232 },
  "חוחוי, ארגנטינה": { lat: -24.1858, lng: -65.2995 },

  // Brazil
  "ריו דה ז'ניירו, ברזיל": { lat: -22.9068, lng: -43.1729 },
  "סאו פאולו, ברזיל": { lat: -23.5505, lng: -46.6333 },
  "פלוריאנופוליס (פלוריפה), ברזיל": { lat: -27.5949, lng: -48.5482 },
  "אילהה גראנדה, ברזיל": { lat: -23.1434, lng: -44.1976 },
  "מורו דה סאו פאולו, ברזיל": { lat: -13.3760, lng: -38.9160 },
  "פיפה, ברזיל": { lat: -6.2300, lng: -35.0486 },
  "ג'ריקוואקוארה, ברזיל": { lat: -2.7933, lng: -40.5120 },
  "פוז דו איגואסו, ברזיל": { lat: -25.5469, lng: -54.5882 },

  // Chile
  "סנטיאגו, צ'ילה": { lat: -33.4489, lng: -70.6693 },
  "סן פדרו דה אטקמה, צ'ילה": { lat: -22.9087, lng: -68.1997 },
  "פוצ'ון, צ'ילה": { lat: -39.2817, lng: -71.9543 },
  "פוארטו נאטאלס (טורס דל פיינה), צ'ילה": { lat: -51.7236, lng: -72.4875 },

  // Peru
  "לימה, פרו": { lat: -12.0464, lng: -77.0428 },
  "קוסקו, פרו": { lat: -13.5319, lng: -71.9675 },
  "מאצ'ו פיצ'ו, פרו": { lat: -13.1631, lng: -72.5450 },
  "וואראז, פרו": { lat: -9.5290, lng: -77.5288 },
  "וואקאצ'ינה, פרו": { lat: -14.0875, lng: -75.7626 },
  "מנקורה, פרו": { lat: -4.1069, lng: -81.0475 },

  // Colombia
  "בוגוטה, קולומביה": { lat: 4.7110, lng: -74.0721 },
  "מדיין, קולומביה": { lat: 6.2476, lng: -75.5658 },
  "קרטחנה, קולומביה": { lat: 10.3910, lng: -75.4794 },
  "סנטה מרתה (טיירונה), קולומביה": { lat: 11.2408, lng: -74.1990 },
  "סלנטו, קולומביה": { lat: 4.6372, lng: -75.5708 },

  // Bolivia
  "לה פאז, בוליביה": { lat: -16.4897, lng: -68.1193 },
  "סלאר דה אויוני, בוליביה": { lat: -20.1338, lng: -67.4891 },
  "רונבאקה, בוליביה": { lat: -14.4430, lng: -67.5277 },

  // Ecuador
  "קיטו, אקוודור": { lat: -0.1807, lng: -78.4678 },
  "באניוס, אקוודור": { lat: -1.3967, lng: -78.4247 },
  "מונטניטה, אקוודור": { lat: -1.8297, lng: -80.7485 },
  "גלאפגוס, אקוודור": { lat: -0.9538, lng: -90.9656 },
};

/** Backward-compatible flattened list consumed by combobox and validation. */
export const POPULAR_DESTINATIONS = DESTINATION_CITIES.map((d) => destinationLabel(d.city, d.country));

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
