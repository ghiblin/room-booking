import { IsString, MinLength } from "class-validator";

export class UserDTO {
  @IsString()
  @MinLength(3)
  name: string;
}
