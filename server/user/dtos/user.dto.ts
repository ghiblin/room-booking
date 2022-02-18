import { IsEmail, IsString } from "class-validator";
import { UpdateUserDTO } from "./update-user.dto";

export class UserDTO extends UpdateUserDTO {
  @IsString()
  @IsEmail()
  email: string;
}
