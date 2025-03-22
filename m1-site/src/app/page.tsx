// "use client";

// // import GlobalLayout from "../components/layout/GlobalLayout";

// import React, { useEffect, useState } from "react";
// import { getBooks } from "../providers/bookProvider";
// import { Book } from "../models/Book";
// import Link from "next/link";
// import Ratings from "../components/ui/Ratings";
// import PageTitle from "../components/ui/PageTitle";
// import { motion } from "framer-motion";

// const HomePage: React.FC = () => {
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [topBooks, setTopBooks] = useState<Book[]>([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchBooks = async () => {
//       try {
//         // Fetch all books
//         const books = await getBooks();

//         // Sort books by averageRating (descending)
//         const sortedBooks = books
//           .filter((book: Book) => typeof book.averageRating === "number")
//           .sort(
//             (a: Book, b: Book) =>
//               (b.averageRating ?? 0) - (a.averageRating ?? 0)
//           )
//           .slice(0, 6); // Get top 6

//         setTopBooks(sortedBooks);
//       } catch (error) {
//         console.error("Failed to fetch books", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchBooks();
//   }, []);
//   const handleConfirm = () => {
//     alert("Confirmed action!");
//     setIsModalOpen(false);
//   };

//   return (
//     <div className="p-6 space-y-12">
//       <PageTitle title="Welcome to the Book Management System" />

//       {/* Top Rated Books Section */}
//       <div>
//         <h2 className="text-2xl font-bold mb-4">Top 6 Rated Books</h2>

//         {loading ? (
//           <div className="text-gray-500">Loading top books...</div>
//         ) : (
//           <motion.div
//             className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4"
//             initial="hidden"
//             animate="show"
//             variants={{
//               hidden: { opacity: 0 },
//               show: {
//                 opacity: 1,
//                 transition: { staggerChildren: 0.2 },
//               },
//             }}
//           >
//             {topBooks.map((book) => (
//               <motion.div
//                 key={book.id}
//                 className="border rounded-lg p-4 shadow hover:shadow-md transition"
//                 variants={{
//                   hidden: { opacity: 0, y: 10 },
//                   show: { opacity: 1, y: 0 },
//                 }}
//                 whileHover={{ scale: 1.02 }}
//                 whileTap={{ scale: 0.98 }}
//               >
//                 <h3 className="text-lg font-semibold">{book.title}</h3>

//                 <p className="text-gray-600 text-sm mb-2">
//                   Author: {book.authorName}
//                 </p>

//                 <div className="flex items-center gap-2 mb-2">
//                   <Ratings rating={book.averageRating ?? 0} />
//                   <p className="text-sm font-bold">
//                     {book.averageRating?.toFixed(1) ?? "0.0"}
//                   </p>
//                 </div>

//                 <p className="text-sm text-gray-700 mb-2">
//                   Price: ${book.price.toFixed(2)}
//                 </p>

//                 <Link
//                   href={`/books/${book.id}`}
//                   className="text-blue-500 hover:underline text-sm"
//                 >
//                   View Details
//                 </Link>
//               </motion.div>
//             ))}
//           </motion.div>
//         )}
//       </div>
//     </div>
//   );
// };

// // import GlobalLayout from "../components/layout/GlobalLayout";

// // export default function Home() {
// //   return (
// //     <GlobalLayout>
// //       <h1>Hello from Home Page!</h1>
// //     </GlobalLayout>
// //   );
// // }

// "use client";

// import PageTitle from "../components/ui/PageTitle";

// import TopRatings from "../components/ui/TopRatings";

// const HomePage: React.FC = () => {
//   return (
//     <div className="p-6 space-y-12">
//       <PageTitle title="Welcome to the Book Management System" />
//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 w-full">
//         <div className="border rounded-lg p-4 shadow hover:shadow-md transition w-9/12">
//           {" "}
//           <TopRatings />
//         </div>
//         <div className="w-3/12">Top Authors</div>
//       </div>
//     </div>
//   );
// };

// export default HomePage;

"use client";

import React from "react";
import PageTitle from "../components/ui/PageTitle";
import TopRatings from "../components/ui/TopRatings"; // Assuming you have this component
import TopAuthors from "../components/ui/TopAuthors";

const HomePage: React.FC = () => {
  return (
    <div className="p-6 space-y-12 max-w-7xl mx-auto">
      {/* Page Title */}
      <PageTitle title="Welcome to the Book Management System" />

      {/* Main Content Layout */}
      <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-6 w-full">
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
  );
};

export default HomePage;
