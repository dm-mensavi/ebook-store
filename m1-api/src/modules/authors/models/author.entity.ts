import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Book } from '../../books/models/book.entity';

@Entity()
export class Author {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  photo: string;

  @Column({ nullable: true })
  biography: string;

  @OneToMany(() => Book, (book) => book.author, { cascade: true })
  books: Book[];
  averageRating?: number;

  get calculatedAverageRating(): number | null {
    if (!this.books || this.books.length === 0) {
      return null;
    }

    // Optional: ensure books have ratings populated
    const validBooks = this.books.filter(
      (book) => book.averageRating !== undefined,
    );

    if (validBooks.length === 0) {
      return null;
    }

    const total = validBooks.reduce(
      (sum, book) => sum + (book.averageRating ?? 0),
      0,
    );
    return Math.round((total / validBooks.length) * 100) / 100;
  }
}
