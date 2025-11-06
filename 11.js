
// Implement Array.prototype.includes Polyfill

// Description:
// Recreate the functionality of JavaScript’s built-in Array.prototype.includes method without using the native includes.
// Your implementation should be added to the Array prototype so that it can be called on any array instance just like the native one.

// Requirements:
// 1. The method should accept two parameters:
//    - searchElement → the element to search for.
//    - fromIndex (optional) → the index to start searching from (default is 0).
// 2. Return **true** if the array contains the searchElement, otherwise **false**.
// 3. Comparison must use **SameValueZero** semantics:
//    - Treat `NaN` as equal to `NaN`.
//    - `+0` and `-0` are considered equal.
//    - Otherwise, behave like strict equality (`===`).
// 4. If `fromIndex` is negative, start searching from `arr.length + fromIndex`.
//    - If the computed index < 0, start from 0.
// 5. The method must work correctly with:
//    - Numbers, strings, objects, `NaN`, `undefined`, `null`
//    - Sparse arrays (holes skipped but treated as `undefined`)
// 6. The original array must not be modified.

// Example Usage:
// const arr = [1, 2, 3];
// console.log(arr.includesPolyfill(2));          // true
// console.log(arr.includesPolyfill(4));          // false
// console.log([NaN].includesPolyfill(NaN));      // true
// console.log([1, 2, 3].includesPolyfill(3, -1)); // true

function includesPolyfill(searchElement, fromIndex = 0) {
  const arr = this;
  let startIndex = fromIndex >= 0 ? fromIndex : arr.length + fromIndex;
  for (let i = startIndex; i < arr.length; ++i) {
    if (isNaN(arr[i]) && isNaN(searchElement)) return true;
    if (!(i in arr) && searchElement === undefined) return true;
    if (arr[i] === searchElement) return true;
  }
  return false;
}

Array.prototype.includesPolyfill = includesPolyfill;
const arr = [1, 2, 3];
console.log(arr.includesPolyfill(2)); // truey
console.log(arr.includesPolyfill(4)); // false
console.log([NaN].includesPolyfill(NaN)); // true
console.log([1, 2, 3].includesPolyfill(3, -1)); // true
