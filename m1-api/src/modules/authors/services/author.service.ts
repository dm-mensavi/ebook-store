import { Injectable, NotFoundException } from '@nestjs/common';
import { AuthorsRepository } from '../repositories/authors.repository';
import { BooksRepository } from '../../books/repositories/book.repository'; // You need this repo to access books
import { CreateAuthorDto } from '../dto/create-author.dto';
import { UpdateAuthorDto } from '../dto/update-author.dto';
import { Author } from '../models/author.entity';
import { CreateAuthorBookDto } from '../dto/create-book.dto';

@Injectable()
export class AuthorsService {
  constructor(
    private readonly authorsRepository: AuthorsRepository,
    private readonly booksRepository: BooksRepository, // Inject the BooksRepository for book handling
  ) {}

  // Create a new author
  async createAuthor(createAuthorDto: CreateAuthorDto): Promise<Author> {
    const author = this.authorsRepository.create(createAuthorDto);
    return this.authorsRepository.save(author);
  }

  // Get all authors with stats (bookCount and averageRating)
  async findAllAuthorsWithStats(): Promise<Author[]> {
    return this.authorsRepository.findAuthorsWithStats();
  }

  // Get all authors with optional filters and sorting
  async findAllAuthorsWithStatsAndFilters(
    search?: string,
    sortBy?: string,
    sortOrder?: 'ASC' | 'DESC',
  ): Promise<Author[]> {
    return this.authorsRepository.findAuthorsWithStatsAndFilters(
      search,
      sortBy,
      sortOrder,
    );
  }

  // Get an author by ID with stats
  async findAuthorByIdWithStats(authorId: string): Promise<Author> {
    const author =
      await this.authorsRepository.findAuthorByIdWithStats(authorId);
    if (!author) {
      throw new NotFoundException(`Author with id ${authorId} not found`);
    }
    return author;
  }

  // Get an author by ID with their books
  async findByIdWithBooks(authorId: string): Promise<Author> {
    const author = await this.authorsRepository.findOne({
      where: { id: authorId },
      relations: ['books', 'books.ratings'],
    });

    if (!author) {
      throw new NotFoundException(`Author with id ${authorId} not found`);
    }

    // Calculate each book's averageRating
    author.books.forEach((book) => {
      if (book.ratings && book.ratings.length > 0) {
        const totalRating = book.ratings.reduce(
          (sum, rating) => sum + rating.stars,
          0,
        );
        book.averageRating =
          Math.round((totalRating / book.ratings.length) * 100) / 100;
      } else {
        book.averageRating = 0;
      }
    });

    // Then calculate the author's averageRating
    author.averageRating =
      author.books.length > 0
        ? Math.round(
            (author.books.reduce(
              (sum, book) => sum + (book.averageRating ?? 0),
              0,
            ) /
              author.books.length) *
              100,
          ) / 100
        : null;

    return author;
  }
  async createBookForAuthor(
    authorId: string,
    createAuthorBookDto: CreateAuthorBookDto,
  ): Promise<Author> {
    const author = await this.authorsRepository.findOne({
      where: { id: authorId },
      relations: ['books'],
    });

    if (!author) {
      throw new NotFoundException(`Author with id ${authorId} not found`);
    }

    const newBook = this.booksRepository.create({
      ...createAuthorBookDto,
      author,
    });

    await this.booksRepository.save(newBook);

    return this.findByIdWithBooks(authorId);
  }

  // Remove a book from an author
  async removeBookFromAuthor(
    authorId: string,
    bookId: string,
  ): Promise<Author> {
    const book = await this.booksRepository.findOne({
      where: {
        id: bookId,
        author: { id: authorId },
      },
    });

    if (!book) {
      throw new NotFoundException(
        `Book with id ${bookId} not found for author with id ${authorId}`,
      );
    }

    // Disassociate the author from the book
    book.author = null;
    await this.booksRepository.save(book);

    // Return the updated author with their books
    return this.findByIdWithBooks(authorId);
  }

  // Update an existing author
  async updateAuthor(
    authorId: string,
    updateAuthorDto: UpdateAuthorDto,
  ): Promise<Author> {
    const author = await this.authorsRepository.findOneBy({ id: authorId });
    if (!author) {
      throw new NotFoundException(`Author with id ${authorId} not found`);
    }

    const updatedAuthor = Object.assign(author, updateAuthorDto);
    return this.authorsRepository.save(updatedAuthor);
  }

  // Delete an author by ID
  async deleteAuthor(authorId: string): Promise<void> {
    const result = await this.authorsRepository.delete(authorId);

    if (result.affected === 0) {
      throw new NotFoundException(`Author with id ${authorId} not found`);
    }
  }

  // Clear all authors (for testing or admin purposes)
  async clearAllAuthors(): Promise<void> {
    await this.authorsRepository.clear();
  }
}
