const Categories = require('../../api/v1/categories/model');

const { NotFoundError, BadRequestError } = require('../../errors');

const getAllCategories = async () => {
    const result = await Categories.find();

    return result;
}

const createCategories = async (req) => {
    let { name } = req.body;

    const check = await Categories.findOne({ name });

    if (check) throw new BadRequestError(`Category name:${name} already exists`);

    const result = await Categories.create({ name });

    return result;
}

const getOneCategories = async (req) => {
    const { id } = req.params;
    if (!id.match(/^[0-9a-fA-F]{24}$/)) new BadRequestError(`Invalid ID`);

    const result = await Categories.findOne({ _id: id });
    if (!result) throw new NotFoundError(`Data with id:${id} doesn't exist`);

    return result;
}

const updateCategories = async (req) => {
    const { id } = req.params;
    const { name } = req.body;

    if (!id.match(/^[0-9a-fA-F]{24}$/)) new BadRequestError(`Invalid ID`);

    const check = await Categories.findOne({
        name,
        _id: { $ne: id },
    });

    if (check) throw new BadRequestError(`Category name:${name} already exists`);

    const result = await Categories.findByIdAndUpdate(
        { _id: id },
        { name },
        { new: true, runValidators: true }
    );

    if (!result) throw new NotFoundError(`Data with id:${id} doesn't exist`);

    return result;
}

const deleteCategories = async (req) => {
    const { id } = req.params;

    if (!id.match(/^[0-9a-fA-F]{24}$/)) throw new BadRequestError(`Invalid ID`);

    const result = await Categories.findOne({ _id: id });
    if (!result) throw new NotFoundError(`Data with id:${id} doesn't exist`);

    await result.deleteOne();

    return result;
}

module.exports = {
    getAllCategories,
    createCategories,
    getOneCategories,
    updateCategories,
    deleteCategories
}