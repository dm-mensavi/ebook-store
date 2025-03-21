import { IsNotEmpty, IsString, IsInt, IsNumber, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateAuthorBookDto {
  @ApiProperty({ example: "Harry Potter and the Sorcerer's Stone" })
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty({ example: 19.99 })
  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  price: number;

  @ApiProperty({ example: 1997 })
  @IsNotEmpty()
  @IsInt()
  publishedYear: number;
}
