const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const commentSchema = new Schema({
  comment: String,
  User: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  Blog: {
    type: Schema.Types.ObjectId,
    ref: "Blog",
  },
});

const Comment = model("Comment", commentSchema);
module.exports = Comment;
