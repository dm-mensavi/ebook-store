import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Author } from '../models/author.entity';

@Injectable()
export class AuthorsRepository extends Repository<Author> {
  constructor(private readonly dataSource: DataSource) {
    super(Author, dataSource.createEntityManager());
  }

  async findAuthorsWithStatsAndFilters(
    search?: string,
    sortBy = 'name',
    sortOrder: 'ASC' | 'DESC' = 'ASC',
  ): Promise<any[]> {
    const query = this.createQueryBuilder('author')
      .leftJoinAndSelect('author.books', 'book')
      .leftJoin('book.ratings', 'rating')
      .select('author.id', 'id')
      .addSelect('author.name', 'name')
      .addSelect('author.photo', 'photo')
      .addSelect('COUNT(DISTINCT book.id)', 'bookCount')
      .addSelect('AVG(rating.stars)', 'averageRating')
      .groupBy('author.id');

    if (search) {
      query.where('LOWER(author.name) LIKE LOWER(:search)', {
        search: `%${search}%`,
      });
    }

    if (sortBy === 'bookCount') {
      query.orderBy('COUNT(DISTINCT book.id)', sortOrder);
    } else if (sortBy === 'averageRating') {
      query.orderBy('AVG(rating.stars)', sortOrder);
    } else {
      query.orderBy('author.name', sortOrder);
    }

    return query.getRawMany();
  }

  async findAuthorsWithStats(): Promise<any[]> {
    return this.createQueryBuilder('author')
      .leftJoinAndSelect('author.books', 'book')
      .leftJoin('book.ratings', 'rating')
      .select('author.id', 'id')
      .addSelect('author.name', 'name')
      .addSelect('author.photo', 'photo')
      .addSelect('COUNT(DISTINCT book.id)', 'bookCount')
      .addSelect('AVG(rating.stars)', 'averageRating')
      .groupBy('author.id')
      .getRawMany();
  }

  async findAuthorByIdWithStats(authorId: string): Promise<any> {
    return this.createQueryBuilder('author')
      .leftJoinAndSelect('author.books', 'book')
      .leftJoin('book.ratings', 'rating')
      .select('author.id', 'id')
      .addSelect('author.name', 'name')
      .addSelect('author.photo', 'photo')
      .addSelect('author.biography', 'biography')
      .addSelect('COUNT(DISTINCT book.id)', 'bookCount')
      .addSelect('AVG(rating.stars)', 'averageRating')
      .where('author.id = :authorId', { authorId })
      .groupBy('author.id')
      .getRawOne();
  }
}
