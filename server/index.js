import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import dotenv from "dotenv";
import express from "express";
import connectDB from "./config/db.js";
import resolvers from "./graphql/resolvers.js";
import typeDefs from "./graphql/typeDefs.js";
import cors from "cors";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

connectDB();

const server = new ApolloServer({
  typeDefs,
  resolvers,
  introspection: true,
});

await server.start();

app.use(cors({ origin: "*" }));
app.use(express.json());
app.use("/graphql", expressMiddleware(server));

app.get("/", (req, res) => {
  res.send("Hello from Book Store backend");
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`🧪 GraphQL endpoint ready at http://localhost:${PORT}/graphql`);
});
