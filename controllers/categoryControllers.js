import Category from "../models/categoryModel.js";
import Product from "../models/ProductModel.js";

export const getCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    return res.json(categories);
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};

export const createCategory = async (req, res) => {
  try {
    //   if user has role = 1 ----> admin
    // if only admin can create, edit, update
    const { name } = req.body;
    const category = await Category.findOne({ name });
    if (category) return res.json({ msg: "Category already exists" });
    const newCategory = new Category({ name });
    await newCategory.save();
    res.json({ msg: "Created new category" });
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};

export const deleteCategory = async (req, res) => {
  const catId = req.params.id;
  try {
    const product = await Product.findOne({ category: catId });

    if (product)
      return res
        .status(400)
        .json({ msg: "Please delete all products of the category first" });
    await Category.findByIdAndDelete(catId);
    return res.json({ msg: "Category Deleted" });
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};

export const updateCategory = async (req, res) => {
  const catId = req.params.id;
  const { name } = req.body;
  try {
    await Category.findOneAndUpdate({ _id: catId }, { name });
    return res.json({ msg: "Updated a category" });
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};
