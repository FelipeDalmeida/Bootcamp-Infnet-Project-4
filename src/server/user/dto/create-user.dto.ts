import {
  IsEmail,
  IsOptional,
  MaxLength,
  Min,
  MinLength,
} from "class-validator";

export class CreateUserDto {
  @MinLength(3)
  @MaxLength(20)
  name: string | undefined;

  @MinLength(3)
  @MaxLength(12)
  username: string | undefined;

  @MinLength(4)
  @MaxLength(18)
  password: string | undefined;

  @Min(0)
  @IsOptional()
  score: number | undefined;

  @Min(0)
  @IsOptional()
  matches: number | undefined;

  @Min(0)
  @IsOptional()
  matches_won: number | undefined;
}
