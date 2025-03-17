import { IsUUID, IsInt, IsString, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RatingResponseDto {
  @ApiProperty({ example: 'ad4f93a0-8f49-4ea8-a43d-4f6f5a308c3d' })
  @IsUUID()
  id: string;

  @ApiProperty({
    example: 4,
    minimum: 1,
    maximum: 5,
    description: 'Rating score from 1 to 5',
  })
  @IsInt()
  stars: number;

  @ApiProperty({ example: 'This book was fantastic!', nullable: true })
  @IsOptional()
  @IsString()
  comment?: string;

  @ApiProperty({
    example: '2024-03-17T08:30:00.000Z',
    description: 'Timestamp when the rating was created',
  })
  @IsString()
  createdAt: string;
}
