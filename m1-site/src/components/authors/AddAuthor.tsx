"use client";

import React, { useState } from "react";
import Button from "../ui/Button";
import EntityFormModal from "../ui/EntityFormModal";
import { addAuthor } from "../../providers/authorProvider"; // Import the service

const AddAuthor = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false); // Optional loading state

  const handleAddAuthor = async (data: any) => {
    try {
      setIsSubmitting(true); // Optional: disable form buttons while submitting
      await addAuthor(data);
      alert("Author added successfully!");
      setModalOpen(false); // Close modal after success
    } catch (error) {
      alert("Failed to add author. Please try again.");
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const authorFields = [
    { name: "name", label: "Author Name", required: true },
    { name: "photo", label: "Photo URL", placeholder: "Enter a photo URL" },
    { name: "biography", label: "Biography", type: "textarea" },
  ];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Authors</h1>

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
    </div>
  );
};

export default AddAuthor;
