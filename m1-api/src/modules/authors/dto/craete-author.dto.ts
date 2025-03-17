import { IsNotEmpty, IsString, IsUrl, IsOptional } from 'class-validator';

export class CreateAuthorDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsUrl()
  photo: string;

  @IsOptional()
  @IsString()
  biography?: string;
}
