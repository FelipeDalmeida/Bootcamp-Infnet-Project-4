import {
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  Min,
  MinLength,
} from "class-validator";

export class RegisterDto {
  @MinLength(2, {
    message: "Nome muito curto, mínimo de 2 caracteres",
  })
  @MaxLength(60, {
    message: "Nome muito longo, máximo de 60 caracteres",
  })
  @IsString()
  name: string | undefined;

  @Matches(/^[a-z0-9_]+$/, {
    message: "Username inválido",
  })
  @MinLength(2, {
    message: "Username muito curto, mínimo de 2 caracteres",
  })
  @MaxLength(24, {
    message: "Username muito longo, máximo de 24 caracteres",
  })
  @IsString()
  username: string | undefined;

  @MinLength(8, {
    message: "Senha muito curta, mínimo de 8 caracteres",
  })
  @MaxLength(36, {
    message: "Senha muito longa, máximo de 36 caracteres",
  })
  @IsString()
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
