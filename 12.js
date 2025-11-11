// Implement Array.prototype.flatMap Polyfill

// Description:
// Recreate JavaScript’s built-in `Array.prototype.flatMap()` method without using the native one.

// This method first maps each element using a provided `callback` function, then flattens the result into a new array (depth = 1).
// It should be added to the `Array.prototype`.

// Requirements:
// 1. Accept two parameters:
//    - `callback(currentValue, index, array)`
//    - `thisArg` (optional) → used as `this` when executing the callback.
// 2. Apply `callback` to each element of the array.
// 3. If the callback’s return value is an array → flatten it one level.
// 4. If it’s not an array → push it directly.
// 5. Skip holes in sparse arrays.
// 6. The method must not mutate the original array.
// 7. Throw a `TypeError` if `callback` is not a function.
// 8. Return a new flattened array.
// 9. Support `thisArg` binding.

// ---

// ### **Expected Example Behavior**

// ```js
// const arr = [1, 2, 3];

// console.log(arr.flatMapPolyfill(x => [x, x * 2]));
// // [1, 2, 2, 4, 3, 6]

// const words = ["hi", "world"];
// console.log(words.flatMapPolyfill(w => w.split("")));
// /* [
//   "h","i",
//   "w","o","r","l","d"
// ] */

// const nums = [1, , 3];
// console.log(nums.flatMapPolyfill(x => [x, x * 2]));
// // [1, 2, 3, 6]  (hole skipped)

// const nested = [1, 2];
// console.log(nested.flatMapPolyfill(x => [[x]]));
// // [[1], [2]]  (only one level flatten)

function flatMapPolyfill(callback, thisArg) {
  if (typeof callback !== "function") {
    throw new TypeError("Callback must be of type function");
  }
  if (thisArg !== undefined) {
    callback.bind(thisArg);
  }
  const arr = this;
  const res = [];
  for (let i = 0; i < arr.length; ++i) {
    if (i in arr) {
      const returnedVal = callback(arr[i], i, arr);
      if (Array.isArray(returnedVal)) {
        res.push(...returnedVal);
      } else {
        res.push(returnedVal);
      }
    }
  }
  return res;
}
