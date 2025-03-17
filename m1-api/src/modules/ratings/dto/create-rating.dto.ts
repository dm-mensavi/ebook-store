import { ApiProperty } from '@nestjs/swagger';
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
  @ApiProperty({
    example: 'e3b0c442-98fc-1c14-9afb-8e933b5d83a0',
    description: 'ID of the book being rated',
  })
  @IsNotEmpty()
  @IsUUID()
  bookId: string;

  @ApiProperty({
    example: 4,
    minimum: 1,
    maximum: 5,
    description: 'Rating score from 1 to 5',
  })
  @IsNotEmpty()
  @IsInt()
  @Min(1)
  @Max(5)
  stars: number;

  @ApiProperty({ example: 'Loved the book!', required: false })
  @IsOptional()
  @IsString()
  comment?: string;
}
