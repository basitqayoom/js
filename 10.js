// Implement Array.prototype.sort Polyfill (Stable Sort)

// Description:
// Recreate the functionality of JavaScript’s built-in Array.prototype.sort method, but your implementation must be **stable** (i.e., elements with equal sorting value must preserve their original order). You must not use the native `.sort()` method. Your sort must work for numbers, strings, and objects when using a custom comparator.

// Requirements:
// 1. The method should be added to the Array prototype (e.g., Array.prototype.sortPolyfill).
// 2. The method takes an optional comparator function:
//    comparator(a, b) → number
//    - If comparator returns < 0, `a` should come before `b`.
//    - If comparator returns > 0, `a` should come after `b`.
//    - If comparator returns 0, the **original order must be preserved** (stability).
// 3. If no comparator is provided:
//    - Convert elements to strings and compare them in ascending UTF-16 order (same as native sort default behavior).
// 4. The sort must **not mutate the original data during comparison** but **must return the correctly sorted array** (in-place final result).
// 5. The algorithm must be **stable** (meaning if two items compare equal, their **initial order** must remain unchanged).
// 6. Must correctly handle:
//    - Numbers
//    - Strings
//    - Mixed values (converted to strings when no comparator is provided)
// 7. Must handle **sparse arrays**: treat holes as `undefined`, and sort behavior should match:
//    - Undefined values are sorted to the **end** of the array.
// 8. Must not use `.sort()` internally.

// Example Usage:
// const arr = [3, 1, 4, 1, 5];
// arr.sortPolyfill((a, b) => a - b);
// // Expected: [1, 1, 3, 4, 5]

// const arr2 = [{ n:2 }, { n:1 }, { n:2 }];
// arr2.sortPolyfill((a, b) => a.n - b.n);
// // Expected: [{ n:1 }, { n:2 }, { n:2 }]  // original order preserved between equal items

function defaultCompare(a, b) {
  return a < b ? -1 : a > b ? 1 : 0;
}

function merge(arr1, arr2, comparator) {
  let i = 0,
    j = 0;
  const result = [];
  while (i < arr1.length && j < arr2.length) {
    const a = arr1[i],
      b = arr2[j];
    const c = (comparator || defaultCompare)(a, b);
    if (c < 0) {
      result.push(a);
      ++i;
    } else if (c > 0) {
      result.push(b);
      ++j;
    } else {
      result.push(a);
      ++i;
    }
  }
  while (i < arr1.length) {
    result.push(arr1[i]);
    ++i;
  }
  while (j < arr2.length) {
    result.push(arr2[j]);
    ++j;
  }
  return result;
}

function mergeSort(arr, comparator) {
  if (arr.length <= 1) return arr;
  const mid = Math.floor(arr.length / 2);
  const sortedLeft = mergeSort(arr.slice(0, mid), comparator);
  const sortedRight = mergeSort(arr.slice(mid, arr.length), comparator);
  return merge(sortedLeft, sortedRight, comparator);
}

function sortPolyfill(comparator) {
  const arr = this;
  const sorted = mergeSort(arr, comparator);
  for (let i = 0; i < arr.length; ++i) {
    this[i] = sorted[i];
  }
  return this;
}
Array.prototype.sortPolyfill = sortPolyfill;

// ✅ Test Cases for sortPolyfill (Stable Sort)

console.log("---- 1. Basic ascending numeric sort ----");
const arr1 = [5, 3, 8, 1, 2];
arr1.sortPolyfill((a, b) => a - b);
console.log(arr1); // [1, 2, 3, 5, 8]

console.log("---- 2. Basic descending numeric sort ----");
const arr2 = [4, 7, 1, 9];
arr2.sortPolyfill((a, b) => b - a);
console.log(arr2); // [9, 7, 4, 1]

console.log("---- 3. String sort (default UTF-16 order) ----");
const arr3 = ["banana", "apple", "cherry"];
arr3.sortPolyfill();
console.log(arr3); // ["apple", "banana", "cherry"]

console.log(
  "---- 4. Mixed numbers and strings (default conversion to string) ----",
);
const arr4 = [10, "2", 1, "a"];
arr4.sortPolyfill();
console.log(arr4); // ["1", "10", "2", "a"] (like native sort)

console.log("---- 5. Stable sort check ----");
const arr5 = [
  { n: 2, id: "A" },
  { n: 1, id: "B" },
  { n: 2, id: "C" },
  { n: 1, id: "D" },
];
arr5.sortPolyfill((a, b) => a.n - b.n);
console.log(arr5);
// Expected: [
//   { n:1, id:"B" },
//   { n:1, id:"D" },
//   { n:2, id:"A" },
//   { n:2, id:"C" }
// ]  (stable ordering preserved)

console.log("---- 6. Array with equal values (stability check again) ----");
const arr6 = [5, 5, 5, 5];
arr6.sortPolyfill((a, b) => a - b);
console.log(arr6); // [5, 5, 5, 5]

console.log("---- 7. Empty array ----");
const arr7 = [];
arr7.sortPolyfill((a, b) => a - b);
console.log(arr7); // []

console.log("---- 8. Array with single element ----");
const arr8 = [42];
arr8.sortPolyfill((a, b) => a - b);
console.log(arr8); // [42]

console.log("---- 9. Sorting objects by key ----");
const arr9 = [
  { name: "bob", age: 30 },
  { name: "alice", age: 25 },
  { name: "claire", age: 30 },
];
arr9.sortPolyfill((a, b) => a.age - b.age);
console.log(arr9);
// Expected: [
//   { name: "alice", age: 25 },
//   { name: "bob", age: 30 },
//   { name: "claire", age: 30 }
// ] (stable order for equal age
