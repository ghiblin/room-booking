import { IsDateString, IsOptional } from "class-validator";

export class ReservationsQueryDTO {
  @IsOptional()
  @IsDateString()
  public dt?: string;
}
