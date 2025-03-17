import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { BooksService } from '../services/book.service';
import { CreateBookDto } from '../dto/create-book.dto';
import { UpdateBookDto } from '../dto/update-book.dto';
import { FilterBookDto } from '../dto/filter-book.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { BookResponseDto } from '../dto/book-response.dto';

@ApiTags('Books')
@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new book' })
  @ApiResponse({
    status: 201,
    description: 'Book created successfully.',
    type: BookResponseDto,
  })
  create(@Body() createBookDto: CreateBookDto) {
    return this.booksService.createBook(createBookDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all books with optional search and sorting' })
  @ApiResponse({
    status: 200,
    description: 'List of books.',
    type: [BookResponseDto],
  })
  findAll(@Query() filterBookDto: FilterBookDto) {
    const { search, sortBy, sortOrder } = filterBookDto;
    return this.booksService.findAllBooks(search, sortBy, sortOrder);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a specific book by ID' })
  @ApiParam({ name: 'id', description: 'UUID of the book' })
  @ApiResponse({
    status: 200,
    description: 'Book retrieved.',
    type: BookResponseDto,
  })
  findOne(@Param('id') id: string) {
    return this.booksService.findBookById(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update an existing book' })
  @ApiParam({ name: 'id', description: 'UUID of the book to update' })
  @ApiResponse({
    status: 200,
    description: 'Book updated successfully.',
    type: BookResponseDto,
  })
  update(@Param('id') id: string, @Body() updateBookDto: UpdateBookDto) {
    return this.booksService.updateBook(id, updateBookDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a book by ID' })
  @ApiParam({ name: 'id', description: 'UUID of the book to delete' })
  @ApiResponse({ status: 200, description: 'Book deleted successfully.' })
  remove(@Param('id') id: string) {
    return this.booksService.deleteBook(id);
  }
}
