import AddBook from "../components/AddBook";
import BooksList from "../components/BookList";

const BooksPage = () => {
  return (
    <div>
      <h1>Books</h1>
      <AddBook />
      <BooksList />
    </div>
  );
};

export default BooksPage;
