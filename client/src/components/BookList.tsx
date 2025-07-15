import { useQuery } from "@apollo/client";
import { GET_BOOKS } from "../graphql/queries";
import type { GetBooksData } from "../graphql/types";

const BooksList = () => {
  const { data, loading, error } = useQuery<GetBooksData>(GET_BOOKS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading books</p>;

  return (
    <div>
      <h2>Books</h2>
      <ul>
        {data?.books.map((book) => (
          <li key={book.id}>
            {book.name} by {book.author?.name ?? "Unknown Author"}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BooksList;
