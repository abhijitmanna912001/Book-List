import { useMutation, useQuery } from "@apollo/client";
import { DELETE_BOOK } from "../graphql/mutations";
import { GET_BOOKS } from "../graphql/queries";
import type {
  DeleteBookData,
  DeleteBookVars,
  GetBooksData,
} from "../graphql/types";

const BooksList = () => {
  const { data, loading, error } = useQuery<GetBooksData>(GET_BOOKS);
  const [deleteBook] = useMutation<DeleteBookData, DeleteBookVars>(
    DELETE_BOOK,
    { refetchQueries: [{ query: GET_BOOKS }] }
  );

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading books</p>;

  return (
    <div>
      <h2>Books</h2>
      <ul>
        {data?.books.map((book) => (
          <li key={book.id}>
            {book.name} by {book.author?.name ?? "Unknown Author"}{" "}
            <button onClick={() => deleteBook({ variables: { id: book.id } })}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BooksList;
