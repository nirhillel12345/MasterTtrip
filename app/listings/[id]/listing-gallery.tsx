"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

const FALLBACK =
  "https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=1400&q=85";

const FRAME =
  "overflow-hidden rounded-2xl shadow-lg shadow-slate-900/10 ring-1 ring-slate-200/70 sm:rounded-3xl sm:shadow-xl sm:ring-slate-200/80";

type Props = {
  images: string[];
  title: string;
};

export function ListingGallery({ images, title }: Props) {
  const urls = images.filter(Boolean).length ? images.filter(Boolean) : [FALLBACK];
  const [index, setIndex] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);
  const current = urls[index] ?? FALLBACK;

  const go = useCallback(
    (dir: -1 | 1) => {
      setIndex((i) => {
        const next = i + dir;
        if (next < 0) return urls.length - 1;
        if (next >= urls.length) return 0;
        return next;
      });
    },
    [urls.length],
  );

  const scrollToIndex = useCallback((i: number) => {
    const el = scrollRef.current;
    if (!el) return;
    const w = el.clientWidth;
    el.scrollTo({ left: i * w, behavior: "smooth" });
  }, []);

  const onMobileScroll = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    const w = el.clientWidth;
    if (w <= 0) return;
    const i = Math.round(el.scrollLeft / w);
    setIndex(Math.min(urls.length - 1, Math.max(0, i)));
  }, [urls.length]);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    el.addEventListener("scroll", onMobileScroll, { passive: true });
    return () => el.removeEventListener("scroll", onMobileScroll);
  }, [onMobileScroll]);

  if (urls.length === 1) {
    return (
      <div className="-mx-4 sm:mx-0">
        <div
          className={`relative aspect-[4/3] min-h-[200px] w-full sm:aspect-[21/9] sm:min-h-[260px] ${FRAME} bg-slate-100`}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={urls[0]} alt={title} className="h-full w-full object-cover" />
        </div>
      </div>
    );
  }

  return (
    <div className="-mx-4 space-y-4 sm:mx-0 sm:space-y-5">
      {/* Mobile: swipeable LTR scroller for predictable touch direction */}
      <div className="md:hidden">
        <div
          ref={scrollRef}
          dir="ltr"
          className={`scrollbar-hide flex w-full snap-x snap-mandatory overflow-x-auto scroll-smooth ${FRAME} bg-slate-100`}
        >
          {urls.map((url, i) => (
            <div
              key={`m-${url}-${i}`}
              className="aspect-[4/3] w-full min-w-full shrink-0 snap-center snap-always sm:aspect-[16/10]"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={url} alt={i === 0 ? title : ""} className="h-full w-full object-cover" />
            </div>
          ))}
        </div>
        <div className="mt-3 flex justify-center gap-1.5 px-4">
          {urls.map((_, i) => (
            <button
              key={`dot-m-${i}`}
              type="button"
              aria-label={`תמונה ${i + 1}`}
              onClick={() => {
                setIndex(i);
                scrollToIndex(i);
              }}
              className={`h-2 rounded-full transition-all ${i === index ? "w-6 bg-cyan-600" : "w-2 bg-slate-300"}`}
            />
          ))}
        </div>
      </div>

      {/* Desktop: main + arrows + thumbnails */}
      <div className="hidden md:block">
        <div className={`relative aspect-[16/10] min-h-[240px] w-full sm:min-h-[280px] ${FRAME} bg-slate-100`}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={current} alt="" className="h-full w-full object-cover" />
          <button
            type="button"
            onClick={() => go(-1)}
            className="absolute end-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/95 text-slate-800 shadow-md backdrop-blur transition hover:bg-white"
            aria-label="תמונה קודמת"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
          <button
            type="button"
            onClick={() => go(1)}
            className="absolute start-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/95 text-slate-800 shadow-md backdrop-blur transition hover:bg-white"
            aria-label="תמונה הבאה"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-1.5 rounded-full bg-slate-900/60 px-2 py-1.5 backdrop-blur">
            {urls.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setIndex(i)}
                className={`h-2 w-2 rounded-full transition ${i === index ? "bg-white" : "bg-white/40"}`}
                aria-label={`תמונה ${i + 1}`}
              />
            ))}
          </div>
        </div>
        <div className="mt-4 flex gap-3 overflow-x-auto pb-1 scrollbar-hide">
          {urls.map((url, i) => (
            <button
              key={`${url}-${i}`}
              type="button"
              onClick={() => setIndex(i)}
              className={`relative h-20 w-28 shrink-0 overflow-hidden rounded-xl shadow-md ring-2 transition sm:h-24 sm:w-36 sm:rounded-2xl sm:shadow-lg ${
                i === index ? "ring-cyan-500" : "ring-transparent opacity-85 hover:opacity-100"
              }`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={url} alt="" className="h-full w-full object-cover" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
