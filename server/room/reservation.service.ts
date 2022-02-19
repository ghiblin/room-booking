import { Injectable } from "@nestjs/common";
import { Prisma } from "@prisma/client";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class ReservationService {
  constructor(private readonly db: PrismaService) {}

  async createReservation(data: Prisma.ReservationCreateInput) {
    const reservation = await this.db.reservation.create({
      data,
      include: { user: true },
    });
    return reservation;
  }

  async getReservations(where: Prisma.ReservationWhereInput) {
    const reservations = await this.db.reservation.findMany({
      where,
      include: { user: true },
    });
    return reservations;
  }

  async getReservation(where: Prisma.ReservationWhereUniqueInput) {
    const reservation = await this.db.reservation.findUnique({
      where,
      include: { user: true },
    });
    return reservation;
  }

  async deleteReservation(where: Prisma.ReservationWhereUniqueInput) {
    const reservation = await this.db.reservation.delete({ where });
    return reservation;
  }
}
