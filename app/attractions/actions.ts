"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import type { AttractionType } from "@/generated/prisma";
import { prisma } from "@/lib/prisma";
import { normalizeListingWhatsappToE164 } from "@/lib/listing-whatsapp-e164";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { isAllowedDestination } from "@/lib/travel-destinations";

export type AttractionActionResult = { ok: true } | { ok: false; error: string };

export type DeleteAttractionResult = { error: string } | undefined;

async function requireDbUser(nextPath?: string) {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user?.email) {
    const nextParam = nextPath ? `&next=${encodeURIComponent(nextPath)}` : "";
    redirect("/auth/login?error=" + encodeURIComponent("יש להתחבר") + nextParam);
  }
  return prisma.user.upsert({
    where: { email: user.email },
    update: {},
    create: {
      email: user.email,
      name:
        typeof user.user_metadata?.full_name === "string"
          ? user.user_metadata.full_name
          : typeof user.user_metadata?.name === "string"
            ? user.user_metadata.name
            : null,
      image:
        typeof user.user_metadata?.avatar_url === "string"
          ? user.user_metadata.avatar_url
          : typeof user.user_metadata?.picture === "string"
            ? user.user_metadata.picture
            : null,
    },
  });
}

async function ensureLocationForLabel(rawLabel: string) {
  const label = rawLabel.trim();
  if (!label || !isAllowedDestination(label)) {
    return { ok: false as const, error: "יש לבחור יעד מהרשימה." };
  }
  const loc = await prisma.location.upsert({
    where: { label },
    create: { label },
    update: {},
    select: { id: true, label: true },
  });
  return { ok: true as const, location: loc };
}

function normalizeExternalLink(raw: string | undefined | null): string | null {
  const s = raw?.trim();
  if (!s) return null;
  try {
    const u = new URL(s.startsWith("http") ? s : `https://${s}`);
    if (u.protocol !== "http:" && u.protocol !== "https:") return null;
    return u.toString();
  } catch {
    return null;
  }
}

function parseOptionalDate(raw: string | undefined | null): Date | null {
  const s = raw?.trim();
  if (!s) return null;
  const d = new Date(s);
  return Number.isNaN(d.getTime()) ? null : d;
}

function revalidateAttractionPaths(attractionId: string) {
  revalidatePath("/attractions");
  revalidatePath("/my-attractions");
  revalidatePath(`/attractions/${attractionId}`);
}

export async function createAttraction(input: {
  title: string;
  description?: string;
  price?: number | null;
  locationLabel: string;
  type: AttractionType;
  images: string[];
  contactPhone: string;
  externalLink?: string | null;
  date?: string | null;
  maxParticipants?: number | null;
}): Promise<AttractionActionResult> {
  const dbUser = await requireDbUser("/attractions/new");

  const title = input.title.trim();
  if (title.length < 2) {
    return { ok: false, error: "נא להזין כותרת (לפחות 2 תווים)." };
  }

  const descriptionRaw = input.description?.trim();
  const description = descriptionRaw ? descriptionRaw : null;

  const wa = normalizeListingWhatsappToE164(input.contactPhone);
  if (!wa.ok) return { ok: false, error: wa.error };

  const price =
    input.price == null ? null : typeof input.price === "number" ? input.price : Number(input.price);
  if (price != null && (Number.isNaN(price) || price < 0)) {
    return { ok: false, error: "מחיר לא תקין." };
  }

  const loc = await ensureLocationForLabel(input.locationLabel);
  if (!loc.ok) return { ok: false, error: loc.error };

  const images = Array.isArray(input.images)
    ? input.images.filter((u) => typeof u === "string" && /^https?:\/\//i.test(u.trim()))
    : [];

  const externalLink = normalizeExternalLink(input.externalLink);
  if (input.externalLink?.trim() && !externalLink) {
    return { ok: false, error: "קישור חיצוני לא תקין." };
  }

  const date = parseOptionalDate(input.date ?? null);

  let type: AttractionType = input.type;
  if (type !== "BUSINESS" && type !== "PRIVATE") {
    return { ok: false, error: "סוג האטרקציה לא תקין." };
  }

  let maxParticipants: number | null = null;
  let availableSlots: number | null = null;

  if (type === "BUSINESS") {
    maxParticipants = null;
    availableSlots = null;
  } else {
    const mp = input.maxParticipants;
    if (mp == null) {
      maxParticipants = null;
      availableSlots = null;
    } else {
      const n = Number(mp);
      if (!Number.isInteger(n) || n < 1 || n > 500) {
        return { ok: false, error: "מספר משתתפים מקסימלי חייב להיות בין 1 ל-500." };
      }
      maxParticipants = n;
      availableSlots = n;
    }
  }

  const created = await prisma.attraction.create({
    data: {
      title,
      description,
      price,
      locationId: loc.location.id,
      creatorId: dbUser.id,
      type,
      images,
      contactPhone: wa.e164,
      externalLink,
      date,
      maxParticipants,
      availableSlots,
    },
    select: { id: true },
  });

  revalidateAttractionPaths(created.id);
  redirect(`/attractions/${created.id}?status=created`);
}

export async function updateAttraction(
  attractionId: string,
  input: {
    title: string;
    description?: string;
    price?: number | null;
    locationLabel: string;
    type: AttractionType;
    images: string[];
    contactPhone: string;
    externalLink?: string | null;
    date?: string | null;
    maxParticipants?: number | null;
  },
): Promise<AttractionActionResult> {
  const dbUser = await requireDbUser(`/attractions/${attractionId}/edit`);

  const existing = await prisma.attraction.findFirst({
    where: { id: attractionId, creatorId: dbUser.id },
    include: { _count: { select: { joins: true } } },
  });
  if (!existing) {
    return { ok: false, error: "האטרקציה לא נמצאה או שאין הרשאה." };
  }

  const title = input.title.trim();
  if (title.length < 2) {
    return { ok: false, error: "נא להזין כותרת (לפחות 2 תווים)." };
  }

  const descriptionRaw = input.description?.trim();
  const description = descriptionRaw ? descriptionRaw : null;

  const wa = normalizeListingWhatsappToE164(input.contactPhone);
  if (!wa.ok) return { ok: false, error: wa.error };

  const price =
    input.price == null ? null : typeof input.price === "number" ? input.price : Number(input.price);
  if (price != null && (Number.isNaN(price) || price < 0)) {
    return { ok: false, error: "מחיר לא תקין." };
  }

  const loc = await ensureLocationForLabel(input.locationLabel);
  if (!loc.ok) return { ok: false, error: loc.error };

  const images = Array.isArray(input.images)
    ? input.images.filter((u) => typeof u === "string" && /^https?:\/\//i.test(u.trim()))
    : [];

  const externalLink = normalizeExternalLink(input.externalLink);
  if (input.externalLink?.trim() && !externalLink) {
    return { ok: false, error: "קישור חיצוני לא תקין." };
  }

  const date = parseOptionalDate(input.date ?? null);

  let type: AttractionType = input.type;
  if (type !== "BUSINESS" && type !== "PRIVATE") {
    return { ok: false, error: "סוג האטרקציה לא תקין." };
  }

  const joinCount = existing._count.joins;

  let maxParticipants: number | null = null;
  let availableSlots: number | null = null;

  if (type === "BUSINESS") {
    maxParticipants = null;
    availableSlots = null;
  } else {
    const mp = input.maxParticipants;
    if (mp == null) {
      maxParticipants = null;
      availableSlots = null;
    } else {
      const n = Number(mp);
      if (!Number.isInteger(n) || n < 1 || n > 500) {
        return { ok: false, error: "מספר משתתפים מקסימלי חייב להיות בין 1 ל-500." };
      }
      if (n < joinCount) {
        return {
          ok: false,
          error: `לא ניתן להקטין מתחת ל-${joinCount} — כבר נרשמו משתתפים.`,
        };
      }
      maxParticipants = n;
      availableSlots = n - joinCount;
    }
  }

  await prisma.$transaction(async (tx) => {
    if (type === "BUSINESS" || maxParticipants == null) {
      await tx.attractionJoin.deleteMany({ where: { attractionId } });
    }

    await tx.attraction.update({
      where: { id: attractionId },
      data: {
        title,
        description,
        price,
        locationId: loc.location.id,
        type,
        images,
        contactPhone: wa.e164,
        externalLink,
        date,
        maxParticipants,
        availableSlots,
      },
    });
  });

  revalidateAttractionPaths(attractionId);
  redirect(`/attractions/${attractionId}?updated=1`);
}

export async function deleteAttraction(attractionId: string): Promise<DeleteAttractionResult> {
  const dbUser = await requireDbUser("/my-attractions");

  const existing = await prisma.attraction.findFirst({
    where: { id: attractionId, creatorId: dbUser.id },
    select: { id: true },
  });
  if (!existing) {
    return { error: "האטרקציה לא נמצאה או שאין הרשאה." };
  }

  await prisma.attraction.delete({ where: { id: attractionId } });

  revalidatePath("/attractions");
  revalidatePath("/my-attractions");
  revalidatePath(`/attractions/${attractionId}`);
}

export async function joinAttraction(attractionId: string): Promise<AttractionActionResult> {
  const dbUser = await requireDbUser(`/attractions/${attractionId}`);

  if (!dbUser.phone?.trim()) {
    return { ok: false, error: "לפני ההצטרפות יש להזין מספר וואטסאפ בפרופיל." };
  }

  try {
    await prisma.$transaction(async (tx) => {
      const attraction = await tx.attraction.findUnique({
        where: { id: attractionId },
        select: {
          id: true,
          creatorId: true,
          type: true,
          maxParticipants: true,
          availableSlots: true,
        },
      });

      if (!attraction) throw new Error("אטרקציה לא נמצאה.");
      if (attraction.creatorId === dbUser.id) throw new Error("לא ניתן להצטרף לאטרקציה שפרסמת.");
      if (attraction.type !== "PRIVATE") throw new Error("ניתן להצטרף רק לאטרקציות פרטיות עם מגבלת משתתפים.");
      if (attraction.maxParticipants == null || attraction.availableSlots == null) {
        throw new Error("לאטרקציה זו אין הרשמה עם מקומות.");
      }

      const existingJoin = await tx.attractionJoin.findUnique({
        where: { attractionId_userId: { attractionId, userId: dbUser.id } },
        select: { id: true },
      });
      if (existingJoin) throw new Error("כבר נרשמת לאטרקציה הזו.");

      const dec = await tx.attraction.updateMany({
        where: { id: attractionId, availableSlots: { gt: 0 } },
        data: { availableSlots: { decrement: 1 } },
      });
      if (dec.count === 0) throw new Error("לא נותרו מקומות פנויים.");

      await tx.attractionJoin.create({
        data: { attractionId, userId: dbUser.id },
      });
    });

    revalidateAttractionPaths(attractionId);
    return { ok: true };
  } catch (err) {
    const msg = err instanceof Error ? err.message : "לא הצלחנו להשלים את ההרשמה.";
    return { ok: false, error: msg };
  }
}

export async function leaveAttraction(attractionId: string): Promise<AttractionActionResult> {
  const dbUser = await requireDbUser(`/attractions/${attractionId}`);

  try {
    await prisma.$transaction(async (tx) => {
      const attraction = await tx.attraction.findUnique({
        where: { id: attractionId },
        select: { id: true, maxParticipants: true, availableSlots: true },
      });
      if (!attraction) throw new Error("אטרקציה לא נמצאה.");

      const deleted = await tx.attractionJoin.deleteMany({
        where: { attractionId, userId: dbUser.id },
      });
      if (deleted.count === 0) throw new Error("לא נרשמת לאטרקציה הזו.");

      if (attraction.maxParticipants != null) {
        const cap = attraction.maxParticipants;
        const next = Math.min(cap, (attraction.availableSlots ?? 0) + 1);
        await tx.attraction.update({
          where: { id: attractionId },
          data: { availableSlots: next },
        });
      }
    });

    revalidateAttractionPaths(attractionId);
    return { ok: true };
  } catch (err) {
    const msg = err instanceof Error ? err.message : "לא הצלחנו לבטל את ההרשמה.";
    return { ok: false, error: msg };
  }
}

export async function removeAttractionParticipant(
  attractionId: string,
  participantUserId: string,
): Promise<AttractionActionResult> {
  const dbUser = await requireDbUser(`/attractions/${attractionId}`);

  try {
    await prisma.$transaction(async (tx) => {
      const attraction = await tx.attraction.findUnique({
        where: { id: attractionId },
        select: { id: true, creatorId: true, maxParticipants: true, availableSlots: true },
      });
      if (!attraction) throw new Error("אטרקציה לא נמצאה.");
      if (attraction.creatorId !== dbUser.id) throw new Error("אין הרשאה להסיר משתתפים.");

      const removed = await tx.attractionJoin.deleteMany({
        where: { attractionId, userId: participantUserId },
      });
      if (removed.count === 0) throw new Error("המשתתף כבר לא נמצא ברשימה.");

      if (attraction.maxParticipants != null) {
        const cap = attraction.maxParticipants;
        const next = Math.min(cap, (attraction.availableSlots ?? 0) + 1);
        await tx.attraction.update({
          where: { id: attractionId },
          data: { availableSlots: next },
        });
      }
    });

    revalidateAttractionPaths(attractionId);
    return { ok: true };
  } catch (err) {
    const msg = err instanceof Error ? err.message : "לא הצלחנו להסיר את המשתתף.";
    return { ok: false, error: msg };
  }
}
