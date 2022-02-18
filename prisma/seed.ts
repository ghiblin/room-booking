import { PrismaClient } from "@prisma/client";
import { today } from "../lib/utils";
const prisma = new PrismaClient();

async function main() {
  // Seed room collection
  for (const letter of ["C", "P"]) {
    for (let idx = 1; idx <= 10; idx++) {
      const code = letter + String(idx).padStart(2, "0");
      await prisma.room.upsert({
        where: { code },
        update: {},
        create: {
          code,
          company: letter === "C" ? "COKE" : "PEPSI",
        },
      });
    }
  }

  // Create some default users
  const alice = await prisma.user.upsert({
    where: { email: "alice@example.com" },
    update: {},
    create: {
      name: "Alice",
      email: "alice@example.com",
      company: "COKE",
    },
  });

  const bob = await prisma.user.upsert({
    where: { email: "bob@example.com" },
    update: {},
    create: {
      name: "Bob",
      email: "bob@example.com",
      company: "PEPSI",
    },
  });

  const charles = await prisma.user.upsert({
    where: { email: "charles@example.com" },
    update: {},
    create: {
      name: "Charles",
      email: "charles@example.com",
    },
  });

  const derek = await prisma.user.upsert({
    where: { email: "derek@example.com" },
    update: {},
    create: {
      name: "Derek",
      email: "derek@example.com",
    },
  });

  const date = today();

  await prisma.reservation.createMany({
    data: [
      { roomCode: "C01", date, slot: "S12", userId: alice.id },
      { roomCode: "C02", date, slot: "S14", userId: alice.id },
      { roomCode: "C02", date, slot: "S15", userId: alice.id },
      { roomCode: "C02", date, slot: "S16", userId: alice.id },
      { roomCode: "C02", date, slot: "S17", userId: alice.id },
      { roomCode: "C08", date, slot: "S09", userId: alice.id },
      { roomCode: "C08", date, slot: "S10", userId: alice.id },
      { roomCode: "C08", date, slot: "S11", userId: alice.id },
      { roomCode: "C08", date, slot: "S12", userId: alice.id },
      { roomCode: "P01", date, slot: "S12", userId: bob.id },
      { roomCode: "P02", date, slot: "S14", userId: bob.id },
      { roomCode: "P02", date, slot: "S15", userId: bob.id },
      { roomCode: "P02", date, slot: "S16", userId: bob.id },
      { roomCode: "P02", date, slot: "S17", userId: bob.id },
      { roomCode: "P08", date, slot: "S09", userId: bob.id },
      { roomCode: "P08", date, slot: "S10", userId: bob.id },
      { roomCode: "P08", date, slot: "S11", userId: bob.id },
      { roomCode: "P08", date, slot: "S12", userId: bob.id },
      { roomCode: "C01", date, slot: "S15", userId: charles.id },
      { roomCode: "C01", date, slot: "S16", userId: charles.id },
      { roomCode: "C01", date, slot: "S17", userId: charles.id },
      { roomCode: "C01", date, slot: "S18", userId: charles.id },
      { roomCode: "C03", date, slot: "S15", userId: charles.id },
      { roomCode: "C03", date, slot: "S16", userId: charles.id },
      { roomCode: "C03", date, slot: "S17", userId: charles.id },
      { roomCode: "C03", date, slot: "S18", userId: charles.id },
      { roomCode: "P01", date, slot: "S15", userId: charles.id },
      { roomCode: "P01", date, slot: "S16", userId: charles.id },
      { roomCode: "P01", date, slot: "S17", userId: charles.id },
      { roomCode: "P01", date, slot: "S18", userId: charles.id },
      { roomCode: "P03", date, slot: "S15", userId: charles.id },
      { roomCode: "P03", date, slot: "S16", userId: charles.id },
      { roomCode: "P03", date, slot: "S17", userId: charles.id },
      { roomCode: "P03", date, slot: "S18", userId: charles.id },
      { roomCode: "C05", date, slot: "S09", userId: derek.id },
      { roomCode: "C05", date, slot: "S10", userId: derek.id },
      { roomCode: "C05", date, slot: "S11", userId: derek.id },
      { roomCode: "C05", date, slot: "S12", userId: derek.id },
      { roomCode: "C05", date, slot: "S13", userId: derek.id },
      { roomCode: "P05", date, slot: "S09", userId: derek.id },
      { roomCode: "P05", date, slot: "S10", userId: derek.id },
      { roomCode: "P05", date, slot: "S11", userId: derek.id },
      { roomCode: "P05", date, slot: "S12", userId: derek.id },
      { roomCode: "P05", date, slot: "S13", userId: derek.id },
    ],
    skipDuplicates: true,
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
