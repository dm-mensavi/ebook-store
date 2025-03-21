import { Test, TestingModule } from '@nestjs/testing';
import { AuthorsService } from './author.service';
import { AuthorsRepository } from '../repositories/authors.repository';
import { BooksRepository } from '../../books/repositories/book.repository';
import { NotFoundException } from '@nestjs/common';
import { CreateAuthorDto } from '../dto/create-author.dto';
import { UpdateAuthorDto } from '../dto/update-author.dto';
import { CreateAuthorBookDto } from '../dto/create-book.dto';

// Interfaces
interface MockAuthor {
  id: string;
  name: string;
  photo: string;
  biography: string;
  books: MockBook[];
  averageRating?: number;
}

interface MockBook {
  id: string;
  title: string;
  publishedYear: number;
  price: number;
  author: MockAuthor;
  ratings: { stars: number }[];
  averageRating?: number;
}

interface MockAuthorsRepository {
  create: jest.Mock;
  save: jest.Mock;
  findAuthorsWithStats: jest.Mock;
  findAuthorsWithStatsAndFilters: jest.Mock;
  findAuthorByIdWithStats: jest.Mock;
  findOne: jest.Mock;
  findOneBy: jest.Mock;
  delete: jest.Mock;
  clear: jest.Mock;
}

interface MockBooksRepository {
  create: jest.Mock;
  save: jest.Mock;
  findOne: jest.Mock;
}

// Factory functions
const createMockAuthor = (overrides: Partial<MockAuthor> = {}): MockAuthor => ({
  id: 'author-id',
  name: 'Default Author',
  photo: 'photo.jpg',
  biography: 'An author bio',
  books: [],
  ...overrides,
});

const createMockBook = (overrides: Partial<MockBook> = {}): MockBook => ({
  id: 'book-id',
  title: 'Default Book',
  publishedYear: 2023,
  price: 19.99,
  author: createMockAuthor(),
  ratings: [],
  ...overrides,
});

describe('AuthorsService', () => {
  let service: AuthorsService;
  let authorsRepository: MockAuthorsRepository;
  let booksRepository: MockBooksRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthorsService,
        {
          provide: AuthorsRepository,
          useValue: {
            create: jest.fn(),
            save: jest.fn(),
            findAuthorsWithStats: jest.fn(),
            findAuthorsWithStatsAndFilters: jest.fn(),
            findAuthorByIdWithStats: jest.fn(),
            findOne: jest.fn(),
            findOneBy: jest.fn(),
            delete: jest.fn(),
            clear: jest.fn(),
          } as MockAuthorsRepository,
        },
        {
          provide: BooksRepository,
          useValue: {
            create: jest.fn(),
            save: jest.fn(),
            findOne: jest.fn(),
          } as MockBooksRepository,
        },
      ],
    }).compile();

    service = module.get<AuthorsService>(AuthorsService);
    authorsRepository = module.get(AuthorsRepository) as MockAuthorsRepository;
    booksRepository = module.get(BooksRepository) as MockBooksRepository;
  });

  describe('createAuthor', () => {
    it('should create and return a new author', async () => {
      const dto: CreateAuthorDto = {
        name: 'J.K. Rowling',
        photo: 'photo.jpg',
        biography: 'Bio',
      };
      const mockAuthor = createMockAuthor(dto);
      authorsRepository.create.mockReturnValue(mockAuthor);
      authorsRepository.save.mockResolvedValue(mockAuthor);

      const result = await service.createAuthor(dto);

      expect(result).toEqual(mockAuthor);
      expect(authorsRepository.create).toHaveBeenCalledWith(dto);
      expect(authorsRepository.save).toHaveBeenCalledWith(mockAuthor);
    });

    it('should handle partial DTO with defaults', async () => {
      const dto: CreateAuthorDto = {
        name: 'J.K. Rowling',
        photo: '',
      };
      const mockAuthor = createMockAuthor(dto);
      authorsRepository.create.mockReturnValue(mockAuthor);
      authorsRepository.save.mockResolvedValue(mockAuthor);

      const result = await service.createAuthor(dto);

      expect(result).toHaveProperty('photo');
      expect(result).toHaveProperty('biography');
    });
  });

  describe('findAllAuthorsWithStatsAndFilters', () => {
    it('should return all authors with stats', async () => {
      const authors = [createMockAuthor()];
      authorsRepository.findAuthorsWithStatsAndFilters.mockResolvedValue(
        authors,
      );

      const result = await service.findAllAuthorsWithStatsAndFilters(
        'search',
        'name',
        'ASC',
      );

      expect(result).toEqual(authors);
      expect(
        authorsRepository.findAuthorsWithStatsAndFilters,
      ).toHaveBeenCalledWith('search', 'name', 'ASC');
    });

    it('should handle empty results', async () => {
      authorsRepository.findAuthorsWithStatsAndFilters.mockResolvedValue([]);

      const result = await service.findAllAuthorsWithStatsAndFilters(
        '',
        'name',
        'ASC',
      );

      expect(result).toEqual([]);
    });

    it('should work without filters', async () => {
      const authors = [createMockAuthor()];
      // Change this to match what the service actually calls when no parameters are provided
      authorsRepository.findAuthorsWithStatsAndFilters.mockResolvedValue(
        authors,
      );

      const result = await service.findAllAuthorsWithStatsAndFilters();

      expect(result).toEqual(authors);
      expect(
        authorsRepository.findAuthorsWithStatsAndFilters,
      ).toHaveBeenCalledWith(
        undefined, // search
        undefined, // sortBy
        undefined, // sortDirection
      );
    });
  });

  describe('findAuthorByIdWithStats', () => {
    it('should return author by id with stats', async () => {
      const mockAuthor = createMockAuthor();
      authorsRepository.findAuthorByIdWithStats.mockResolvedValue(mockAuthor);

      const result = await service.findAuthorByIdWithStats('author-id');

      expect(result).toEqual(mockAuthor);
      expect(authorsRepository.findAuthorByIdWithStats).toHaveBeenCalledWith(
        'author-id',
      );
    });

    it('should throw NotFoundException if author not found', async () => {
      authorsRepository.findAuthorByIdWithStats.mockResolvedValue(null);

      await expect(
        service.findAuthorByIdWithStats('author-id'),
      ).rejects.toThrow(NotFoundException);
    });

    it('should handle invalid id format', async () => {
      authorsRepository.findAuthorByIdWithStats.mockResolvedValue(null);

      await expect(service.findAuthorByIdWithStats('')).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('findByIdWithBooks', () => {
    it('should return author with books and calculated ratings', async () => {
      const mockBook = createMockBook({
        ratings: [{ stars: 5 }, { stars: 3 }],
      });
      const mockAuthor = createMockAuthor({ books: [mockBook] });
      authorsRepository.findOne.mockResolvedValue(mockAuthor);

      const result = await service.findByIdWithBooks('author-id');

      expect(result.books[0]).toHaveProperty('averageRating', 4);
      expect(result).toHaveProperty('averageRating');
    });

    it('should throw NotFoundException if author not found', async () => {
      authorsRepository.findOne.mockResolvedValue(null);

      await expect(service.findByIdWithBooks('author-id')).rejects.toThrow(
        NotFoundException,
      );
    });

    it('should handle author with no books', async () => {
      const mockAuthor = createMockAuthor({ books: [] });
      authorsRepository.findOne.mockResolvedValue(mockAuthor);

      const result = await service.findByIdWithBooks('author-id');

      expect(result.books).toHaveLength(0);
      expect(result.averageRating).toBe(null);
    });
  });

  describe('createBookForAuthor', () => {
    it('should create and return author with new book', async () => {
      const author = createMockAuthor();
      const bookDto: CreateAuthorBookDto = {
        title: 'Harry Potter',
        publishedYear: 1997,
        price: 19.99,
      };
      const book = createMockBook({ ...bookDto });

      authorsRepository.findOne.mockResolvedValueOnce(author);
      authorsRepository.findOne.mockResolvedValueOnce({
        ...author,
        books: [book],
      });
      booksRepository.create.mockReturnValue(book);
      booksRepository.save.mockResolvedValue(book);

      const result = await service.createBookForAuthor(author.id, bookDto);

      expect(booksRepository.create).toHaveBeenCalledWith({
        ...bookDto,
        author,
      });
      expect(result.books).toHaveLength(1);
    });

    it('should throw NotFoundException if author not found', async () => {
      authorsRepository.findOne.mockResolvedValue(null);
      const bookDto: CreateAuthorBookDto = {
        title: 'Book',
        publishedYear: 2022,
        price: 29.99,
      };

      await expect(
        service.createBookForAuthor('invalid-id', bookDto),
      ).rejects.toThrow(NotFoundException);
    });

    it('should add book to existing books', async () => {
      const existingBook = createMockBook();
      const author = createMockAuthor({ books: [existingBook] });
      const bookDto: CreateAuthorBookDto = {
        title: 'New Book',
        publishedYear: 2023,
        price: 25.99,
      };
      const newBook = createMockBook({ ...bookDto });

      authorsRepository.findOne.mockResolvedValueOnce(author);
      authorsRepository.findOne.mockResolvedValueOnce({
        ...author,
        books: [existingBook, newBook],
      });
      booksRepository.create.mockReturnValue(newBook);
      booksRepository.save.mockResolvedValue(newBook);

      const result = await service.createBookForAuthor(author.id, bookDto);

      expect(result.books).toHaveLength(2);
    });
  });

  describe('removeBookFromAuthor', () => {
    it('should remove book from author', async () => {
      const author = createMockAuthor();
      const book = createMockBook({ author });
      booksRepository.findOne.mockResolvedValue(book);
      booksRepository.save.mockResolvedValue({ ...book, author: null });
      authorsRepository.findOne.mockResolvedValue({ ...author, books: [] });

      const result = await service.removeBookFromAuthor(author.id, book.id);

      expect(result.books).toHaveLength(0);
    });

    it('should throw NotFoundException if book not found', async () => {
      booksRepository.findOne.mockResolvedValue(null);

      await expect(
        service.removeBookFromAuthor('author-id', 'book-id'),
      ).rejects.toThrow(NotFoundException);
    });

    it('should throw NotFoundException if author not found', async () => {
      const book = createMockBook();
      booksRepository.findOne.mockResolvedValue(book);
      authorsRepository.findOne.mockResolvedValue(null);

      await expect(
        service.removeBookFromAuthor('author-id', book.id),
      ).rejects.toThrow(NotFoundException);
    });
  });

  describe('updateAuthor', () => {
    it('should update author info', async () => {
      const author = createMockAuthor();
      const updateDto: UpdateAuthorDto = { name: 'Updated Name' };
      authorsRepository.findOneBy.mockResolvedValue(author);
      authorsRepository.save.mockResolvedValue({ ...author, ...updateDto });

      const result = await service.updateAuthor(author.id, updateDto);

      expect(result.name).toBe('Updated Name');
    });

    it('should throw NotFoundException if author not found', async () => {
      authorsRepository.findOneBy.mockResolvedValue(null);

      await expect(
        service.updateAuthor('invalid-id', { name: 'Updated' }),
      ).rejects.toThrow(NotFoundException);
    });

    it('should handle partial updates', async () => {
      const author = createMockAuthor();
      const updateDto: UpdateAuthorDto = { biography: 'New Bio' };
      authorsRepository.findOneBy.mockResolvedValue(author);
      authorsRepository.save.mockResolvedValue({ ...author, ...updateDto });

      const result = await service.updateAuthor(author.id, updateDto);

      expect(result.biography).toBe('New Bio');
      expect(result.name).toBe(author.name);
    });
  });

  describe('deleteAuthor', () => {
    it('should delete author', async () => {
      authorsRepository.delete.mockResolvedValue({ affected: 1 });

      await service.deleteAuthor('author-id');

      expect(authorsRepository.delete).toHaveBeenCalledWith('author-id');
    });

    it('should throw NotFoundException if author not found', async () => {
      authorsRepository.delete.mockResolvedValue({ affected: 0 });

      await expect(service.deleteAuthor('author-id')).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('clearAllAuthors', () => {
    it('should clear all authors', async () => {
      authorsRepository.clear.mockResolvedValue(undefined);

      await service.clearAllAuthors();

      expect(authorsRepository.clear).toHaveBeenCalled();
    });

    it('should handle empty repository', async () => {
      authorsRepository.clear.mockResolvedValue(undefined);

      await expect(service.clearAllAuthors()).resolves.toBeUndefined();
    });
  });
});
