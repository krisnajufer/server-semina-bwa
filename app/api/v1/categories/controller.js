const Categories = require("./model");
const { getAllCategories, createCategories, getOneCategories, updateCategories, deleteCategories } = require("../../../services/mongoose/categories");

const create = async (req, res, next) => {
  try {
    let category = await createCategories(req);

    res.status(201).json({ result: category });
  } catch (err) {
    if (err & (err.name === "ValidationError")) {
      res.json({
        message: err.message,
        field: err.errors,
      });
    }
    next(err);
  }
};

const index = async (req, res, next) => {
  try {
    const result = await getAllCategories();

    res.status(200).json({
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

const find = async (req, res, next) => {
  try {
    const result = await getOneCategories(req);

    res.status(200).json({
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

const update = async (req, res, next) => {
  try {
    const result = await updateCategories(req);
    res.status(200).json({ data: result });
  } catch (err) {
    next(err);
  }
};

const destroy = async (req, res, next) => {
  try {
    const result = await deleteCategories(req);

    res.status(200).json({ data: result });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  create,
  index,
  find,
  update,
  destroy,
};
