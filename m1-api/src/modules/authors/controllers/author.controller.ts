import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  HttpCode,
  HttpStatus,
  ParseBoolPipe,
} from '@nestjs/common';
import { AuthorsService } from '../services/author.service';
import { CreateAuthorDto } from '../dto/create-author.dto';
import { UpdateAuthorDto } from '../dto/update-author.dto';
import { FilterAuthorDto } from '../dto/filter-authors.dto';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiQuery,
} from '@nestjs/swagger';
import { AuthorResponseDto } from '../dto/author-response.dto';
import { AuthorPresenter } from '../presenters/authors.presenters';
import { AddBookToAuthorResponseDto } from '../dto/add-books-author-response.dto';

@ApiTags('Authors')
@Controller('authors')
export class AuthorsController {
  constructor(private readonly authorsService: AuthorsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new author' })
  @ApiResponse({
    status: 201,
    description: 'Author created successfully.',
    type: AuthorResponseDto,
  })
  async create(
    @Body() createAuthorDto: CreateAuthorDto,
  ): Promise<AuthorResponseDto> {
    const author = await this.authorsService.createAuthor(createAuthorDto);
    return AuthorPresenter.toResponse(author);
  }

  @Get()
  @ApiOperation({ summary: 'Get all authors with optional search and sorting' })
  @ApiResponse({
    status: 200,
    description: 'List of authors.',
    type: [AuthorResponseDto],
  })
  async findAll(
    @Query() filterAuthorDto: FilterAuthorDto,
  ): Promise<AuthorResponseDto[]> {
    const { search, sortBy, sortOrder } = filterAuthorDto;
    const authors = await this.authorsService.findAllAuthorsWithStatsAndFilters(
      search,
      sortBy,
      sortOrder,
    );
    return AuthorPresenter.toResponseArray(authors);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a specific author by ID, with optional books' })
  @ApiParam({ name: 'id', description: 'UUID of the author' })
  @ApiQuery({
    name: 'includeBooks',
    required: false,
    type: Boolean,
    description: 'Whether to include the list of books written by the author',
  })
  @ApiResponse({
    status: 200,
    description: 'Author retrieved successfully.',
    type: AuthorResponseDto,
  })
  async findOne(
    @Param('id') id: string,
    @Query('includeBooks', ParseBoolPipe) includeBooks = false,
  ): Promise<AuthorResponseDto> {
    if (includeBooks) {
      const author = await this.authorsService.findByIdWithBooks(id);
      return AuthorPresenter.toDetailedResponse(author);
    }

    const author = await this.authorsService.findAuthorByIdWithStats(id);
    return AuthorPresenter.toResponse(author);
  }

  @Post(':id/books/:bookId')
  @ApiOperation({ summary: 'Add a book to an author' })
  @ApiParam({ name: 'id', description: 'The ID of the author' })
  @ApiParam({ name: 'bookId', description: 'The ID of the book to add' })
  @ApiResponse({
    status: 201,
    description: 'Book added to author successfully',
    type: AddBookToAuthorResponseDto,
  })
  async addBook(
    @Param('id') authorId: string,
    @Param('bookId') bookId: string,
  ): Promise<AddBookToAuthorResponseDto> {
    const author = await this.authorsService.addBookToAuthor(authorId, bookId);
    return new AddBookToAuthorResponseDto(author);
  }

  @Delete(':id/books/:bookId')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Remove a book from an author' })
  @ApiParam({ name: 'id', description: 'The ID of the author' })
  @ApiParam({ name: 'bookId', description: 'The ID of the book to remove' })
  @ApiResponse({
    status: 204,
    description: 'Book removed from author successfully',
  })
  async removeBook(
    @Param('id') authorId: string,
    @Param('bookId') bookId: string,
  ): Promise<void> {
    await this.authorsService.removeBookFromAuthor(authorId, bookId);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update an existing author' })
  @ApiParam({ name: 'id', description: 'UUID of the author to update' })
  @ApiResponse({
    status: 200,
    description: 'Author updated successfully.',
    type: AuthorResponseDto,
  })
  async update(
    @Param('id') id: string,
    @Body() updateAuthorDto: UpdateAuthorDto,
  ): Promise<AuthorResponseDto> {
    const author = await this.authorsService.updateAuthor(id, updateAuthorDto);
    return AuthorPresenter.toResponse(author);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete an author by ID' })
  @ApiParam({ name: 'id', description: 'UUID of the author to delete' })
  @ApiResponse({ status: 200, description: 'Author deleted successfully.' })
  async remove(@Param('id') id: string): Promise<void> {
    await this.authorsService.deleteAuthor(id);
  }
}
