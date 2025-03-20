// "use client";

// import React, { useEffect, useState } from "react";
// import { useParams, useRouter } from "next/navigation";
// import { getAuthorById } from "../../../providers/authorProvider";
// import { getBooksByAuthorId } from "../../../providers/bookProvider";
// import { Author } from "../../../models/Author";
// import { Book } from "../../../models/Book";
// import Link from "next/link";
// import { toast } from "react-toastify";

// const AuthorDetailsPage = () => {
//   const { id } = useParams<{ id: string }>();
//   const router = useRouter();

//   const [author, setAuthor] = useState<Author | null>(null);
//   const [books, setBooks] = useState<Book[]>([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     if (!id) return;

//     const fetchData = async () => {
//       try {
//         const authorData = await getAuthorById(id);
//         const booksData = await getBooksByAuthorId(id);
//         setAuthor(authorData);
//         console.log(authorData);
//         setBooks(booksData || []);
//         console.log(booksData);
//       } catch (error) {
//         console.error(error);
//         toast.error("Failed to load author details.");
//         router.push("/authors");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, [id, router]);

//   if (loading) return <div className="text-center py-10">Loading...</div>;

//   if (!author)
//     return (
//       <div className="text-center py-10 text-red-500">Author not found.</div>
//     );

//   return (
//     <div className="p-6 max-w-4xl mx-auto">
//       {/* Author Info */}
//       <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
//         <img
//           src={author.photo || "https://via.placeholder.com/150"}
//           alt={author.name}
//           className="w-40 h-40 object-cover rounded-full shadow"
//         />
//         <div>
//           <h1 className="text-3xl font-bold mb-2">{author.name}</h1>
//           {author.biography && (
//             <p className="text-gray-700 mb-4">{author.biography}</p>
//           )}
//         </div>
//       </div>

//       {/* Books by the Author */}
//       <div className="mt-10">
//         <h2 className="text-2xl font-semibold mb-4">Books by {author.name}</h2>

//         {books.length === 0 ? (
//           <p className="text-gray-500">No books found for this author.</p>
//         ) : (
//           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
//             {books.map((book) => (
//               <div
//                 key={book.id}
//                 className="border rounded-lg p-4 shadow hover:shadow-md transition"
//               >
//                 <h3 className="text-lg font-semibold">{book.title}</h3>
//                 <p className="text-sm text-gray-600">
//                   Published: {book.publishedYear}
//                 </p>
//                 <p className="text-sm text-gray-700 mb-2">
//                   Price: ${book.price.toFixed(2)}
//                 </p>
//                 <Link
//                   href={`/books/${book.id}`}
//                   className="text-blue-500 hover:underline text-sm"
//                 >
//                   View Details
//                 </Link>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default AuthorDetailsPage;

// "use client";

// import React, { useEffect, useState } from "react";
// import { useParams, useRouter } from "next/navigation";
// import { getAuthorById } from "../../../providers/authorProvider";
// import { getBooksByAuthorId } from "../../../providers/bookProvider";
// import { Author } from "../../../models/Author";
// import { Book } from "../../../models/Book";
// import Link from "next/link";
// import { toast } from "react-toastify";

// const AuthorDetailsPage = () => {
//   const { id } = useParams<{ id: string }>();
//   const router = useRouter();

//   const [author, setAuthor] = useState<Author | null>(null);
//   const [books, setBooks] = useState<Book[]>([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     if (!id) return;

//     const fetchData = async () => {
//       try {
//         const authorData = await getAuthorById(id);
//         const booksData = await getBooksByAuthorId(id);
//         console.log("Author Data:", authorData);
//         console.log("Books Data:", booksData); // Debugging log
//         setAuthor(authorData);
//         // setBooks(booksData || []);
//       } catch (error) {
//         console.error(error);
//         toast.error("Failed to load author details.");
//         setBooks([]); // Reset books to an empty array on error
//         router.push("/authors");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, [id, router]);

//   if (loading) return <div className="text-center py-10">Loading...</div>;

//   if (!author)
//     return (
//       <div className="text-center py-10 text-red-500">Author not found.</div>
//     );

//   return (
//     <div className="p-6 max-w-4xl mx-auto">
//       {/* Author Info */}
//       <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
//         <img
//           src={author.photo || "https://via.placeholder.com/150"}
//           alt={author.name}
//           className="w-40 h-40 object-cover rounded-full shadow"
//         />
//         <div>
//           <h1 className="text-3xl font-bold mb-2">{author.name}</h1>
//           {author.biography && (
//             <p className="text-gray-700 mb-4">{author.biography}</p>
//           )}
//         </div>
//       </div>

//       {/* Books by the Author */}
//       <div className="mt-10">
//         <h2 className="text-2xl font-semibold mb-4">Books by {author.name}</h2>

//         {/* {books.length === 0 ? (
//           <p className="text-gray-500">No books found for this author.</p>
//         ) : (
//           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
//             {(books || []).map((book) => (
//               <div
//                 key={book.id}
//                 className="border rounded-lg p-4 shadow hover:shadow-md transition"
//               >
//                 <h3 className="text-lg font-semibold">{book.title}</h3>
//                 <p className="text-sm text-gray-600">
//                   Published: {book.publishedYear}
//                 </p>
//                 <p className="text-sm text-gray-700 mb-2">
//                   Price: ${book.price.toFixed(2)}
//                 </p>
//                 <Link
//                   href={`localhost:3000/books/${book.id}`}
//                   className="text-blue-500 hover:underline text-sm"
//                 >
//                   View Details
//                 </Link>
//               </div>
//             ))}
//           </div>
//         )} */}
//       </div>
//     </div>
//   );
// };

// export default AuthorDetailsPage;

"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  getAuthorById,
  updateAuthor,
  deleteAuthor,
} from "../../../providers/authorProvider";
import { getBooksByAuthorId } from "../../../providers/bookProvider";
import { Author } from "../../../models/Author";
import { Book } from "../../../models/Book";
import EditAuthorModal from "../../../components/authors/EditAuthorModal";
import ConfirmationModal from "../../../components/ui/ConfirmationModal";
import Link from "next/link";
import { toast } from "react-toastify";

const AuthorDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();

  const [author, setAuthor] = useState<Author | null>(null);
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  useEffect(() => {
    if (!id) return;

    const fetchData = async () => {
      try {
        const authorData = await getAuthorById(id);
        const booksData = await getBooksByAuthorId(id);

        setAuthor(authorData);
        setBooks(booksData);
      } catch (error) {
        toast.error("Failed to fetch author details");
        router.push("/authors");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id, router]);

  const handleUpdateAuthor = async (updatedData: {
    id: string;
    name: string;
    biography?: string;
    photo?: string;
  }) => {
    try {
      const updatedAuthor = await updateAuthor(updatedData.id, updatedData);
      setAuthor(updatedAuthor);
      toast.success("Author updated!");
      setIsEditModalOpen(false);
    } catch (error) {
      toast.error("Failed to update author.");
    }
  };

  const handleDeleteAuthor = async () => {
    if (!author) return;

    try {
      await deleteAuthor(author.id);
      toast.success("Author deleted!");
      router.push("/authors");
    } catch (error) {
      toast.error("Failed to delete author.");
    }
  };

  if (loading) {
    return <div className="text-center py-10">Loading author details...</div>;
  }

  if (!author) {
    return (
      <div className="text-center py-10 text-red-500">Author not found.</div>
    );
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      {/* Author Info */}
      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
        <img
          src={author.photo || "https://via.placeholder.com/150"}
          alt={author.name}
          className="w-40 h-40 object-cover rounded-full shadow"
        />
        <div>
          <h1 className="text-3xl font-bold mb-2">{author.name}</h1>
          {author.biography && (
            <p className="text-gray-700 mb-4">{author.biography}</p>
          )}

          {/* Edit and Delete Buttons */}
          <div className="flex gap-2 mt-4">
            <button
              onClick={() => setIsEditModalOpen(true)}
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              Edit Author
            </button>
            <button
              onClick={() => setIsDeleteModalOpen(true)}
              className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
            >
              Delete Author
            </button>
          </div>
        </div>
      </div>

      {/* Author's Books */}
      <div className="mt-10">
        <h2 className="text-2xl font-semibold mb-4">Books by {author.name}</h2>

        {/* {books.length === 0 ? (
          <p className="text-gray-500">No books found for this author.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {books.map((book) => (
              <div key={book.id} className="border rounded-lg p-4 shadow hover:shadow-md transition">
                <h3 className="text-lg font-semibold">{book.title}</h3>
                <p className="text-sm text-gray-600">Published: {book.publishedYear}</p>
                <p className="text-sm text-gray-700 mb-2">Price: ${book.price.toFixed(2)}</p>
                <Link
                  href={`/books/${book.id}`}
                  className="text-blue-500 hover:underline text-sm"
                >
                  View Details
                </Link>
              </div>
            ))}
          </div>
        )} */}
      </div>

      {/* Edit Author Modal */}
      <EditAuthorModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        author={author}
        onUpdateAuthor={handleUpdateAuthor}
      />

      {/* Delete Confirmation Modal */}
      <ConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDeleteAuthor}
        title="Delete Author"
        message={`Are you sure you want to delete ${author.name}?`}
      />
    </div>
  );
};

export default AuthorDetailsPage;
