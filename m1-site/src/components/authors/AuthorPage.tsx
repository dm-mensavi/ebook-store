"use client";

import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { getAuthors, addAuthor } from "../../providers/authorProvider";
import { Author } from "../../models/Author";
import AuthorList from "./AuthorList";
import EntityFormModal from "../../components/ui/EntityFormModal";
import Button from "../../components/ui/Button";
import Loading from "../../components/ui/Loading";

const AuthorsPage = () => {
  const [authors, setAuthors] = useState<Author[]>([]);
  const [isModalOpen, setModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loading, setLoading] = useState(true); // ✅ Controls page spinner

  const fetchAuthors = async () => {
    try {
      const authorsData = await getAuthors();
      setAuthors(authorsData);
    } catch (err) {
      toast.error("Failed to fetch authors.");
    } finally {
      setLoading(false); // ✅ Hide spinner when done loading
    }
  };

  useEffect(() => {
    fetchAuthors();
  }, []);

  const handleAddAuthor = async (data: any) => {
    try {
      setIsSubmitting(true);

      const newAuthor = await addAuthor(data);

      setAuthors((prev) => [...prev, newAuthor]);
      toast.success("Author added successfully!");
      setModalOpen(false);
    } catch (err) {
      toast.error("Failed to add author.");
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const authorFields = [
    { name: "name", label: "Author Name", required: true },
    { name: "photo", label: "Photo URL" },
    { name: "biography", label: "Biography", type: "textarea" },
  ];

  // ✅ Render the spinner if the page is still loading
  if (loading) {
    return <Loading message="Loading authors..." />;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Authors</h1>

      <Button variant="primary" onClick={() => setModalOpen(true)}>
        Add Author
      </Button>

      <EntityFormModal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={handleAddAuthor}
        title="Add Author"
        fields={authorFields}
      />

      <AuthorList authors={authors} />
    </div>
  );
};

export default AuthorsPage;
