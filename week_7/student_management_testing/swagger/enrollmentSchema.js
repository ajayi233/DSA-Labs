const enrollmentSchema = {
  Enrollment: {
    type: "object",
    required: ["student", "course", "enrollmentDate"],
    properties: {
      student: { type: "string" },
      course: { type: "string" },
      enrollmentDate: { type: "string" },
    },
    example: {
      student: "STD2345543",
      course: "CS101",
      enrollmentDate: "2023-01-01",
    },
  },
};

module.exports = enrollmentSchema;