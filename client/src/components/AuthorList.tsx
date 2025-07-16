import { useMutation, useQuery } from "@apollo/client";
import { DELETE_AUTHOR, UPDATE_AUTHOR } from "../graphql/mutations";
import { GET_AUTHORS } from "../graphql/queries";
import type {
  DeleteAuthorData,
  DeleteAuthorVars,
  GetAuthorsData,
  UpdateAuthorData,
  UpdateAuthorVars,
} from "../graphql/types";
import { useState } from "react";

const AuthorsList = () => {
  const { data, loading, error } = useQuery<GetAuthorsData>(GET_AUTHORS);
  const [deleteAuthor] = useMutation<DeleteAuthorData, DeleteAuthorVars>(
    DELETE_AUTHOR,
    { refetchQueries: [{ query: GET_AUTHORS }] }
  );

  const [updateAuthor] = useMutation<UpdateAuthorData, UpdateAuthorVars>(
    UPDATE_AUTHOR,
    { refetchQueries: [{ query: GET_AUTHORS }] }
  );

  const [editingAuthorId, setEditingAuthorId] = useState<string | null>(null);
  const [editName, setEditName] = useState("");
  const [editAge, setEditAge] = useState<number>(0);

  if (loading) return <p>Loading authors...</p>;
  if (error) return <p>Error loading authors</p>;

  const startEditing = (author: { id: string; name: string; age: number }) => {
    setEditingAuthorId(author.id);
    setEditName(author.name);
    setEditAge(author.age);
  };

  const handleUpdate = async () => {
    if (!editingAuthorId) return;
    await updateAuthor({
      variables: { id: editingAuthorId, name: editName, age: editAge },
    });
    setEditingAuthorId(null);
  };

  return (
    <div className="card mb-4 shadow-sm">
      <div className="card-header bg-primary text-white">
        <h5 className="mb-0">✍️ Authors</h5>
      </div>
      <ul className="list-group list-group-flush">
        {data?.authors.map((author) => (
          <li
            key={author.id}
            className="list-group-item d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center"
          >
            {editingAuthorId === author.id ? (
              <div className="w-100">
                <div className="row g-2 mb-2">
                  <div className="col-md">
                    <input
                      type="text"
                      value={editName}
                      onChange={(e) => setEditName(e.target.value)}
                      className="form-control form-control-sm"
                      placeholder="Author name"
                    />
                  </div>
                  <div className="col-md">
                    <input
                      type="number"
                      value={editAge}
                      onChange={(e) => setEditAge(Number(e.target.value))}
                      className="form-control form-control-sm"
                      placeholder="Age"
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
                    onClick={() => setEditingAuthorId(null)}
                    className="btn btn-secondary btn-sm"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <>
                <span className="flex-grow-1">
                  <strong>{author.name}</strong> (age {author.age}) —{" "}
                  <small className="text-muted">
                    {author.books.length} book(s)
                  </small>
                </span>
                <div className="mt-2 mt-md-0 d-flex gap-2">
                  <button
                    onClick={() => startEditing(author)}
                    className="btn btn-primary btn-sm"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() =>
                      deleteAuthor({ variables: { id: author.id } })
                    }
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

export default AuthorsList;
