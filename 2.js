// Implement Array.prototype.filter Polyfill

// Description:
// Recreate the functionality of JavaScript's built-in Array.prototype.filter method without using the original filter function. Your implementation should be added to the Array prototype so it can be called on any array instance just like the native filter.

// Requirements:
// 1. The method should accept a callback function as its first argument.
// 2. The callback function should receive three arguments:
//    - currentValue (the current element being processed)
//    - index (the index of the current element)
//    - array (the array on which filter was called)
// 3. The method should optionally accept a second argument (thisArg) to be used as the value of `this` inside the callback.
// 4. The method must return a new array containing only those elements for which the callback returns a truthy value.
// 5. The original array must NOT be modified.
// 6. The method must skip missing elements in sparse arrays (do not call the callback for indices that do not exist).
// 7. If the callback is not a function, throw a TypeError.

// Example Usage:
// const numbers = [1, 2, 3, 4];
// const evens = numbers.filterPolyfill(num => num % 2 === 0);
// console.log(evens);   // [2, 4]
// console.log(numbers); // [1, 2, 3, 4]

function filterPolyfill(callback, thisArg) {
  if (typeof callback !== "function")
    throw new TypeError("Callback must be  a function");
  if (thisArg !== undefined) {
    callback = callback.bind(thisArg);
  }
  const arr = this;
  let result = [];
  for (let i = 0; i < arr.length; ++i) {
    if (i in arr && callback(arr[i], i, arr)) {
      result.push(arr[i]);
    }
  }
  return result;
}
Array.prototype.filterPolyfill = filterPolyfill;

// Testing filterPolyfill

// 1. Basic filtering
const arr1 = [1, 2, 3, 4];
const result1 = arr1.filterPolyfill((num) => num > 2);
console.log(result1); // Expected: [3, 4]
console.log(arr1); // Expected: [1, 2, 3, 4] (unchanged)

// 2. Using index and array arguments
const arr2 = [10, 20, 30];
const result2 = arr2.filterPolyfill((value, index, array) => {
  return value + index < array.length * 10;
});
console.log(result2);
// Expected: [10, 20]

// 3. Testing thisArg
const context = { threshold: 15 };
const arr3 = [5, 10, 15, 20];
const result3 = arr3.filterPolyfill(function (value) {
  return value > this.threshold;
}, context);
console.log(result3); // Expected: [20]

// 4. Sparse array behavior (skip holes)
const arr4 = [1, , 3, 4]; // hole at index 1
const result4 = arr4.filterPolyfill((x) => true);
console.log(result4); // Expected: [1, 3, 4]

// 5. Real undefined value must be processed
const arr5 = [undefined, 2, undefined];
const result5 = arr5.filterPolyfill((x) => x === undefined);
console.log(result5); // Expected: [undefined, undefined]

// 6. Callback not a function (should throw TypeError)
try {
  [1, 2, 3].filterPolyfill(123);
} catch (e) {
  console.log(e instanceof TypeError); // Expected: true
}

// 7. Empty array
const arr6 = [];
const result6 = arr6.filterPolyfill((x) => x);
console.log(result6); // Expected: []
