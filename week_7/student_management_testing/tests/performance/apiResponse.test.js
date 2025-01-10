const request = require("supertest");
const { app, server } = require("../../index"); // Adjust path to your app
const jwt = require("jsonwebtoken");

// Mock Instructor Token
const generateInstructorToken = () => {
  const payload = {
    id: "instructor123", // Mocked instructor ID
    role: "instructor", // Instructor role
  };
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1h" });
};

afterAll(async () => {
  server.close();
});

describe("Performance Test: API Response Times", () => {
  const instructorToken = generateInstructorToken();
  const endpoints = ["/courses"];

  endpoints.forEach((endpoint) => {
    it(`should respond within 3000ms for GET ${endpoint}`, async () => {
      const start = Date.now();
      const res = await request(app)
        .get(endpoint)
        .set("Authorization", `Bearer ${instructorToken}`);
      const duration = Date.now() - start;

      expect(res.statusCode).toBe(200);
      expect(duration).toBeLessThan(3000);
    });
  });
});
