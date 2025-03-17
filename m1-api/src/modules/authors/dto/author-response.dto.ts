import { ApiProperty } from '@nestjs/swagger';

export class AuthorResponseDto {
  @ApiProperty({
    example: 'd9d7b00e-12ab-4a22-a2f8-1cbfdf2b9444',
    description: 'Unique identifier for the author',
  })
  id: string;

  @ApiProperty({
    example: 'J.K. Rowling',
    description: 'Name of the author',
  })
  name: string;

  @ApiProperty({
    example: 'https://example.com/jk-rowling.jpg',
    description: 'URL of the author photo',
  })
  photo: string;

  @ApiProperty({
    example: 'British author, best known for the Harry Potter series.',
    nullable: true,
    description: 'Biography of the author',
  })
  biography?: string;

  @ApiProperty({
    example: 7,
    description: 'Number of books written by this author',
  })
  bookCount: number;

  @ApiProperty({
    example: 4.75,
    nullable: true,
    description: 'Average rating of all books by the author',
  })
  averageRating: number | null;
}
