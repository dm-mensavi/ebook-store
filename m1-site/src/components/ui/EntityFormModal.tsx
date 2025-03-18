"use client";

import React, { useState, useEffect } from "react";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";

type FieldConfig = {
  name: string;
  label: string;
  type?: "text" | "number" | "textarea";
  required?: boolean;
  placeholder?: string;
};

interface EntityFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (formData: Record<string, any>) => void;
  title: string; // e.g., 'Add Author' / 'Edit Book'
  fields: FieldConfig[];
  initialData?: Record<string, any>;
}

const EntityFormModal: React.FC<EntityFormModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  title,
  fields,
  initialData = {},
}) => {
  const [formData, setFormData] = useState<Record<string, any>>({});

  useEffect(() => {
    if (isOpen) {
      const defaults: Record<string, any> = {};
      fields.forEach((field) => {
        defaults[field.name] = initialData?.[field.name] || "";
      });
      setFormData(defaults);
    }
  }, [isOpen]); // ✅ Run only when opening the modal

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simple validation (check required fields)
    const hasErrors = fields.some(
      (field) => field.required && !formData[field.name]?.trim()
    );

    if (hasErrors) {
      alert("Please fill out all required fields.");
      return;
    }

    onSubmit(formData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white w-full max-w-md p-6 rounded shadow-lg relative">
        <h2 className="text-xl font-semibold mb-4">{title}</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {fields.map((field) => (
            <div key={field.name}>
              {field.type === "textarea" ? (
                <>
                  <label className="text-sm font-medium text-gray-700">
                    {field.label}
                  </label>
                  <textarea
                    name={field.name}
                    value={formData[field.name]}
                    onChange={handleChange}
                    placeholder={field.placeholder || ""}
                    rows={3}
                    className="block w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </>
              ) : (
                <Input
                  label={field.label}
                  name={field.name}
                  type={field.type || "text"}
                  value={formData[field.name]}
                  onChange={handleChange}
                  placeholder={field.placeholder || ""}
                  required={field.required}
                />
              )}
            </div>
          ))}

          <div className="flex justify-end gap-2 pt-4">
            <Button variant="outline" type="button" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" variant="primary">
              Save
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EntityFormModal;
