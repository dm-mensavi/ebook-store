"use client";

import { useState } from "react";
import { BookOpen, Target, BadgeCheck, Brain } from "lucide-react"; // Example icons
import "../../styles/globals.css";
export default function HomePage() {
  const [search, setSearch] = useState("");

  return (
    <div className="">
      {/* ✅ Hero Section */}
      <section className="flex flex-col md:flex-row items-center justify-between bg-white py-4 px-6 md:px-8">
        {/* Left Side Content */}
        <div className="max-w-xl space-y-6">
          <h1 className="text-4xl md:text-5xl font-bold leading-tight text-gray-900">
            Find the book <br /> you’re looking for easier to read.
          </h1>

          <p className="text-gray-600">
            The most appropriate book site to reach books.
          </p>

          {/* Search Bar */}
          <div className="flex items-center bg-white shadow-md rounded-full overflow-hidden w-full mt-6">
            <input
              type="text"
              placeholder="Find your favorite book here..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="flex-grow px-6 py-3 focus:outline-none text-gray-700"
            />
            <button className="bg-green-500 text-white font-semibold px-6 py-3 hover:bg-green-600 transition">
              Search
            </button>
          </div>
        </div>

        {/* ✅ Right Side Image + Floating Icons */}
        <div className="relative mt-12 md:mt-0 w-72 h-72 md:w-96 md:h-96 md:w-[30rem] md:h-[30rem] flex justify-center items-center">
          {/* The Main Image */}
          <img
            loading="lazy"
            src="./hero.png"
            alt="Aesthetic Book"
            className="w-full h-full object-contain z-10"
          />

          {/* Floating Icons */}
          <div className="absolute top-4 left-4 bg-green-100 p-3 rounded-full shadow-md animate-float">
            <Brain className="text-green-600 w-6 h-6" />
          </div>

          <div className="absolute top-4 right-4 bg-purple-100 p-3 rounded-full shadow-md animate-float-slow">
            <BadgeCheck className="text-purple-600 w-6 h-6" />
          </div>

          <div className="absolute bottom-4 left-4 bg-orange-100 p-3 rounded-full shadow-md animate-float-delay">
            <Target className="text-orange-600 w-6 h-6" />
          </div>

          <div className="absolute bottom-4 right-4 bg-blue-100 p-3 rounded-full shadow-md animate-float">
            <BookOpen className="text-blue-600 w-6 h-6" />
          </div>
        </div>
      </section>

      {/* ✅ Blog/Info Cards Section */}
    </div>
  );
}
