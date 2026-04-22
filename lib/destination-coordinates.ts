import { POPULAR_DESTINATIONS, type PopularDestination } from "@/lib/travel-destinations";

/** Center coordinates for each predefined destination (city-level). */
const DESTINATION_COORDS: Record<PopularDestination, { lat: number; lng: number }> = {
  "ריו דה ז׳ניירו, ברזיל": { lat: -22.9068, lng: -43.1729 },
  "פנמה סיטי, פנמה": { lat: 8.9824, lng: -79.5199 },
  "מונטניטה, אקוודור": { lat: -1.8297, lng: -80.7485 },
  "איטאקרה, ברזיל": { lat: -14.1264, lng: -39.0353 },
  "סלבדור, ברזיל": { lat: -12.9777, lng: -38.5016 },
  "בנגקוק, תאילנד": { lat: 13.7563, lng: 100.5018 },
  "צ׳אנג מאי, תאילנד": { lat: 18.7883, lng: 98.9853 },
  "באלי, אינדונזיה": { lat: -8.4095, lng: 115.1889 },
  "ליסבון, פורטוגל": { lat: 38.7223, lng: -9.1393 },
  "ברצלונה, ספרד": { lat: 41.3851, lng: 2.1734 },
  "מדיין, קולומביה": { lat: 6.2476, lng: -75.5658 },
  "בואנוס איירס, ארגנטינה": { lat: -34.6037, lng: -58.3816 },
  "לימה, פרו": { lat: -12.0464, lng: -77.0428 },
  "קוסקו, פרו": { lat: -13.5319, lng: -71.9675 },
  "מקסיקו סיטי, מקסיקו": { lat: 19.4326, lng: -99.1332 },
  "פלאיה דל כרמן, מקסיקו": { lat: 20.6296, lng: -87.0739 },
  "גואטמלה סיטי, גואטמלה": { lat: 14.6349, lng: -90.5069 },
  "טוקיו, יפן": { lat: 35.6762, lng: 139.6503 },
  "סיאול, דרום קוריאה": { lat: 37.5665, lng: 126.978 },
};

/**
 * Resolve map coordinates from a listing `location` string (usually a predefined destination label).
 */
export function coordinatesForListingLocation(location: string): { lat: number; lng: number } | null {
  const t = location.trim();
  if (!t) return null;

  if (t in DESTINATION_COORDS) {
    return DESTINATION_COORDS[t as keyof typeof DESTINATION_COORDS];
  }

  const lower = t.toLowerCase();
  for (const dest of POPULAR_DESTINATIONS) {
    if (lower === dest.toLowerCase()) return DESTINATION_COORDS[dest];
    if (lower.includes(dest.toLowerCase()) || dest.toLowerCase().includes(lower)) {
      return DESTINATION_COORDS[dest];
    }
    const city = dest.split(",")[0]?.trim().toLowerCase() ?? "";
    if (city.length >= 3 && lower.includes(city)) {
      return DESTINATION_COORDS[dest];
    }
  }

  return null;
}

/** Small deterministic offset so markers at the same city don’t stack exactly on one pixel. */
export function jitterListingPosition(lat: number, lng: number, listingId: string): [number, number] {
  let h = 0;
  for (let i = 0; i < listingId.length; i++) {
    h = (h * 31 + listingId.charCodeAt(i)) | 0;
  }
  const da = ((h % 19) - 9) * 0.0035;
  const db = ((((h / 5) | 0) % 19) - 9) * 0.0035;
  return [lat + da, lng + db];
}
