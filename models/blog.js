const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const blogSchema = new Schema({
  title: String,
  content: String,
  Introduction: String,
  tiem: Number,
  data: {
    type: Date,
    default: Date.now(),
  },
  image: String,
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: "categorie",
  },
});
const Blog = model("Blog", blogSchema);
module.exports = Blog;
