import { buildWhatsAppUrl } from "@/lib/transport-join-whatsapp";

export function buildBusinessAttractionContactMessage(input: {
  organizerName: string;
  attractionTitle: string;
  locationLabel: string;
}): string {
  return `היי ${input.organizerName}, אני מתעניין/ת באטרקציה "${input.attractionTitle}" ב${input.locationLabel}. אשמח לפרטים.`;
}

export function buildAttractionWhatsAppHref(phoneRaw: string, message: string): string | null {
  return buildWhatsAppUrl(phoneRaw, message);
}
