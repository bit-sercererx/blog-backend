const express = require("express");
const routes = express.Router();
const {
  getAllCategorie,
  createCategorie,
  deleteCategorie,
  editCategorie,
  getOnecategory,
} = require("../controllres/Categorie.controllre");

routes.get("/", getAllCategorie);
routes.post("/", createCategorie);
routes.get("/:id", getOnecategory);
routes.delete("/:id", deleteCategorie);
routes.put("/", editCategorie);

module.exports = routes;
