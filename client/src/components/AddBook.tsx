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
    <div>
      <h3>Add Book</h3>
      <form onSubmit={handleSubmit}>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Book name"
        />
        <input
          value={genre}
          onChange={(e) => setGenre(e.target.value)}
          placeholder="Genre"
        />
        <select
          title="Author"
          value={authorId}
          onChange={(e) => setAuthorId(e.target.value)}
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
        <button type="submit" disabled={loading}>
          Add Book
        </button>
      </form>
      {error && <p>Error adding book</p>}
    </div>
  );
};

export default AddBook;
