import { BookResponseDto } from '../dto/book-response.dto';

export class BookPresenter {
  static toResponse(raw: any): BookResponseDto {
    return {
      id: raw.id,
      title: raw.title,
      price: Number(raw.price),
      publishedYear: raw.publishedYear,
      authorName: raw.authorName,
      averageRating:
        raw.averageRating !== null
          ? parseFloat(Number(raw.averageRating).toFixed(2))
          : null,
    };
  }

  static toResponseArray(rawBooks: any[]): BookResponseDto[] {
    return rawBooks.map((book) => this.toResponse(book));
  }
}
