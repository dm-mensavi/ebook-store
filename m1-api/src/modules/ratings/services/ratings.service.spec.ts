import { Test, TestingModule } from '@nestjs/testing';
import { RatingsService } from './ratings.service';
import { RatingsRepository } from '../repositories/ratings.repository';
import { CreateRatingDto } from '../dto/create-rating.dto';
import { NotFoundException } from '@nestjs/common';

const mockRatingsRepository = () => ({
  create: jest.fn(),
  save: jest.fn(),
  findRatingsForBook: jest.fn(),
  findOneBy: jest.fn(),
  delete: jest.fn(),
});

describe('RatingsService', () => {
  let service: RatingsService;
  let repository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RatingsService,
        { provide: RatingsRepository, useFactory: mockRatingsRepository },
      ],
    }).compile();

    service = module.get<RatingsService>(RatingsService);
    repository = module.get<RatingsRepository>(RatingsRepository);
  });

  describe('createRating', () => {
    it('should create and return a new rating', async () => {
      const dto: CreateRatingDto = {
        bookId: 'book-id',
        stars: 5,
        comment: 'Great!',
      };
      const savedRating = { id: 'uuid', ...dto };

      repository.create.mockReturnValue(dto);
      repository.save.mockResolvedValue(savedRating);

      expect(await service.createRating(dto)).toEqual(savedRating);
    });
  });

  describe('findRatingsForBook', () => {
    it('should return an array of ratings', async () => {
      repository.findRatingsForBook.mockResolvedValue([{ id: '1', stars: 5 }]);

      const result = await service.findRatingsForBook('book-id');
      expect(result).toEqual([{ id: '1', stars: 5 }]);
    });
  });

  describe('deleteRating', () => {
    it('should delete the rating', async () => {
      repository.delete.mockResolvedValue({ affected: 1 });

      await service.deleteRating('1');
    });

    it('should throw NotFoundException', async () => {
      repository.delete.mockResolvedValue({ affected: 0 });

      await expect(service.deleteRating('1')).rejects.toThrow(
        NotFoundException,
      );
    });
  });
});
