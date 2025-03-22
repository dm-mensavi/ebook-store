import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, IsIn } from 'class-validator';

export class FilterBookDto {
  @ApiPropertyOptional({
    example: 'Harry Potter',
    description: 'Search for books by title',
  })
  @IsOptional()
  @IsString()
  search?: string;

  @ApiPropertyOptional({
    example: 'publishedYear',
    enum: ['title', 'price', 'publishedYear', 'averageRating'],
  })
  @IsOptional()
  @IsIn(['title', 'price', 'publishedYear', 'averageRating'])
  sortBy?: string;

  @ApiPropertyOptional({ example: 'ASC', enum: ['ASC', 'DESC'] })
  @IsOptional()
  @IsIn(['ASC', 'DESC'])
  sortOrder?: 'ASC' | 'DESC';
}
