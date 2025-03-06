import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './modules/database/database.module';
import { BooksModule } from './modules/books/book.module';
import { AuthorsModule } from './modules/authors/author.module';

@Module({
  imports: [DatabaseModule, BooksModule, AuthorsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
