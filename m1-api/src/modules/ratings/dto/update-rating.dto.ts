import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsInt, Min, Max, IsString } from 'class-validator';

export class UpdateRatingDto {
  @ApiPropertyOptional({
    example: 5,
    minimum: 1,
    maximum: 5,
    description: 'Rating score from 1 to 5',
  })
  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(5)
  stars?: number;

  @ApiPropertyOptional({
    example: 'Amazing book!',
    description: 'Optional comment about the rating',
  })
  @IsOptional()
  @IsString()
  comment?: string;
}
