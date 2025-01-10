const { quickSort } = require("../../sortingAlg/sortStudent");

describe("Performance: Sorting Algorithm", () => {
  it("should sort 10,000 students in under 500ms", () => {
    // Generate 10,000 random students
    const students = Array.from({ length: 10000 }, () => ({
      name: Math.random().toString(36).substring(7),
    }));
    const startTime = Date.now();
    const sortedStudents = quickSort(students, "name", "asc"); // Call your sorting algorithm
    const endTime = Date.now();
    expect(sortedStudents).toHaveLength(10000);
    expect(endTime - startTime).toBeLessThan(500); // Assert sorting time < 500ms
  });
});