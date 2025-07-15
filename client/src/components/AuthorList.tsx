import { useQuery } from "@apollo/client";
import { GET_AUTHORS } from "../graphql/queries";
import type { GetAuthorsData } from "../graphql/types";

const AuthorsList = () => {
  const { data, loading, error } = useQuery<GetAuthorsData>(GET_AUTHORS);

  if (loading) return <p>Loading authors...</p>;
  if (error) return <p>Error loading authors</p>;

  return (
    <div>
      <h2>Authors</h2>
      <ul>
        {data?.authors.map((author) => (
          <li key={author.id}>
            {author.name} (age {author.age}) — {author.books.length} book(s)
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AuthorsList;
