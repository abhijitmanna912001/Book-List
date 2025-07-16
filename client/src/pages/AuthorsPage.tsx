import AddAuthor from "../components/AddAuthor";
import AuthorsList from "../components/AuthorList";

const AuthorsPage = () => {
  return (
    <div className="container py-4">
      <h2 className="mb-4 text-center">📚 Authors</h2>
      <AddAuthor />
      <AuthorsList />
    </div>
  );
};

export default AuthorsPage;
