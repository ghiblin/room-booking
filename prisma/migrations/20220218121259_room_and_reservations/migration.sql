-- CreateEnum
CREATE TYPE "Slot" AS ENUM ('S09', 'S10', 'S11', 'S12', 'S13', 'S14', 'S15', 'S16', 'S17', 'S18');

-- CreateTable
CREATE TABLE "Room" (
    "code" TEXT NOT NULL,
    "company" "Company" NOT NULL,

    CONSTRAINT "Room_pkey" PRIMARY KEY ("code")
);

-- CreateTable
CREATE TABLE "Reservation" (
    "roomCode" TEXT NOT NULL,
    "date" DATE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "slot" "Slot" NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Reservation_roomCode_date_slot_key" ON "Reservation"("roomCode", "date", "slot");

-- AddForeignKey
ALTER TABLE "Reservation" ADD CONSTRAINT "Reservation_roomCode_fkey" FOREIGN KEY ("roomCode") REFERENCES "Room"("code") ON DELETE RESTRICT ON UPDATE CASCADE;
