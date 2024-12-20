
function quickSortCourse(arr, key, order = "asc") {
  if (arr.length <= 1) return arr;

  const pivot = arr[arr.length - 1];
  const left = [];
  const right = [];

  // Sorting condition: based on the selected order ('asc' or 'desc')
  for (let i = 0; i < arr.length - 1; i++) {
    if (order === "asc" ? arr[i][key] < pivot[key] : arr[i][key] > pivot[key]) {
      left.push(arr[i]);
    } else {
      right.push(arr[i]);
    }
  }

  return [
    ...quickSortCourse(left, key, order),
    pivot,
    ...quickSortCourse(right, key, order),
  ];
}

module.exports = {
  quickSortCourse,
};
