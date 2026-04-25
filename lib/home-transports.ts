import { prisma } from "@/lib/prisma";

export type HomeTransportListItem = {
  id: string;
  origin: string;
  destination: string;
  date: Date;
  totalSeats: number;
  availableSeats: number;
  pricePerPerson: number;
  creatorName: string;
};

export async function getHomeTransports(limit = 18): Promise<HomeTransportListItem[]> {
  const rows = await prisma.transport.findMany({
    orderBy: [{ date: "asc" }, { createdAt: "desc" }],
    take: limit,
    select: {
      id: true,
      origin: true,
      destination: true,
      date: true,
      totalSeats: true,
      availableSeats: true,
      pricePerPerson: true,
      creator: { select: { name: true, email: true } },
    },
  });

  return rows.map((r) => ({
    id: r.id,
    origin: r.origin,
    destination: r.destination,
    date: r.date,
    totalSeats: r.totalSeats,
    availableSeats: r.availableSeats,
    pricePerPerson: r.pricePerPerson,
    creatorName: r.creator.name?.trim() || r.creator.email.split("@")[0],
  }));
}
