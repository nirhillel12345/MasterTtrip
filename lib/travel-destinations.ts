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
      { city: "פלרמו (בואנוס איירס)", airports: ["AEP", "EZE"], tags: ["popular_israeli_destination"] },
      { city: "רקולטה (בואנוס איירס)", airports: ["AEP", "EZE"], tags: ["popular_israeli_destination"] },
      { city: "סן טלמו", airports: ["AEP", "EZE"], tags: ["popular_israeli_destination"] },
      { city: "פוארטו מדרו", airports: ["AEP", "EZE"], tags: ["popular_israeli_destination"] },
      { city: "לה בוקה", airports: ["AEP", "EZE"] },
      { city: "בלגרנו", airports: ["AEP", "EZE"] },
      { city: "וילה קרספו", airports: ["AEP", "EZE"] },
      { city: "טיגר", airports: ["AEP"] },
      { city: "קורדובה", airports: ["COR"] },
      { city: "וילה קרלוס פאס", airports: ["COR"] },
      { city: "מנדוסה", airports: ["MDZ"] },
      { city: "ברילוצ'ה", airports: ["BRC"] },
      { city: "סרו קתדרל (ברילוצ'ה)", airports: ["BRC"], tags: ["popular_israeli_destination"] },
      { city: "לנין", airports: ["BRC"] },
      { city: "אל קלפטה", airports: ["FTE"] },
      { city: "אל צ'אלטן (פיץ רוי)", airports: ["FTE"], tags: ["popular_israeli_destination"] },
      { city: "לגונה קאפרי (אל צ'אלטן)", airports: ["FTE"], tags: ["popular_israeli_destination"] },
      { city: "מיראדור פיץ רוי", airports: ["FTE"], tags: ["popular_israeli_destination"] },
      { city: "אושואיה", airports: ["USH"] },
      { city: "איגואסו", airports: ["IGR"] },
      { city: "סלטה", airports: ["SLA"] },
      { city: "חוחוי", airports: ["JUJ"] },
      { city: "רוסאריו", airports: ["ROS"] },
      { city: "מאר דל פלטה", airports: ["MDQ"] },
      { city: "וילה לה אנגוסטורה", airports: ["BRC"] },
      { city: "סן מרטין דה לוס אנדס", airports: ["CPC"] },
      { city: "אל בולסון", airports: ["EHL"] },
      { city: "אספריו", airports: ["EQS"] },
      { city: "קומודורו ריבדוויה", airports: ["CRD"] },
    ],
  },
  {
    country: "ברזיל",
    cities: [
      { city: "ריו דה ז'ניירו", airports: ["GIG", "SDU"], tags: ["popular_israeli_destination"] },
      { city: "קופקבנה", airports: ["GIG", "SDU"], tags: ["popular_israeli_destination"] },
      { city: "איפנמה", airports: ["GIG", "SDU"], tags: ["popular_israeli_destination"] },
      { city: "לבלון", airports: ["GIG", "SDU"], tags: ["popular_israeli_destination"] },
      { city: "בוטפוגו", airports: ["GIG", "SDU"] },
      { city: "סנטה טרזה", airports: ["SDU"] },
      { city: "לנקוי", airports: ["GIG", "SDU"] },
      { city: "בום ז'יזוס דה לה אפה", airports: ["SDU"] },
      { city: "סאו פאולו", airports: ["GRU", "CGH"] },
      { city: "פלוריאנופוליס (פלוריפה)", airports: ["FLN"] },
      { city: "אילהה גראנדה", airports: ["GIG"] },
      { city: "מורו דה סאו פאולו", airports: ["SSA", "VAL"] },
      { city: "סלבדור", airports: ["SSA"] },
      { city: "פורטו סגרו", airports: ["BPS"] },
      { city: "פיפה", airports: ["NAT"] },
      { city: "פורטו דה גליניאס", airports: ["REC"] },
      { city: "ג'ריקוואקוארה", airports: ["JJD", "FOR"] },
      { city: "אורובו פרטו", airports: ["CNF"], tags: ["popular_israeli_destination"] },
      { city: "פארטי", airports: ["GIG", "SDU"], tags: ["popular_israeli_destination"] },
      { city: "פוז דו איגואסו", airports: ["IGU"] },
    ],
  },
  {
    country: "צ'ילה",
    cities: [
      { city: "סנטיאגו", airports: ["SCL"] },
      { city: "ולפאריזו", airports: ["SCL"] },
      { city: "וויניה דל מאר", airports: ["SCL"], tags: ["popular_israeli_destination"] },
      { city: "סן פדרו דה אטקמה", airports: ["CJC"] },
      { city: "פוצ'ון", airports: ["ZPC", "ZCO"] },
      { city: "ויי דל אלו", airports: ["ZPC"], tags: ["popular_israeli_destination"] },
      { city: "פורטיו", airports: ["PMC"] },
      { city: "פומאלינה", airports: ["PMC"] },
      { city: "פוארטו נאטאלס (טורס דל פיינה)", airports: ["PNT"] },
      { city: "טורס דל פיינה (פארק)", airports: ["PNT"], tags: ["popular_israeli_destination"] },
    ],
  },
  {
    country: "פרו",
    cities: [
      { city: "לימה", airports: ["LIM"], tags: ["popular_israeli_destination"] },
      { city: "קוסקו", airports: ["CUZ"], tags: ["popular_israeli_destination"] },
      { city: "מאצ'ו פיצ'ו", airports: ["CUZ"] },
      { city: "אגואס קליינטס", airports: ["CUZ"] },
      { city: "אוראיבמבה", airports: ["CUZ"] },
      { city: "אוליאנטאיטמבו", airports: ["CUZ"], tags: ["popular_israeli_destination"] },
      { city: "פיסאק", airports: ["CUZ"] },
      { city: "עמק הקדוש", airports: ["CUZ"], tags: ["popular_israeli_destination"] },
      { city: "וואראז", airports: ["ATA"] },
      { city: "וואקאצ'ינה", airports: ["LIM"] },
      { city: "מנקורה", airports: ["PIU", "TBP"] },
      { city: "נסקה", airports: ["NZC"] },
      { city: "איקיטוס", airports: ["IQT"] },
      { city: "אריקיפה", airports: ["AQP"] },
      { city: "טרוחיו", airports: ["TRU"] },
    ],
  },
  {
    country: "קולומביה",
    cities: [
      { city: "בוגוטה", airports: ["BOG"] },
      { city: "מדיין", airports: ["MDE"], tags: ["popular_israeli_destination"] },
      { city: "קאלי", airports: ["CLO"] },
      { city: "קרטחנה", airports: ["CTG"] },
      { city: "סן אנדרס", airports: ["ADZ"], tags: ["popular_israeli_destination"] },
      { city: "גואטאפה", airports: ["MDE", "EOH"], tags: ["popular_israeli_destination"] },
      { city: "סנטה מרתה (טיירונה)", airports: ["SMR"] },
      { city: "סלנטו", airports: ["PEI"] },
      { city: "פריירה", airports: ["PEI"] },
      { city: "ארמניה", airports: ["AXM"] },
      { city: "מניסאלס", airports: ["MZL"] },
      { city: "סן גיל", airports: ["BGA"] },
    ],
  },
  {
    country: "בוליביה",
    cities: [
      { city: "לה פאז", airports: ["LPB"] },
      { city: "סלאר דה אויוני", airports: ["UYU"] },
      { city: "סוקר", airports: ["SRE"], tags: ["popular_israeli_destination"] },
      { city: "קופקבנה (אגם טיטיקקה)", airports: ["LPB"], tags: ["popular_israeli_destination"] },
      { city: "טריזיידה", airports: ["VVI"] },
      { city: "רונבאקה", airports: ["RBQ"] },
    ],
  },
  {
    country: "אקוודור",
    cities: [
      { city: "קיטו", airports: ["UIO"] },
      { city: "קואנקה", airports: ["CUE"], tags: ["popular_israeli_destination"] },
      { city: "באניוס", airports: ["UIO"] },
      { city: "מונטניטה", airports: ["GYE"], tags: ["popular_israeli_destination"] },
      { city: "אולון", airports: ["GYE"] },
      { city: "באהיה דה קארקז", airports: ["GYE"] },
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
  "פלרמו (בואנוס איירס), ארגנטינה": { lat: -34.5889, lng: -58.4264 },
  "רקולטה (בואנוס איירס), ארגנטינה": { lat: -34.5881, lng: -58.3933 },
  "סן טלמו, ארגנטינה": { lat: -34.6212, lng: -58.3731 },
  "פוארטו מדרו, ארגנטינה": { lat: -34.6118, lng: -58.3636 },
  "לה בוקה, ארגנטינה": { lat: -34.6345, lng: -58.3632 },
  "בלגרנו, ארגנטינה": { lat: -34.5628, lng: -58.4583 },
  "וילה קרספו, ארגנטינה": { lat: -34.5992, lng: -58.438 },
  "טיגר, ארגנטינה": { lat: -34.416, lng: -58.5792 },
  "קורדובה, ארגנטינה": { lat: -31.4201, lng: -64.1888 },
  "וילה קרלוס פאס, ארגנטינה": { lat: -31.4241, lng: -64.4978 },
  "מנדוסה, ארגנטינה": { lat: -32.8895, lng: -68.8458 },
  "ברילוצ'ה, ארגנטינה": { lat: -41.1335, lng: -71.3103 },
  "סרו קתדרל (ברילוצ'ה), ארגנטינה": { lat: -41.1709, lng: -71.439 },
  "לנין, ארגנטינה": { lat: -40.0958, lng: -71.0303 },
  "אל קלפטה, ארגנטינה": { lat: -50.3379, lng: -72.2648 },
  "אל צ'אלטן (פיץ רוי), ארגנטינה": { lat: -49.3315, lng: -72.8863 },
  "לגונה קאפרי (אל צ'אלטן), ארגנטינה": { lat: -49.2778, lng: -72.983 },
  "מיראדור פיץ רוי, ארגנטינה": { lat: -49.2762, lng: -72.9725 },
  "אושואיה, ארגנטינה": { lat: -54.8019, lng: -68.303 },
  "איגואסו, ארגנטינה": { lat: -25.5972, lng: -54.5786 },
  "סלטה, ארגנטינה": { lat: -24.7829, lng: -65.4232 },
  "חוחוי, ארגנטינה": { lat: -24.1858, lng: -65.2995 },
  "רוסאריו, ארגנטינה": { lat: -32.9442, lng: -60.6505 },
  "מאר דל פלטה, ארגנטינה": { lat: -38.0055, lng: -57.5426 },
  "וילה לה אנגוסטורה, ארגנטינה": { lat: -40.7634, lng: -71.6531 },
  "סן מרטין דה לוס אנדס, ארגנטינה": { lat: -40.157, lng: -71.3524 },
  "אל בולסון, ארגנטינה": { lat: -41.964, lng: -71.5353 },
  "אספריו, ארגנטינה": { lat: -42.908, lng: -71.3203 },
  "קומודורו ריבדוויה, ארגנטינה": { lat: -45.8641, lng: -67.4966 },

  // Brazil
  "ריו דה ז'ניירו, ברזיל": { lat: -22.9068, lng: -43.1729 },
  "קופקבנה, ברזיל": { lat: -22.9711, lng: -43.1826 },
  "איפנמה, ברזיל": { lat: -22.9838, lng: -43.2049 },
  "לבלון, ברזיל": { lat: -22.9844, lng: -43.217 },
  "בוטפוגו, ברזיל": { lat: -22.9519, lng: -43.185 },
  "סנטה טרזה, ברזיל": { lat: -22.9175, lng: -43.1862 },
  "לנקוי, ברזיל": { lat: -22.9984, lng: -43.3653 },
  "בום ז'יזוס דה לה אפה, ברזיל": { lat: -22.9028, lng: -43.1792 },
  "סאו פאולו, ברזיל": { lat: -23.5505, lng: -46.6333 },
  "פלוריאנופוליס (פלוריפה), ברזיל": { lat: -27.5949, lng: -48.5482 },
  "אילהה גראנדה, ברזיל": { lat: -23.1434, lng: -44.1976 },
  "מורו דה סאו פאולו, ברזיל": { lat: -13.376, lng: -38.916 },
  "סלבדור, ברזיל": { lat: -12.9718, lng: -38.5011 },
  "פורטו סגרו, ברזיל": { lat: -16.4423, lng: -39.0643 },
  "פיפה, ברזיל": { lat: -6.23, lng: -35.0486 },
  "פורטו דה גליניאס, ברזיל": { lat: -8.5004, lng: -34.9976 },
  "ג'ריקוואקוארה, ברזיל": { lat: -2.7933, lng: -40.512 },
  "אורובו פרטו, ברזיל": { lat: -20.3856, lng: -43.5035 },
  "פארטי, ברזיל": { lat: -23.2178, lng: -44.7131 },
  "פוז דו איגואסו, ברזיל": { lat: -25.5469, lng: -54.5882 },

  // Chile
  "סנטיאגו, צ'ילה": { lat: -33.4489, lng: -70.6693 },
  "ולפאריזו, צ'ילה": { lat: -33.0472, lng: -71.6217 },
  "וויניה דל מאר, צ'ילה": { lat: -33.0246, lng: -71.5518 },
  "סן פדרו דה אטקמה, צ'ילה": { lat: -22.9087, lng: -68.1997 },
  "פוצ'ון, צ'ילה": { lat: -39.2817, lng: -71.9543 },
  "ויי דל אלו, צ'ילה": { lat: -39.8142, lng: -71.2925 },
  "פורטיו, צ'ילה": { lat: -41.483, lng: -72.942 },
  "פומאלינה, צ'ילה": { lat: -42.183, lng: -72.483 },
  "פוארטו נאטאלס (טורס דל פיינה), צ'ילה": { lat: -51.7236, lng: -72.4875 },
  "טורס דל פיינה (פארק), צ'ילה": { lat: -50.9413, lng: -73.0531 },

  // Peru
  "לימה, פרו": { lat: -12.0464, lng: -77.0428 },
  "קוסקו, פרו": { lat: -13.5319, lng: -71.9675 },
  "מאצ'ו פיצ'ו, פרו": { lat: -13.1631, lng: -72.545 },
  "אגואס קליינטס, פרו": { lat: -13.1547, lng: -72.5244 },
  "אוראיבמבה, פרו": { lat: -13.295, lng: -72.117 },
  "אוליאנטאיטמבו, פרו": { lat: -13.2572, lng: -72.2635 },
  "פיסאק, פרו": { lat: -13.4225, lng: -71.8452 },
  "עמק הקדוש, פרו": { lat: -13.331, lng: -72.215 },
  "וואראז, פרו": { lat: -9.529, lng: -77.5288 },
  "וואקאצ'ינה, פרו": { lat: -14.0875, lng: -75.7626 },
  "מנקורה, פרו": { lat: -4.1069, lng: -81.0475 },
  "נסקה, פרו": { lat: -14.8309, lng: -74.9389 },
  "איקיטוס, פרו": { lat: -3.7491, lng: -73.2538 },
  "אריקיפה, פרו": { lat: -16.409, lng: -71.5375 },
  "טרוחיו, פרו": { lat: -8.1116, lng: -79.0288 },

  // Colombia
  "בוגוטה, קולומביה": { lat: 4.711, lng: -74.0721 },
  "מדיין, קולומביה": { lat: 6.2476, lng: -75.5658 },
  "קאלי, קולומביה": { lat: 3.4516, lng: -76.532 },
  "קרטחנה, קולומביה": { lat: 10.391, lng: -75.4794 },
  "סן אנדרס, קולומביה": { lat: 12.5797, lng: -81.7006 },
  "גואטאפה, קולומביה": { lat: 6.234, lng: -75.5991 },
  "סנטה מרתה (טיירונה), קולומביה": { lat: 11.2408, lng: -74.199 },
  "סלנטו, קולומביה": { lat: 4.6372, lng: -75.5708 },
  "פריירה, קולומביה": { lat: 4.8073, lng: -75.6947 },
  "ארמניה, קולומביה": { lat: 4.5339, lng: -75.6811 },
  "מניסאלס, קולומביה": { lat: 5.0703, lng: -75.5138 },
  "סן גיל, קולומביה": { lat: 6.5564, lng: -73.1335 },

  // Bolivia
  "לה פאז, בוליביה": { lat: -16.4897, lng: -68.1193 },
  "סלאר דה אויוני, בוליביה": { lat: -20.1338, lng: -67.4891 },
  "סוקר, בוליביה": { lat: -19.0368, lng: -65.2592 },
  "קופקבנה (אגם טיטיקקה), בוליביה": { lat: -16.1667, lng: -69.085 },
  "טריזיידה, בוליביה": { lat: -17.8345, lng: -63.7394 },
  "רונבאקה, בוליביה": { lat: -14.443, lng: -67.5277 },

  // Ecuador
  "קיטו, אקוודור": { lat: -0.1807, lng: -78.4678 },
  "קואנקה, אקוודור": { lat: -2.8966, lng: -78.9984 },
  "באניוס, אקוודור": { lat: -1.3967, lng: -78.4247 },
  "מונטניטה, אקוודור": { lat: -1.8297, lng: -80.7485 },
  "אולון, אקוודור": { lat: -1.7872, lng: -80.7575 },
  "באהיה דה קארקז, אקוודור": { lat: -0.5929, lng: -80.4238 },
  "גלאפגוס, אקוודור": { lat: -0.9538, lng: -90.9656 },
};

for (const d of DESTINATION_CITIES) {
  const key = destinationLabel(d.city, d.country);
  if (!(key in DESTINATION_COORDS)) {
    throw new Error(`travel-destinations: missing DESTINATION_COORDS for "${key}"`);
  }
}

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
