"use client";

import GlobalLayout from "../components/layout/GlobalLayout";
import { useState } from "react";
import PageTitle from "../components/ui/PageTitle";
// import Modal from "../components/ui/Modal"; // optional

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleConfirm = () => {
    alert("Confirmed action!");
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-8">
      <PageTitle title="Welcome to the Book Management System" />

      {/* Uncomment if using Modal */}
      {/* <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onConfirm={handleConfirm}
          title="Confirm Action"
        >
          <p>This is your custom modal! Confirm or cancel the action.</p>
        </Modal> */}
    </div>
  );
}

// import GlobalLayout from "../components/layout/GlobalLayout";

// export default function Home() {
//   return (
//     <GlobalLayout>
//       <h1>Hello from Home Page!</h1>
//     </GlobalLayout>
//   );
// }
