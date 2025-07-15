import AddAuthor from "./components/AddAuthor";
import AddBook from "./components/AddBook";
import AuthorsList from "./components/AuthorList";
import BooksList from "./components/BookList";

function App() {
  return (
    <h1>
      <AddAuthor />
      <AddBook />
      <AuthorsList />
      <BooksList />
    </h1>
  );
}

export default App;
