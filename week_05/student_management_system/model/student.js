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
    studentID: {
      type: String,
      required: true,
      unique: true,
    },
    role: {
      type: String,
      enum: ["student", "instructor"],
      default: "student",
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
      enum: ["male", "female"],
      required: true,
    },
    enrollmentDate: {
      type: Date,
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

const Student = mongoose.model("student", studentSchema);

module.exports = Student;
