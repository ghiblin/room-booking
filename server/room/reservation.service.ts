import { Injectable } from "@nestjs/common";
import { Prisma } from "@prisma/client";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class ReservationService {
  constructor(private readonly db: PrismaService) {}

  async getReservations(where: Prisma.ReservationWhereInput) {
    const reservations = await this.db.reservation.findMany({
      where,
      include: { user: true },
    });
    return reservations;
  }
}
