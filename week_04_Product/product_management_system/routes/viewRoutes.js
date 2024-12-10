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
  displayProductPage
} = require("../controllers/viewController");
const { auth } = require("../middleware/auth");
const uploadImage = require("../middleware/uploadMiddleware");

//rendering pages
viewRouter.get("/", indexPage);
viewRouter.get('/viewProducts/:category', displayProductPage)

//admin
viewRouter.get("/signup", signupPage);
viewRouter.get("/login", loginPage);
viewRouter.get("/adminHome", auth, adminPage);

//products
viewRouter.get("/products/addProduct", auth, addProductPage);
viewRouter.get("/products/updateProduct/:id", auth, updateProductPage);
viewRouter.get("/products/deleteProduct/:id", auth, deleteProductPage);

//category
viewRouter.get("/category", auth,  categoryPage);

//all other pages
viewRouter.get("*", errorPage);

module.exports = viewRouter;
