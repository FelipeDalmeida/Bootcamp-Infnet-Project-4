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
    if (user.success && user.data?.password === logindto.password) {
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
    throw new BadRequestError("Usuário não encontrado");
  }

  async register(registerdto: RegisterDto) {
    const verifyUser = await this.userService.findOne(
      registerdto.username ?? ""
    );
    if (verifyUser.success) {
      throw new BadRequestError("Nome de usuário já cadastrado");
    } else {
      registerdto.score = 0;
      registerdto.matches = 0;
      registerdto.matches_won = 0;
      const user = await this.userService.create(registerdto);
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
  }
}
