import { Company } from "@prisma/client";
import { IsIn, IsOptional, IsString, MinLength } from "class-validator";

export class UpdateUserDTO {
  @IsString()
  @MinLength(3)
  name: string;

  @IsOptional()
  @IsString()
  @IsIn(["COKE", "PEPSI"])
  company: Company;
}
