const Categorie = require("../models/categorie");

const getAllCategorie = async (req, res, next) => {
  try {
    const getAllCategorie = await Categorie.find();
    res.status(200).json(getAllCategorie);
  } catch (error) {
    next(error);
  }
};
const createCategorie = async (req, res, next) => {
  try {
    const createNewCategorie = await Categorie.create(req.body);
    res.status(200).json(createNewCategorie);
  } catch (error) {
    next(error);
  }
};
const deleteCategorie = async (req, res, next) => {
  try {
    const id = req.params.id;
    const deleteCategorie = await Categorie.findOneAndDelete(id);
    res.status(200).json(deleteCategorie);
  } catch (error) {}
};
const editCategorie = async (req, res, next) => {
  try {
    const newCategorie = req.body;
    const newUpdateCategorie = await Categorie.findOneAndUpdate(
      { _id: req.body._id },
      newCategorie
    );
    res.status(200).json(newUpdateCategorie);
  } catch (error) {
    next(error);
  }
};

const getOnecategory = async (req, res, next) => {
  const id = req.params.id;
  const categorie = await Categorie.findById(id).populate("blog");
  return res.status(200).json(categorie);
};
module.exports = {
  getAllCategorie,
  createCategorie,
  deleteCategorie,
  editCategorie,
  getOnecategory,
};
