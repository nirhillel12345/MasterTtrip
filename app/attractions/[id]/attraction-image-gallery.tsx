"use client";

import { Camera } from "lucide-react";
import { useMemo, useState } from "react";

type Props = {
  title: string;
  images: string[];
};

export function AttractionImageGallery({ title, images }: Props) {
  const validImages = useMemo(() => images.filter(Boolean), [images]);
  const [selected, setSelected] = useState(0);

  if (validImages.length === 0) {
    return (
      <div className="flex aspect-[4/3] items-center justify-center rounded-2xl border border-slate-200 bg-white text-slate-400 shadow-md shadow-slate-900/5">
        <Camera className="h-8 w-8" />
      </div>
    );
  }

  return (
    <>
      <div className="sm:hidden">
        <div className="flex snap-x snap-mandatory gap-2 overflow-x-auto rounded-2xl border border-slate-200 bg-white p-2 shadow-md shadow-slate-900/5">
          {validImages.map((image, index) => (
            <div key={`${image}-${index}`} className="attraction-mobile-slide min-w-full snap-center overflow-hidden rounded-xl bg-slate-100">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={image} alt={index === 0 ? title : ""} className="aspect-[4/3] h-full w-full object-cover" />
            </div>
          ))}
        </div>
        <div className="mt-2 flex items-center justify-center gap-1.5">
          {validImages.map((image, index) => (
            <button
              key={`dot-${image}-${index}`}
              type="button"
              onClick={() => {
                setSelected(index);
                const el = document.querySelectorAll<HTMLDivElement>(".attraction-mobile-slide")[index];
                el?.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
              }}
              aria-label={`תמונה ${index + 1}`}
              className={`h-2.5 w-2.5 rounded-full transition ${selected === index ? "bg-cyan-600" : "bg-slate-300"}`}
            />
          ))}
        </div>
      </div>

      <div className="hidden overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-md shadow-slate-900/5 sm:block">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={validImages[selected]} alt={title} className="aspect-[16/9] h-full w-full object-cover" />
        {validImages.length > 1 ? (
          <div className="grid grid-cols-5 gap-2 border-t border-slate-100 p-2">
            {validImages.map((image, index) => (
              <button
                key={`thumb-${image}-${index}`}
                type="button"
                onClick={() => setSelected(index)}
                className={`overflow-hidden rounded-lg border transition ${
                  selected === index ? "border-cyan-500 ring-2 ring-cyan-200" : "border-slate-200 hover:border-slate-300"
                }`}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={image} alt="" className="aspect-[4/3] h-full w-full object-cover" />
              </button>
            ))}
          </div>
        ) : null}
      </div>
    </>
  );
}
