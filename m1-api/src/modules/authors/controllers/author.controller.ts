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

@Controller('authors')
export class AuthorsController {
  constructor(private readonly authorsService: AuthorsService) {}

  // Create an author
  @Post()
  create(@Body() createAuthorDto: CreateAuthorDto) {
    return this.authorsService.createAuthor(createAuthorDto);
  }

  // Get all authors with stats
  @Get()
  findAll() {
    return this.authorsService.findAllAuthorsWithStats();
  }

  // Get author by id with stats
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.authorsService.findAuthorByIdWithStats(id);
  }

  // Update author
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAuthorDto: UpdateAuthorDto) {
    return this.authorsService.updateAuthor(id, updateAuthorDto);
  }

  // Delete author
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.authorsService.deleteAuthor(id);
  }
}
