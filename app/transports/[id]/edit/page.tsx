import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { TransportForm, type TransportFormInitialValues } from "@/app/transports/new/transport-form";
import { prisma } from "@/lib/prisma";
import { createSupabaseServerClient } from "@/lib/supabase/server";

type PageProps = {
  params: Promise<{ id: string }> | { id: string };
};

async function resolveParams(params: PageProps["params"]) {
  if (params && "then" in params) return await params;
  return params ?? { id: "" };
}

function transportDateToFormValues(date: Date): Pick<TransportFormInitialValues, "date" | "pickupTime"> {
  const iso = date.toISOString();
  return { date: iso.slice(0, 10), pickupTime: iso.slice(11, 16) };
}

export default async function EditTransportPage({ params }: PageProps) {
  const { id } = await resolveParams(params);

  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user?.email) {
    redirect("/auth/login?error=" + encodeURIComponent("יש להתחבר כדי לערוך הסעה") + `&next=${encodeURIComponent(`/transports/${id}/edit`)}`);
  }

  const dbUser = await prisma.user.findUnique({
    where: { email: user.email },
    select: { id: true },
  });
  if (!dbUser) {
    redirect("/auth/login");
  }

  const ride = await prisma.transport.findUnique({
    where: { id },
    select: {
      id: true,
      creatorId: true,
      origin: true,
      destination: true,
      date: true,
      totalSeats: true,
      pricePerPerson: true,
      description: true,
    },
  });

  if (!ride) notFound();
  if (ride.creatorId !== dbUser.id) {
    redirect(`/transports/${id}`);
  }

  const { date, pickupTime } = transportDateToFormValues(ride.date);
  const initialValues: TransportFormInitialValues = {
    origin: ride.origin,
    destination: ride.destination,
    date,
    pickupTime,
    totalSeats: String(ride.totalSeats),
    pricePerPerson: String(ride.pricePerPerson),
    description: ride.description,
  };

  return (
    <div className="min-h-screen overflow-x-hidden bg-slate-50 px-4 py-8 text-slate-900 sm:px-6 sm:py-10" dir="rtl">
      <section className="mx-auto w-full max-w-3xl overflow-x-hidden rounded-3xl border border-slate-200 bg-white p-6 shadow-xl shadow-slate-200/60 sm:p-8">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <div className="text-right">
            <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">עריכת הסעה</h1>
            <p className="mt-1.5 text-sm text-slate-600">עדכנו פרטים, מחיר או מקומות — המערכת תשמור על מספר המשתתפים הרשומים.</p>
          </div>
          <Link
            href="/my-transports"
            className="rounded-full border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 active:scale-[0.98]"
          >
            ההסעות שלי
          </Link>
        </div>
        <TransportForm editTransportId={ride.id} initialValues={initialValues} />
      </section>
    </div>
  );
}
