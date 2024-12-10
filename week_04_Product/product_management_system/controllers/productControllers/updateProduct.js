const mongoose = require("mongoose");

exports.updateProduct = async (req, res) => {
  const productModel = mongoose.model("product");
  const id = req.params.id;
  const { name, description, price, quantity, category } = req.body;
  const image = req.file;

  console.log(id);
  //validation
  if (!name) throw "Product name is required...";
  if (!description) throw "Product description is required...";
  if (!price) throw "Product price is required...";
  if (!quantity) throw "Product quantity is required...";
  if (!category) throw "Product category is required...";
  if (!image) throw "Product image is required...";

  //finding product
  const product = await productModel.findOne({ _id: id });

  if (!product) throw "Product not found...";

  product.name = name;
  product.description = description;
  product.price = price;
  product.quantity = quantity;
  product.imageUrl = image.filename;
  product.category = category;
  await product.save();
  res.redirect("/adminHome");
};
