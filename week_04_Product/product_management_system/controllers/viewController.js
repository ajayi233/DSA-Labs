const { getCategories } = require("../controllers/category/categoryController");
const { getProducts } = require("./productControllers/addProduct");
const mongoose = require("mongoose");
//rendering pages
//index

exports.indexPage = async (req, res) => {
  const categoryList = await getCategories();
  res.status(200).render("index", { categoryList });
};
//admin
exports.adminPage = async (req, res) => {
  const products = await getProducts();
  res.status(200).render("../views/adminPages/adminHome", { products });
};
exports.loginPage = (req, res) => {
  res.status(200).render("../views/auth/login");
};
exports.signupPage = (req, res) => {
  res.status(200).render("../views/auth/signup");
};

//products
exports.addProductPage = async (req, res) => {
  const categoryList = await getCategories();
  // console.log(categoryList);
  res.status(200).render("../views/products/addProduct", { categoryList });
};

exports.updateProductPage = async (req, res) => {
  const categoryList = await getCategories();
  // console.log(categoryList);
  const { id } = req.params;
  const productModel = mongoose.model("product");
  const product = await productModel.findOne({ _id: id });

  res
    .status(200)
    .render("../views/products/updateProduct", { categoryList, product });
};

exports.deleteProductPage = async (req, res) => {
  const { id } = req.params;
  const productModel = mongoose.model("product");
  const product = await productModel.findOne({ _id: id });

  res.status(200).render("../views/products/deleteProduct", { product });
};

//category
exports.categoryPage = (req, res) => {
  res.status(200).render("../views/products/category");
};

//404
exports.errorPage = (req, res) => {
  res.status(404).render("404");
};
