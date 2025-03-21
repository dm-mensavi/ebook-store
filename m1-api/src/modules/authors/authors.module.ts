import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthorsController } from './controllers/author.controller';
import { AuthorsService } from './services/author.service';
import { AuthorsRepository } from './repositories/authors.repository';
import { Author } from './models/author.entity';
import { BooksRepository } from '../books/repositories/book.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Author])],
  controllers: [AuthorsController],
  providers: [AuthorsService, AuthorsRepository, BooksRepository],
  exports: [AuthorsService],
})
export class AuthorsModule {}
