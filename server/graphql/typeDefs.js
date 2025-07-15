const typeDefs = `
    type Book {
        id: ID!
        name: String!
        genre: String
        author: Author
    }

    type Author {
        id: ID!
        name: String!
        age: Int
        books: [Book]
    }

    type Query {
        books: [Book]
        book(id: ID!): Book
        authors: [Author]
        author(id: ID!): Author
    }

    type Mutation {
        addAuthor(name: String!, age: Int): Author
        addBook(name: String!, genre: String, authorId: ID!): Book

        updateAuthor(id: ID!, name: String, age: Int): Author
        updateBook(id: ID!, name: String, genre: String, authorId: ID): Book

        deleteAuthor(id: ID!): Author
        deleteBook(id: ID!): Book
    }
`;

export default typeDefs;
