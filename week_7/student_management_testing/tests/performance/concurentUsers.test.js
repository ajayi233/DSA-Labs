const request = require("supertest");
const { app } = require("../../index"); // Adjust path to your app
const jwt = require("jsonwebtoken");

// Mock Instructor Token
const generateInstructorToken = () => {
  const payload = {
    id: "instructor123", // Mocked instructor ID
    role: "instructor", // Instructor role
  };
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1h" });
};

describe("Performance Test: Concurrent User Handling", () => {
  test("should handle 100 concurrent requests to /courses", async () => {
    const instructorToken = generateInstructorToken();
    const requests = Array.from({ length: 100 }, () =>
      request(app)
        .get("/courses")
        .set("Authorization", `Bearer ${instructorToken}`)
    );

    const start = Date.now();
    const responses = await Promise.all(requests);
    const duration = Date.now() - start;

    responses.forEach((res) => {
      expect(res.statusCode).toBe(200);
    });

    expect(duration).toBeLessThan(2000); // All requests should complete within 2 seconds
  });
});
