const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    dateOfBirth: {
      type: Date,
      required: true,
    },
    email: {
      type: String,
      required: [true, "Please enter an email address"],
      unique: true,
    },
    phone: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      required: true,
    },
    enrollmentDate: {
      type: Date,
      required: true,
    },
    coursesEnrolled: [
      {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "course",
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("student", studentSchema);
