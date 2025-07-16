import { useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { ADD_BOOK } from "../graphql/mutations";
import { GET_AUTHORS, GET_BOOKS } from "../graphql/queries";
import type {
  AddBookData,
  AddBookVars,
  GetAuthorsData,
} from "../graphql/types";

const AddBook = () => {
  const [name, setName] = useState("");
  const [genre, setGenre] = useState("");
  const [authorId, setAuthorId] = useState("");

  const { data: authorsData, loading: authorsLoading } =
    useQuery<GetAuthorsData>(GET_AUTHORS);

  const [addBook, { loading, error }] = useMutation<AddBookData, AddBookVars>(
    ADD_BOOK,
    { refetchQueries: [{ query: GET_BOOKS }] }
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !genre || !authorId) return;
    await addBook({ variables: { name, genre, authorId } });
    setName("");
    setGenre("");
    setAuthorId("");
  };

  return (
    <div className="card mb-4 shadow-sm">
      <div className="card-header bg-primary text-white">
        <h5 className="mb-0">➕ Add Book</h5>
      </div>
      <div className="card-body">
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Book Name</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="form-control"
              placeholder="Enter book name"
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Genre</label>
            <input
              value={genre}
              onChange={(e) => setGenre(e.target.value)}
              className="form-control"
              placeholder="Enter genre"
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Author</label>
            <select
              title="Author"
              value={authorId}
              onChange={(e) => setAuthorId(e.target.value)}
              className="form-select"
              required
            >
              <option value="">Select author</option>
              {authorsLoading ? (
                <option disabled>Loading authors...</option>
              ) : (
                authorsData?.authors.map((author) => (
                  <option key={author.id} value={author.id}>
                    {author.name}
                  </option>
                ))
              )}
            </select>
          </div>
          <button type="submit" className="btn btn-success" disabled={loading}>
            {loading ? "Adding..." : "Add Book"}
          </button>
          {error && (
            <div className="alert alert-danger mt-2">Error adding book</div>
          )}
        </form>
      </div>
    </div>
  );
};

export default AddBook;
