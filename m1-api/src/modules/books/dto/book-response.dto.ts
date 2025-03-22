import { ApiProperty } from '@nestjs/swagger';

export class BookResponseDto {
  @ApiProperty({
    example: 'd9d7b00e-12ab-4a22-a2f8-1cbfdf2b9444',
    description: 'Unique identifier for the book',
  })
  id: string;

  @ApiProperty({
    example: "Harry Potter and the Sorcerer's Stone",
    description: 'Title of the book',
  })
  title: string;

  @ApiProperty({
    example: 19.99,
    description: 'Price of the book',
  })
  price: number;

  @ApiProperty({
    example: 1997,
    description: 'Year the book was published',
  })
  publishedYear: number;

  @ApiProperty({
    example: 'd9d7b00e-12ab-4a22-a2f8-1cbfdf2b9444',
    description: 'Unique identifier for the author who wrote the book',
  })
  authorId: string;

  @ApiProperty({
    example: 'J.K. Rowling',
    description: 'Name of the author who wrote the book',
  })
  authorName: string;

  @ApiProperty({
    example: 4.8,
    nullable: true,
    description: 'Average rating of the book',
  })
  averageRating: number | null;
}
