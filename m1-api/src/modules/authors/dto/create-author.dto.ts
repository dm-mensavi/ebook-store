import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, IsUrl } from 'class-validator';

export class CreateAuthorDto {
  @ApiProperty({ example: 'J.K. Rowling' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ example: 'https://example.com/jk.jpg' })
  @IsNotEmpty()
  @IsUrl()
  photo: string;

  @ApiProperty({
    example: 'British author best known for Harry Potter series.',
    required: false,
  })
  @IsOptional()
  @IsString()
  biography?: string;
}
