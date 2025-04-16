import React from "react";

type PageTitleProps = {
  title: string;
  subtitle?: string; // Optional: add a subtitle if you want later
};

const PageTitle: React.FC<PageTitleProps> = ({ title, subtitle }) => {
  return (
    <div className="mb-1 border-b border-gray-200 pb-1">
      <h1 className="text-3xl font-bold text-gray-800">{title}</h1>
      {subtitle && <p className="text-sm text-gray-500 mt-1">{subtitle}</p>}
    </div>
  );
};

export default PageTitle;
