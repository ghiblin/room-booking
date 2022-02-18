import { IsObject, ValidateNested } from "class-validator";
import { UserDTO } from "../../user/dtos/user.dto";
import { CreateReservationDTO } from "./create-reservation.dto";

export class ReservationDTO extends CreateReservationDTO {
  @IsObject()
  @ValidateNested()
  user?: UserDTO;
}
