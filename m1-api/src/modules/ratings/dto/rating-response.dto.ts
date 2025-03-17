import { IsUUID, IsInt, IsString, IsOptional } from 'class-validator';

export class RatingResponseDto {
  @IsUUID()
  id: string;

  @IsInt()
  stars: number;

  @IsOptional()
  @IsString()
  comment?: string;

  @IsString()
  createdAt: string;
}
