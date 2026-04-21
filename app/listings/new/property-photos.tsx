"use client";

import { ImagePlus, X } from "lucide-react";
import { useEffect, useState } from "react";

const MAX_BYTES = 4 * 1024 * 1024;

type Props = {
  files: File[];
  onFilesChange: (files: File[]) => void;
  disabled?: boolean;
  /** Max number of new file uploads (default 8). Use with existing images on edit. */
  maxFiles?: number;
};

export function PropertyPhotos({ files, onFilesChange, disabled, maxFiles = 8 }: Props) {
  const [previews, setPreviews] = useState<{ file: File; url: string }[]>([]);

  useEffect(() => {
    const next = files.map((file) => ({ file, url: URL.createObjectURL(file) }));
    setPreviews(next);
    return () => {
      next.forEach((p) => URL.revokeObjectURL(p.url));
    };
  }, [files]);

  function onFilePick(e: React.ChangeEvent<HTMLInputElement>) {
    const picked = Array.from(e.target.files ?? []);
    e.target.value = "";
    if (!picked.length) return;

    const images = picked.filter((f) => f.type.startsWith("image/"));
    const tooBig = images.find((f) => f.size > MAX_BYTES);
    if (tooBig) {
      return;
    }
    if (images.length + files.length > maxFiles) {
      return;
    }

    const merged = [...files, ...images].slice(0, maxFiles);
    onFilesChange(merged);
  }

  function removeAt(index: number) {
    onFilesChange(files.filter((_, i) => i !== index));
  }

  return (
    <div className="space-y-3">
      <div>
        <span className="mb-1 block text-sm font-medium text-slate-700">תמונות נכס (אופציונלי)</span>
        <p className="text-xs text-slate-500">עד {maxFiles} תמונות חדשות, עד 4MB לקובץ</p>
      </div>

      <label
        className={`flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-300 bg-slate-50/80 px-4 py-8 transition hover:border-cyan-400 hover:bg-cyan-50/40 ${
          disabled ? "pointer-events-none opacity-60" : ""
        }`}
      >
        <input
          type="file"
          accept="image/*"
          multiple
          className="sr-only"
          onChange={onFilePick}
          disabled={disabled}
        />
        <ImagePlus className="h-8 w-8 text-slate-400" />
        <span className="mt-2 text-sm font-medium text-slate-700">לחצו לבחירת תמונות</span>
      </label>

      {previews.length > 0 ? (
        <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          {previews.map((p, i) => (
            <li
              key={`${p.file.name}-${i}-${p.url}`}
              className="group relative aspect-[4/3] overflow-hidden rounded-xl border border-slate-200 bg-slate-100"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={p.url} alt="" className="h-full w-full object-cover" />
              <button
                type="button"
                onClick={() => removeAt(i)}
                disabled={disabled}
                className="absolute left-2 top-2 rounded-full bg-slate-900/70 p-1.5 text-white opacity-0 transition group-hover:opacity-100 disabled:opacity-50"
                aria-label="הסרת תמונה"
              >
                <X className="h-4 w-4" />
              </button>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
