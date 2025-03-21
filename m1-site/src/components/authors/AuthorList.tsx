// // import React from "react";
// // import AuthorCard from "./AuthorCard";
// // import { Author } from "../../models/Author";

// // interface AuthorListProps {
// //   authors: Author[];
// // }

// // const AuthorList: React.FC<AuthorListProps> = ({ authors }) => {
// //   return (
// //     <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-6">
// //       {authors.length === 0 ? (
// //         <p className="col-span-full text-center text-gray-500">
// //           No authors found.
// //         </p>
// //       ) : (
// //         authors.map((author) => <AuthorCard key={author.id} author={author} />)
// //       )}
// //     </div>
// //   );
// // };

// // export default AuthorList;
// "use client";

// import React, { useEffect, useState } from "react";
// import { Author } from "../../models/Author";
// import AuthorCard from "./AuthorCard";
// import { getAuthors, addAuthor } from "../../providers/authorProvider";
// import Modal from "../ui/Modal";
// import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// const AuthorList: React.FC = () => {
//   const [authors, setAuthors] = useState<Author[]>([]);
//   const [loading, setLoading] = useState<boolean>(true);
//   const [error, setError] = useState<string | null>(null);
//   const [searchQuery, setSearchQuery] = useState<string>("");

//   const [isModalOpen, setIsModalOpen] = useState(false);

//   const [newAuthor, setNewAuthor] = useState({
//     name: "",
//     biography: "",
//     photo: "",
//   });

//   // ✅ Fetch authors on load
//   useEffect(() => {
//     const fetchAuthors = async () => {
//       try {
//         const authorsData = await getAuthors();
//         setAuthors(authorsData);
//       } catch (err) {
//         setError("Failed to fetch authors.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchAuthors();
//   }, []);

//   // ✅ Filter authors by search query
//   const filteredAuthors = authors.filter((author) =>
//     author.name.toLowerCase().includes(searchQuery.toLowerCase())
//   );

//   // ✅ Handle adding a new author
//   const handleAddAuthor = async () => {
//     if (!newAuthor.name) {
//       toast.error("Author name is required.");
//       return;
//     }

//     try {
//       const createdAuthor = await addAuthor(newAuthor);
//       setAuthors((prev) => [...prev, createdAuthor]);
//       setIsModalOpen(false);
//       setNewAuthor({ name: "", biography: "", photo: "" }); // Reset form
//       toast.success("Author added successfully!");
//     } catch (err) {
//       console.error("Error adding author:", err);
//       toast.error("Failed to add author.");
//     }
//   };

//   // ✅ Loading state
//   if (loading) {
//     return <div className="text-center py-10">Loading authors...</div>;
//   }

//   // ✅ Error state
//   if (error) {
//     return <div className="text-center text-red-500 py-10">{error}</div>;
//   }

//   return (
//     <div className="p-6">
//       {/* Search Bar */}
//       <div className="flex justify-between items-center mb-4">
//         <input
//           type="text"
//           placeholder="Search authors..."
//           value={searchQuery}
//           onChange={(e) => setSearchQuery(e.target.value)}
//           className="w-full sm:w-64 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//         />
//         <button
//           onClick={() => setIsModalOpen(true)}
//           className="ml-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
//         >
//           Add Author
//         </button>
//       </div>

//       {/* Author Cards */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
//         {filteredAuthors.length === 0 ? (
//           <div className="col-span-full text-center text-gray-500">
//             No authors found.
//           </div>
//         ) : (
//           filteredAuthors.map((author) => (
//             <AuthorCard key={author.id} author={author} />
//           ))
//         )}
//       </div>

//       {/* Modal for Adding an Author */}
//       <Modal
//         isOpen={isModalOpen}
//         onClose={() => setIsModalOpen(false)}
//         title="Add New Author"
//       >
//         <div className="space-y-4">
//           {/* Name */}
//           <div>
//             <label htmlFor="author-name" className="block text-sm font-medium">
//               Name <span className="text-red-500">*</span>
//             </label>
//             <input
//               id="author-name"
//               type="text"
//               value={newAuthor.name}
//               onChange={(e) =>
//                 setNewAuthor({ ...newAuthor, name: e.target.value })
//               }
//               className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//               required
//             />
//           </div>

//           {/* Biography */}
//           <div>
//             <label htmlFor="author-bio" className="block text-sm font-medium">
//               Biography
//             </label>
//             <textarea
//               id="author-bio"
//               value={newAuthor.biography}
//               onChange={(e) =>
//                 setNewAuthor({ ...newAuthor, biography: e.target.value })
//               }
//               className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//               rows={4}
//             />
//           </div>

//           {/* Photo URL */}
//           <div>
//             <label htmlFor="author-photo" className="block text-sm font-medium">
//               Photo URL
//             </label>
//             <input
//               id="author-photo"
//               type="text"
//               value={newAuthor.photo}
//               onChange={(e) =>
//                 setNewAuthor({ ...newAuthor, photo: e.target.value })
//               }
//               className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//             />
//           </div>

//           {/* Buttons */}
//           <div className="flex justify-end gap-2 pt-2">
//             <button
//               onClick={() => setIsModalOpen(false)}
//               className="px-4 py-2 text-gray-600 hover:text-gray-800 transition"
//             >
//               Cancel
//             </button>
//             <button
//               onClick={handleAddAuthor}
//               className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
//             >
//               Add Author
//             </button>
//           </div>
//         </div>
//       </Modal>
//     </div>
//   );
// };

// export default AuthorList;
"use client";
import React from "react";
import { Author } from "../../models/Author";
import AuthorCard from "./AuthorCard";

type AuthorListProps = {
  authors: Author[];
  onEdit: (author: Author) => void;
  onDelete: (author: Author) => void;
};

const AuthorList: React.FC<AuthorListProps> = ({ authors }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {authors.map((author) => (
        <div key={author.id} className="relative">
          <AuthorCard author={author} />
        </div>
      ))}
    </div>
  );
};

export default AuthorList;

// "use client";

// import React, { useState, useMemo } from "react";
// import { Author } from "../../models/Author";
// import AuthorCard from "./AuthorCard";

// type AuthorListProps = {
//   authors: Author[];
// };

// const AuthorList: React.FC<AuthorListProps> = ({ authors }) => {
//   const [searchQuery, setSearchQuery] = useState("");

//   // Filter authors by name (case-insensitive)
//   const filteredAuthors = useMemo(() => {
//     return authors.filter((author) =>
//       author.name.toLowerCase().includes(searchQuery.toLowerCase())
//     );
//   }, [searchQuery, authors]);

//   return (
//     <div className="p-6">
//       {/* Search Bar */}
//       <div className="mb-6 w-full sm:w-1/2">
//         <input
//           type="text"
//           placeholder="Search authors by name..."
//           value={searchQuery}
//           onChange={(e) => setSearchQuery(e.target.value)}
//           className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//         />
//       </div>

//       {/* Author Cards */}
//       {filteredAuthors.length === 0 ? (
//         <div className="text-center text-gray-500">No authors found.</div>
//       ) : (
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
//           {filteredAuthors.map((author) => (
//             <div key={author.id} className="relative">
//               <AuthorCard author={author} />
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default AuthorList;
