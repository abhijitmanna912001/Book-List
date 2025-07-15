import Author from "../models/Author.js";
import Book from "../models/Book.js";

const resolvers = {
  Query: {
    books: async () => await Book.find(),
    book: async (_, { id }) => await Book.findById(id),
    authors: async () => await Author.find(),
    author: async (_, { id }) => await Author.findById(id),
  },

  Mutation: {
    addAuthor: async (_, { name, age }) => {
      const author = new Author({ name, age });
      return await author.save();
    },
    addBook: async (_, { name, genre, authorId }) => {
      const book = new Book({ name, genre, authorId });
      return await book.save();
    },
  },

  Book: {
    author: async (parent) => await Author.findById(parent.authorId),
  },

  Author: {
    books: async (parent) => await Book.find({ authorId: parent.id }),
  },
};

export default resolvers;
