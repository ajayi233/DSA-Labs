const express = require("express");
const viewRouter = express.Router();
const {
  indexPage,
  errorPage,
  loginPage,
  adminPage,
  signupPage,
  addProductPage,
  updateProductPage,
  deleteProductPage,
  categoryPage,
} = require("../controllers/viewController");
const { auth } = require("../middleware/auth");
const uploadImage = require("../middleware/uploadMiddleware");

//rendering pages
viewRouter.get("/", indexPage);

//admin
viewRouter.get("/signup", signupPage);
viewRouter.get("/login", loginPage);
viewRouter.get("/adminHome", adminPage);

//products
viewRouter.get("/products/addProduct", addProductPage);
viewRouter.get("/products/updateProduct/:id", updateProductPage);
viewRouter.get("/products/deleteProduct/:id", deleteProductPage);

//category
viewRouter.get("/category", categoryPage);

//all other pages
viewRouter.get("*", errorPage);

module.exports = viewRouter;
