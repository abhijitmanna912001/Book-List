import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  genre: String,
  authorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Author",
  },
});

const Book = mongoose.model("Book", bookSchema);

export default Book;
