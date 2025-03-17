import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, IsUrl } from 'class-validator';

export class UpdateAuthorDto {
  @ApiPropertyOptional({ example: 'J.K. Rowling' })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiPropertyOptional({ example: 'https://example.com/jk-new.jpg' })
  @IsOptional()
  @IsUrl()
  photo?: string;

  @ApiPropertyOptional({ example: 'Updated biography for J.K. Rowling.' })
  @IsOptional()
  @IsString()
  biography?: string;
}
