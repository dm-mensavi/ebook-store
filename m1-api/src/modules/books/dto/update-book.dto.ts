import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsNumber, IsPositive, IsUUID } from 'class-validator';

export class UpdateBookDto {
  @ApiPropertyOptional({ example: "Harry Potter and the Sorcerer's Stone" })
  @IsOptional()
  title?: string;

  @ApiPropertyOptional({ example: 19.99 })
  @IsOptional()
  @IsNumber()
  @IsPositive()
  price?: number;

  @ApiPropertyOptional({ example: 1997 })
  @IsOptional()
  @IsNumber()
  publishedYear?: number;

  @ApiPropertyOptional({ example: 'd9d7b00e-12ab-4a22-a2f8-1cbfdf2b9444' })
  @IsOptional()
  @IsUUID()
  authorId?: string;
}
