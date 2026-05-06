import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { AttractionForm, type AttractionFormInitialValues } from "@/app/attractions/new/attraction-form";
import { prisma } from "@/lib/prisma";
import { createSupabaseServerClient } from "@/lib/supabase/server";

type PageProps = {
  params: Promise<{ id: string }> | { id: string };
};

async function resolveParams(params: PageProps["params"]) {
  if (params && "then" in params) return await params;
  return params ?? { id: "" };
}

function dateToInput(date: Date | null): string {
  if (!date) return "";
  return date.toISOString().slice(0, 16);
}

export default async function EditAttractionPage({ params }: PageProps) {
  const { id } = await resolveParams(params);
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user?.email) {
    redirect(
      "/auth/login?error=" + encodeURIComponent("יש להתחבר כדי לערוך אטרקציה") + `&next=${encodeURIComponent(`/attractions/${id}/edit`)}`,
    );
  }

  const dbUser = await prisma.user.findUnique({
    where: { email: user.email },
    select: { id: true },
  });
  if (!dbUser) redirect("/auth/login");

  const attraction = await prisma.attraction.findUnique({
    where: { id },
    include: { location: { select: { label: true } } },
  });
  if (!attraction) notFound();
  if (attraction.creatorId !== dbUser.id) redirect(`/attractions/${id}`);

  const initialValues: AttractionFormInitialValues = {
    title: attraction.title,
    description: attraction.description ?? "",
    price: attraction.price == null ? "" : String(attraction.price),
    locationLabel: attraction.location.label,
    type: attraction.type,
    contactPhone: attraction.contactPhone,
    externalLink: attraction.externalLink ?? "",
    date: dateToInput(attraction.date),
    maxParticipants: attraction.maxParticipants == null ? "" : String(attraction.maxParticipants),
    images: attraction.images,
  };

  return (
    <div className="min-h-screen overflow-x-hidden bg-slate-50 px-4 py-8 text-slate-900 sm:px-6 sm:py-10" dir="rtl">
      <section className="mx-auto w-full max-w-3xl overflow-x-hidden rounded-3xl border border-slate-200 bg-white p-6 shadow-xl shadow-slate-200/60 sm:p-8">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <div className="text-right">
            <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">עריכת אטרקציה</h1>
            <p className="mt-1.5 text-sm text-slate-600">עדכנו פרטים, תמונות ומכסת משתתפים במהירות.</p>
          </div>
          <Link
            href="/my-attractions"
            className="rounded-full border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 active:scale-[0.98]"
          >
            האטרקציות שלי
          </Link>
        </div>
        <AttractionForm editAttractionId={attraction.id} initialValues={initialValues} />
      </section>
    </div>
  );
}
