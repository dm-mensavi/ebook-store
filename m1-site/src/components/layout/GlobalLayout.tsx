"use client";

import { ReactNode, useState } from "react";
import Link from "next/link";
import { ChevronDown, Menu, X, Github } from "lucide-react"; // Github icon added here

type GlobalLayoutProps = {
  children: ReactNode;
};

const GlobalLayout = ({ children }: GlobalLayoutProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Top Navigation Bar (Full Width) */}
      <header className="sticky top-0 z-50 w-full bg-white shadow-sm">
        <div className="flex justify-between items-center py-4 px-4 md:px-8">
          {/* Left - Logo */}
          <Link href="/">
            <div className="flex items-center space-x-2">
              <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">
                C
              </div>
              <span className="font-semibold text-lg">CodiBook</span>
            </div>
          </Link>

          {/* Middle - Navigation Links (Desktop Only) */}
          <nav className="hidden md:flex space-x-8 text-sm font-medium">
            <Link href="/" className="hover:text-blue-600 transition">
              Home
            </Link>
            <Link href="/books" className="hover:text-blue-600 transition">
              Books
            </Link>
            <div className="relative flex items-center space-x-1">
              <Link href="/authors" className="hover:text-blue-600 transition">
                Authors
              </Link>
            </div>
          </nav>

          {/* Right - Language Selector, GitHub Icon, Hamburger Menu */}
          <div className="flex items-center space-x-4">
            {/* Language Dropdown (Desktop Only) */}

            {/* GitHub Icon (Desktop Only) */}
            <a
              href="https://github.com/Godfred-Owusu/Book_Management"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center border border-black rounded-full p-2 hover:bg-black hover:text-white transition w-10 h-10"
            >
              <Github size={20} />
            </a>

            {/* Hamburger Menu Icon (Mobile Only) */}
            <button
              className="md:hidden flex items-center"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </header>

      {/* MOBILE MENU SLIDE-IN */}
      {isMobileMenuOpen && (
        <div
          onClick={() => setIsMobileMenuOpen(false)}
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
        />
      )}

      <nav
        className={`
          fixed top-0 right-0 h-full w-1/3 bg-white shadow-lg z-50 transform transition-transform duration-300 ease-in-out
          ${isMobileMenuOpen ? "translate-x-0" : "translate-x-full"}
          md:hidden
        `}
      >
        <div className="flex justify-end p-4">
          <button onClick={() => setIsMobileMenuOpen(false)}>
            <X size={28} />
          </button>
        </div>

        <div className="flex flex-col space-y-4 px-6 text-lg font-medium">
          <Link
            href="/"
            onClick={() => setIsMobileMenuOpen(false)}
            className="hover:text-blue-600 transition"
          >
            Home
          </Link>
          <Link
            href="/books"
            onClick={() => setIsMobileMenuOpen(false)}
            className="hover:text-blue-600 transition"
          >
            Books
          </Link>
          <Link
            href="/authors"
            onClick={() => setIsMobileMenuOpen(false)}
            className="hover:text-blue-600 transition"
          >
            Authors
          </Link>

          {/* Language Dropdown */}

          {/* GitHub Icon */}
          <a
            href="https://github.com/Godfred-Owusu/Book_Management"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center border border-black rounded-full p-2 hover:bg-black hover:text-white transition w-10 h-10"
          >
            <Github size={20} />
          </a>
        </div>
      </nav>

      {/* Page Content */}
      <main className="flex-1 w-full max-w-6xl mx-auto p-4 md:p-8 space-y-8">
        {children}
      </main>
    </div>
  );
};

export default GlobalLayout;
