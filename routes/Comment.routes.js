const express = require("express");
const routes = express.Router();
const { authenticateToken } = require("../middileware/auth");
const {
  getAllComment,
  createComment,
  deleteComment,
  editComment,
} = require("../controllres/Comment");

routes.get("/", getAllComment);
routes.post("/", authenticateToken, createComment);
routes.delete("/:id", deleteComment);
routes.put("/", editComment);

module.exports = routes;
