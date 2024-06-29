const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const userSchema = new Schema({
  fullName: { type: String, require: [true, "full name required"] },
  userName: {
    type: String,
    unique: true,
    required: [true, "user name is required"],
  },
  email: {
    type: String,
    match: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g,
    unique: true,
    required: [true, "Email name is required"],
  },
  password: {
    type: String,
    required: [true, "Email name is required"],
  },
});

const User = model("User", userSchema);
module.exports = User;
