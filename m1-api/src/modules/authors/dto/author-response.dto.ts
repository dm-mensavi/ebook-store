import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Book } from '../../books/models/book.entity';

class BookItemDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  title: string;

  @ApiProperty()
  link: string;

  constructor(book: Book) {
    this.id = book.id;
    this.title = book.title;
    this.link = `/books/${book.id}`;
  }
}

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

  @ApiPropertyOptional({ type: [BookItemDto] })
  books?: BookItemDto[];

  constructor(author: any) {
    this.id = author.id;
    this.name = author.name;
    this.photo = author.photo;
    this.biography = author.biography || null;

    this.bookCount = author.bookCount ?? author.books?.length ?? 0;
    this.averageRating = author.averageRating ?? null;

    this.books =
      author.books?.map((book) => ({
        id: book.id,
        title: book.title,
        link: `/books/${book.id}`,
      })) ?? [];
  }
}
