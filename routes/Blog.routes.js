const express = require("express");
const routes = express.Router();
const { authenticateToken } = require("../middileware/auth");
const fileUplod = require("../middileware/fileUpload");
const {
  getAllBlog,
  createBlog,
  deleteBlog,
  editBlog,
  getOneBlog,
} = require("../controllres/Blog.controllre");

routes.get("/", getAllBlog);
routes.get("/:id", getOneBlog);
routes.post("/", authenticateToken, fileUplod.single("image"), createBlog);
routes.delete("/:id", deleteBlog);
routes.put("/", editBlog);

module.exports = routes;
