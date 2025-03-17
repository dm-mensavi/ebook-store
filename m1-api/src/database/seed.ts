import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import { AuthorsService } from '../modules/authors/services/author.service';
import { BooksService } from '../modules/books/services/book.service';
import { RatingsService } from '../modules/ratings/services/ratings.service';

import { faker } from '@faker-js/faker';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);

  const authorsService = app.get(AuthorsService);
  const booksService = app.get(BooksService);
  const ratingsService = app.get(RatingsService);

  console.log('🌱 Starting Faker seeding...');

  await ratingsService.clearAllRatings?.();
  await booksService.clearAllBooks?.();
  await authorsService.clearAllAuthors?.();

  const authors = await seedAuthors(authorsService, 4);
  const books = await seedBooks(booksService, authors, 10);
  await seedRatings(ratingsService, books, 15);

  console.log('✅ Faker Seeding complete!');
  await app.close();
}

bootstrap();

async function seedAuthors(authorsService: AuthorsService, count = 4) {
  const authors = [];

  for (let i = 0; i < count; i++) {
    const author = await authorsService.createAuthor({
      name: faker.person.fullName(),
      photo: faker.image.avatar(),
      biography: faker.lorem.paragraph(),
    });

    authors.push(author);
    console.log(`✅ Created Author: ${author.name}`);
  }

  return authors;
}

async function seedBooks(
  booksService: BooksService,
  authors: any[],
  count = 10,
) {
  const books = [];

  for (let i = 0; i < count; i++) {
    const randomAuthor =
      authors[faker.number.int({ min: 0, max: authors.length - 1 })];

    const book = await booksService.createBook({
      title: faker.commerce.productName(),
      price: parseFloat(faker.commerce.price({ min: 10, max: 50 })),
      publishedYear: faker.number.int({ min: 1950, max: 2024 }),
      authorId: randomAuthor.id,
    });

    books.push(book);
    console.log(`📚 Created Book: ${book.title} by ${randomAuthor.name}`);
  }

  return books;
}

async function seedRatings(
  ratingsService: RatingsService,
  books: any[],
  count = 15,
) {
  for (let i = 0; i < count; i++) {
    const randomBook =
      books[faker.number.int({ min: 0, max: books.length - 1 })];

    const rating = await ratingsService.createRating({
      bookId: randomBook.id,
      stars: faker.number.int({ min: 1, max: 5 }),
      comment: faker.lorem.sentence(),
    });

    console.log(
      `⭐ Created Rating (${rating.stars} stars) for Book: ${randomBook.title}`,
    );
  }
}
