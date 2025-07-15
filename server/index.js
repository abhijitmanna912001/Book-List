import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";

const app = express();
const PORT = process.env.PORT || 5000;

dotenv.config();

connectDB();

app.get("/", (req, res) => {
  res.send("Hello from Book Store backend");
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
