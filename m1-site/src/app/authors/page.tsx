"use client";

// import Input from "../../components/ui/Input";
// import AuthorList from "../../components/authors/AuthorList";
// import Button from "../../components/ui/Button";
// import AddAuthor from "../../components/authors/AddAuthor";

// export default function AuthorsPage() {
//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-4">Authors</h1>
//       <AuthorList />
//       {/* <Button onClick={() => console.log("Clicked!")}>Save</Button> */}
//       <Input label="Book Title" placeholder="Enter title..." />
//       <AddAuthor />
//     </div>
//   );
// }

// import AuthorsPage from "../../components/authors/AuthorPage";

// export default function Page() {
//   return <AuthorsPage />;
// }

import React, { useEffect, useState } from "react";
import AuthorList from "../../components/authors/AuthorList";
import { getAuthors } from "../../providers/authorProvider";
import { Author } from "../../models/Author";

const AuthorsPage: React.FC = () => {
  const [authors, setAuthors] = useState<Author[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAuthors = async () => {
      try {
        const authorsData = await getAuthors();
        setAuthors(authorsData);
      } catch (error) {
        console.error("Failed to fetch authors:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAuthors();
  }, []);

  if (loading) {
    return <div className="text-center py-10">Loading authors...</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Authors</h1>
      <AuthorList authors={authors} />
    </div>
  );
};

export default AuthorsPage;
