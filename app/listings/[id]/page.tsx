import { CalendarRange, ChevronRight, Home, MapPin, Search, Users } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ListingGallery } from "./listing-gallery";
import { WhatsAppCta } from "./whatsapp-cta";
import { InstagramMark } from "@/app/components/instagram-mark";
import { prisma } from "@/lib/prisma";
import { instagramProfileUrl } from "@/lib/instagram";
import type { ListingType } from "@/generated/prisma";

type PageProps = { params: Promise<{ id: string }> | { id: string } };

async function resolveParams(params: PageProps["params"]) {
  if (params && "then" in params) return await params;
  return params ?? { id: "" };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await resolveParams(params);
  const listing = await prisma.listing.findUnique({
    where: { id },
    select: { title: true, location: true },
  });
  if (!listing) return { title: "מודעה לא נמצאה" };
  return {
    title: `${listing.title} | MasterTrip`,
    description: `${listing.location} · MasterTrip`,
  };
}

function formatHebrewDate(d: Date): string {
  return new Intl.DateTimeFormat("he-IL", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(d);
}

function formatPrice(price: number): string {
  return `${price.toLocaleString("he-IL")} ₪`;
}

function typeLabel(type: ListingType): { label: string; className: string; Icon: typeof Search } {
  if (type === "HAS_APARTMENT") {
    return { label: "יש דירה", className: "bg-emerald-100 text-emerald-900", Icon: Home };
  }
  return { label: "מחפש דירה", className: "bg-amber-100 text-amber-950", Icon: Search };
}

export default async function ListingDetailPage({ params }: PageProps) {
  const { id } = await resolveParams(params);

  const listing = await prisma.listing.findUnique({
    where: { id },
    include: {
      user: {
        select: {
          id: true,
          name: true,
          image: true,
          email: true,
          instagram: true,
        },
      },
    },
  });

  if (!listing) notFound();

  const hostName = listing.user.name?.trim() || listing.user.email?.split("@")[0] || "מפרסם";
  const type = typeLabel(listing.type);
  const igHandle = listing.user.instagram?.trim();
  const igUrl = igHandle ? instagramProfileUrl(igHandle) : "";

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900" dir="rtl">
      <header className="sticky top-0 z-30 border-b border-slate-200/90 bg-white/95 backdrop-blur-md supports-[backdrop-filter]:bg-white/90">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3.5 sm:px-6 sm:py-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 transition hover:text-slate-900"
          >
            <ChevronRight className="h-4 w-4 shrink-0 text-slate-400" aria-hidden />
            חזרה לעמוד הבית
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 pb-28 pt-5 sm:px-6 sm:pb-20 sm:pt-7 lg:pb-16">
        <ListingGallery images={listing.images} title={listing.title} />

        <div className="mt-7 flex flex-col gap-8 sm:mt-10 lg:grid lg:grid-cols-[minmax(0,1fr)_minmax(280px,360px)] lg:items-start lg:gap-12">
          <div className="min-w-0 space-y-6 sm:space-y-8">
            <div className="text-right">
              <div className="mb-3 flex flex-wrap items-center justify-end gap-2">
                <span
                  className={`inline-flex items-center gap-1 rounded-full px-3 py-1.5 text-xs font-bold ${type.className}`}
                >
                  <type.Icon className="h-3.5 w-3.5 shrink-0" />
                  {type.label}
                </span>
              </div>
              <h1 className="text-2xl font-bold leading-snug tracking-tight text-slate-900 sm:text-3xl lg:text-4xl">
                {listing.title}
              </h1>
              <p className="mt-3 flex items-start justify-end gap-2 text-slate-600">
                <span className="min-w-0 text-base font-medium leading-relaxed sm:text-lg">{listing.location}</span>
                <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-cyan-600" aria-hidden />
              </p>
              <p className="mt-4 text-2xl font-bold text-slate-900 sm:text-3xl lg:hidden">{formatPrice(listing.price)}</p>
            </div>

            <section className="rounded-2xl border border-slate-200/90 bg-white p-5 text-right shadow-md shadow-slate-900/5 sm:p-7">
              <h2 className="flex items-center justify-end gap-2 text-xs font-bold uppercase tracking-wider text-slate-500 sm:text-sm">
                תאריכים
                <CalendarRange className="h-4 w-4 shrink-0 text-cyan-600" />
              </h2>
              <p className="mt-3 text-base font-semibold leading-relaxed text-slate-900 sm:text-lg">
                {formatHebrewDate(listing.startDate)} – {formatHebrewDate(listing.endDate)}
              </p>
            </section>

            <section className="rounded-2xl border border-slate-200/90 bg-white p-5 text-right shadow-md shadow-slate-900/5 sm:p-7">
              <h2 className="flex items-center justify-end gap-2 text-xs font-bold uppercase tracking-wider text-slate-500 sm:text-sm">
                שותפים
                <Users className="h-4 w-4 shrink-0 text-cyan-600" />
              </h2>
              <p className="mt-3 text-base font-semibold text-slate-900 sm:text-lg">
                חסרים {listing.roommatesNeeded} שותפים
              </p>
            </section>

            <section className="rounded-2xl border border-slate-200/90 bg-white p-5 text-right shadow-md shadow-slate-900/5 sm:p-7">
              <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500 sm:text-sm">תיאור</h2>
              <p className="mt-3 whitespace-pre-wrap text-[15px] leading-relaxed text-slate-700 sm:text-base">
                {listing.description}
              </p>
            </section>

            <section className="rounded-2xl border border-slate-200/90 bg-white p-5 text-right shadow-md shadow-slate-900/5 sm:p-7">
              <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500 sm:text-sm">מפרסם המודעה</h2>
              <div className="mt-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-6">
                <Link
                  href={`/profile/${listing.user.id}`}
                  className="flex min-w-0 items-center gap-4 rounded-xl transition hover:bg-slate-50/80 sm:flex-1"
                >
                  {listing.user.image ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={listing.user.image}
                      alt=""
                      className="h-14 w-14 shrink-0 rounded-full object-cover shadow-md ring-2 ring-slate-100 sm:h-16 sm:w-16"
                    />
                  ) : (
                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-slate-200 to-slate-300 text-lg font-bold text-slate-700 shadow-md sm:h-16 sm:w-16">
                      {hostName.slice(0, 1)}
                    </div>
                  )}
                  <div className="min-w-0 flex-1 text-right">
                    <p className="text-base font-semibold text-cyan-800 underline-offset-2 hover:underline sm:text-lg">{hostName}</p>
                    <p className="text-sm text-slate-500">חבר בקהילת MasterTrip · לחצו לפרופיל</p>
                  </div>
                </Link>
                {igUrl ? (
                  <a
                    href={igUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex w-full shrink-0 items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-gradient-to-br from-purple-600 to-pink-600 px-4 py-2.5 text-sm font-bold text-white shadow-md transition hover:opacity-95 active:scale-[0.99] sm:w-auto sm:self-center"
                  >
                    <InstagramMark className="h-5 w-5 shrink-0" />
                    אינסטגרם
                  </a>
                ) : null}
              </div>
            </section>
          </div>

          <aside className="hidden lg:sticky lg:top-24 lg:block">
            <div className="rounded-2xl border border-slate-200/90 bg-white p-6 text-right shadow-xl shadow-slate-900/10 ring-1 ring-slate-100/80">
              <p className="text-sm font-medium text-slate-500">מחיר</p>
              <p className="mt-1 text-3xl font-bold text-slate-900">{formatPrice(listing.price)}</p>
              <div className="mt-6">
                <WhatsAppCta whatsappNumber={listing.whatsappNumber} listingTitle={listing.title} />
              </div>
              <p className="mt-4 text-right text-xs leading-relaxed text-slate-500">
                לחיצה על הכפתור תפתח את וואטסאפ עם הודעה מוכנה — ניתן לערוך לפני השליחה.
              </p>
            </div>
          </aside>
        </div>
      </main>

      {/* Sticky WhatsApp — mobile only */}
      <div
        className="fixed inset-x-0 bottom-0 z-40 border-t border-slate-200/95 bg-white/95 px-4 pt-3 shadow-[0_-10px_40px_-8px_rgba(15,23,42,0.15)] backdrop-blur-md supports-[backdrop-filter]:bg-white/90 lg:hidden"
        style={{ paddingBottom: "max(0.75rem, env(safe-area-inset-bottom))" }}
      >
        <div className="mx-auto max-w-lg pb-1">
          <WhatsAppCta whatsappNumber={listing.whatsappNumber} listingTitle={listing.title} />
        </div>
      </div>
    </div>
  );
}
