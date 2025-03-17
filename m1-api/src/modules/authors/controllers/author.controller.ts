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
import { AuthorsService } from '../services/author.service';
import { CreateAuthorDto } from '../dto/create-author.dto';
import { UpdateAuthorDto } from '../dto/update-author.dto';
import { FilterAuthorDto } from '../dto/filter-authors.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { AuthorResponseDto } from '../dto/author-response.dto';

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
  create(@Body() createAuthorDto: CreateAuthorDto) {
    return this.authorsService.createAuthor(createAuthorDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all authors with optional search and sorting' })
  @ApiResponse({
    status: 200,
    description: 'List of authors.',
    type: [AuthorResponseDto],
  })
  findAll(@Query() filterAuthorDto: FilterAuthorDto) {
    const { search, sortBy, sortOrder } = filterAuthorDto;
    return this.authorsService.findAllAuthorsWithStatsAndFilters(
      search,
      sortBy,
      sortOrder,
    );
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a specific author by ID' })
  @ApiParam({ name: 'id', description: 'UUID of the author' })
  @ApiResponse({
    status: 200,
    description: 'Author retrieved.',
    type: AuthorResponseDto,
  })
  findOne(@Param('id') id: string) {
    return this.authorsService.findAuthorByIdWithStats(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update an existing author' })
  @ApiParam({ name: 'id', description: 'UUID of the author to update' })
  @ApiResponse({
    status: 200,
    description: 'Author updated successfully.',
    type: AuthorResponseDto,
  })
  update(@Param('id') id: string, @Body() updateAuthorDto: UpdateAuthorDto) {
    return this.authorsService.updateAuthor(id, updateAuthorDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete an author by ID' })
  @ApiParam({ name: 'id', description: 'UUID of the author to delete' })
  @ApiResponse({ status: 200, description: 'Author deleted successfully.' })
  remove(@Param('id') id: string) {
    return this.authorsService.deleteAuthor(id);
  }
}
