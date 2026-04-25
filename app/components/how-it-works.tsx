import { Camera, CheckCircle2, Edit3, MessageSquare } from "lucide-react";

const steps = [
  {
    n: 1,
    title: "פותחים מודעה",
    description: "מזינים יעד, תאריכים, מספר שותפים ופרטים שחשוב לאחרים לדעת.",
    Icon: Edit3,
  },
  {
    n: 2,
    title: "מוסיפים תמונות",
    description: "מראים את המקום או את עצמכם כדי לבנות אמון ולחסוך שאלות מיותרות.",
    Icon: Camera,
  },
  {
    n: 3,
    title: "מקבלים פניות",
    description: "אנשים רלוונטיים מוצאים אתכם בדיוק לפי היעד והתאריכים ויוצרים קשר.",
    Icon: MessageSquare,
  },
] as const;

const benefits = [
  "לא מפספסים מודעות רלוונטיות",
  "רואים רק התאמות שמתאימות לכם",
  "חוסכים זמן והתכתבויות מיותרות",
  "סוגרים מקום או שותפים מהר יותר",
] as const;

function StepCard({
  n,
  title,
  description,
  Icon,
}: {
  n: number;
  title: string;
  description: string;
  Icon: (typeof steps)[number]["Icon"];
}) {
  return (
    <article className="relative flex h-full flex-col rounded-2xl border border-slate-200/90 bg-white p-6 text-right shadow-sm shadow-slate-900/5 ring-1 ring-slate-100/80 transition duration-300 hover:-translate-y-0.5 hover:border-cyan-200/80 hover:shadow-md hover:shadow-slate-900/10 sm:p-7">
      <span
        className="absolute top-4 flex h-8 w-8 items-center justify-center rounded-full bg-cyan-50 text-sm font-bold text-cyan-700 ring-2 ring-cyan-100 end-4"
        aria-hidden
      >
        {n}
      </span>
      <div className="mb-4 mt-2 flex justify-end">
        <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-cyan-50 text-cyan-600">
          <Icon className="h-6 w-6 shrink-0" strokeWidth={2} aria-hidden />
        </span>
      </div>
      <h3 className="text-lg font-bold text-slate-900">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-slate-600 sm:text-[15px]">{description}</p>
    </article>
  );
}

function Connector() {
  return (
    <div
      className="hidden min-h-[1px] min-w-[1.5rem] max-w-[3.5rem] shrink-0 self-center border-t-2 border-dotted border-slate-300 md:block lg:max-w-[5rem]"
      aria-hidden
    />
  );
}

export function HowItWorks() {
  return (
    <section className="border-y border-slate-200/60 bg-slate-50 py-16 text-right sm:py-20" dir="rtl">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <header className="mx-auto mb-12 max-w-2xl text-center sm:mb-14">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">איך זה עובד?</h2>
          <p className="mx-auto mt-3 max-w-2xl text-base leading-relaxed text-slate-600 sm:text-lg">
            מוצאים דירה שותפים ומעברים — בלי להתברבר בקבוצות
          </p>
        </header>

        {/* Desktop: row with connectors */}
        <div className="hidden items-stretch justify-center gap-0 md:flex">
          <div className="min-w-0 flex-1">
            <StepCard {...steps[0]} />
          </div>
          <Connector />
          <div className="min-w-0 flex-1">
            <StepCard {...steps[1]} />
          </div>
          <Connector />
          <div className="min-w-0 flex-1">
            <StepCard {...steps[2]} />
          </div>
        </div>

        <div className="space-y-5 md:hidden">
          {steps.map((s) => (
            <StepCard key={s.n} {...s} />
          ))}
        </div>

        <div className="mt-14 rounded-2xl border border-cyan-100/80 bg-white p-6 shadow-sm shadow-slate-900/5 ring-1 ring-cyan-50/60 sm:mt-16 sm:p-8">
          <h3 className="text-center text-xl font-bold text-slate-900 sm:text-2xl">למה MasterTrip טוב יותר?</h3>
          <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
            {benefits.map((line) => (
              <li
                key={line}
                className="flex items-start gap-3 rounded-xl border border-slate-100 bg-slate-50/80 px-4 py-3.5 text-right text-sm font-medium leading-snug text-slate-800 sm:text-[15px]"
              >
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-cyan-600" strokeWidth={2} aria-hidden />
                <span>{line}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
