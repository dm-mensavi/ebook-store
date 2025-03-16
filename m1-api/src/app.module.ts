import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './modules/database/database.module';
import { BooksModule } from './modules/books/book.module';
import { AuthorsModule } from './modules/authors/author.module';
import { RatingsModule } from './modules/ratings/ratings.module';
import { RatingsService } from './modules/ratings/services/ratings.service';

@Module({
  imports: [DatabaseModule, BooksModule, AuthorsModule, RatingsModule],
  controllers: [AppController],
  providers: [AppService, RatingsService],
})
export class AppModule {}
