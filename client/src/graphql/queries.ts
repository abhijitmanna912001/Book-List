import { gql } from "@apollo/client";

export const GET_AUTHORS = gql`
  query GetAuthors {
    authors {
      id
      name
      age
      books {
        id
        name
      }
    }
  }
`;

export const GET_BOOKS = gql`
  query GetBooks {
    books {
      id
      name
      genre
      author {
        id
        name
      }
    }
  }
`;
