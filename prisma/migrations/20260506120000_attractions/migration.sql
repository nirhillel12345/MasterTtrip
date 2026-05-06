-- CreateEnum
CREATE TYPE "AttractionType" AS ENUM ('BUSINESS', 'PRIVATE');

-- CreateTable
CREATE TABLE "Location" (
    "id" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Location_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Attraction" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "price" DOUBLE PRECISION,
    "locationId" TEXT NOT NULL,
    "creatorId" TEXT NOT NULL,
    "type" "AttractionType" NOT NULL,
    "images" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "contactPhone" TEXT NOT NULL,
    "externalLink" TEXT,
    "date" TIMESTAMP(3),
    "maxParticipants" INTEGER,
    "availableSlots" INTEGER,

    CONSTRAINT "Attraction_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AttractionJoin" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "attractionId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "AttractionJoin_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Location_label_key" ON "Location"("label");

-- CreateIndex
CREATE UNIQUE INDEX "AttractionJoin_attractionId_userId_key" ON "AttractionJoin"("attractionId", "userId");

-- AlterTable
ALTER TABLE "Notification" ADD COLUMN "attractionId" TEXT;

-- AddForeignKey
ALTER TABLE "Attraction" ADD CONSTRAINT "Attraction_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "Location"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Attraction" ADD CONSTRAINT "Attraction_creatorId_fkey" FOREIGN KEY ("creatorId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AttractionJoin" ADD CONSTRAINT "AttractionJoin_attractionId_fkey" FOREIGN KEY ("attractionId") REFERENCES "Attraction"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AttractionJoin" ADD CONSTRAINT "AttractionJoin_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Notification" ADD CONSTRAINT "Notification_attractionId_fkey" FOREIGN KEY ("attractionId") REFERENCES "Attraction"("id") ON DELETE SET NULL ON UPDATE CASCADE;
