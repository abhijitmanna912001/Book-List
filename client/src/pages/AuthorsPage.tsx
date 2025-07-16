import AddAuthor from "../components/AddAuthor";
import AuthorsList from "../components/AuthorList";

const AuthorsPage = () => {
  return (
    <div>
      <h1>Authors</h1>
      <AddAuthor />
      <AuthorsList />
    </div>
  );
};

export default AuthorsPage;
