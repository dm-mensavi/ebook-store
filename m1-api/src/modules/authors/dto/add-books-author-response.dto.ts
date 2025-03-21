import { ApiProperty } from '@nestjs/swagger';
import { Author } from '../models/author.entity';
import { AuthorResponseDto } from './author-response.dto';

export class AddBookToAuthorResponseDto extends AuthorResponseDto {
  @ApiProperty({ description: 'The updated author entity after adding a book' })
  author: Author;

  constructor(author: Author) {
    super(author);
    this.author = author;
  }
}
