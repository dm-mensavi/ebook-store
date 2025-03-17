import { AuthorResponseDto } from '../dto/author-response.dto';

export class AuthorPresenter {
  static toResponse(raw: any): AuthorResponseDto {
    return {
      id: raw.id,
      name: raw.name,
      photo: raw.photo,
      biography: raw.biography || null,
      bookCount: Number(raw.bookCount) || 0,
      averageRating:
        raw.averageRating !== null
          ? parseFloat(Number(raw.averageRating).toFixed(2))
          : null,
    };
  }

  static toResponseArray(rawAuthors: any[]): AuthorResponseDto[] {
    return rawAuthors.map((author) => this.toResponse(author));
  }
}
