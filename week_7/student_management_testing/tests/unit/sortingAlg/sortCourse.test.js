const { quickSortCourse } = require("../../../sortingAlg/sortCourse");

describe("quickSortCourse", () => {
  it("should sort courses by code in ascending order", () => {
    const courses = [
      { code: "CS102", name: "Data Structures" },
      { code: "CS101", name: "Introduction to Programming" },
    ];

    const sortedCourses = quickSortCourse(courses, "code", "asc");

    expect(sortedCourses).toEqual([
      { code: "CS101", name: "Introduction to Programming" },
      { code: "CS102", name: "Data Structures" },
    ]);
  });

  it("should sort courses by name in descending order", () => {
    const courses = [
      { code: "CS101", name: "Introduction to Programming" },
      { code: "CS102", name: "Data Structures" },
    ];

    const sortedCourses = quickSortCourse(courses, "name", "desc");

    expect(sortedCourses).toEqual([
      { code: "CS101", name: "Introduction to Programming" },
      { code: "CS102", name: "Data Structures" },
    ]);
  });
});

