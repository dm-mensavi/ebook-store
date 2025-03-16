import { Module } from '@nestjs/common';
import { BooksController } from './controllers/book.controller';
import { BooksService } from './services/book.service';

@Module({
  controllers: [BooksController],
  providers: [BooksService],
})
export class BooksModule {}
