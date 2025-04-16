'use client';

import React from 'react';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

const ErrorPage = ({ error, reset }: { error: Error; reset: () => void }) => {
  const router = useRouter();

  useEffect(() => {
    console.error('Error:', error);
  }, [error]);

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold text-red-600">Something went wrong!</h2>
      <p>{error.message}</p>

      <button
        onClick={() => reset()}
        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
      >
        Try again
      </button>

      <button
        onClick={() => router.push('/books')}
        className="mt-4 ml-4 bg-gray-500 text-white px-4 py-2 rounded"
      >
        Go to Books
      </button>
    </div>
  );
};

export default ErrorPage;
