"use client";

import React from "react";
import ClipLoader from "react-spinners/ClipLoader";

interface LoadingProps {
  message?: string;
}

const Loading: React.FC<LoadingProps> = ({ message = "Loading..." }) => {
  return (
    <div className="flex flex-col items-center justify-center py-10">
      <ClipLoader color="#000000" size={50} />
      <p className="mt-4 text-sm text-gray-500">{message}</p>
    </div>
  );
};

export default Loading;
