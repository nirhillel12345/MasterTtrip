import { DESTINATION_CITIES, DESTINATION_COORDS, destinationLabel } from "@/lib/travel-destinations";

/**
 * Resolve map coordinates from a listing `location` string (usually a predefined destination label).
 */
export function coordinatesForListingLocation(location: string): { lat: number; lng: number } | null {
  const t = location.trim();
  if (!t) return null;

  if (t in DESTINATION_COORDS) {
    return DESTINATION_COORDS[t];
  }

  const normalize = (s: string) =>
    s
      .toLowerCase()
      .replaceAll("׳", "'")
      .replaceAll("״", '"')
      .replaceAll('"', "")
      .replaceAll("(", "")
      .replaceAll(")", "")
      .replace(/\s+/g, " ")
      .trim();

  const normInput = normalize(t);
  const fallbackByCountry: Record<string, { lat: number; lng: number }> = {
    ארגנטינה: { lat: -34.6037, lng: -58.3816 },
    ברזיל: { lat: -22.9068, lng: -43.1729 },
    "צ'ילה": { lat: -33.4489, lng: -70.6693 },
    פרו: { lat: -12.0464, lng: -77.0428 },
    קולומביה: { lat: 4.711, lng: -74.0721 },
    בוליביה: { lat: -16.4897, lng: -68.1193 },
    אקוודור: { lat: -0.1807, lng: -78.4678 },
  };

  for (const d of DESTINATION_CITIES) {
    const label = destinationLabel(d.city, d.country);
    const coords = DESTINATION_COORDS[label] ?? fallbackByCountry[d.country];
    if (!coords) continue;

    const normLabel = normalize(label);
    const normCity = normalize(d.city);
    const normCountry = normalize(d.country);

    if (normInput === normLabel || normInput === normCity) {
      return coords;
    }
    if (normInput.includes(normLabel) || normLabel.includes(normInput)) {
      return coords;
    }
    if (normCity.length >= 3 && normInput.includes(normCity)) {
      return coords;
    }
    if (normCountry && normInput.includes(normCountry) && normCity.length >= 3) {
      return coords;
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
