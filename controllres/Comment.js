const Comment = require("../models/comment");

const getAllComment = async (req, res, next) => {
  try {
    const getAllComment = await Comment.find().populate("User");
    res.status(200).json(getAllComment);
  } catch (error) {
    next(error);
  }
};
const createComment = async (req, res, next) => {
  try {
    const newcomment = {
      User: req.user.id,
      Blog: req.body.Blog,
      comment: req.body.comment,
    };
    const createNewComment = await (
      await Comment.create(newcomment)
    ).populate(["Blog", "User"]);
    res.status(200).json(createNewComment);
  } catch (error) {
    next(error);
  }
};
const deleteComment = async (req, res, next) => {
  try {
    const id = req.params.id;
    const deleteComment = await Comment.findOneAndDelete(id);
    res.status(200).json(deleteComment);
  } catch (error) {}
};
const editComment = async (req, res, next) => {
  try {
    const newComment = req.body;
    const newUpdateComment = await Comment.findOneAndUpdate(
      { _id: req.body._id },
      newComment
    );
    res.status(200).json(newUpdateComment);
  } catch (error) {}
};

module.exports = {
  getAllComment,
  createComment,
  deleteComment,
  editComment,
};
