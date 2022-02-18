import { Injectable } from "@nestjs/common";
import { Prisma, Room } from "@prisma/client";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class RoomService {
  constructor(private readonly db: PrismaService) {}

  async getRoom(code: string): Promise<Room> {
    const room = await this.db.room.findUnique({ where: { code } });
    return room;
  }

  async getRooms(where: Prisma.RoomWhereInput): Promise<Room[]> {
    const rooms = await this.db.room.findMany({
      where,
      orderBy: [{ code: "asc" }],
    });
    return rooms;
  }
}
