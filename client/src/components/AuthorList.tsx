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
    <div>
      <h2>Authors</h2>
      <ul>
        {data?.authors.map((author) => (
          <li key={author.id}>
            {editingAuthorId === author.id ? (
              <span>
                <input
                  type="text"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  placeholder="Author name"
                />
                <input
                  type="number"
                  value={editAge}
                  onChange={(e) => setEditAge(Number(e.target.value))}
                  placeholder="Age"
                />
                <button onClick={handleUpdate}>Save</button>
                <button onClick={() => setEditingAuthorId(null)}>Cancel</button>
              </span>
            ) : (
              <span>
                {author.name} (age {author.age}) — {author.books.length} book(s)
                <button onClick={() => startEditing(author)}>Edit</button>
                <button
                  onClick={() => deleteAuthor({ variables: { id: author.id } })}
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

export default AuthorsList;
