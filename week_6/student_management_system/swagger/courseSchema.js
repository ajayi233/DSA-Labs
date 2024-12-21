const courseSchema = {
  Course: {
    type: "object",
    required: [
      "name",
      "code",
      "description",
      "credits",
      "duration",
    ],
    properties: {
      name: { type: "string" },
      code: { type: "string" },
      description: { type: "string" },
      credits: { type: "number" },
      duration: { type: "number" },
    },
    example: {
      name: "Mathematics",
      code: "MATH101",
      description: "Introduction to Mathematics",
      credits: 3,
      duration: 3,
    },
  },
};

module.exports = courseSchema;
