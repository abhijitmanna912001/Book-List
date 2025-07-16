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
    <div className="card mb-4 shadow-sm">
      <div className="card-header bg-primary text-white">
        <h5 className="mb-0">📚 Books</h5>
      </div>
      <ul className="list-group list-group-flush">
        {data?.books.map((book) => (
          <li
            key={book.id}
            className="list-group-item d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center"
          >
            {editingBookId === book.id ? (
              <div className="w-100">
                <div className="row g-2 mb-2">
                  <div className="col-md">
                    <input
                      type="text"
                      value={editName}
                      onChange={(e) => setEditName(e.target.value)}
                      className="form-control form-control-sm"
                      placeholder="Book name"
                    />
                  </div>
                  <div className="col-md">
                    <input
                      type="text"
                      value={editGenre}
                      onChange={(e) => setEditGenre(e.target.value)}
                      className="form-control form-control-sm"
                      placeholder="Genre"
                    />
                  </div>
                </div>
                <div className="d-flex gap-2">
                  <button
                    onClick={handleUpdate}
                    className="btn btn-success btn-sm"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => setEditingBookId(null)}
                    className="btn btn-secondary btn-sm"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <>
                <span className="flex-grow-1">
                  <strong>{book.name}</strong> by{" "}
                  <em>{book.author?.name ?? "Unknown Author"}</em>{" "}
                  <small className="text-muted">({book.genre})</small>
                </span>
                <div className="mt-2 mt-md-0 d-flex gap-2">
                  <button
                    onClick={() => startEditing(book)}
                    className="btn btn-primary btn-sm"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteBook({ variables: { id: book.id } })}
                    className="btn btn-danger btn-sm"
                  >
                    Delete
                  </button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BooksList;
