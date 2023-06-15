import { Service } from "typedi";
import { UserService } from "../user/user.service";
import { LoginDto } from "./dto/login.dto";
import { RegisterDto } from "./dto/register.dto";
import { JWTService } from "./jwt.service";
import { BadRequestError } from "routing-controllers";

@Service()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtsecret: JWTService
  ) {}

  async login(logindto: LoginDto) {
    const user = await this.userService.findOne(logindto.username ?? "");
    if (user && user.data?.password === logindto.password) {
      const payload = {
        username: user.data?.username,
        name: user.data?.name,
      };
      const token = this.jwtsecret.sign(payload);
      return {
        token,
        user,
      };
    }
    throw new BadRequestError();
  }

  async register(registerdto: RegisterDto) {}
}
