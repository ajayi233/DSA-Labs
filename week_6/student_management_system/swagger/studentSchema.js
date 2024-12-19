const studentSchema = {
Student:{
  type: "object",
  required: ["firstName", "lastName", "dateOfBirth", "email", "password", "phone", "address", "gender"],
  properties: {
    firstName: {
      type: "string",
      description: "The first name of the student",
    },
    lastName: {
      type: "string",
      description: "The last name of the student",
    },
    dateOfBirth: {
      type: "string",
      description: "The date of birth of the student",
    },
    email: {
      type: "string",
      description: "The email address of the student",
    },
    password: {
      type: "string",
      description: "The password of the student",
    },
    phone: {
      type: "string",
      description: "The phone number of the student",
    },
    address: {
      type: "string",
      description: "The address of the student",
    },
    gender: {
      type: "string",
      description: "The gender of the student",
    },
  },
  example: {
    firstName: "John",
    lastName: "Doe",
    dateOfBirth: "1990-01-01",
    email: "1t7Ft@example.com",
    password: "password123",
    phone: "1234567890",
    address: "123 Main Street",
    gender: "male",
  },
}
}
module.exports= studentSchema
