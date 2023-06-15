import { IsString } from "class-validator";

export class LoginDto {
  @IsString()
  username: string | undefined;

  @IsString()
  password: string | undefined;
}
