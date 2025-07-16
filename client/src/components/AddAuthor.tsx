import { useMutation } from "@apollo/client";
import { useState } from "react";
import { ADD_AUTHOR } from "../graphql/mutations";
import { GET_AUTHORS } from "../graphql/queries";
import type { AddAuthorData, AddAuthorVars } from "../graphql/types";

const AddAuthor = () => {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");

  const [addAuthor, { loading, error }] = useMutation<
    AddAuthorData,
    AddAuthorVars
  >(ADD_AUTHOR, {
    refetchQueries: [{ query: GET_AUTHORS }],
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !age) return;
    await addAuthor({ variables: { name, age: parseInt(age) } });
    setName("");
    setAge("");
  };

  return (
    <div className="card mb-4 shadow-sm">
      <div className="card-header bg-primary text-white">
        <h5 className="mb-0">➕ Add Author</h5>
      </div>
      <div className="card-body">
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Author Name</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="form-control"
              placeholder="Enter author name"
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Age</label>
            <input
              value={age}
              onChange={(e) => setAge(e.target.value)}
              className="form-control"
              type="number"
              placeholder="Enter age"
              required
            />
          </div>
          <button type="submit" className="btn btn-success" disabled={loading}>
            {loading ? "Adding..." : "Add Author"}
          </button>
          {error && (
            <div className="alert alert-danger mt-2">Error adding author</div>
          )}
        </form>
      </div>
    </div>
  );
};

export default AddAuthor;
