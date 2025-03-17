import { Test, TestingModule } from '@nestjs/testing';
import { BooksService } from './book.service';
import { BooksRepository } from '../repositories/book.repository';
import { CreateBookDto } from '../dto/create-book.dto';
import { NotFoundException } from '@nestjs/common';

const mockBooksRepository = () => ({
  create: jest.fn(),
  save: jest.fn(),
  findBooksWithFilters: jest.fn(),
  findBookByIdWithDetails: jest.fn(),
  findOne: jest.fn(),
  delete: jest.fn(),
});

describe('BooksService', () => {
  let service: BooksService;
  let repository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BooksService,
        { provide: BooksRepository, useFactory: mockBooksRepository },
      ],
    }).compile();

    service = module.get<BooksService>(BooksService);
    repository = module.get<BooksRepository>(BooksRepository);
  });

  describe('createBook', () => {
    it('should create and return a new book', async () => {
      const dto: CreateBookDto = {
        title: 'Harry Potter',
        price: 19.99,
        publishedYear: 1997,
        authorId: 'author-id',
      };
      const savedBook = { id: 'uuid', ...dto };

      repository.create.mockReturnValue(dto);
      repository.save.mockResolvedValue(savedBook);

      expect(await service.createBook(dto)).toEqual(savedBook);
    });
  });

  describe('findAllBooks', () => {
    it('should return an array of books', async () => {
      repository.findBooksWithFilters.mockResolvedValue([
        { id: '1', title: 'Book' },
      ]);

      const result = await service.findAllBooks();
      expect(result).toEqual([{ id: '1', title: 'Book' }]);
    });
  });

  describe('findBookById', () => {
    it('should return a book', async () => {
      const mockBook = { id: '1', title: 'Book' };
      repository.findBookByIdWithDetails.mockResolvedValue(mockBook);

      const result = await service.findBookById('1');
      expect(result).toEqual(mockBook);
    });

    it('should throw NotFoundException', async () => {
      repository.findBookByIdWithDetails.mockResolvedValue(null);

      await expect(service.findBookById('1')).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('deleteBook', () => {
    it('should delete the book', async () => {
      repository.delete.mockResolvedValue({ affected: 1 });

      await service.deleteBook('1');
    });

    it('should throw NotFoundException', async () => {
      repository.delete.mockResolvedValue({ affected: 0 });

      await expect(service.deleteBook('1')).rejects.toThrow(NotFoundException);
    });
  });
});
