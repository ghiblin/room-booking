import { Body, Controller, Get, Put, UseGuards } from "@nestjs/common";
import { User } from "@prisma/client";
import { Identify } from "../common/identify.decorator";
import { AuthGuard } from "../guards/auth.guard";
import { UpdateUserDTO } from "./dtos/update-user.dto";
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
    @Body() data: UpdateUserDTO,
    @Identify() email: string
  ): Promise<User> {
    return this.userService.updateCurrentUser(data, email);
  }
}
