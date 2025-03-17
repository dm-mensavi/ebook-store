import { RatingResponseDto } from '../dto/rating-response.dto';

export class RatingPresenter {
  static toResponse(raw: any): RatingResponseDto {
    return {
      id: raw.id,
      stars: raw.stars,
      comment: raw.comment || null,
      createdAt: raw.createdAt,
    };
  }

  static toResponseArray(rawRatings: any[]): RatingResponseDto[] {
    return rawRatings.map((rating) => this.toResponse(rating));
  }
}
