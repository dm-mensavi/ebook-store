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
import { RatingsService } from '../services/ratings.service';
import { CreateRatingDto } from '../dto/create-rating.dto';
import { UpdateRatingDto } from '../dto/update-rating.dto';

@Controller('ratings')
export class RatingsController {
  constructor(private readonly ratingsService: RatingsService) {}

  // Create rating
  @Post()
  create(@Body() createRatingDto: CreateRatingDto) {
    return this.ratingsService.createRating(createRatingDto);
  }

  // Get ratings for a specific book
  @Get('book/:bookId')
  findByBook(
    @Param('bookId') bookId: string,
    @Query('sortOrder') sortOrder: 'ASC' | 'DESC' = 'DESC',
  ) {
    return this.ratingsService.findRatingsForBook(bookId, sortOrder);
  }

  // Update rating (optional)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRatingDto: UpdateRatingDto) {
    return this.ratingsService.updateRating(id, updateRatingDto);
  }

  // Delete rating (optional)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ratingsService.deleteRating(id);
  }
}
