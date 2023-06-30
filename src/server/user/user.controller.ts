import {
  JsonController,
  Get,
  Delete,
  Post,
  Put,
  Param,
  Body,
  Authorized,
  CurrentUser,
  Patch,
} from "routing-controllers";

import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { UserService } from "./user.service";
import { Service } from "typedi";
import type { IUser } from "./user.model";

@Service()
@JsonController("/users")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Authorized()
  @Get()
  async getAll() {
    const users = await this.userService.findAll();
    return users;
  }

  @Authorized()
  @Get("/highscores")
  async findHighscores() {
    const highscores = await this.userService.findHighscores();
    return highscores;
  }

  @Authorized()
  @Get("/:username")
  async getOne(@Param("username") username: string) {
    const user = await this.userService.findOne(username);
    return user;
  }

  @Authorized()
  @Post()
  async create(@Body() createuserdto: CreateUserDto) {
    const user = await this.userService.create(createuserdto);
    return user;
  }

  @Authorized()
  @Patch()
  async update(
    @CurrentUser() user: IUser,
    @Body() updateuserdto: UpdateUserDto
  ) {
    const patchedUser = await this.userService.update(
      user.username,
      updateuserdto
    );
    return patchedUser;
  }

  @Authorized()
  @Delete("/")
  async delete(@CurrentUser() user: IUser) {
    const deletdUser = await this.userService.delete(user.username);
    return deletdUser;
  }

  @Authorized()
  @Get("/auth/myself")
  async getMyself(@CurrentUser() user: any) {
    return user;
  }
}
