import { Test, TestingModule } from '@nestjs/testing';
import { AuthorsService } from './author.service';
import { AuthorsRepository } from '../repositories/authors.repository';
import { BooksRepository } from '../../books/repositories/book.repository';
import { CreateAuthorDto } from '../dto/create-author.dto';
import { UpdateAuthorDto } from '../dto/update-author.dto';
import { NotFoundException } from '@nestjs/common';

const mockAuthorsRepository = () => ({
  create: jest.fn(),
  save: jest.fn(),
  findAuthorsWithStats: jest.fn(),
  findAuthorsWithStatsAndFilters: jest.fn(),
  findAuthorByIdWithStats: jest.fn(),
  findOne: jest.fn(),
  findOneBy: jest.fn(),
  delete: jest.fn(),
  clear: jest.fn(),
});

const mockBooksRepository = () => ({
  findOne: jest.fn(),
  save: jest.fn(),
});

describe('AuthorsService', () => {
  let service: AuthorsService;
  let authorsRepository: ReturnType<typeof mockAuthorsRepository>;
  let booksRepository: ReturnType<typeof mockBooksRepository>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthorsService,
        { provide: AuthorsRepository, useFactory: mockAuthorsRepository },
        { provide: BooksRepository, useFactory: mockBooksRepository },
      ],
    }).compile();

    service = module.get<AuthorsService>(AuthorsService);
    authorsRepository = module.get<AuthorsRepository>(
      AuthorsRepository,
    ) as unknown as {
      create: jest.Mock<any, any, any>;
      save: jest.Mock<any, any, any>;
      findAuthorsWithStats: jest.Mock<any, any, any>;
      findAuthorsWithStatsAndFilters: jest.Mock<any, any, any>;
      findAuthorByIdWithStats: jest.Mock<any, any, any>;
      findOne: jest.Mock<any, any, any>;
      findOneBy: jest.Mock<any, any, any>;
      delete: jest.Mock<any, any, any>;
      clear: jest.Mock<any, any, any>;
    };
    booksRepository = module.get<BooksRepository>(
      BooksRepository,
    ) as unknown as {
      findOne: jest.Mock<any, any, any>;
      save: jest.Mock<any, any, any>;
    };
  });

  describe('createAuthor', () => {
    it('should create and return a new author', async () => {
      const dto: CreateAuthorDto = {
        name: 'J.K. Rowling',
        photo: 'url',
        biography: '...',
      };
      const savedAuthor = { id: 'uuid', ...dto };

      authorsRepository.create.mockReturnValue(dto);
      authorsRepository.save.mockResolvedValue(savedAuthor);

      const result = await service.createAuthor(dto);

      expect(result).toEqual(savedAuthor);
      expect(authorsRepository.create).toHaveBeenCalledWith(dto);
      expect(authorsRepository.save).toHaveBeenCalledWith(dto);
    });
  });

  describe('findAllAuthorsWithStatsAndFilters', () => {
    it('should return an array of authors', async () => {
      const authors = [{ id: '1', name: 'Author' }];
      authorsRepository.findAuthorsWithStatsAndFilters.mockResolvedValue(
        authors,
      );

      const result = await service.findAllAuthorsWithStatsAndFilters();

      expect(result).toEqual(authors);
      expect(
        authorsRepository.findAuthorsWithStatsAndFilters,
      ).toHaveBeenCalled();
    });
  });

  describe('findAuthorByIdWithStats', () => {
    it('should return an author', async () => {
      const mockAuthor = { id: '1', name: 'Author' };
      authorsRepository.findAuthorByIdWithStats.mockResolvedValue(mockAuthor);

      const result = await service.findAuthorByIdWithStats('1');

      expect(result).toEqual(mockAuthor);
      expect(authorsRepository.findAuthorByIdWithStats).toHaveBeenCalledWith(
        '1',
      );
    });

    it('should throw NotFoundException if author not found', async () => {
      authorsRepository.findAuthorByIdWithStats.mockResolvedValue(null);

      await expect(service.findAuthorByIdWithStats('1')).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('findByIdWithBooks', () => {
    it('should return author with books', async () => {
      const author = { id: '1', name: 'Author', books: [] };
      authorsRepository.findOne.mockResolvedValue(author);

      const result = await service.findByIdWithBooks('1');

      expect(result).toEqual(author);
      expect(authorsRepository.findOne).toHaveBeenCalledWith({
        where: { id: '1' },
        relations: ['books'],
      });
    });

    it('should throw NotFoundException if author not found', async () => {
      authorsRepository.findOne.mockResolvedValue(null);

      await expect(service.findByIdWithBooks('1')).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('addBookToAuthor', () => {
    it('should add a book to an author and return updated author', async () => {
      const author = { id: '1', name: 'Author', books: [] };
      const book = { id: '10', title: 'Book' };

      // First call to findOne: before we associate the book
      authorsRepository.findOne.mockResolvedValueOnce(author);

      // booksRepository finds the book we are about to link to the author
      booksRepository.findOne.mockResolvedValue(book);

      // booksRepository.save simulates saving the book with the author attached
      booksRepository.save.mockResolvedValue({ ...book, author });

      // Second call to findOne (inside findByIdWithBooks): return the updated author with the book
      authorsRepository.findOne.mockResolvedValueOnce({
        ...author,
        books: [book],
      });

      const result = await service.addBookToAuthor('1', '10');

      // Verify save was called correctly
      expect(booksRepository.save).toHaveBeenCalledWith({
        ...book,
        author,
      });

      // Verify returned author contains the book now
      expect(result.books).toContainEqual(book);
    });

    it('should throw NotFoundException if author not found', async () => {
      authorsRepository.findOne.mockResolvedValue(null);

      await expect(service.addBookToAuthor('1', '10')).rejects.toThrow(
        NotFoundException,
      );
    });

    it('should throw NotFoundException if book not found', async () => {
      const author = { id: '1', name: 'Author', books: [] };

      authorsRepository.findOne.mockResolvedValue(author);
      booksRepository.findOne.mockResolvedValue(null);

      await expect(service.addBookToAuthor('1', '10')).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('removeBookFromAuthor', () => {
    it('should remove a book from an author and return updated author', async () => {
      const book = { id: '10', title: 'Book', author: { id: '1' } };
      const author = { id: '1', name: 'Author', books: [] };

      booksRepository.findOne.mockResolvedValue(book);
      booksRepository.save.mockResolvedValue({ ...book, author: null });

      authorsRepository.findOne.mockResolvedValueOnce({ ...author, books: [] });

      const result = await service.removeBookFromAuthor('1', '10');

      expect(booksRepository.findOne).toHaveBeenCalledWith({
        where: { id: '10', author: { id: '1' } },
      });
      expect(booksRepository.save).toHaveBeenCalledWith({
        ...book,
        author: null,
      });
      expect(result.books).toEqual([]);
    });

    it('should throw NotFoundException if book not found', async () => {
      booksRepository.findOne.mockResolvedValue(null);

      await expect(service.removeBookFromAuthor('1', '10')).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('updateAuthor', () => {
    it('should update and return the author', async () => {
      const existingAuthor = { id: '1', name: 'Old Name' };
      const updateAuthorDto: UpdateAuthorDto = { name: 'New Name' };

      authorsRepository.findOneBy.mockResolvedValue(existingAuthor);
      authorsRepository.save.mockResolvedValue({
        ...existingAuthor,
        ...updateAuthorDto,
      });

      const result = await service.updateAuthor('1', updateAuthorDto);

      expect(authorsRepository.findOneBy).toHaveBeenCalledWith({ id: '1' });
      expect(authorsRepository.save).toHaveBeenCalledWith({
        ...existingAuthor,
        ...updateAuthorDto,
      });
      expect(result.name).toEqual('New Name');
    });

    it('should throw NotFoundException if author not found', async () => {
      authorsRepository.findOneBy.mockResolvedValue(null);

      await expect(
        service.updateAuthor('1', { name: 'New Name' }),
      ).rejects.toThrow(NotFoundException);
    });
  });

  describe('deleteAuthor', () => {
    it('should delete the author', async () => {
      authorsRepository.delete.mockResolvedValue({ affected: 1 });

      await service.deleteAuthor('1');

      expect(authorsRepository.delete).toHaveBeenCalledWith('1');
    });

    it('should throw NotFoundException if author not found', async () => {
      authorsRepository.delete.mockResolvedValue({ affected: 0 });

      await expect(service.deleteAuthor('1')).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('clearAllAuthors', () => {
    it('should clear all authors', async () => {
      await service.clearAllAuthors();

      expect(authorsRepository.clear).toHaveBeenCalled();
    });
  });
});
