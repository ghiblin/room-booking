import { Company } from "@prisma/client";
import { IsIn, IsString, MinLength } from "class-validator";

export class UpdateUserDTO {
  @IsString()
  @MinLength(3)
  name: string;

  @IsString()
  @IsIn(["COKE", "PEPSI"])
  company: Company;
}
