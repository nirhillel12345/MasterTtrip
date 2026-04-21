/** Predefined destinations for the listing location combobox (Hebrew-friendly labels). */
export const POPULAR_DESTINATIONS = [
  "ריו דה ז׳ניירו, ברזיל",
  "פנמה סיטי, פנמה",
  "מונטניטה, אקוודור",
  "איטאקרה, ברזיל",
  "סלבדור, ברזיל",
  "בנגקוק, תאילנד",
  "צ׳אנג מאי, תאילנד",
  "באלי, אינדונזיה",
  "ליסבון, פורטוגל",
  "ברצלונה, ספרד",
  "מדיין, קולומביה",
  "בואנוס איירס, ארגנטינה",
  "לימה, פרו",
  "קוסקו, פרו",
  "מקסיקו סיטי, מקסיקו",
  "פלאיה דל כרמן, מקסיקו",
  "גואטמלה סיטי, גואטמלה",
  "טוקיו, יפן",
  "סיאול, דרום קוריאה",
] as const;

export type PopularDestination = (typeof POPULAR_DESTINATIONS)[number];

const destinationSet = new Set<string>(POPULAR_DESTINATIONS);

export function isAllowedDestination(value: string): boolean {
  return destinationSet.has(value.trim());
}

export function filterDestinations(query: string): string[] {
  const q = query.trim().toLowerCase();
  if (!q) return [...POPULAR_DESTINATIONS];
  return POPULAR_DESTINATIONS.filter((d) => d.toLowerCase().includes(q));
}
