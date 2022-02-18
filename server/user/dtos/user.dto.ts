import { Company } from "@prisma/client";
import { IsIn, IsString, MinLength } from "class-validator";

export class UserDTO {
  @IsString()
  @MinLength(3)
  name: string;

  @IsString()
  @IsIn(["COKE", "PEPSI"])
  company: Company;
}
