import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Book } from '../models/book.entity';

@Injectable()
export class BooksRepository extends Repository<Book> {
  constructor(private readonly dataSource: DataSource) {
    super(Book, dataSource.createEntityManager());
  }

  async findBooksWithFilters(
    search?: string,
    sortBy = 'title',
    sortOrder: 'ASC' | 'DESC' = 'ASC',
  ): Promise<any[]> {
    const query = this.createQueryBuilder('book')
      .leftJoinAndSelect('book.author', 'author')
      .leftJoin('book.ratings', 'rating')
      .select('book.id', 'id')
      .addSelect('book.title', 'title')
      .addSelect('book.price', 'price')
      .addSelect('book.publishedYear', 'publishedYear')
      .addSelect('author.name', 'authorName')
      .addSelect('author.id', 'authorId')
      .addSelect('AVG(rating.stars)', 'averageRating')
      .groupBy('book.id');

    if (search) {
      query.where('LOWER(book.title) LIKE LOWER(:search)', {
        search: `%${search}%`,
      });
    }

    query.orderBy(`book.${sortBy}`, sortOrder);

    return query.getRawMany();
  }

  async findBookByIdWithDetails(bookId: string): Promise<any> {
    return this.createQueryBuilder('book')
      .leftJoinAndSelect('book.author', 'author')
      .leftJoin('book.ratings', 'rating')
      .select('book.id', 'id')
      .addSelect('book.title', 'title')
      .addSelect('book.price', 'price')
      .addSelect('book.publishedYear', 'publishedYear')
      .addSelect('author.name', 'authorName')
      .addSelect('author.id', 'authorId')
      .addSelect('AVG(rating.stars)', 'averageRating')
      .where('book.id = :bookId', { bookId })
      .groupBy('book.id')
      .getRawOne();
  }
}
