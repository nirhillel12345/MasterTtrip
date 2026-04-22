import { isValidPhoneNumber, parsePhoneNumberFromString } from "libphonenumber-js/min";

export function normalizeListingWhatsappToE164(
  raw: string,
): { ok: true; e164: string } | { ok: false; error: string } {
  const t = raw.trim();
  if (!t) {
    return { ok: false, error: "יש להזין מספר לתיאום." };
  }
  if (!isValidPhoneNumber(t)) {
    return { ok: false, error: "מספר הטלפון אינו תקין. בדקו את הקידומת והספרות." };
  }
  const parsed = parsePhoneNumberFromString(t);
  if (!parsed?.isValid()) {
    return { ok: false, error: "מספר הטלפון אינו תקין." };
  }
  return { ok: true, e164: parsed.format("E.164") };
}
