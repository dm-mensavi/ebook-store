"use client";

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
import PageTitle from "../../components/ui/PageTitle";
import Loading from "../../components/ui/Loading";

const AuthorsPage: React.FC = () => {
  const [authors, setAuthors] = useState<Author[]>([]);
  const [loading, setLoading] = useState(true);

  // Search State
  const [searchQuery, setSearchQuery] = useState("");

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

  if (loading) return <Loading message="Loading authors..." />;

  // ✅ Filter authors based on search query
  const filteredAuthors = authors.filter((author) =>
    author.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-6">
      <PageTitle title="Authors" />

      {/* ✅ Search Bar */}
      <div className="mb-4 md:w-full w-1/2">
        <input
          type="text"
          placeholder="Search authors by name..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* ✅ Add Author Button */}
      <Button
        variant="primary"
        onClick={() => setIsCreateModalOpen(true)}
        className="mb-6"
      >
        Add Author
      </Button>

      {/* ✅ Filtered Authors */}
      <AuthorList
        authors={filteredAuthors}
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
