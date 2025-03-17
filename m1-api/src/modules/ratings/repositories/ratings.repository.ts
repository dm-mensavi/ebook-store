import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Rating } from '../models/rating.entity';

@Injectable()
export class RatingsRepository extends Repository<Rating> {
  constructor(private readonly dataSource: DataSource) {
    super(Rating, dataSource.createEntityManager());
  }

  async findRatingsForBook(
    bookId: string,
    sortOrder: 'ASC' | 'DESC' = 'DESC',
  ): Promise<any[]> {
    return this.createQueryBuilder('rating')
      .select('rating.id', 'id')
      .addSelect('rating.stars', 'stars')
      .addSelect('rating.comment', 'comment')
      .addSelect('rating.createdAt', 'createdAt')
      .where('rating.bookId = :bookId', { bookId })
      .orderBy('rating.createdAt', sortOrder)
      .getRawMany();
  }
}
