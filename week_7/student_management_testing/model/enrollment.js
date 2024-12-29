const mongoose = require("mongoose");

const enrollmentSchema = new mongoose.Schema(
  {
    student: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "student",
      required: true,
    },
    course: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "course",
      required: true,
    },
    enrollmentDate: {
      type: Date,
      default: Date.now(),
    },
  },
  {
    timestamps: true,
  }
);

const Enrollment = mongoose.model("enrollment", enrollmentSchema);

module.exports = Enrollment;
