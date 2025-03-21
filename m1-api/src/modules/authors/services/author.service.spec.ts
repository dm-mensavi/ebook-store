// import { Test, TestingModule } from '@nestjs/testing';
// import { AuthorsService } from './author.service';
// import { AuthorsRepository } from '../repositories/authors.repository';
// import { BooksRepository } from '../../books/repositories/book.repository';
// import { CreateAuthorDto } from '../dto/create-author.dto';
// import { UpdateAuthorDto } from '../dto/update-author.dto';
// import { CreateBookDto } from '../dto/create-book.dto';
// import { NotFoundException } from '@nestjs/common';

// // Mock factory functions
// let authorsRepository: jest.Mocked<Partial<AuthorsRepository>>;
// let booksRepository: jest.Mocked<Partial<BooksRepository>>;

// const mockAuthorsRepository = (): jest.Mocked<Partial<AuthorsRepository>> => ({
//   create: jest.fn(),
//   save: jest.fn(),
//   findAuthorsWithStats: jest.fn(),
//   findAuthorsWithStatsAndFilters: jest.fn(),
//   findAuthorByIdWithStats: jest.fn(),
//   findOne: jest.fn(),
//   findOneBy: jest.fn(),
//   delete: jest.fn(),
//   clear: jest.fn(),
// });

// const mockBooksRepository = (): jest.Mocked<Partial<BooksRepository>> => ({
//   create: jest.fn(),
//   save: jest.fn(),
//   findOne: jest.fn(),
// });

// beforeEach(async () => {
//   const module: TestingModule = await Test.createTestingModule({
//     providers: [
//       AuthorsService,
//       { provide: AuthorsRepository, useFactory: mockAuthorsRepository },
//       { provide: BooksRepository, useFactory: mockBooksRepository },
//     ],
//   }).compile();

//   const service = module.get<AuthorsService>(AuthorsService);

//   authorsRepository = module.get(AuthorsRepository) as jest.Mocked<Partial<AuthorsRepository>>;
//   booksRepository = module.get(BooksRepository) as jest.Mocked<Partial<BooksRepository>>;
// });

//   describe('createAuthor', () => {
//     it('should create and return a new author', async () => {
//       const dto: CreateAuthorDto = {
//         name: 'J.K. Rowling',
//         photo: 'url',
//         biography: 'bio',
//       };
//       const savedAuthor = { id: 'uuid', ...dto };

//       authorsRepository.create.mockReturnValue(dto);
//       authorsRepository.save.mockResolvedValue(savedAuthor);

//       const result = await service.createAuthor(dto);

//       expect(result).toEqual(savedAuthor);
//       expect(authorsRepository.create).toHaveBeenCalledWith(dto);
//       expect(authorsRepository.save).toHaveBeenCalledWith(dto);
//     });
//   });

//   describe('findAllAuthorsWithStatsAndFilters', () => {
//     it('should return an array of authors with filters', async () => {
//       const authors = [{ id: '1', name: 'Author' }];
//       authorsRepository.findAuthorsWithStatsAndFilters.mockResolvedValue(
//         authors,
//       );

//       const result = await service.findAllAuthorsWithStatsAndFilters(
//         'Author',
//         'name',
//         'ASC',
//       );

//       expect(result).toEqual(authors);
//       expect(
//         authorsRepository.findAuthorsWithStatsAndFilters,
//       ).toHaveBeenCalledWith('Author', 'name', 'ASC');
//     });
//   });

//   describe('findAuthorByIdWithStats', () => {
//     it('should return an author by ID with stats', async () => {
//       const author = { id: '1', name: 'Author' };
//       authorsRepository.findAuthorByIdWithStats.mockResolvedValue(author);

//       const result = await service.findAuthorByIdWithStats('1');

//       expect(result).toEqual(author);
//       expect(authorsRepository.findAuthorByIdWithStats).toHaveBeenCalledWith(
//         '1',
//       );
//     });

//     it('should throw NotFoundException if author not found', async () => {
//       authorsRepository.findAuthorByIdWithStats.mockResolvedValue(null);

//       await expect(service.findAuthorByIdWithStats('1')).rejects.toThrow(
//         NotFoundException,
//       );
//     });
//   });

//   describe('findByIdWithBooks', () => {
//     it('should return an author with books and average rating', async () => {
//       const author = {
//         id: '1',
//         name: 'Author',
//         books: [
//           {
//             id: 'b1',
//             title: 'Book 1',
//             ratings: [{ stars: 5 }, { stars: 3 }],
//           },
//         ],
//       };

//       authorsRepository.findOne.mockResolvedValue(author);

//       const result = await service.findByIdWithBooks('1');

//       expect(result).toHaveProperty('averageRating');
//       expect(authorsRepository.findOne).toHaveBeenCalledWith({
//         where: { id: '1' },
//         relations: ['books', 'books.ratings'],
//       });
//     });

//     it('should throw NotFoundException if author not found', async () => {
//       authorsRepository.findOne.mockResolvedValue(null);

//       await expect(service.findByIdWithBooks('1')).rejects.toThrow(
//         NotFoundException,
//       );
//     });
//   });

//   describe('createBookForAuthor', () => {
//     it('should create a new book for an existing author', async () => {
//       const author = { id: '1', name: 'Author', books: [] };
//       const createBookDto: CreateBookDto = {
//         title: 'New Book',
//         publishedYear: 2024,
//         price: 19.99,
//       };

//       authorsRepository.findOne.mockResolvedValue(author);
//       booksRepository.create.mockReturnValue({ ...createBookDto, author });
//       booksRepository.save.mockResolvedValue({ ...createBookDto, author });

//       authorsRepository.findOne
//         .mockResolvedValueOnce(author)
//         .mockResolvedValueOnce({
//           ...author,
//           books: [{ id: 'book1', ...createBookDto }],
//         });

//       const result = await service.createBookForAuthor('1', createBookDto);

//       expect(booksRepository.create).toHaveBeenCalledWith({
//         ...createBookDto,
//         author,
//       });
//       expect(booksRepository.save).toHaveBeenCalled();
//       expect(result.books).toContainEqual(
//         expect.objectContaining({ title: 'New Book' }),
//       );
//     });

//     it('should throw NotFoundException if author not found', async () => {
//       authorsRepository.findOne.mockResolvedValue(null);

//       await expect(
//         service.createBookForAuthor('1', {
//           title: 'Book',
//           publishedYear: 2024,
//           price: 19.99,
//         }),
//       ).rejects.toThrow(NotFoundException);
//     });
//   });

//   describe('removeBookFromAuthor', () => {
//     it('should remove the author from the book and return updated author', async () => {
//       const author = { id: '1', name: 'Author' };
//       const book = { id: '10', title: 'Book', author: { id: '1' } };

//       booksRepository.findOne.mockResolvedValue(book);
//       booksRepository.save.mockResolvedValue({ ...book, author: null });
//       authorsRepository.findOne.mockResolvedValue({
//         ...author,
//         books: [],
//       });

//       const result = await service.removeBookFromAuthor('1', '10');

//       expect(booksRepository.findOne).toHaveBeenCalledWith({
//         where: { id: '10', author: { id: '1' } },
//       });
//       expect(booksRepository.save).toHaveBeenCalledWith({
//         ...book,
//         author: null,
//       });
//       expect(result.books).toEqual([]);
//     });

//     it('should throw NotFoundException if book not found for author', async () => {
//       booksRepository.findOne.mockResolvedValue(null);

//       await expect(service.removeBookFromAuthor('1', '10')).rejects.toThrow(
//         NotFoundException,
//       );
//     });
//   });

//   describe('updateAuthor', () => {
//     it('should update and return the author', async () => {
//       const author = { id: '1', name: 'Old Name' };
//       const updateDto: UpdateAuthorDto = { name: 'New Name' };

//       authorsRepository.findOneBy.mockResolvedValue(author);
//       authorsRepository.save.mockResolvedValue({
//         ...author,
//         ...updateDto,
//       });

//       const result = await service.updateAuthor('1', updateDto);

//       expect(result.name).toEqual('New Name');
//       expect(authorsRepository.findOneBy).toHaveBeenCalledWith({ id: '1' });
//       expect(authorsRepository.save).toHaveBeenCalledWith({
//         ...author,
//         ...updateDto,
//       });
//     });

//     it('should throw NotFoundException if author not found', async () => {
//       authorsRepository.findOneBy.mockResolvedValue(null);

//       await expect(
//         service.updateAuthor('1', { name: 'New Name' }),
//       ).rejects.toThrow(NotFoundException);
//     });
//   });

//   describe('deleteAuthor', () => {
//     it('should delete the author', async () => {
//       authorsRepository.delete.mockResolvedValue({ affected: 1 });

//       await service.deleteAuthor('1');

//       expect(authorsRepository.delete).toHaveBeenCalledWith('1');
//     });

//     it('should throw NotFoundException if author not found', async () => {
//       authorsRepository.delete.mockResolvedValue({ affected: 0 });

//       await expect(service.deleteAuthor('1')).rejects.toThrow(
//         NotFoundException,
//       );
//     });
//   });

//   describe('clearAllAuthors', () => {
//     it('should clear all authors', async () => {
//       await service.clearAllAuthors();

//       expect(authorsRepository.clear).toHaveBeenCalled();
//     });
//   });
// });
