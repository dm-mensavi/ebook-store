import { Injectable, NotFoundException } from '@nestjs/common';
import { RatingsRepository } from '../repositories/ratings.repository';
import { CreateRatingDto } from '../dto/create-rating.dto';
import { UpdateRatingDto } from '../dto/update-rating.dto';
import { Rating } from '../models/rating.entity';

@Injectable()
export class RatingsService {
  constructor(private readonly ratingsRepository: RatingsRepository) {}

  // Create a Rating
  async createRating(createRatingDto: CreateRatingDto): Promise<Rating> {
    const rating = this.ratingsRepository.create({
      ...createRatingDto,
      book: { id: createRatingDto.bookId }, // attach book by id
    });

    return await this.ratingsRepository.save(rating);
  }

  // Get Ratings for a Book, sorted by date
  async findRatingsForBook(bookId: string, sortOrder: 'ASC' | 'DESC' = 'DESC'): Promise<any[]> {
    return await this.ratingsRepository.findRatingsForBook(bookId, sortOrder);
  }

  // Update Rating (optional feature)
  async updateRating(ratingId: string, updateRatingDto: UpdateRatingDto): Promise<Rating> {
    const rating = await this.ratingsRepository.findOneBy({ id: ratingId });

    if (!rating) {
      throw new NotFoundException(`Rating with id ${ratingId} not found`);
    }

    const updated = Object.assign(rating, updateRatingDto);
    return await this.ratingsRepository.save(updated);
  }

  // Delete Rating (optional feature)
  async deleteRating(ratingId: string): Promise<void> {
    const result = await this.ratingsRepository.delete(ratingId);

    if (result.affected === 0) {
      throw new NotFoundException(`Rating with id ${ratingId} not found`);
    }
  }
}
