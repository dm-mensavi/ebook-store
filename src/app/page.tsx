"use client";

import React from "react";
import PageTitle from "../components/ui/PageTitle";
import TopRatings from "../components/ui/TopRatings"; // Assuming you have this component
import TopAuthors from "../components/ui/TopAuthors";
import HomePage from "../components/layout/Homepage";
import Footer from "../components/layout/Footer";

const Home: React.FC = () => {
  return (
    <div>
      <div className="p-2 space-y-12 max-w-7xl mx-auto">
        {/* Page Title */}
        <PageTitle title="Welcome to CodiBook" />
        <HomePage />
        {/* Main Content Layout */}
        <div className="grid grid-cols-1 min-md:grid-cols-2 lg:grid-cols-[2fr_1fr]  gap-6 w-full">
          {/* Top Rated Books Section */}
          <div className="bg-white border rounded-lg shadow-sm hover:shadow-md transition p-6 space-y-4">
            <h2 className="text-xl font-bold text-gray-800">Popular Books</h2>
            <TopRatings />
          </div>

          {/* Top Authors Section */}
          <div className="bg-white border rounded-lg shadow-sm hover:shadow-md transition p-6 space-y-4">
            <h2 className="text-xl font-bold text-gray-800">Top Authors</h2>
            <TopAuthors />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
