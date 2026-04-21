/** Normalize Instagram handle for storage (no leading @). */
export function normalizeInstagramHandle(raw: string): string | null {
  const t = raw.trim().replace(/^@+/u, "");
  return t === "" ? null : t;
}

export function instagramProfileUrl(handle: string): string {
  const h = normalizeInstagramHandle(handle);
  if (!h) return "";
  return `https://www.instagram.com/${encodeURIComponent(h)}/`;
}
