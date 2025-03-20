// components/Modal.tsx
import React from "react";

type ModalProps = {
  title: string; // Title of the modal
  children: React.ReactNode; // Content of the modal
  onClose: () => void; // Function to close the modal
};

const Modal: React.FC<ModalProps> = ({ title, children, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg w-full max-w-md p-6">
        {/* Modal Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">{title}</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-2xl"
          >
            &times;
          </button>
        </div>

        {/* Modal Content */}
        <div>{children}</div>
      </div>
    </div>
  );
};

export default Modal;
