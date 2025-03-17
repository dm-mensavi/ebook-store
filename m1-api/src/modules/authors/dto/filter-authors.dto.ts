import { IsOptional, IsString } from 'class-validator';

export class FilterAuthorDto {
  @IsOptional()
  @IsString()
  search?: string;
}
