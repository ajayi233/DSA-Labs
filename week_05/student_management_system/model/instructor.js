const mongoose = require("mongoose");

const instructorSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: [true, "Please enter an email address"],
      unique: true,
    },
    InstructorID: {
      type: String,
      required: true,
      unique: true,
    },
    dateOfBirth: {
      type: Date,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    hireDate: {
      type: Date,
      required: true,
    },
    coursesTaught: [
      {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "course",
      },
    ],
    department: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Instructor = mongoose.model("instructor", instructorSchema);

module.exports = Instructor;
