const mongoose = require("mongoose");

exports.addProduct = async (req, res) => {
  const productModel = mongoose.model("product");
  const { name, description, price, quantity, category } = req.body;
  const image = req.file;

  //validation
  if (!name) throw "Product name is required...";
  if (!description) throw "Product description is required...";
  if (!price) throw "Product price is required...";
  if (!quantity) throw "Product quantity is required...";
  if (!category) throw "Product category is required...";
  if (!image) throw "Product image is required...";

  //creating product
  const newProduct = await productModel.create({
    name,
    description,
    price,
    quantity,
    imageUrl: image.filename,
    category,
  });
  // res.status(200).json({ success: true, data: newProduct });
  res.redirect("/adminHome");
};

exports.getProducts = async (req, res) => {
  const productModel = mongoose.model("product");
  const products = await productModel.find();

  return products;
};
