const express = require("express");
const { addProduct } = require("../controllers/productControllers/addProduct");
const {
  updateProduct,
} = require("../controllers/productControllers/updateProduct");
const {
  deleteProduct,
} = require("../controllers/productControllers/deleteProduct");
const uploadImage = require("../middleware/uploadMiddleware");

const productRouter = express.Router();

productRouter.post("/addProduct", uploadImage, addProduct);
productRouter.post("/updateProduct/:id", uploadImage, updateProduct);
productRouter.post("/deleteProduct/:id", deleteProduct);

module.exports = productRouter;
