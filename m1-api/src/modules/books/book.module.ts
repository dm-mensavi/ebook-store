import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BooksController } from './controllers/book.controller';
import { BooksService } from './services/book.service';
import { BooksRepository } from './repositories/book.repository';
import { Book } from './models/book.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Book])],
  controllers: [BooksController],
  providers: [BooksService, BooksRepository],
  exports: [BooksService],
})
export class BooksModule {}
