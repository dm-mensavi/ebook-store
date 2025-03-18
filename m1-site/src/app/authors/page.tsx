import AuthorList from "../../components/authors/AuthorList";

export default function AuthorsPage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Authors</h1>
      <AuthorList />
    </div>
  );
}
