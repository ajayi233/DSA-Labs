const Student = require("../model/student");

function quickSort(array, key) {
  if (array.length <= 1) {
    return array;
  }

  const pivot = array[array.length - 1];
  const left = [];
  const right = [];

  for (let i = 0; i < array.length - 1; i++) {
    if (array[i][key] < pivot[key]) {
      left.push(array[i]);
    } else {
      right.push(array[i]);
    }
  }

  return [...quickSort(left, key), pivot, ...quickSort(right, key)];
}

exports.sortStudents = async (req, res) => {};

//sort courses
exports.sortCourses = async (req, res) => {};
