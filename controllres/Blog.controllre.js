const Blog = require("../models/blog");
const path = require("path");
const fs = require("fs");
const { error } = require("console");
const getAllBlog = async (req, res, next) => {
  try {
    const getAllBlog = await Blog.find();
    res.status(200).json(getAllBlog);
  } catch (error) {
    next(error);
  }
};
const createBlog = async (req, res, next) => {
  try {
    const imageFile = req.file;
    const imageUrl = "images/" + imageFile.filename;
    const newBlog = { ...req.body, user: req.user.id, image: imageUrl };

    const createNewBlog = await Blog.create(newBlog);
    res.status(200).json(createNewBlog);
  } catch (error) {
    next(error);
  }
};
const deleteBlog = async (req, res, next) => {
  try {
    const id = req.params.id;
    const deleteblog = await Blog.findOneAndDelete(id);
    if (!deleteBlog) {
      return res.status(400).json({
        message: `not found`,
      });
    }
    if (deleteBlog.image) {
      const imageName = deleteBlog.image.replace(/^images\//, "");
      const imagepath = path.join(path.dirname(""), "static/images");
      if (fs.existsSync(imagepath)) {
        fs.unlink(imagepath, (err) => {
          if (err) {
            return res.status(500).json({ error: "Error deleting image" });
          }
        });
      }
    }

    res.status(200).json(deleteblog);
  } catch (error) {
    next(error);
  }
};
const editBlog = async (req, res, next) => {
  try {
    const newBlog = req.body;
    const newUpdateBlog = await Blog.findOneAndUpdate(
      { _id: req.body._id },
      newBlog
    );
    res.status(200).json(newUpdateBlog);
  } catch (error) {
    next(error);
  }
};

const getOneBlog = async (req, res, next) => {
  try {
    const { id } = req.params;
    const getoneblog = await Blog.findById(id);
    res.status(200).json(getoneblog);
  } catch (error) {
    next(error);
  }
};

module.exports = { getAllBlog, createBlog, deleteBlog, editBlog, getOneBlog };
