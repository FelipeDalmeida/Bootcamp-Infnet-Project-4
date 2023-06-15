import { JsonController, Body, Post } from "routing-controllers";
import { Service } from "typedi";
import { LoginDto } from "./dto/login.dto";
import { RegisterDto } from "./dto/register.dto";
import { AuthService } from "./auth.service";

@Service()
@JsonController("/auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("/login")
  async login(@Body() logindto: LoginDto) {
    const response = await this.authService.login(logindto);
    return response;
  }

  @Post("/register")
  async register(@Body() registerdto: RegisterDto) {}
}
