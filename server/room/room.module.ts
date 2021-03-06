import { Module } from "@nestjs/common";
import { PrismaModule } from "../prisma/prisma.module";
import { UserModule } from "../user/user.module";
import { ReservationService } from "./reservation.service";
import { RoomController } from "./room.controller";
import { RoomService } from "./room.service";

@Module({
  imports: [PrismaModule, UserModule],
  controllers: [RoomController],
  providers: [RoomService, ReservationService],
})
export class RoomModule {}
