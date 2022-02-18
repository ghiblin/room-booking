import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  ValidationPipe,
} from "@nestjs/common";
import { Prisma } from "@prisma/client";
import { today } from "../../lib/utils";
import { Identify } from "../common/identify.decorator";
import { CreateReservationDTO } from "./dtos/create-reservation.dto";
import { ReservationsQueryDTO } from "./dtos/reservations-query.dto";
import { ReservationService } from "./reservation.service";
import { RoomService } from "./room.service";

@Controller("room")
export class RoomController {
  constructor(
    private readonly roomService: RoomService,
    private readonly reservationService: ReservationService
  ) {}

  @Get()
  getAllRooms() {
    return this.roomService.getRooms({});
  }

  @Get(":code")
  getRoom(@Param("code") code: string) {
    return this.roomService.getRoom(code);
  }

  @Post(":code/reservations")
  bookRoom(@Body() data: CreateReservationDTO, @Identify() email: string) {
    return this.reservationService.createReservation({
      room: { connect: { code: data.roomCode } },
      slot: data.slot,
      user: { connect: { email } },
    });
  }

  @Get(":code/reservations")
  getRoomReservations(
    @Param("code") code: string,
    @Query(
      new ValidationPipe({
        transform: true,
        transformOptions: { enableImplicitConversion: true },
        forbidNonWhitelisted: true,
      })
    )
    query: ReservationsQueryDTO
  ) {
    let where: Prisma.ReservationWhereInput = {
      roomCode: code,
      date: query.dt ? new Date(query.dt) : today(),
    };
    return this.reservationService.getReservations(where);
  }
}
