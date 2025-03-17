import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Book } from './book.entity';

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
}
