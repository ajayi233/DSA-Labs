const mongoose = require("mongoose");

exports.addCategory = async (req, res) => {
  const categoryModel = mongoose.model("category");
  const { name, description } = req.body;

  //validation
  if (!name) throw "Category name is required...";

  const newCategory = await categoryModel.create({ name, description });
  res.status(200).redirect("/adminHome");
};

exports.getCategories = async (req, res) => {
  const categoryModel = mongoose.model("category");
  const categories = await categoryModel.find();

  // res.status(200).json({ success: true, data: categories });
  return categories;
};
