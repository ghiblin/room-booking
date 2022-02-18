import { Slot } from "@prisma/client";
import {
  IsDateString,
  IsObject,
  IsString,
  ValidateNested,
} from "class-validator";
import { UserDTO } from "../../user/dtos/user.dto";

export class ReservationDTO {
  @IsString()
  roomCode: string;

  @IsDateString()
  date: string;

  @IsString()
  slot: Slot;

  @IsObject()
  @ValidateNested()
  user?: UserDTO;
}
