import { IsOptional, IsString, IsIn } from 'class-validator';

export class FilterBookDto {
  @IsOptional()
  @IsString()
  search?: string; // Filter by title

  @IsOptional()
  @IsIn(['title', 'publishedYear', 'price'])
  sortBy?: string;

  @IsOptional()
  @IsIn(['ASC', 'DESC'])
  sortOrder?: 'ASC' | 'DESC';
}
