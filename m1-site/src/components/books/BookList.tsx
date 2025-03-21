// "use client";

// import React, { useEffect, useState } from "react";
// import { createBook, getBooks } from "../../providers/bookProvider"; // Your API fetch call
// import { Book } from "../../models/Book"; // Updated model
// import BookCard from "./BookCard";
// import Loading from "../ui/Loading";
// import "../../styles/globals.css";
// import CreateBookModal from "./CreateBookModal";
// import Link from "next/link";
// import { toast } from "react-toastify";

// const BookList: React.FC = () => {
//   const [books, setBooks] = useState<Book[]>([]);
//   const [loading, setLoading] = useState<boolean>(true);
//   const [error, setError] = useState<string | null>(null);
//   const [searchQuery, setSearchQuery] = useState<string>(""); // State for search query
//   const [sortOption, setSortOption] = useState<string>("title"); // State for sorting option
//   const [isCreateBookModalOpen, setIsCreateBookModalOpen] =
//     useState<boolean>(false);

//   // Fetch books
//   useEffect(() => {
//     const fetchBooks = async () => {
//       try {
//         const booksData = await getBooks();
//         setBooks(booksData);
//       } catch (err) {
//         setError("Failed to fetch books.");
//         toast.error("Failed to fetch books.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchBooks();
//   }, []);

//   // const handleCreateBook = async (book: {
//   //   title: string;
//   //   publishedYear: number;
//   //   price: number;
//   //   authorId: string;
//   // }) => {
//   //   try {
//   //     const newBook = await createBook(book); // Call the API to create a book
//   //     setBooks((prevBooks) => [...prevBooks, newBook]); // Update the book list
//   //     toast.success("Book created successfully.");
//   //   } catch (err) {
//   //     console.error("Failed to create book:", err);
//   //     toast.error("Failed to create book.");
//   //   }
//   // };

//   const handleCreateBook = async (book: {
//     title: string;
//     publishedYear: number;
//     price: number;
//     authorId: string;
//   }) => {
//     try {
//       await createBook(book); // Create the book
//       toast.success("Book created successfully.");

//       // ✅ Refetch all books after creating one
//       let booksData = await getBooks();

//       // ✅ Step 3: Ensure averageRating defaults to 0 if missing
//       booksData = booksData.map((b) => ({
//         ...b,
//         averageRating: b.averageRating ?? 0, // fallback to 0 if undefined/null
//       }));

//       setBooks(booksData);
//     } catch (err) {
//       console.error("Failed to create book:", err);
//       toast.error("Failed to create book.");
//     }
//   };

//   // Filter books based on search query
//   const filteredBooks = books.filter((book) =>
//     book.title.toLowerCase().includes(searchQuery.toLowerCase())
//   );

//   // Sort books based on the selected option
//   const sortedBooks = [...filteredBooks].sort((a, b) => {
//     switch (sortOption) {
//       case "title":
//         return a.title.localeCompare(b.title);
//       case "price":
//         return a.price - b.price;
//       case "publishedYear":
//         return a.publishedYear - b.publishedYear;
//       case "averageRating":
//         return (b.averageRating || 0) - (a.averageRating || 0); // Descending order
//       default:
//         return 0;
//     }
//   });

//   if (loading) {
//     return <Loading message="Fetching books..." />;
//   }

//   if (error) {
//     return <div className="text-center text-red-500">{error}</div>;
//   }

//   return (
//     <>
//       <div className="flex justify-between items-center w-full">
//         {/* Search Bar */}
//         <div className="m-5 w-8/12">
//           <input
//             type="text"
//             placeholder="Search by title..."
//             value={searchQuery}
//             onChange={(e) => setSearchQuery(e.target.value)}
//             className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />
//         </div>

//         {/* Sorting Dropdown */}
//         <div className="m-5 flex items-center w-fit-content">
//           <label htmlFor="sort" className="mr-2">
//             Sort by:
//           </label>
//           <select
//             id="sort"
//             value={sortOption}
//             onChange={(e) => setSortOption(e.target.value)}
//             className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//           >
//             <option value="title">Title</option>
//             <option value="price">Price</option>
//             <option value="publishedYear">Published Year</option>
//             <option value="averageRating">Average Rating</option>
//           </select>
//         </div>
//       </div>
//       {/* Button to open the Create Book Modal */}
//       <div className="m-5">
//         <button
//           onClick={() => setIsCreateBookModalOpen(true)}
//           className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
//         >
//           Create New Book
//         </button>
//       </div>

//       {/* Create Book Modal */}
//       <CreateBookModal
//         isOpen={isCreateBookModalOpen}
//         onClose={() => setIsCreateBookModalOpen(false)}
//         onCreateBook={handleCreateBook}
//       />

//       {/* <div className="m-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
//         {books.length === 0 ? (
//           <div className="col-span-full text-center text-gray-500">
//             No books found.
//           </div>
//         ) : (
//           books.map((book) => <BookCard key={book.id} book={book} />)
//         )}
//       </div> */}

//       {/* Book List */}
//       <div className="m-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
//         {sortedBooks.length === 0 ? (
//           <div className="col-span-full text-center text-gray-500">
//             No books found.
//           </div>
//         ) : (
//           sortedBooks.map((book) => (
//             <Link key={book.id} href={`/books/${book.id}`}>
//               <BookCard key={book.id} book={book} />
//             </Link>
//           ))
//         )}
//       </div>
//     </>
//   );
// };

// export default BookList;
"use client";

import React, { useEffect, useState } from "react";
import { createBook, getBooks } from "../../providers/bookProvider"; // Your API fetch call
import { Book } from "../../models/Book"; // Updated model
import BookCard from "./BookCard";
import Loading from "../ui/Loading";
import "../../styles/globals.css";
import CreateBookModal from "./CreateBookModal";
import Link from "next/link";
import { toast } from "react-toastify";
import { motion } from "framer-motion"; // Import Framer Motion

// Define animation variants
const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3, // Delay between each row
      staggerDirection: 1, // Animate from top to bottom
    },
  },
};

const row = {
  hidden: { opacity: 0, y: 20 }, // Start slightly below and invisible
  show: { opacity: 1, y: 0 }, // Animate to visible and original position
};

const BookList: React.FC = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>(""); // State for search query
  const [sortOption, setSortOption] = useState<string>("title"); // State for sorting option
  const [isCreateBookModalOpen, setIsCreateBookModalOpen] =
    useState<boolean>(false);

  // Fetch books
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const booksData = await getBooks();
        setBooks(booksData);
      } catch (err) {
        setError("Failed to fetch books.");
        toast.error("Failed to fetch books.");
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  const handleCreateBook = async (book: {
    title: string;
    publishedYear: number;
    price: number;
    authorId: string;
  }) => {
    try {
      await createBook(book); // Create the book
      toast.success("Book created successfully.");

      // Refetch all books after creating one
      let booksData = await getBooks();

      // Ensure averageRating defaults to 0 if missing
      booksData = booksData.map((b) => ({
        ...b,
        averageRating: b.averageRating ?? 0, // fallback to 0 if undefined/null
      }));

      setBooks(booksData);
    } catch (err) {
      console.error("Failed to create book:", err);
      toast.error("Failed to create book.");
    }
  };

  // Filter books based on search query
  const filteredBooks = books.filter((book) =>
    book.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Sort books based on the selected option
  const sortedBooks = [...filteredBooks].sort((a, b) => {
    switch (sortOption) {
      case "title":
        return a.title.localeCompare(b.title);
      case "price":
        return a.price - b.price;
      case "publishedYear":
        return a.publishedYear - b.publishedYear;
      case "averageRating":
        return (b.averageRating || 0) - (a.averageRating || 0); // Descending order
      default:
        return 0;
    }
  });

  // Group books into rows (3 books per row)
  const rows = [];
  for (let i = 0; i < sortedBooks.length; i += 3) {
    rows.push(sortedBooks.slice(i, i + 3));
  }

  if (loading) {
    return <Loading message="Fetching books..." />;
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  return (
    <>
      <div className="flex justify-between items-center w-full">
        {/* Search Bar */}
        <div className="m-5 w-8/12">
          <input
            type="text"
            placeholder="Search by title..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Sorting Dropdown */}
        <div className="m-5 flex items-center w-fit-content">
          <label htmlFor="sort" className="mr-2">
            Sort by:
          </label>
          <select
            id="sort"
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
            className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="title">Title</option>
            <option value="price">Price</option>
            <option value="publishedYear">Published Year</option>
            <option value="averageRating">Average Rating</option>
          </select>
        </div>
      </div>

      {/* Button to open the Create Book Modal */}
      <div className="m-5">
        <button
          onClick={() => setIsCreateBookModalOpen(true)}
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          Create New Book
        </button>
      </div>

      {/* Create Book Modal */}
      <CreateBookModal
        isOpen={isCreateBookModalOpen}
        onClose={() => setIsCreateBookModalOpen(false)}
        onCreateBook={handleCreateBook}
      />

      {/* Book List with Row-by-Row Animation */}
      <motion.div
        variants={container} // Apply the container animation
        initial="hidden" // Initial state
        animate="show" // Animate to this state
        className="m-5"
      >
        {rows.map((rowBooks, rowIndex) => (
          <motion.div
            key={rowIndex}
            variants={row} // Apply the row animation
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-6" // Add margin-bottom for spacing between rows
          >
            {rowBooks.map((book) => (
              <motion.div
                key={book.id}
                whileHover={{ scale: 1.02 }} // Add hover animation
                whileTap={{ scale: 0.98 }} // Add tap animation
              >
                <Link href={`/books/${book.id}`}>
                  <BookCard book={book} />
                </Link>
              </motion.div>
            ))}
          </motion.div>
        ))}
      </motion.div>
    </>
  );
};

export default BookList;
