const Categories = require("./model");

const create = async (req, res, next) => {
  try {
    let { name } = req.body;

    let category = new Categories({ name });

    await category.save();

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
    const result = await Categories.find().select("_id name ");

    res.status(200).json({
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

const find = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!id.match(/^[0-9a-fA-F]{24}$/))
      return res.status(400).json({ message: "Invalid ID" });
    const result = await Categories.findOne({ _id: id }); //Menggunakan find One

    if (!result)
      return res
        .status(404)
        .json({ message: `Data with id:${id} doesn't exist` });
    res.status(200).json({
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

const update = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    if (!id.match(/^[0-9a-fA-F]{24}$/))
      return res.status(400).json({ message: "Invalid ID" });

    const result = await Categories.findByIdAndUpdate(
      { _id: id },
      { name },
      { new: true, runValidators: true }
    );
    res.status(200).json({ data: result });
  } catch (err) {
    next(err);
  }
};

const destroy = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!id.match(/^[0-9a-fA-F]{24}$/))
      return res.status(400).json({ message: "Invalid ID" });

    const result = await Categories.findOneAndDelete({ _id: id });

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
