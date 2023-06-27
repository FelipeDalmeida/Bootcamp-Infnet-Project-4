import { Service } from "typedi";
import {
  JsonController,
  Authorized,
  CurrentUser,
  Get,
  Post,
  Patch,
  Body,
  Param,
} from "routing-controllers";
import type { IUser } from "../user/user.model";
import { InitMatchDto } from "./dto/initmatch.dto";
import { PlayService } from "./play.service";

@Service()
@JsonController("/play")
export class PlayController {
  constructor(private readonly playService: PlayService) {}

  @Authorized()
  @Post("/init")
  async initMatch(@CurrentUser() user: IUser) {
    const match = await this.playService.initMatch(user);
    return match;
  }
}