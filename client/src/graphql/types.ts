export interface Author {
  id: string;
  name: string;
  age: number;
  books: { id: string; name: string }[];
}

export interface Book {
  id: string;
  name: string;
  genre: string;
  author?: Author | null;
}

export interface GetBooksData {
  books: Book[];
}

export interface GetAuthorsData {
  authors: Author[];
}

export interface AddAuthorData {
  addAuthor: {
    id: string;
    name: string;
    age: number;
  };
}

export interface AddAuthorVars {
  name: string;
  age: number;
}

export interface AddBookData {
  addBook: {
    id: string;
    name: string;
    genre: string;
  };
}

export interface AddBookVars {
  name: string;
  genre: string;
  authorId: string;
}

export interface DeleteBookData {
  deleteBook: {
    id: string;
  };
}

export interface DeleteBookVars {
  id: string;
}

export interface DeleteAuthorData {
  deleteAuthor: {
    id: string;
  };
}

export interface DeleteAuthorVars {
  id: string;
}
