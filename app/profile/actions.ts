"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { prisma } from "@/lib/prisma";
import { normalizeInstagramHandle } from "@/lib/instagram";

export type ProfileActionState = { error?: string; ok?: boolean } | null;

const MAX_BIO = 5000;

export async function updateProfile(
  _prev: ProfileActionState,
  formData: FormData,
): Promise<ProfileActionState> {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user?.email) {
    redirect("/auth/login?error=" + encodeURIComponent("יש להתחבר"));
  }

  const bioRaw = (formData.get("bio") as string) ?? "";
  const bio = bioRaw.trim() === "" ? null : bioRaw.trim();
  if (bio && bio.length > MAX_BIO) {
    return { error: `הביוגרפיה ארוכה מדי (עד ${MAX_BIO} תווים)` };
  }

  const instagram = normalizeInstagramHandle((formData.get("instagram") as string) ?? "");
  const phone = ((formData.get("phone") as string) ?? "").trim() || null;

  const dbUser = await prisma.user.findUnique({
    where: { email: user.email },
    select: { id: true },
  });
  if (!dbUser) {
    return { error: "לא נמצא משתמש במערכת" };
  }

  await prisma.user.update({
    where: { id: dbUser.id },
    data: { bio, instagram, phone },
  });

  revalidatePath("/profile");
  revalidatePath(`/profile/${dbUser.id}`);

  return { ok: true };
}
