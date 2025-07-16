import { useMutation, useQuery } from "@apollo/client";
import { DELETE_BOOK, UPDATE_BOOK } from "../graphql/mutations";
import { GET_BOOKS } from "../graphql/queries";
import type {
  DeleteBookData,
  DeleteBookVars,
  GetBooksData,
  UpdateBookData,
  UpdateBookVars,
} from "../graphql/types";
import { useState } from "react";

const BooksList = () => {
  const { data, loading, error } = useQuery<GetBooksData>(GET_BOOKS);
  const [deleteBook] = useMutation<DeleteBookData, DeleteBookVars>(
    DELETE_BOOK,
    { refetchQueries: [{ query: GET_BOOKS }] }
  );

  const [updateBook] = useMutation<UpdateBookData, UpdateBookVars>(
    UPDATE_BOOK,
    { refetchQueries: [{ query: GET_BOOKS }] }
  );

  const [editingBookId, setEditingBookId] = useState<string | null>(null);
  const [editName, setEditName] = useState("");
  const [editGenre, setEditGenre] = useState("");

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading books</p>;

  const startEditing = (book: { id: string; name: string; genre: string }) => {
    setEditingBookId(book.id);
    setEditName(book.name);
    setEditGenre(book.genre);
  };

  const handleUpdate = async () => {
    if (!editingBookId) return;
    await updateBook({
      variables: { id: editingBookId, name: editName, genre: editGenre },
    });
    setEditingBookId(null);
  };

  return (
    <div>
      <h2>Books</h2>
      <ul>
        {data?.books.map((book) => (
          <li key={book.id}>
            {editingBookId === book.id ? (
              <span>
                <input
                  type="text"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  placeholder="Book name"
                />
                <input
                  type="text"
                  value={editGenre}
                  onChange={(e) => setEditGenre(e.target.value)}
                  placeholder="Genre"
                />
                <button onClick={handleUpdate}>Save</button>
                <button onClick={() => setEditingBookId(null)}>Cancel</button>
              </span>
            ) : (
              <span>
                {book.name} by {book.author?.name ?? "Unknown Author"} (
                {book.genre}){" "}
                <button onClick={() => startEditing(book)}>Edit</button>
                <button
                  onClick={() => deleteBook({ variables: { id: book.id } })}
                >
                  Delete
                </button>
              </span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BooksList;
