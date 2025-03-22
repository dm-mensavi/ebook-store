// /src/app/books/[id]/loading.tsx
"use client";
import React from "react";
import Loading from "../../../components/ui/Loading";

const LoadingComponent = () => {
  return (
    <div className="p-8">
      <Loading message="Fetching books..." />
    </div>
  );
};

export default LoadingComponent;
