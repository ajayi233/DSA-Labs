const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    code: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    credits: {
      type: Number,
      required: true,
    },
    instructor: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "instructor",
      required: true,
    },
    duration: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("course", courseSchema);
