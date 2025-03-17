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
          ? roundToTwo(Number(raw.averageRating))
          : null,
    };
  }

  static toResponseArray(rawBooks: any[]): BookResponseDto[] {
    return rawBooks.map((book) => this.toResponse(book));
  }
}

function roundToTwo(num: number): number {
  return Math.round((num + Number.EPSILON) * 100) / 100;
}
