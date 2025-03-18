'use client';

import '../styles/globals.css';

import { useState } from 'react';
import Modal from '../components/ui/Modal';
import GlobalLayout from '../components/layout/GlobalLayout';

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleConfirm = () => {
    alert('Confirmed action!');
    setIsModalOpen(false);
  };

  return (
    <GlobalLayout
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Dashboard' },
      ]}
    >
      {/* Page content */}
      <h1 className="text-4xl font-bold text-blue-600">Hello World with Custom Components!</h1>

      <button
        onClick={() => setIsModalOpen(true)}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
      >
        Open Custom Modal
      </button>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleConfirm}
        title="Confirm Action"
      >
        <p>This is your custom modal! Confirm or cancel the action.</p>
      </Modal>
    </GlobalLayout>
  );
}
