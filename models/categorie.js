const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const categorieSchema = new Schema({
  name: String,
  blog: {
    type: Schema.Types.ObjectId,
    ref: "Blog",
  },
});
const Categorie = model("categorie", categorieSchema);
module.exports = Categorie;
