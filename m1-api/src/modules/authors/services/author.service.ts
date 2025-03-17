import { Injectable, NotFoundException } from '@nestjs/common';
import { AuthorsRepository } from '../repositories/authors.repository';
import { CreateAuthorDto } from '../dto/create-author.dto';
import { UpdateAuthorDto } from '../dto/update-author.dto';
import { Author } from '../models/author.entity';

@Injectable()
export class AuthorsService {
  constructor(private readonly authorsRepository: AuthorsRepository) {}

  // Create Author
  async createAuthor(createAuthorDto: CreateAuthorDto): Promise<Author> {
    const author = this.authorsRepository.create(createAuthorDto);
    return await this.authorsRepository.save(author);
  }

  // Get all authors with bookCount and averageRating
  async findAllAuthorsWithStats(): Promise<any[]> {
    return await this.authorsRepository.findAuthorsWithStats();
  }

  // Get single author by id with stats
  async findAuthorByIdWithStats(authorId: string): Promise<any> {
    const author =
      await this.authorsRepository.findAuthorByIdWithStats(authorId);
    if (!author) {
      throw new NotFoundException(`Author with id ${authorId} not found`);
    }
    return author;
  }

  async findAllAuthorsWithStatsAndFilters(
    search?: string,
    sortBy?: string,
    sortOrder?: 'ASC' | 'DESC',
  ): Promise<any[]> {
    return await this.authorsRepository.findAuthorsWithStatsAndFilters(
      search,
      sortBy,
      sortOrder,
    );
  }

  // Update author
  async updateAuthor(
    authorId: string,
    updateAuthorDto: UpdateAuthorDto,
  ): Promise<Author> {
    const author = await this.authorsRepository.findOneBy({ id: authorId });
    if (!author) {
      throw new NotFoundException(`Author with id ${authorId} not found`);
    }

    const updated = Object.assign(author, updateAuthorDto);
    return await this.authorsRepository.save(updated);
  }

  // Delete author
  async deleteAuthor(authorId: string): Promise<void> {
    const result = await this.authorsRepository.delete(authorId);

    if (result.affected === 0) {
      throw new NotFoundException(`Author with id ${authorId} not found`);
    }
  }

  // Clear all authors
  async clearAllAuthors(): Promise<void> {
    await this.authorsRepository.clear(); // clears all records
  }
}
