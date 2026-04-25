import { Home, Search } from "lucide-react";
import Link from "next/link";
import type { ListingType } from "@/generated/prisma";
import { formatListingNightPrice } from "@/lib/listing-price";

const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=800&q=80";

function typeBadge(type: ListingType): { label: string; className: string; Icon: typeof Search } {
  if (type === "HAS_APARTMENT") {
    return {
      label: "דירה / סאבלט",
      className: "bg-emerald-600/95 text-white",
      Icon: Home,
    };
  }
  return {
    label: "מודעה ישנה",
    className: "bg-slate-500/90 text-white",
    Icon: Search,
  };
}

export type ListingCardProps = {
  id: string;
  title: string;
  location: string;
  price: number;
  type: ListingType;
  images: string[];
};

export function ListingCard({ id, title, location, price, type, images }: ListingCardProps) {
  const imageUrl = images[0]?.trim() || FALLBACK_IMAGE;
  const { label, className, Icon } = typeBadge(type);

  return (
    <Link
      href={`/listings/${id}`}
      className="group block overflow-hidden rounded-2xl border border-slate-200/90 bg-white shadow-md shadow-slate-900/5 ring-1 ring-slate-100/80 transition hover:-translate-y-0.5 hover:border-cyan-200/80 hover:shadow-lg hover:shadow-slate-900/10"
    >
      <div className="relative aspect-[16/10] w-full overflow-hidden rounded-t-2xl bg-slate-100 shadow-inner ring-1 ring-slate-200/60">
        {/* eslint-disable-next-line @next/next/no-img-element -- Supabase + Unsplash URLs */}
        <img
          src={imageUrl}
          alt={title}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]"
        />
        <span
          className={`absolute end-3 top-3 inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-bold shadow-md backdrop-blur-sm ${className}`}
        >
          <Icon className="h-3.5 w-3.5" aria-hidden />
          {label}
        </span>
      </div>
      <div className="space-y-1.5 p-4 text-right sm:p-5">
        <h3 className="line-clamp-2 text-[15px] font-semibold leading-snug text-slate-900 sm:text-base">{title}</h3>
        <p className="text-sm leading-relaxed text-slate-500">{location}</p>
        <p className="pt-1 text-sm font-bold tabular-nums text-slate-900 sm:text-base">{formatListingNightPrice(price)}</p>
        <p className="text-xs text-slate-400">לחצו לפרטים</p>
      </div>
    </Link>
  );
}
