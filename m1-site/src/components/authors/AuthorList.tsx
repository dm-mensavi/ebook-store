// "use client";
// import React from "react";
// import { Author } from "../../models/Author";
// import AuthorCard from "./AuthorCard";
// import { motion } from "framer-motion";
// type AuthorListProps = {
//   authors: Author[];
//   onEdit: (author: Author) => void;
//   onDelete: (author: Author) => void;
// };

// const AuthorList: React.FC<AuthorListProps> = ({ authors }) => {
//   const container = {
//     hidden: { opacity: 0 },
//     show: {
//       opacity: 1,
//       transition: {
//         staggerChildren: 0.2,
//       },
//     },
//   };

//   const item = {
//     hidden: { opacity: 0, y: 10 },
//     show: { opacity: 1, y: 0 },
//   };
//   return (
//     <motion.div
//       variants={container}
//       initial="hidden"
//       animate="show"
//       className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4"
//     >
//       {authors.map((author) => (
//         <motion.div variants={item} key={author.id} className="relative">
//           <AuthorCard author={author} />
//         </motion.div>
//       ))}
//     </motion.div>
//   );
// };

// export default AuthorList;

"use client";

import React from "react";
import { Author } from "../../models/Author";
import AuthorCard from "./AuthorCard";
import { motion } from "framer-motion";

type AuthorListProps = {
  authors: Author[];
  onEdit: (author: Author) => void;
  onDelete: (author: Author) => void;
};

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

const AuthorList: React.FC<AuthorListProps> = ({ authors }) => {
  if (!authors || authors.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center text-gray-500"
      >
        No authors found.
      </motion.div>
    );
  }

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 bg-red-100 p-4"
    >
      {authors.map((author) => (
        <motion.div
          key={author.id}
          variants={item}
          className="relative"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <AuthorCard author={author} />
        </motion.div>
      ))}
    </motion.div>
  );
};

export default AuthorList;
