"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { isAllowedDestination } from "@/lib/travel-destinations";

export type TransportActionResult =
  | { ok: true; notifyWhatsAppUrl?: string }
  | { ok: false; error: string };

async function requireDbUser(nextPath?: string) {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user?.email) {
    const nextParam = nextPath ? `&next=${encodeURIComponent(nextPath)}` : "";
    redirect("/auth/login?error=" + encodeURIComponent("יש להתחבר") + nextParam);
  }
  const dbUser = await prisma.user.upsert({
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
  return dbUser;
}

function buildJoinWhatsAppUrl(phoneRaw: string, transportTitle: string): string | null {
  const digits = phoneRaw.replace(/\D/g, "");
  if (!digits) return null;
  const msg = transportTitle;
  return `https://wa.me/${digits}?text=${encodeURIComponent(msg)}`;
}

export async function createTransport(input: {
  origin: string;
  destination: string;
  date: string;
  pickupTime: string;
  totalSeats: number;
  pricePerPerson: number;
  description: string;
}): Promise<TransportActionResult> {
  const dbUser = await requireDbUser("/transports/new");

  const origin = input.origin.trim();
  const destination = input.destination.trim();
  const description = input.description.trim();
  const totalSeats = Number(input.totalSeats);
  const pricePerPerson = Number(input.pricePerPerson);
  const dateDay = input.date.slice(0, 10);
  const pickupTime = input.pickupTime.slice(0, 5);

  if (!isAllowedDestination(origin) || !isAllowedDestination(destination)) {
    return { ok: false, error: "יש לבחור מוצא ויעד מהרשימה." };
  }
  if (origin === destination) {
    return { ok: false, error: "המוצא והיעד חייבים להיות שונים." };
  }
  if (!/^\d{4}-\d{2}-\d{2}$/.test(dateDay)) {
    return { ok: false, error: "תאריך הנסיעה לא תקין." };
  }
  if (!/^\d{2}:\d{2}$/.test(pickupTime)) {
    return { ok: false, error: "שעת האיסוף לא תקינה." };
  }
  if (!Number.isInteger(totalSeats) || totalSeats <= 0 || totalSeats > 50) {
    return { ok: false, error: "מספר המקומות חייב להיות בין 1 ל-50." };
  }
  if (Number.isNaN(pricePerPerson) || pricePerPerson < 0) {
    return { ok: false, error: "מחיר למשתתף לא תקין." };
  }
  if (description.length < 5) {
    return { ok: false, error: "נא להוסיף תיאור קצר (לפחות 5 תווים)." };
  }

  const date = new Date(`${dateDay}T${pickupTime}:00.000Z`);
  if (Number.isNaN(date.getTime())) {
    return { ok: false, error: "תאריך הנסיעה לא תקין." };
  }

  const created = await prisma.transport.create({
    data: {
      creatorId: dbUser.id,
      origin,
      destination,
      date,
      totalSeats,
      availableSeats: totalSeats,
      pricePerPerson,
      description,
    },
    select: { id: true },
  });

  revalidatePath("/transports");
  revalidatePath("/my-listings");
  redirect(`/transports/${created.id}?status=created`);
}

export async function joinTransport(transportId: string): Promise<TransportActionResult> {
  const dbUser = await requireDbUser(`/transports/${transportId}`);

  try {
    const notifyWhatsAppUrl = await prisma.$transaction(async (tx) => {
      const transport = await tx.transport.findUnique({
        where: { id: transportId },
        select: {
          id: true,
          creatorId: true,
          origin: true,
          destination: true,
          date: true,
          availableSeats: true,
          creator: { select: { phone: true, name: true, email: true } },
        },
      });

      if (!transport) throw new Error("נסיעה לא נמצאה.");
      if (transport.creatorId === dbUser.id) throw new Error("לא ניתן להצטרף לנסיעה שיצרת.");

      const existing = await tx.transportJoin.findUnique({
        where: { transportId_userId: { transportId, userId: dbUser.id } },
        select: { id: true },
      });
      if (existing) throw new Error("כבר הצטרפת לנסיעה הזו.");
      if (transport.availableSeats <= 0) throw new Error("אין מקומות פנויים בנסיעה.");

      const dec = await tx.transport.updateMany({
        where: { id: transportId, availableSeats: { gt: 0 } },
        data: { availableSeats: { decrement: 1 } },
      });
      if (dec.count === 0) throw new Error("המקומות נתפסו כרגע, נסו לרענן.");

      await tx.transportJoin.create({
        data: {
          transportId,
          userId: dbUser.id,
        },
      });

      const creatorName = transport.creator.name?.trim() || transport.creator.email.split("@")[0];
      const rideDate = new Intl.DateTimeFormat("he-IL", {
        day: "numeric",
        month: "long",
        year: "numeric",
      }).format(transport.date);
      const message = `היי ${creatorName}, ראיתי ב-MasterTrip שפרסמת נסיעה מ${transport.origin} ל${transport.destination} ב-${rideDate}. אשמח להצטרף!`;
      return buildJoinWhatsAppUrl(transport.creator.phone ?? "", message) ?? undefined;
    });

    revalidatePath("/transports");
    revalidatePath(`/transports/${transportId}`);
    return { ok: true, notifyWhatsAppUrl };
  } catch (err) {
    const msg = err instanceof Error ? err.message : "לא הצלחנו להצטרף כרגע.";
    return { ok: false, error: msg };
  }
}

export async function removeTransportParticipant(
  transportId: string,
  participantUserId: string,
): Promise<TransportActionResult> {
  const dbUser = await requireDbUser(`/transports/${transportId}`);

  try {
    await prisma.$transaction(async (tx) => {
      const transport = await tx.transport.findUnique({
        where: { id: transportId },
        select: { id: true, creatorId: true, availableSeats: true, totalSeats: true },
      });
      if (!transport) throw new Error("נסיעה לא נמצאה.");
      if (transport.creatorId !== dbUser.id) throw new Error("אין הרשאה להסיר משתתפים.");

      const removed = await tx.transportJoin.deleteMany({
        where: { transportId, userId: participantUserId },
      });
      if (removed.count === 0) throw new Error("המשתתף כבר לא נמצא ברשימה.");

      const nextAvailable = Math.min(transport.totalSeats, transport.availableSeats + 1);
      await tx.transport.update({
        where: { id: transportId },
        data: { availableSeats: nextAvailable },
      });
    });

    revalidatePath("/transports");
    revalidatePath(`/transports/${transportId}`);
    return { ok: true };
  } catch (err) {
    const msg = err instanceof Error ? err.message : "לא הצלחנו להסיר את המשתתף.";
    return { ok: false, error: msg };
  }
}
