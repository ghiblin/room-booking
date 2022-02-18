import { Body, Controller, Get, Put, UseGuards } from "@nestjs/common";
import { User } from "@prisma/client";
import { Identify } from "../common/identify.decorator";
import { AuthGuard } from "../gurads/auth.guard";
import { UserDTO } from "./dtos/user.dto";
import { UserService } from "./user.service";

@Controller("user")
@UseGuards(AuthGuard)
export class UserController {
  constructor(private readonly userService: UserService) {
    console.log(
      `new UserController`,
      typeof userService,
      typeof this.userService
    );
  }

  @Get("me")
  getCurrentUser(@Identify() email: string): Promise<User> {
    return this.userService.findUserByEmail(email);
  }

  @Put()
  updateCurrentUser(
    @Body() data: UserDTO,
    @Identify() email: string
  ): Promise<User> {
    return this.userService.updateCurrentUser(data, email);
  }
}
