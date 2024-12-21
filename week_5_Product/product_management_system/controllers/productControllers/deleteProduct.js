const mongoose = require("mongoose");
const fs = require("fs");
const path = require("path");

exports.deleteProduct = async (req, res) => {
  const productModel = mongoose.model("product");
  const id = req.params.id;
  const productTodelete = await productModel.findOne({ _id: id });

  if (!productTodelete) throw "Product not found...";

  fs.unlink(
    path.join(__dirname, "../../public/uploads/" + productTodelete.imageUrl),
    (err) => {
      if (err) console.log(err);
    }
  );

  await productModel.findByIdAndDelete(id);
  res.status(200).redirect("/adminHome");
};
