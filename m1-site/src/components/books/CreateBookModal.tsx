// components/CreateBookModal.tsx
import React, { useState, useEffect } from "react";
import Modal from "../ui/Modal";
import { getAuthors } from "../../providers/authorProvider"; // Import the function to fetch authors
import { Author } from "../../models/Author"; // Import the Author type

type CreateBookModalProps = {
  isOpen: boolean; // Whether the modal is open
  onClose: () => void; // Function to close the modal
  onCreateBook: (book: {
    title: string;
    publishedYear: number;
    price: number;
    authorId: string;
  }) => void; // Function to handle book creation
};

const CreateBookModal: React.FC<CreateBookModalProps> = ({
  isOpen,
  onClose,
  onCreateBook,
}) => {
  const [title, setTitle] = useState<string>("");
  const [publishedYear, setPublishedYear] = useState<number>(
    new Date().getFullYear()
  );
  const [price, setPrice] = useState<number>(0);
  const [authorId, setAuthorId] = useState<string>(""); // Store the selected author's ID
  const [authors, setAuthors] = useState<Author[]>([]); // Store the list of authors
  const [loadingAuthors, setLoadingAuthors] = useState<boolean>(true); // Loading state for authors

  // Fetch authors when the modal opens
  useEffect(() => {
    if (isOpen) {
      const fetchAuthors = async () => {
        try {
          const authorsData = await getAuthors();
          setAuthors(authorsData);
        } catch (error) {
          console.error("Error fetching authors:", error);
        } finally {
          setLoadingAuthors(false);
        }
      };

      fetchAuthors();
    }
  }, [isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onCreateBook({ title, publishedYear, price, authorId });
    onClose(); // Close the modal after submission
  };

  if (!isOpen) return null;

  return (
    <Modal title="Create New Book" onClose={onClose}>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Title Field */}
        <div>
          <label htmlFor="title" className="block text-sm font-medium">
            Title
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>

        {/* Author Dropdown */}
        <div>
          <label htmlFor="author" className="block text-sm font-medium">
            Author
          </label>
          {loadingAuthors ? (
            <p>Loading authors...</p>
          ) : (
            <select
              id="author"
              value={authorId}
              onChange={(e) => setAuthorId(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md"
              required
            >
              <option value="" disabled>
                Select an author
              </option>
              {authors.map((author) => (
                <option key={author.id} value={author.id}>
                  {author.name}
                </option>
              ))}
            </select>
          )}
        </div>

        {/* Published Year Field */}
        <div>
          <label htmlFor="publishedYear" className="block text-sm font-medium">
            Published Year
          </label>
          <input
            type="number"
            id="publishedYear"
            value={publishedYear}
            onChange={(e) => setPublishedYear(Number(e.target.value))}
            className="w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>

        {/* Price Field */}
        <div>
          <label htmlFor="price" className="block text-sm font-medium">
            Price
          </label>
          <input
            type="number"
            id="price"
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
            className="w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>

        {/* Buttons */}
        <div className="flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="mr-2 px-4 py-2 text-gray-600 hover:text-gray-800"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            Create
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default CreateBookModal;
