const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      trim: true,
      minLength: [3, "Name cannot be less than 3 characters"],
    },
    email: {
      type: String,
      required: [true, "Please enter an email address"],
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: [true, "Please enter a password"],
    },
  },
  { timestamps: true }
);

const userModel = mongoose.model("users", userSchema);

module.exports = userModel;
