import { Injectable, NotFoundException } from '@nestjs/common';
import { BooksRepository } from '../repositories/book.repository';
import { CreateBookDto } from '../dto/create-book.dto';
import { UpdateBookDto } from '../dto/update-book.dto';
import { Book } from '../models/book.entity';

@Injectable()
export class BooksService {
  constructor(private readonly booksRepository: BooksRepository) {}

  // Create Book
  async createBook(createBookDto: CreateBookDto): Promise<Book> {
    const book = this.booksRepository.create({
      ...createBookDto,
      author: { id: createBookDto.authorId }, // Attach author by id
    });

    return await this.booksRepository.save(book);
  }

  // Get all Books with filters (search + sort)
  async findAllBooks(
    search?: string,
    sortBy?: string,
    sortOrder?: 'ASC' | 'DESC',
  ): Promise<any[]> {
    return await this.booksRepository.findBooksWithFilters(
      search,
      sortBy,
      sortOrder,
    );
  }

  // Get single Book details
  async findBookById(bookId: string): Promise<any> {
    const book = await this.booksRepository.findBookByIdWithDetails(bookId);
    if (!book) {
      throw new NotFoundException(`Book with id ${bookId} not found`);
    }
    return book;
  }

  // Update Book
  async updateBook(
    bookId: string,
    updateBookDto: UpdateBookDto,
  ): Promise<Book> {
    const book = await this.booksRepository.findOne({
      where: { id: bookId },
      relations: ['author'],
    });

    if (!book) {
      throw new NotFoundException(`Book with id ${bookId} not found`);
    }

    // If they want to update the author, reattach it
    if (updateBookDto.authorId) {
      book.author = { id: updateBookDto.authorId } as any;
    }

    const updated = Object.assign(book, updateBookDto);
    return await this.booksRepository.save(updated);
  }

  // Delete Book
  async deleteBook(bookId: string): Promise<void> {
    const result = await this.booksRepository.delete(bookId);
    if (result.affected === 0) {
      throw new NotFoundException(`Book with id ${bookId} not found`);
    }
  }
}
