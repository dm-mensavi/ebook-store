import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthorsModule } from './modules/authors/authors.module';
import { BooksModule } from './modules/books/book.module';
import { RatingsModule } from './modules/ratings/ratings.module';
import { Author } from './modules/authors/models/author.entity';
import { Book } from './modules/books/models/book.entity';
import { Rating } from './modules/ratings/models/rating.entity';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'library.db',
      entities: [Author, Book, Rating],
      synchronize: true,
    }),
    AuthorsModule,
    BooksModule,
    RatingsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
