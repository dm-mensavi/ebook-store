// // components/ConfirmationModal.tsx
// import React from "react";
// import Modal from "./Modal";

// type ConfirmationModalProps = {
//   isOpen: boolean;
//   onClose: () => void;
//   onConfirm: () => void;
//   title: string;
//   message: string;
// };

// const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
//   isOpen,
//   onClose,
//   onConfirm,
//   title,
//   message,
// }) => {
//   if (!isOpen) return null;

//   return (
//     <Modal title={title} onClose={onClose}>
//       <p className="mb-4">{message}</p>
//       <div className="flex justify-end">
//         <button
//           onClick={onClose}
//           className="mr-2 px-4 py-2 text-gray-600 hover:text-gray-800"
//         >
//           Cancel
//         </button>
//         <button
//           onClick={onConfirm}
//           className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
//         >
//           Confirm
//         </button>
//       </div>
//     </Modal>
//   );
// };

// export default ConfirmationModal;

import React from "react";
import Modal from "./Modal";

type ConfirmationModalProps = {
  isOpen: boolean; // Whether the modal is open
  onClose: () => void; // Function to close the modal
  onConfirm: () => void; // Function when user confirms
  title: string; // Modal title
  message: string; // Confirmation message to display
};

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title}>
      <p className="mb-4">{message}</p>

      <div className="flex justify-end gap-2">
        <button
          onClick={onClose}
          className="px-4 py-2 text-gray-600 hover:text-gray-800"
        >
          Cancel
        </button>
        <button
          onClick={onConfirm}
          className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
        >
          Confirm
        </button>
      </div>
    </Modal>
  );
};

export default ConfirmationModal;
