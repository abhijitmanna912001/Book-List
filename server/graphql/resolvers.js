import Author from "../models/Author.js";
import Book from "../models/Book.js";

const resolvers = {
  Query: {
    books: async () => await Book.find(),
    book: async (_, { id }) => await Book.findById(id),
    authors: async () => await Author.find(),
    author: async (_, { id }) => await Author.findById(id),
  },

  Book: {
    author: async (parent) => await Author.findById(parent.authorId),
  },

  Author: {
    books: async (parent) => await Book.find({ authorId: parent.id }),
  },
};

export default resolvers;
