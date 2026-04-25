"use client";

import L, { type LatLngExpression } from "leaflet";
import Link from "next/link";
import { useMemo } from "react";
import { CircleMarker, MapContainer, Popup, TileLayer } from "react-leaflet";
import { MarkerClusterGroup } from "@/app/components/marker-cluster-group";
import type { HomeListingListItem } from "@/lib/home-listings";
import { coordinatesForListingLocation, jitterListingPosition } from "@/lib/destination-coordinates";
import { getHomeMapTileConfig } from "@/lib/map-tiles";
import { formatListingNightPrice } from "@/lib/listing-price";

import "leaflet/dist/leaflet.css";

const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=800&q=80";

type Props = {
  listings: HomeListingListItem[];
};

export function HomeMapLeaflet({ listings }: Props) {
  const tileConfig = useMemo(() => getHomeMapTileConfig(), []);

  const positioned = useMemo(() => {
    const out: { listing: HomeListingListItem; position: [number, number] }[] = [];
    for (const listing of listings) {
      const base = coordinatesForListingLocation(listing.location);
      if (!base) continue;
      const [lat, lng] = jitterListingPosition(base.lat, base.lng, listing.id);
      out.push({ listing, position: [lat, lng] });
    }
    return out;
  }, [listings]);

  const bounds = useMemo(() => {
    if (positioned.length < 2) return null;
    return L.latLngBounds(positioned.map((p) => L.latLng(p.position[0], p.position[1])));
  }, [positioned]);

  const mapInitProps =
    positioned.length === 1
      ? { center: positioned[0].position as LatLngExpression, zoom: 9 as const }
      : bounds
        ? {
            bounds,
            boundsOptions: { padding: [48, 48] as [number, number], maxZoom: 12 as const },
          }
        : { center: [15, 0] as LatLngExpression, zoom: 2 as const };

  const skipped = listings.length - positioned.length;

  if (listings.length === 0) {
    return null;
  }

  if (positioned.length === 0) {
    return (
      <div
        className="flex min-h-[min(70vh,560px)] flex-col items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-6 py-16 text-center"
        dir="rtl"
      >
        <p className="text-base font-semibold text-slate-800">אין מודעות עם מיקום במפה</p>
        <p className="mt-2 max-w-md text-sm leading-relaxed text-slate-600">
          המיקומים במפה מבוססים על היעדים מהרשימה המוגדרת. מודעות עם טקסט חופשי לא יוצגו כאן.
        </p>
      </div>
    );
  }

  return (
    <div className="relative isolate rounded-2xl border border-slate-200/90 bg-white shadow-md shadow-slate-900/5 ring-1 ring-slate-100/80" dir="ltr">
      {skipped > 0 ? (
        <div
          className="absolute end-3 top-3 z-[500] max-w-[min(100%,18rem)] rounded-xl border border-amber-200/90 bg-amber-50/95 px-3 py-2 text-right text-xs font-medium text-amber-950 shadow-sm backdrop-blur-sm"
          dir="rtl"
        >
          {skipped} מודעות ללא נקודת מפה (מיקום לא מזוהה)
        </div>
      ) : null}
      <MapContainer
        key={positioned.map((p) => p.listing.id).join("|")}
        {...mapInitProps}
        className="z-0 h-[min(70vh,560px)] w-full overflow-hidden rounded-2xl"
        scrollWheelZoom
        attributionControl
      >
        <TileLayer
          attribution={tileConfig.attribution}
          url={tileConfig.url}
          subdomains={tileConfig.subdomains}
        />
        <MarkerClusterGroup>
          {positioned.map(({ listing, position }) => {
            const imageUrl = listing.images[0]?.trim() || FALLBACK_IMAGE;
            return (
              <CircleMarker
                key={listing.id}
                center={position}
                radius={10}
                pathOptions={{
                  color: "#0e7490",
                  fillColor: "#22d3ee",
                  fillOpacity: 0.92,
                  weight: 2,
                }}
              >
                <Popup className="home-map-popup" maxWidth={280} minWidth={220}>
                  <div className="home-map-popup-inner text-right" dir="rtl">
                    <Link
                      href={`/listings/${listing.id}`}
                      className="block rounded-xl outline-none ring-offset-2 transition hover:opacity-95 focus-visible:ring-2 focus-visible:ring-cyan-500"
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={imageUrl}
                        alt=""
                        className="aspect-[16/10] w-full rounded-lg object-cover shadow-sm"
                      />
                      <p className="mt-2 line-clamp-2 text-sm font-bold leading-snug text-slate-900">{listing.title}</p>
                      <p className="mt-1 text-sm font-semibold tabular-nums text-cyan-700">{formatListingNightPrice(listing.price)}</p>
                      <p className="mt-1 text-xs font-medium text-cyan-600 underline-offset-2 hover:underline">לפרטים מלאים</p>
                    </Link>
                  </div>
                </Popup>
              </CircleMarker>
            );
          })}
        </MarkerClusterGroup>
      </MapContainer>
    </div>
  );
}
