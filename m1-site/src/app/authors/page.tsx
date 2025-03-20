"use client";

// import Input from "../../components/ui/Input";
// import AuthorList from "../../components/authors/AuthorList";
// import Button from "../../components/ui/Button";
// import AddAuthor from "../../components/authors/AddAuthor";

// export default function AuthorsPage() {
//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-4">Authors</h1>
//       <AuthorList />
//       {/* <Button onClick={() => console.log("Clicked!")}>Save</Button> */}
//       <Input label="Book Title" placeholder="Enter title..." />
//       <AddAuthor />
//     </div>
//   );
// }

// import AuthorsPage from "../../components/authors/AuthorPage";

// export default function Page() {
//   return <AuthorsPage />;
// }

// import React, { useEffect, useState } from "react";
// import AuthorList from "../../components/authors/AuthorList";
// import Modal from "../../components/ui/Modal"; // Using the provided modal!
// import { getAuthors, addAuthor } from "../../providers/authorProvider";
// import { Author } from "../../models/Author";
// import Button from "../../components/ui/Button"; // Optional reusable button
// import { toast } from "react-toastify";

// const AuthorsPage: React.FC = () => {
//   const [authors, setAuthors] = useState<Author[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [isModalOpen, setIsModalOpen] = useState(false);

//   // Form state for creating author
//   const [name, setName] = useState("");
//   const [biography, setBiography] = useState("");
//   const [photo, setPhoto] = useState("");

//   useEffect(() => {
//     const fetchAuthors = async () => {
//       try {
//         const authorsData = await getAuthors();
//         setAuthors(authorsData);
//       } catch (error) {
//         console.error("Failed to fetch authors:", error);
//         toast.error("Failed to fetch authors.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchAuthors();
//   }, []);

//   const handleCreateAuthor = async (e: React.FormEvent) => {
//     e.preventDefault();

//     if (!name.trim()) {
//       toast.error("Author name is required!");
//       return;
//     }

//     const newAuthorData = {
//       name,
//       biography,
//       photo,
//     };

//     try {
//       const createdAuthor = await addAuthor(newAuthorData);
//       setAuthors((prev) => [...prev, createdAuthor]);
//       toast.success("Author added successfully!");

//       // Close modal and reset form
//       setIsModalOpen(false);
//       setName("");
//       setBiography("");
//       setPhoto("");
//     } catch (error) {
//       console.error("Failed to create author:", error);
//       toast.error("Failed to add author.");
//     }
//   };

//   if (loading) {
//     return <div className="text-center py-10">Loading authors...</div>;
//   }

//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-4">Authors</h1>

//       {/* Add Author Button */}
//       <Button variant="primary" onClick={() => setIsModalOpen(true)}>
//         Add Author
//       </Button>

//       {/* Author List */}
//       <AuthorList authors={authors} />

//       {/* Create Author Modal */}
//       <Modal
//         isOpen={isModalOpen}
//         onClose={() => setIsModalOpen(false)}
//         title="Create New Author"
//       >
//         <form onSubmit={handleCreateAuthor} className="space-y-4">
//           {/* Name Field */}
//           <div>
//             <label htmlFor="author-name" className="block text-sm font-medium">
//               Name <span className="text-red-500">*</span>
//             </label>
//             <input
//               id="author-name"
//               type="text"
//               value={name}
//               onChange={(e) => setName(e.target.value)}
//               className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
//               required
//             />
//           </div>

//           {/* Biography Field */}
//           <div>
//             <label
//               htmlFor="author-biography"
//               className="block text-sm font-medium"
//             >
//               Biography
//             </label>
//             <textarea
//               id="author-biography"
//               value={biography}
//               onChange={(e) => setBiography(e.target.value)}
//               rows={3}
//               className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
//             />
//           </div>

//           {/* Photo URL Field */}
//           <div>
//             <label htmlFor="author-photo" className="block text-sm font-medium">
//               Photo URL
//             </label>
//             <input
//               id="author-photo"
//               type="text"
//               value={photo}
//               onChange={(e) => setPhoto(e.target.value)}
//               className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
//             />
//           </div>

//           {/* Buttons */}
//           <div className="flex justify-end gap-2">
//             <button
//               type="button"
//               onClick={() => setIsModalOpen(false)}
//               className="px-4 py-2 text-gray-600 hover:text-gray-800"
//             >
//               Cancel
//             </button>
//             <button
//               type="submit"
//               className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
//             >
//               Create Author
//             </button>
//           </div>
//         </form>
//       </Modal>
//     </div>
//   );
// };

// export default AuthorsPage;

import React, { useEffect, useState } from "react";
import AuthorList from "../../components/authors/AuthorList";
import CreateAuthorModal from "../../components/authors/CreateAuthorModal";
import EditAuthorModal from "../../components/authors/EditAuthorModal";
import ConfirmationModal from "../../components/ui/ConfirmationModal";

import {
  getAuthors,
  addAuthor,
  updateAuthor,
  deleteAuthor,
} from "../../providers/authorProvider";
import { Author } from "../../models/Author";
import { toast } from "react-toastify";
import Button from "../../components/ui/Button";

const AuthorsPage: React.FC = () => {
  const [authors, setAuthors] = useState<Author[]>([]);
  const [loading, setLoading] = useState(true);

  // Create / Edit / Delete states
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedAuthor, setSelectedAuthor] = useState<Author | null>(null);

  useEffect(() => {
    const fetchAuthors = async () => {
      try {
        const authorsData = await getAuthors();
        setAuthors(authorsData);
      } catch (error) {
        toast.error("Failed to fetch authors.");
      } finally {
        setLoading(false);
      }
    };

    fetchAuthors();
  }, []);

  const handleCreateAuthor = async (authorData: {
    name: string;
    biography?: string;
    photo?: string;
  }) => {
    try {
      const newAuthor = await addAuthor(authorData);
      setAuthors([...authors, newAuthor]);
      toast.success("Author created!");
      setIsCreateModalOpen(false);
    } catch (error) {
      toast.error("Failed to create author.");
    }
  };

  const handleUpdateAuthor = async (updatedData: {
    id: string;
    name?: string;
    biography?: string;
    photo?: string;
  }) => {
    console.log("PATCH payload:", updatedData);

    try {
      const updatedAuthor = await updateAuthor(updatedData.id, {
        name: updatedData.name,
        biography: updatedData.biography,
        photo: updatedData.photo,
      });

      setAuthors((prev) =>
        prev.map((a) => (a.id === updatedAuthor.id ? updatedAuthor : a))
      );
      toast.success("Author updated!");
      setIsEditModalOpen(false);
    } catch (error) {
      console.error("Update author error:", error);
      toast.error("Failed to update author.");
    }
  };

  const handleDeleteAuthor = async () => {
    if (!selectedAuthor) return;

    try {
      await deleteAuthor(selectedAuthor.id);
      setAuthors((prev) => prev.filter((a) => a.id !== selectedAuthor.id));
      toast.success("Author deleted!");
      setIsDeleteModalOpen(false);
    } catch (error) {
      toast.error("Failed to delete author.");
    }
  };

  if (loading)
    return <div className="text-center py-10">Loading authors...</div>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Authors</h1>

      <Button variant="primary" onClick={() => setIsCreateModalOpen(true)}>
        Add Author
      </Button>

      <AuthorList
        authors={authors}
        onEdit={(author) => {
          setSelectedAuthor(author);
          setIsEditModalOpen(true);
        }}
        onDelete={(author) => {
          setSelectedAuthor(author);
          setIsDeleteModalOpen(true);
        }}
      />

      <CreateAuthorModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onCreateAuthor={handleCreateAuthor}
      />

      <EditAuthorModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        author={selectedAuthor}
        onUpdateAuthor={handleUpdateAuthor}
      />

      <ConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDeleteAuthor}
        title="Delete Author"
        message={`Are you sure you want to delete ${selectedAuthor?.name}?`}
      />
    </div>
  );
};

export default AuthorsPage;
