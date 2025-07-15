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
    <div>
      <h3>Add Author</h3>
      <form onSubmit={handleSubmit}>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Author name"
        />
        <input
          value={age}
          onChange={(e) => setAge(e.target.value)}
          placeholder="Age"
          type="number"
        />
        <button type="submit" disabled={loading}>
          Add Author
        </button>
      </form>
      {error && <p>Error adding author</p>}
    </div>
  );
};

export default AddAuthor;
