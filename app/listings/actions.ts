"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { prisma } from "@/lib/prisma";
import { isAllowedDestination } from "@/lib/travel-destinations";
import type { ListingType } from "@/generated/prisma";

export type ListingActionResult = { error: string } | undefined;

function addOneDayIso(isoDate: string): string {
  const d = new Date(`${isoDate}T12:00:00.000Z`);
  d.setUTCDate(d.getUTCDate() + 1);
  return d.toISOString().slice(0, 10);
}

async function requireDbUser() {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user?.email) {
    redirect("/auth/login?error=" + encodeURIComponent("יש להתחבר"));
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

export async function createListing(input: {
  title: string;
  location: string;
  price: number;
  startDate: string;
  endDate: string;
  whatsappNumber: string;
  roommatesNeeded: number;
  imageUrls: string[];
  type: ListingType;
}): Promise<ListingActionResult> {
  const title = input.title.trim();
  const location = input.location.trim();
  const whatsappNumber = input.whatsappNumber.trim();

  if (!title || !location || !isAllowedDestination(location)) {
    return { error: "יש לבחור יעד מהרשימה." };
  }

  if (!whatsappNumber) {
    return { error: "יש להזין מספר לתיאום." };
  }

  const price = Number(input.price);
  const roommatesNeeded = Number(input.roommatesNeeded);

  if (Number.isNaN(price) || price <= 0) {
    return { error: "מחיר לא תקין." };
  }

  if (
    !Number.isInteger(roommatesNeeded) ||
    roommatesNeeded < 0 ||
    roommatesNeeded > 50
  ) {
    return { error: "מספר שותפים לא תקין." };
  }

  if (input.type !== "LOOKING_FOR" && input.type !== "HAS_APARTMENT") {
    return { error: "סוג מודעה לא תקין." };
  }

  const startDay = input.startDate.slice(0, 10);
  let endDay = input.endDate.slice(0, 10);

  if (!/^\d{4}-\d{2}-\d{2}$/.test(startDay) || !/^\d{4}-\d{2}-\d{2}$/.test(endDay)) {
    return { error: "תאריכים לא תקינים." };
  }

  if (endDay < startDay) {
    endDay = addOneDayIso(startDay);
  }

  const start = new Date(`${startDay}T12:00:00.000Z`);
  const end = new Date(`${endDay}T12:00:00.000Z`);

  if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime())) {
    return { error: "תאריכים לא תקינים." };
  }

  const dbUser = await requireDbUser();

  const imageUrls = Array.isArray(input.imageUrls)
    ? input.imageUrls.filter((u) => typeof u === "string" && u.startsWith("http"))
    : [];

  await prisma.listing.create({
    data: {
      title,
      description: `מודעת שותפים עבור ${title}`,
      location,
      type: input.type,
      price,
      startDate: start,
      endDate: end,
      whatsappNumber,
      roommatesNeeded,
      userId: dbUser.id,
      images: imageUrls,
    },
  });

  revalidatePath("/");
  revalidatePath("/my-listings");
  redirect("/?status=listing-created");
}

export async function updateListing(
  listingId: string,
  input: {
    title: string;
    location: string;
    price: number;
    startDate: string;
    endDate: string;
    whatsappNumber: string;
    roommatesNeeded: number;
    imageUrls: string[];
    type: ListingType;
  },
): Promise<ListingActionResult> {
  const title = input.title.trim();
  const location = input.location.trim();
  const whatsappNumber = input.whatsappNumber.trim();

  if (!title || !location || !isAllowedDestination(location)) {
    return { error: "יש לבחור יעד מהרשימה." };
  }
  if (!whatsappNumber) return { error: "יש להזין מספר לתיאום." };

  const price = Number(input.price);
  const roommatesNeeded = Number(input.roommatesNeeded);
  if (Number.isNaN(price) || price <= 0) return { error: "מחיר לא תקין." };
  if (!Number.isInteger(roommatesNeeded) || roommatesNeeded < 0 || roommatesNeeded > 50) {
    return { error: "מספר שותפים לא תקין." };
  }
  if (input.type !== "LOOKING_FOR" && input.type !== "HAS_APARTMENT") {
    return { error: "סוג מודעה לא תקין." };
  }

  let startDay = input.startDate.slice(0, 10);
  let endDay = input.endDate.slice(0, 10);
  if (!/^\d{4}-\d{2}-\d{2}$/.test(startDay) || !/^\d{4}-\d{2}-\d{2}$/.test(endDay)) {
    return { error: "תאריכים לא תקינים." };
  }
  if (endDay < startDay) endDay = addOneDayIso(startDay);
  const start = new Date(`${startDay}T12:00:00.000Z`);
  const end = new Date(`${endDay}T12:00:00.000Z`);

  const dbUser = await requireDbUser();

  const existing = await prisma.listing.findFirst({
    where: { id: listingId, userId: dbUser.id },
  });
  if (!existing) {
    return { error: "המודעה לא נמצאה או שאין הרשאה." };
  }

  const imageUrls = Array.isArray(input.imageUrls)
    ? input.imageUrls.filter((u) => typeof u === "string" && u.startsWith("http"))
    : [];

  await prisma.listing.update({
    where: { id: listingId },
    data: {
      title,
      description: `מודעת שותפים עבור ${title}`,
      location,
      type: input.type,
      price,
      startDate: start,
      endDate: end,
      whatsappNumber,
      roommatesNeeded,
      images: imageUrls,
    },
  });

  revalidatePath("/");
  revalidatePath("/my-listings");
  revalidatePath(`/listings/${listingId}`);
  redirect(`/listings/${listingId}?updated=1`);
}

export async function deleteListing(listingId: string): Promise<ListingActionResult> {
  const dbUser = await requireDbUser();

  const existing = await prisma.listing.findFirst({
    where: { id: listingId, userId: dbUser.id },
  });
  if (!existing) {
    return { error: "המודעה לא נמצאה או שאין הרשאה." };
  }

  await prisma.listing.delete({ where: { id: listingId } });

  revalidatePath("/");
  revalidatePath("/my-listings");
  revalidatePath(`/listings/${listingId}`);
}
