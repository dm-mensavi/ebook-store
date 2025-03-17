import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Author } from './author.entity';
import { Rating } from './rating.entity';

@Entity()
export class Book {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column('decimal')
  price: number;

  @Column('int')
  publishedYear: number;

  @ManyToOne(() => Author, (author) => author.books, { eager: true })
  author: Author;

  @OneToMany(() => Rating, (rating) => rating.book, { cascade: true })
  ratings: Rating[];
}
