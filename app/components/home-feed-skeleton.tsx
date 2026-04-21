export function HomeFeedSkeleton() {
  return (
    <div className="space-y-6" aria-busy="true" aria-label="טוען מודעות">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div className="space-y-2 text-right">
          <div className="ms-auto h-7 w-48 animate-pulse rounded-lg bg-slate-200 sm:h-8 sm:w-56" />
          <div className="ms-auto h-4 w-full max-w-xs animate-pulse rounded bg-slate-200" />
        </div>
        <div className="ms-auto h-4 w-20 animate-pulse rounded bg-slate-200 sm:ms-0" />
      </div>
      <div className="grid gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="overflow-hidden rounded-2xl border border-slate-200/90 bg-white shadow-md ring-1 ring-slate-100/80"
          >
            <div className="aspect-[16/10] animate-pulse bg-slate-200" />
            <div className="space-y-3 p-4 text-right sm:p-5">
              <div className="ms-auto h-4 w-[85%] max-w-[90%] animate-pulse rounded bg-slate-200" />
              <div className="ms-auto h-3 w-[55%] max-w-[60%] animate-pulse rounded bg-slate-200" />
              <div className="ms-auto h-4 w-24 animate-pulse rounded bg-slate-200" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
