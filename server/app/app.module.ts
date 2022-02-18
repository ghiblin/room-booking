import { Module } from "@nestjs/common";
import { RoomModule } from "../room/room.module";
import { UserModule } from "../user/user.module";

@Module({
  controllers: [],
  imports: [UserModule, RoomModule],
})
export class AppModule {}
