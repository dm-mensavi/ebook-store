import { IsUUID, IsString, IsNumber, IsInt, IsOptional } from 'class-validator';

export class BookResponseDto {
  @IsUUID()
  id: string;

  @IsString()
  title: string;

  @IsNumber()
  price: number;

  @IsInt()
  publishedYear: number;

  @IsString()
  authorName: string; // We can expose author's name or full details if required.

  @IsOptional()
  @IsNumber()
  averageRating?: number | null;
}
