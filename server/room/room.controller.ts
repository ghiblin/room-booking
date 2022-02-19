import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Query,
  UnauthorizedException,
  UseInterceptors,
  ValidationPipe,
} from "@nestjs/common";
import { Prisma, Slot } from "@prisma/client";
import { today } from "../../lib/utils";
import { Identify } from "../common/identify.decorator";
import { CreateReservationDTO } from "./dtos/create-reservation.dto";
import { ReservationsQueryDTO } from "./dtos/reservations-query.dto";
import { ReservationInterceptor } from "./interceptors/reservation.interceptor";
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
  @UseInterceptors(ReservationInterceptor)
  bookRoom(@Body() data: CreateReservationDTO, @Identify() email: string) {
    return this.reservationService.createReservation({
      room: { connect: { code: data.roomCode } },
      slot: data.slot,
      user: { connect: { email } },
    });
  }

  @Get(":code/reservations")
  @UseInterceptors(ReservationInterceptor)
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

  @Delete(":code/reservations/:slot")
  async unbookRoom(
    @Param("code") code: string,
    @Param("slot") slot: Slot,
    @Query(
      new ValidationPipe({
        transform: true,
        transformOptions: { enableImplicitConversion: true },
        forbidNonWhitelisted: true,
      })
    )
    query: ReservationsQueryDTO,
    @Identify() email: string
  ) {
    const where: Prisma.ReservationWhereUniqueInput = {
      roomCode_date_slot: {
        date: query.dt ? new Date(query.dt) : today(),
        roomCode: code,
        slot,
      },
    };
    const reservation = await this.reservationService.getReservation(where);
    if (!reservation) {
      throw new NotFoundException(`Sorry, this reservation does not exist`);
    }
    if (reservation.user?.email !== email) {
      throw new UnauthorizedException(`You can delete only your reservations`);
    }
    return this.reservationService.deleteReservation(where);
  }
}
