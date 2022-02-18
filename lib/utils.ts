import { Slot } from "@prisma/client";

const ONE_DAY = 1000 * 60 * 60 * 24;

export function today(): Date {
  // when I set hours to 00:00:00:00 it move one day back
  return new Date(new Date().setHours(0, 0, 0, 0) + ONE_DAY);
}

export const SLOTS: Slot[] = [
  "S09",
  "S10",
  "S11",
  "S12",
  "S13",
  "S14",
  "S15",
  "S16",
  "S17",
  "S18",
];

export function slotToString(slot: Slot): string {
  switch (slot) {
    case "S09":
      return "09:00";
    case "S10":
      return "10:00";
    case "S11":
      return "11:00";
    case "S12":
      return "12:00";
    case "S13":
      return "13:00";
    case "S14":
      return "14:00";
    case "S15":
      return "15:00";
    case "S16":
      return "16:00";
    case "S17":
      return "17:00";
    case "S18":
      return "18:00";
    default:
      return "N.A.";
  }
}
