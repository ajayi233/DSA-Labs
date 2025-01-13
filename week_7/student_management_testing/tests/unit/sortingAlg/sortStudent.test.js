const { quickSort } = require("../../../sortingAlg/sortStudent");


describe("quickSort", () => {
  it("should sort an array of students in ascending order by a specified key", () => {
    // Arrange: Sample input
    const students = [
      { name: "John", age: 22, grade: 85 },
      { name: "Alice", age: 20, grade: 90 },
      { name: "Bob", age: 21, grade: 78 },
    ];

    // Act: Sort by age
    const sortedStudents = quickSort(students, "age", "asc");

    // Assert: Verify the sorting
    expect(sortedStudents).toEqual([
      { name: "Alice", age: 20, grade: 90 },
      { name: "Bob", age: 21, grade: 78 },
      { name: "John", age: 22, grade: 85 },
    ]);
  });

  it("should sort an array of students in descending order by a specified key", () => {
    // Arrange: Sample input
    const students = [
      { name: "John", age: 22, grade: 85 },
      { name: "Alice", age: 20, grade: 90 },
      { name: "Bob", age: 21, grade: 78 },
    ];

    // Act: Sort by grade in descending order
    const sortedStudents = quickSort(students, "grade", "desc");

    // Assert: Verify the sorting
    expect(sortedStudents).toEqual([
      { name: "Alice", age: 20, grade: 90 },
      { name: "John", age: 22, grade: 85 },
      { name: "Bob", age: 21, grade: 78 },
    ]);
  });

  it("should handle an empty array", () => {
    // Arrange: Empty input
    const students = [];

    // Act: Sort by any key
    const sortedStudents = quickSort(students, "age");

    // Assert: Verify the result is still an empty array
    expect(sortedStudents).toEqual([]);
  });

  it("should handle an array with a single student", () => {
    // Arrange: Single student
    const students = [{ name: "John", age: 22, grade: 85 }];

    // Act: Sort by any key
    const sortedStudents = quickSort(students, "age");

    // Assert: Verify the result is the same as the input
    expect(sortedStudents).toEqual([{ name: "John", age: 22, grade: 85 }]);
  });
});
