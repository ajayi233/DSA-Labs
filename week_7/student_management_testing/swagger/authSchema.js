const authSchema = {
  Auth: {
    type: "object",
    required: ["email", "password"],
    properties: {
      email: { type: "string" },
      password: { type: "string" },
    },
    example: {
      email: "e2B4j@example.com",
      password: "password123",
    },
  },
};

module.exports = authSchema;
