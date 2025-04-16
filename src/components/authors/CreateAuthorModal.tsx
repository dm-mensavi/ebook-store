"use client";

import React, { useState } from "react";
import Modal from "../ui/Modal";

type CreateAuthorModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onCreateAuthor: (author: {
    name: string;
    biography?: string;
    photo?: string;
  }) => void;
};

const CreateAuthorModal: React.FC<CreateAuthorModalProps> = ({
  isOpen,
  onClose,
  onCreateAuthor,
}) => {
  const [name, setName] = useState("");
  const [biography, setBiography] = useState("");
  const [photo, setPhoto] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim()) {
      alert("Author name is required!");
      return;
    }

    const newAuthor = {
      name,
      biography,
      photo,
    };

    onCreateAuthor(newAuthor);

    // Reset form and close modal
    setName("");
    setBiography("");
    setPhoto("");
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Create New Author">
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Name */}
        <div>
          <label htmlFor="author-name" className="block text-sm font-medium">
            Name <span className="text-red-500">*</span>
          </label>
          <input
            id="author-name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Biography */}
        <div>
          <label
            htmlFor="author-biography"
            className="block text-sm font-medium"
          >
            Biography
          </label>
          <textarea
            id="author-biography"
            value={biography}
            onChange={(e) => setBiography(e.target.value)}
            rows={3}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Photo URL */}
        <div>
          <label htmlFor="author-photo" className="block text-sm font-medium">
            Photo URL
          </label>
          <input
            id="author-photo"
            type="text"
            value={photo}
            onChange={(e) => setPhoto(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-gray-600 hover:text-gray-800"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            Create Author
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default CreateAuthorModal;
