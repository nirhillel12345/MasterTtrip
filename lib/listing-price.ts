/** Formatted nightly price for listing cards and detail views (Hebrew UI). */
export function formatListingNightPrice(price: number): string {
  return `${price.toLocaleString("he-IL")} ₪ ללילה`;
}
