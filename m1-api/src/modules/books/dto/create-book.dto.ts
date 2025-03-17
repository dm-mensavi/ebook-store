import {
  IsNotEmpty,
  IsString,
  IsUUID,
  IsInt,
  IsNumber,
  Min,
} from 'class-validator';

export class CreateBookDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  price: number;

  @IsNotEmpty()
  @IsInt()
  publishedYear: number;

  @IsNotEmpty()
  @IsUUID()
  authorId: string;
}
