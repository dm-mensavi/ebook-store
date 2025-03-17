import { Book } from '../../models/Book';
import BookCard from './BookCard';

type BookListProps = {
  books: Book[];
};

const BookList = ({ books }: BookListProps) => {
  if (!books.length) {
    return <p>No books found.</p>;
  }

  return (
    <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      {books.map((book) => (
        <BookCard key={book.id} book={book} />
      ))}
    </div>
  );
};

export default BookList;
