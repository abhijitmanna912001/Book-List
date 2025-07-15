import mongoose from "mongoose";

const authorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  age: Number,
});

const Author = mongoose.model("Author", authorSchema);

export default Author;
