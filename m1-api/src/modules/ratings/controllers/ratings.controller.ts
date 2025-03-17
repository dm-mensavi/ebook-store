import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { RatingsService } from '../services/ratings.service';
import { CreateRatingDto } from '../dto/create-rating.dto';
import { UpdateRatingDto } from '../dto/update-rating.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { RatingResponseDto } from '../dto/rating-response.dto';

@ApiTags('Ratings')
@Controller('ratings')
export class RatingsController {
  constructor(private readonly ratingsService: RatingsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new rating' })
  @ApiResponse({
    status: 201,
    description: 'Rating created successfully.',
    type: RatingResponseDto,
  })
  create(@Body() createRatingDto: CreateRatingDto) {
    return this.ratingsService.createRating(createRatingDto);
  }

  @Get('book/:bookId')
  @ApiOperation({ summary: 'Get all ratings for a specific book' })
  @ApiParam({ name: 'bookId', description: 'UUID of the book' })
  @ApiResponse({
    status: 200,
    description: 'List of ratings for the book.',
    type: [RatingResponseDto],
  })
  findRatingsForBook(@Param('bookId') bookId: string) {
    return this.ratingsService.findRatingsForBook(bookId);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update an existing rating' })
  @ApiParam({ name: 'id', description: 'UUID of the rating to update' })
  @ApiResponse({
    status: 200,
    description: 'Rating updated successfully.',
    type: RatingResponseDto,
  })
  update(@Param('id') id: string, @Body() updateRatingDto: UpdateRatingDto) {
    return this.ratingsService.updateRating(id, updateRatingDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a rating by ID' })
  @ApiParam({ name: 'id', description: 'UUID of the rating to delete' })
  @ApiResponse({ status: 200, description: 'Rating deleted successfully.' })
  remove(@Param('id') id: string) {
    return this.ratingsService.deleteRating(id);
  }
}
