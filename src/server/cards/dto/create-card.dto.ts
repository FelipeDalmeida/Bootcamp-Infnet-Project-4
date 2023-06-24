import {
  IsInt,
  Matches,
  Max,
  MaxLength,
  Min,
  MinLength,
} from "class-validator";

export class CreateCardDto {
  @MinLength(2)
  @MaxLength(26)
  name: string | undefined;

  @Matches(/^\/.*\.(png|jpe?g|gif)$/g)
  image: string | undefined;

  @IsInt()
  @Min(0)
  @Max(100)
  fofura: number | undefined;

  @IsInt()
  @Min(0)
  life_span: number | undefined;

  @IsInt()
  @Min(0)
  @Max(Infinity)
  fome: number | undefined;

  @IsInt()
  @Min(0)
  @Max(100)
  brincalhao: number | undefined;

  @IsInt()
  @Min(0)
  @Max(100)
  beleza: number | undefined;
}
