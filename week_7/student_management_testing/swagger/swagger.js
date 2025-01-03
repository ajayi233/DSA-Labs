const swaggerJsDoc = require("swagger-jsdoc");
const student = require("./studentSchema");
const course = require("./courseSchema");
const enrollment = require("./enrollmentSchema");
const instructor = require("./instructorSchema");
const auth = require("./authSchema");

const schemas = {
  ...student,
  ...course,
  ...enrollment,
  ...instructor,
  ...auth,
};
const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Student Management System",
      description: "API documentation for Student Management System",
      version: "1.0.0",
    },
    servers: [
      {
        url: "http://localhost:3000",
      },
    ],
    components: {
      schemas,
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ["./routes/*.js"],
};

const swaggerSpec = swaggerJsDoc(options);

module.exports = swaggerSpec;
