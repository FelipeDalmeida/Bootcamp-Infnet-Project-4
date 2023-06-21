import { IsEmail, MaxLength, Min, MinLength } from "class-validator";

export class UpdateUserDto {
  @MinLength(3)
  @MaxLength(20)
  name: string | undefined;

  @MinLength(3)
  @MaxLength(20)
  username: string | undefined;

  @MinLength(4)
  @MaxLength(18)
  password: string | undefined;

  @Min(0)
  score: number | undefined;

  @Min(0)
  matches: number | undefined;
}
