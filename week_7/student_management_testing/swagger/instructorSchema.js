const instructorSchema = {
  Instructor: {
    type: "object",
    required: [
      "firstName",
      "lastName",
      "email",
      "password",
      "dateOfBirth",
      "phone",
      "address",
      "hireDate",
      "department",
    ],
    properties: {
      firstName: { type: "string" },
      lastName: { type: "string" },
      email: { type: "string" },
      password: { type: "string" },
      dateOfBirth: { type: "string" },
      phone: { type: "string" },
      address: { type: "string" },
      hireDate: { type: "string" },
      department: { type: "string" },
    },
    example: {
      firstName: "John",
      lastName: "Doe",
      email: "e2B4j@example.com",
      password: "password123",
      dateOfBirth: "1990-01-01",
      phone: "123-456-7890",
      address: "123 Main St",
      hireDate: "2022-01-01",
      department: "Computer Science",
    },
  },
};

module.exports = instructorSchema;
