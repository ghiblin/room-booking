import { Company } from "@prisma/client";
import { IsIn, IsString } from "class-validator";

export class RoomDTO {
  @IsString()
  code: string;

  @IsIn(["COKE", "PEPSI"])
  company: Company;
}
