const express = require("express");
const { addCategory } = require("../controllers/category/categoryController");
const categoryRouter = express.Router();

categoryRouter.post("/addCategory", addCategory);

module.exports = categoryRouter;
