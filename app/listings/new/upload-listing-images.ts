"use client";

import { createSupabaseBrowserClient } from "@/lib/supabase/client";

const BUCKET = "listing-images";

/**
 * Supabase Storage — יצירת bucket ידנית:
 * 1. Dashboard → Storage → New bucket
 * 2. שם: listing-images
 * 3. סמנו "Public bucket" לקבלת public URLs
 * 4. Policies: לאפשר INSERT למשתמשים מחוברים; SELECT ציבורי לקריאה (או לפי הצורך)
 */
export async function uploadListingImagesToStorage(files: File[]): Promise<string[]> {
  if (files.length === 0) return [];

  const supabase = createSupabaseBrowserClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("יש להתחבר כדי להעלות תמונות");
  }

  const urls: string[] = [];

  for (const file of files) {
    const ext = file.name.split(".").pop()?.replace(/[^a-zA-Z0-9]/g, "") || "jpg";
    const path = `${user.id}/${crypto.randomUUID()}.${ext}`;

    const { error } = await supabase.storage.from(BUCKET).upload(path, file, {
      cacheControl: "3600",
      upsert: false,
      contentType: file.type || "image/jpeg",
    });

    if (error) {
      throw new Error(
        "העלאת התמונה נכשלה. ודאו שקיים bucket בשם listing-images והרשאות Storage מוגדרות.",
      );
    }

    const { data } = supabase.storage.from(BUCKET).getPublicUrl(path);
    if (data?.publicUrl) urls.push(data.publicUrl);
  }

  return urls;
}
