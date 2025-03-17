import { Test, TestingModule } from '@nestjs/testing';
import { AuthorsService } from './author.service';
import { AuthorsRepository } from '../repositories/authors.repository';
import { CreateAuthorDto } from '../dto/create-author.dto';
import { NotFoundException } from '@nestjs/common';

const mockAuthorsRepository = () => ({
  create: jest.fn(),
  save: jest.fn(),
  findAuthorsWithStatsAndFilters: jest.fn(),
  findAuthorByIdWithStats: jest.fn(),
  findOneBy: jest.fn(),
  delete: jest.fn(),
});

describe('AuthorsService', () => {
  let service: AuthorsService;
  let repository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthorsService,
        { provide: AuthorsRepository, useFactory: mockAuthorsRepository },
      ],
    }).compile();

    service = module.get<AuthorsService>(AuthorsService);
    repository = module.get<AuthorsRepository>(AuthorsRepository);
  });

  describe('createAuthor', () => {
    it('should create and return a new author', async () => {
      const dto: CreateAuthorDto = {
        name: 'J.K. Rowling',
        photo: 'url',
        biography: '...',
      };
      const savedAuthor = { id: 'uuid', ...dto };

      repository.create.mockReturnValue(dto);
      repository.save.mockResolvedValue(savedAuthor);

      expect(await service.createAuthor(dto)).toEqual(savedAuthor);
      expect(repository.create).toHaveBeenCalledWith(dto);
      expect(repository.save).toHaveBeenCalledWith(dto);
    });
  });

  describe('findAllAuthorsWithStatsAndFilters', () => {
    it('should return an array of authors', async () => {
      repository.findAuthorsWithStatsAndFilters.mockResolvedValue([
        { id: '1', name: 'Author' },
      ]);

      const result = await service.findAllAuthorsWithStatsAndFilters();
      expect(result).toEqual([{ id: '1', name: 'Author' }]);
    });
  });

  describe('findAuthorByIdWithStats', () => {
    it('should return an author', async () => {
      const mockAuthor = { id: '1', name: 'Author' };
      repository.findAuthorByIdWithStats.mockResolvedValue(mockAuthor);

      const result = await service.findAuthorByIdWithStats('1');
      expect(result).toEqual(mockAuthor);
    });

    it('should throw NotFoundException', async () => {
      repository.findAuthorByIdWithStats.mockResolvedValue(null);

      await expect(service.findAuthorByIdWithStats('1')).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('deleteAuthor', () => {
    it('should delete the author', async () => {
      repository.delete.mockResolvedValue({ affected: 1 });

      await service.deleteAuthor('1');
      expect(repository.delete).toHaveBeenCalledWith('1');
    });

    it('should throw NotFoundException', async () => {
      repository.delete.mockResolvedValue({ affected: 0 });

      await expect(service.deleteAuthor('1')).rejects.toThrow(
        NotFoundException,
      );
    });
  });
});
