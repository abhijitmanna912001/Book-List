import AddBook from "../components/AddBook";
import BooksList from "../components/BookList";

const BooksPage = () => {
  return (
    <div className="container py-4">
      <h2 className="mb-4 text-center">📖 Books</h2>
      <AddBook />
      <BooksList />
    </div>
  );
};

export default BooksPage;
