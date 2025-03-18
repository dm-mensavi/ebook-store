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

import AuthorsPage from "../../components/authors/AuthorPage";

export default function Page() {
  return <AuthorsPage />;
}
