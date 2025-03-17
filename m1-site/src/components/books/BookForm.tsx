import { useState, FormEvent } from 'react';
import { Author } from '../../models/Author';
import { createBook } from '../../providers/bookProvider';

type BookFormProps = {
  authors: Author[];
  onBookCreated: () => void; // callback to refresh the list after creation
};

const BookForm = ({ authors, onBookCreated }: BookFormProps) => {
  const [title, setTitle] = useState('');
  const [publishedYear, setPublishedYear] = useState<number>(2024);
  const [price, setPrice] = useState<number>(0);
  const [authorId, setAuthorId] = useState<number>(authors[0]?.id || 1);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await createBook({
        title,
        publishedYear,
        price,
        authorId
      });

      // Clear the form
      setTitle('');
      setPublishedYear(2024);
      setPrice(0);
      setAuthorId(authors[0]?.id || 1);

      // Refresh the book list in the parent component
      onBookCreated();
    } catch (error) {
      console.error('Error creating book:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4 bg-white shadow rounded-lg">
      <h2 className="text-xl font-bold mb-2">Add New Book</h2>

      <div>
        <label className="block text-sm font-medium">Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border rounded p-2"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium">Published Year</label>
        <input
          type="number"
          value={publishedYear}
          onChange={(e) => setPublishedYear(Number(e.target.value))}
          className="w-full border rounded p-2"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium">Price (€)</label>
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(Number(e.target.value))}
          className="w-full border rounded p-2"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium">Author</label>
        <select
          value={authorId}
          onChange={(e) => setAuthorId(Number(e.target.value))}
          className="w-full border rounded p-2"
        >
          {authors.map((author) => (
            <option key={author.id} value={author.id}>
              {author.name}
            </option>
          ))}
        </select>
      </div>

      <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">
        Create Book
      </button>
    </form>
  );
};

export default BookForm;
