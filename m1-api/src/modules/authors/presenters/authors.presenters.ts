import { AuthorResponseDto } from '../dto/author-response.dto';
import { Author } from '../models/author.entity';

export class AuthorPresenter {
  static toResponse(raw: any): AuthorResponseDto {
    return new AuthorResponseDto({
      ...raw,
      bookCount: raw.bookCount ?? raw.books?.length ?? 0,
      averageRating: raw.averageRating ?? null,
      books: [],
    });
  }

  static toResponseArray(rawAuthors: any[]): AuthorResponseDto[] {
    return rawAuthors.map((author) => this.toResponse(author));
  }

  static toDetailedResponse(author: Author): AuthorResponseDto {
    return new AuthorResponseDto({
      ...author,
      bookCount: author.books?.length ?? 0,
      averageRating: author.averageRating ?? null,
      books:
        author.books?.map((book) => ({
          id: book.id,
          title: book.title,
          link: `/books/${book.id}`,
        })) ?? [],
    });
  }
}
