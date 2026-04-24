"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { sendEmail } from "@/lib/email";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { isAllowedDestination } from "@/lib/travel-destinations";

export type TransportActionResult =
  | { ok: true; notifyWhatsAppUrl?: string; notificationId?: string }
  | { ok: false; error: string };

async function sendTransportJoinEmail(input: {
  to: string;
  creatorName: string;
  joinerName: string;
  origin: string;
  destination: string;
  dateLabel: string;
  rideUrl: string;
}) {
  const subject = "מישהו הצטרף לנסיעה שלך ב-Master-Trip!";
  const text = `${input.joinerName} joined your ride from ${input.origin} to ${input.destination}.
Ride date: ${input.dateLabel}
Ride link: ${input.rideUrl}`;
  const html = `
    <div style="font-family:Arial,Helvetica,sans-serif;line-height:1.5;color:#0f172a">
      <h2 style="margin:0 0 12px 0">שלום ${input.creatorName},</h2>
      <p style="margin:0 0 10px 0"><strong>${input.joinerName}</strong> joined your ride from <strong>${input.origin}</strong> to <strong>${input.destination}</strong>.</p>
      <p style="margin:0 0 10px 0">תאריך נסיעה: <strong>${input.dateLabel}</strong></p>
      <p style="margin:0 0 16px 0">
        <a href="${input.rideUrl}" style="color:#06b6d4;text-decoration:none;font-weight:700">צפייה בנסיעה</a>
      </p>
      <p style="margin:0;color:#475569">MasterTrip</p>
    </div>
  `;
  try {
    const result = await sendEmail({
      to: input.to,
      subject,
      html,
      text,
    });
    console.log("[transport-join][email] sent", { to: input.to, id: result.data?.id ?? null });
  } catch (err) {
    console.error("[transport-email] failed to send notification", err);
  }
}

async function requireDbUser(nextPath?: string) {
  console.log("[transport-auth] checking auth", { nextPath: nextPath ?? null });
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user?.email) {
    console.log("[transport-auth] unauthenticated");
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
  console.log("[transport-auth] user ready", { userId: dbUser.id, email: dbUser.email });
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
  console.log("[transport-create] triggered");
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
  console.log("[transport-join] triggered", { transportId, joinerUserId: dbUser.id, joinerEmail: dbUser.email });

  try {
    const result = await prisma.$transaction(async (tx) => {
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
      console.log("[transport-join] transport lookup", {
        transportId,
        found: Boolean(transport),
        availableSeats: transport?.availableSeats ?? null,
      });

      if (!transport) throw new Error("נסיעה לא נמצאה.");
      if (transport.creatorId === dbUser.id) throw new Error("לא ניתן להצטרף לנסיעה שיצרת.");

      const existing = await tx.transportJoin.findUnique({
        where: { transportId_userId: { transportId, userId: dbUser.id } },
        select: { id: true },
      });
      console.log("[transport-join] existing join", { exists: Boolean(existing), joinId: existing?.id });
      if (existing) throw new Error("כבר הצטרפת לנסיעה הזו.");
      if (transport.availableSeats <= 0) throw new Error("אין מקומות פנויים בנסיעה.");

      const dec = await tx.transport.updateMany({
        where: { id: transportId, availableSeats: { gt: 0 } },
        data: { availableSeats: { decrement: 1 } },
      });
      console.log("[transport-join] seats decrement result", { count: dec.count });
      if (dec.count === 0) throw new Error("המקומות נתפסו כרגע, נסו לרענן.");

      await tx.transportJoin.create({
        data: {
          transportId,
          userId: dbUser.id,
        },
      });
      console.log("[transport-join] participant added", { transportId, userId: dbUser.id });

      const creatorName = transport.creator.name?.trim() || transport.creator.email.split("@")[0];
      const joinerName = dbUser.name?.trim() || dbUser.email.split("@")[0];
      const rideDate = new Intl.DateTimeFormat("he-IL", {
        day: "numeric",
        month: "long",
        year: "numeric",
      }).format(transport.date);
      const message = `היי ${creatorName}, שמי ${joinerName}. הצטרפתי עכשיו לנסיעה שלך מ${transport.origin} ל${transport.destination} ב-${rideDate}. נתראה!`;

      const notification = await tx.notification.create({
        data: {
          recipientId: transport.creatorId,
          actorId: dbUser.id,
          transportId: transport.id,
          type: "transport_joined",
          title: "משתתף חדש בנסיעה",
          message: `${joinerName} הצטרף/ה לנסיעה שלך מ${transport.origin} ל${transport.destination} בתאריך ${rideDate}.`,
          metadata: {
            joinerUserId: dbUser.id,
            joinerName,
            origin: transport.origin,
            destination: transport.destination,
            date: rideDate,
          },
        },
        select: { id: true },
      });
      console.log("[transport-join] notification created", { notificationId: notification.id });

      const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
      const rideUrl = `${baseUrl.replace(/\/$/, "")}/transports/${transport.id}`;
      console.log("[transport-join] sending email via resend", { to: transport.creator.email, rideUrl });
      await sendTransportJoinEmail({
        to: transport.creator.email,
        creatorName,
        joinerName,
        origin: transport.origin,
        destination: transport.destination,
        dateLabel: rideDate,
        rideUrl,
      });

      console.log("[transport-join] building whatsapp redirect");
      return {
        notifyWhatsAppUrl: buildJoinWhatsAppUrl(transport.creator.phone ?? "", message) ?? undefined,
        notificationId: notification.id,
      };
    });

    revalidatePath("/transports");
    revalidatePath(`/transports/${transportId}`);
    return { ok: true, notifyWhatsAppUrl: result.notifyWhatsAppUrl, notificationId: result.notificationId };
  } catch (err) {
    const msg = err instanceof Error ? err.message : "לא הצלחנו להצטרף כרגע.";
    console.error("[transport-join] failed", { transportId, joinerUserId: dbUser.id, error: msg });
    return { ok: false, error: msg };
  }
}

export async function leaveTransport(transportId: string): Promise<TransportActionResult> {
  const dbUser = await requireDbUser(`/transports/${transportId}`);

  try {
    await prisma.$transaction(async (tx) => {
      const transport = await tx.transport.findUnique({
        where: { id: transportId },
        select: { id: true, availableSeats: true, totalSeats: true },
      });
      if (!transport) throw new Error("נסיעה לא נמצאה.");

      const deleted = await tx.transportJoin.deleteMany({
        where: { transportId, userId: dbUser.id },
      });
      if (deleted.count === 0) throw new Error("את/ה לא רשום/ה לנסיעה הזו.");

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
    const msg = err instanceof Error ? err.message : "לא הצלחנו לבטל את ההרשמה כרגע.";
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
