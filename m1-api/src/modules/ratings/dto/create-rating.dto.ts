import {
  IsNotEmpty,
  IsUUID,
  IsInt,
  Min,
  Max,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateRatingDto {
  @IsNotEmpty()
  @IsUUID()
  bookId: string;

  @IsNotEmpty()
  @IsInt()
  @Min(1)
  @Max(5)
  stars: number;

  @IsOptional()
  @IsString()
  comment?: string;
}
