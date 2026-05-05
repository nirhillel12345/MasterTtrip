/**
 * Same pre-filled message as server-side join notification (contact organizer after joining).
 */
export function buildTransportJoinPrefilledMessage(input: {
  creatorName: string;
  joinerName: string;
  origin: string;
  destination: string;
  dateLabel: string;
  joinerPhone: string | null;
}): string {
  const phoneSuffix = input.joinerPhone ? ` הטלפון שלי: ${input.joinerPhone}.` : "";
  return `היי ${input.creatorName}, שמי ${input.joinerName}. הצטרפתי עכשיו לנסיעה שלך מ${input.origin} ל${input.destination} ב-${input.dateLabel}.${phoneSuffix} נתראה!`;
}

/** wa.me link with E.164-friendly digits only */
export function buildWhatsAppUrl(phoneRaw: string, message: string): string | null {
  const digits = phoneRaw.replace(/\D/g, "");
  if (!digits) return null;
  return `https://wa.me/${digits}?text=${encodeURIComponent(message)}`;
}

export function formatTransportDateLabel(date: Date): string {
  return new Intl.DateTimeFormat("he-IL", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
}
