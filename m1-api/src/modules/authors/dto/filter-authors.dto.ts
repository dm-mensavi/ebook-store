import { IsOptional, IsString, IsIn } from 'class-validator';

export class FilterAuthorDto {
  @IsOptional()
  @IsString()
  search?: string; // Filter by author name

  @IsOptional()
  @IsIn(['name', 'bookCount', 'averageRating'])
  sortBy?: string;

  @IsOptional()
  @IsIn(['ASC', 'DESC'])
  sortOrder?: 'ASC' | 'DESC';
}
