import {
  JsonController,
  Get,
  Delete,
  Post,
  Put,
  Param,
  Body,
} from "routing-controllers";

import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { UserService } from "./user.service";
import { Service } from "typedi";

@Service()
@JsonController("/users")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async getAll() {
    const users = await this.userService.findAll();
    return users;
  }

  @Get("/:username")
  async getOne(@Param("username") username: string) {
    const user = await this.userService.findOne(username);
    return user;
  }

  @Post()
  async create(@Body() createuserdto: CreateUserDto) {
    const user = await this.userService.create(createuserdto);
    return user;
  }

  @Put("/:username")
  async update(
    @Param("username") username: string,
    @Body() updateuserdto: UpdateUserDto
  ) {
    const user = await this.userService.update(username, updateuserdto);
    return user;
  }

  @Delete("/:username")
  async delete(@Param("username") username: string) {
    const user = await this.userService.delete(username);
    return user;
  }
}
