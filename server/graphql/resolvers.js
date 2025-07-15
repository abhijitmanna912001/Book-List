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

    updateAuthor: async (_, { id, name, age }) => {
      return await Author.findByIdAndUpdate(id, { name, age }, { new: true });
    },
    updateBook: async (_, { id, name, genre, authorId }) => {
      return await Book.findByIdAndUpdate(
        id,
        { name, genre, authorId },
        { new: true }
      );
    },

    deleteAuthor: async (_, { id }) => {
      return await Author.findByIdAndDelete(id);
    },
    deleteBook: async (_, { id }) => {
      return await Book.findByIdAndDelete(id);
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
