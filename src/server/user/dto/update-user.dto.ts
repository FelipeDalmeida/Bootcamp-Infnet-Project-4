import {
  IsEmail,
  IsOptional,
  MaxLength,
  Min,
  MinLength,
} from "class-validator";

export class UpdateUserDto {
  @MinLength(3)
  @MaxLength(20)
  @IsOptional()
  name: string | undefined;

  @IsOptional()
  @MinLength(3)
  @MaxLength(12)
  username: string | undefined;

  @IsOptional()
  @MinLength(4)
  @MaxLength(18)
  password: string | undefined;

  @IsOptional()
  @Min(0)
  score: number | undefined;

  @IsOptional()
  @Min(0)
  matches: number | undefined;

  @IsOptional()
  @Min(0)
  matches_won: number | undefined;
}
