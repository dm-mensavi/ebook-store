import {
  IsNotEmpty,
  IsString,
  IsUUID,
  IsInt,
  IsNumber,
  Min,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateBookDto {
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

  @ApiProperty({
    example: 'd9d7b00e-12ab-4a22-a2f8-1cbfdf2b9444',
    description: 'Author UUID',
  })
  @IsNotEmpty()
  @IsUUID()
  authorId: string;
}
