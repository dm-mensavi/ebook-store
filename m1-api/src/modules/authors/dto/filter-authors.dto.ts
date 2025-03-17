import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, IsIn } from 'class-validator';

export class FilterAuthorDto {
  @ApiPropertyOptional({
    example: 'Rowling',
    description: 'Search for author names',
  })
  @IsOptional()
  @IsString()
  search?: string;

  @ApiPropertyOptional({
    example: 'bookCount',
    enum: ['name', 'bookCount', 'averageRating'],
  })
  @IsOptional()
  @IsIn(['name', 'bookCount', 'averageRating'])
  sortBy?: string;

  @ApiPropertyOptional({ example: 'ASC', enum: ['ASC', 'DESC'] })
  @IsOptional()
  @IsIn(['ASC', 'DESC'])
  sortOrder?: 'ASC' | 'DESC';
}
