// "use client";

// import React, { useEffect, useState } from "react";
// import { useParams, useRouter } from "next/navigation";
// import {
//   getAuthorById,
//   updateAuthor,
//   deleteAuthor,
// } from "../../../providers/authorProvider";
// import { Author } from "../../../models/Author";
// import PageTitle from "../../../components/ui/PageTitle";
// import EditAuthorModal from "../../../components/authors/EditAuthorModal";
// import ConfirmationModal from "../../../components/ui/ConfirmationModal";
// import Link from "next/link";
// import { toast } from "react-toastify";
// import { Rating } from "@mui/material";
// import Ratings from "../../../components/ui/Ratings";
// import { motion } from "framer-motion";

// const AuthorDetailsPage: React.FC = () => {
//   const { id } = useParams<{ id: string }>();
//   const router = useRouter();
//   const namelength = 20;

//   const [author, setAuthor] = useState<Author | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [isEditModalOpen, setIsEditModalOpen] = useState(false);
//   const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

//   useEffect(() => {
//     if (!id || typeof id !== "string") {
//       toast.error("Invalid author ID");
//       router.push("/authors");
//       return;
//     }

//     const fetchData = async () => {
//       try {
//         const authorData = await getAuthorById(id);
//         setAuthor(authorData);
//       } catch (error) {
//         console.error("Failed to fetch author:", error);
//         toast.error("Failed to fetch author details");
//         router.push("/authors");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, [id, router]);

//   const handleUpdateAuthor = async (updatedData: {
//     id: string;
//     name: string;
//     biography?: string;
//     photo?: string;
//   }) => {
//     try {
//       const updatedAuthor = await updateAuthor(updatedData.id, updatedData);
//       setAuthor(updatedAuthor);
//       toast.success("Author updated!");
//       setIsEditModalOpen(false);
//     } catch (error) {
//       toast.error("Failed to update author.");
//     }
//   };

//   const handleDeleteAuthor = async () => {
//     if (!author) return;

//     try {
//       await deleteAuthor(author.id);
//       toast.success("Author deleted!");
//       router.push("/authors");
//     } catch (error) {
//       toast.error("Failed to delete author.");
//     }
//   };

//   if (loading) {
//     return <div className="text-center py-10">Loading author details...</div>;
//   }

//   if (!author) {
//     return (
//       <div className="text-center py-10 text-red-500">Author not found.</div>
//     );
//   }

//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.5 }}
//       className="p-6 max-w-4xl mx-auto"
//     >
//       <PageTitle title="Author Details" />

//       {/* Author Info */}
//       <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 mb-10">
//         <img
//           src={author.photo || "https://via.placeholder.com/150"}
//           alt={`Photo of ${author.name}`}
//           className="w-40 h-40 object-cover rounded-full shadow"
//         />

//         <div className="flex-1">
//           <h1 className="text-3xl font-bold mb-2">
//             {author.name.length > namelength
//               ? `${author.name.slice(0, namelength)}...`
//               : author.name}
//           </h1>

//           {author.biography && (
//             <p className="text-gray-700 mb-4">{author.biography}</p>
//           )}

//           {/* Stats */}
//           <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-4 justify-start items-center">
//             <div>
//               <span className="font-semibold">Books Written:</span>{" "}
//               {author.bookCount ?? 0}
//             </div>
//             <div className="flex items-center gap-2">
//               <span className="font-semibold">Average Rating:</span>{" "}
//               <Ratings rating={author.averageRating} />
//               <p className="font-bold text-lg">
//                 {(author.averageRating ?? 0).toFixed(1)}
//               </p>
//             </div>
//           </div>

//           {/* Edit & Delete Buttons */}
//           <div className="flex gap-2">
//             <button
//               onClick={() => setIsEditModalOpen(true)}
//               className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
//             >
//               Edit Author
//             </button>

//             <button
//               onClick={() => setIsDeleteModalOpen(true)}
//               className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
//             >
//               Delete Author
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Author's Books */}
//       <div>
//         <h2 className="text-2xl font-semibold mb-4">
//           Books by{" "}
//           {author.name.length > namelength
//             ? `${author.name.slice(0, namelength)}...`
//             : author.name}
//         </h2>

//         {author.books?.length === 0 ? (
//           <p className="text-gray-500">No books found for this author.</p>
//         ) : (
//           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
//             {author.books.map((book) => (
//               <div
//                 key={book.id}
//                 className="border rounded-lg p-4 shadow hover:shadow-md transition"
//               >
//                 <h3 className="text-lg font-semibold mb-2">{book.title}</h3>

//                 <Link
//                   href={book.link}
//                   className="text-blue-500 hover:underline text-sm"
//                 >
//                   View Details
//                 </Link>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>

//       {/* Edit Author Modal */}
//       <EditAuthorModal
//         isOpen={isEditModalOpen}
//         onClose={() => setIsEditModalOpen(false)}
//         author={author}
//         onUpdateAuthor={handleUpdateAuthor}
//       />

//       {/* Delete Confirmation Modal */}
//       <ConfirmationModal
//         isOpen={isDeleteModalOpen}
//         onClose={() => setIsDeleteModalOpen(false)}
//         onConfirm={handleDeleteAuthor}
//         title="Delete Author"
//         message={`Are you sure you want to delete ${author.name}?`}
//       />
//     </motion.div>
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
import { Author } from "../../../models/Author";
import PageTitle from "../../../components/ui/PageTitle";
import EditAuthorModal from "../../../components/authors/EditAuthorModal";
import ConfirmationModal from "../../../components/ui/ConfirmationModal";
import Link from "next/link";
import { toast } from "react-toastify";
import Ratings from "../../../components/ui/Ratings";
import { motion } from "framer-motion";

const AuthorDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const namelength = 20;

  const [author, setAuthor] = useState<Author | null>(null);
  const [loading, setLoading] = useState(true);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  // Framer Motion Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: "easeOut",
      },
    },
  };

  useEffect(() => {
    if (!id || typeof id !== "string") {
      toast.error("Invalid author ID");
      router.push("/authors");
      return;
    }

    const fetchData = async () => {
      try {
        const authorData = await getAuthorById(id);
        setAuthor(authorData);
      } catch (error) {
        console.error("Failed to fetch author:", error);
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
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="p-6 max-w-4xl mx-auto"
    >
      <PageTitle title="Author Details" />

      {/* Author Info */}
      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 mb-10">
        <img
          src={author.photo || "https://via.placeholder.com/150"}
          alt={`Photo of ${author.name}`}
          className="w-40 h-40 object-cover rounded-full shadow"
        />

        <div className="flex-1">
          <h1 className="text-3xl font-bold mb-2">
            {author.name.length > namelength
              ? `${author.name.slice(0, namelength)}...`
              : author.name}
          </h1>

          {author.biography && (
            <p className="text-gray-700 mb-4">{author.biography}</p>
          )}

          {/* Stats */}
          <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-4 justify-start items-center">
            <div>
              <span className="font-semibold">Books Written:</span>{" "}
              {author.bookCount ?? 0}
            </div>
            <div className="flex items-center gap-2">
              <span className="font-semibold">Average Rating:</span>{" "}
              <Ratings rating={author.averageRating} />
              <p className="font-bold text-lg">
                {(author.averageRating ?? 0).toFixed(1)}
              </p>
            </div>
          </div>

          {/* Edit & Delete Buttons */}
          <div className="flex gap-2">
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
      <div>
        <h2 className="text-2xl font-semibold mb-4">
          Books by{" "}
          {author.name.length > namelength
            ? `${author.name.slice(0, namelength)}...`
            : author.name}
        </h2>

        {author.books?.length === 0 ? (
          <p className="text-gray-500">No books found for this author.</p>
        ) : (
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4"
            variants={containerVariants}
            initial="hidden"
            animate="show"
          >
            {author.books.map((book) => (
              <motion.div
                key={book.id}
                className="border rounded-lg p-4 shadow hover:shadow-md transition"
                variants={itemVariants}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <h3 className="text-lg font-semibold mb-2">{book.title}</h3>

                <Link
                  href={book.link}
                  className="text-blue-500 hover:underline text-sm"
                >
                  View Details
                </Link>
              </motion.div>
            ))}
          </motion.div>
        )}
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
    </motion.div>
  );
};

export default AuthorDetailsPage;
