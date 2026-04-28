import type { User } from "@supabase/supabase-js";
import { prisma } from "@/lib/prisma";

/**
 * Prisma `emailVerified`: true when Google (or other OAuth) is linked — Google
 * verifies the email — or when Supabase has confirmed the email (OTP/password flow).
 */
function authUserEmailVerifiedForPrisma(user: User): boolean {
  const meta = user.app_metadata ?? {};
  const providers = meta.providers;
  const hasGoogle =
    meta.provider === "google" ||
    (Array.isArray(providers) && providers.includes("google")) ||
    (user.identities ?? []).some((i) => i.provider === "google");

  if (hasGoogle) {
    return true;
  }

  return Boolean(user.email_confirmed_at);
}

/**
 * Upsert the Supabase auth user into Prisma (same fields as OAuth callback).
 */
export async function syncAuthUserToPrisma(user: User): Promise<void> {
  const email = user.email;
  if (!email) {
    throw new Error("Missing email on auth user");
  }

  const metadata = user.user_metadata ?? {};
  const name =
    typeof metadata.full_name === "string"
      ? metadata.full_name
      : typeof metadata.name === "string"
        ? metadata.name
        : null;
  const image =
    typeof metadata.avatar_url === "string"
      ? metadata.avatar_url
      : typeof metadata.picture === "string"
        ? metadata.picture
        : null;

  const emailVerified = authUserEmailVerifiedForPrisma(user);

  await prisma.user.upsert({
    where: { email },
    update: {
      name,
      image,
      emailVerified,
      ...(emailVerified
        ? {
            verificationCode: null,
            verificationCodeSentAt: null,
            verificationCodeExpiresAt: null,
          }
        : {}),
    },
    create: {
      email,
      name,
      image,
      emailVerified,
    },
  });
}
