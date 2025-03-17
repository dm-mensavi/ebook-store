import { IsUUID, IsString, IsOptional, IsNumber } from 'class-validator';

export class AuthorResponseDto {
  @IsUUID()
  id: string;

  @IsString()
  name: string;

  @IsString()
  photo: string;

  @IsOptional()
  @IsString()
  biography?: string;

  @IsNumber()
  bookCount: number;

  @IsOptional()
  @IsNumber()
  averageRating: number | null;
}
