/*
Implement Array.prototype.reduce Polyfill

Description:
Recreate the functionality of JavaScript's built-in Array.prototype.reduce method without using the original reduce. Your implementation should be added to the Array prototype so it can be called on any array instance just like the native reduce.

Requirements:
1. The method should accept a callback function as its first argument.
2. The callback should receive four arguments:
   - accumulator (the accumulated value returned from the previous iteration)
   - currentValue (the value of the current element being processed)
   - index (the index of the current element)
   - array (the array on which reduce was called)
3. The method may accept an optional second argument (initialValue).
4. If an initialValue is provided:
   - The accumulator should start as initialValue.
   - Iteration should start from index 0.
5. If an initialValue is NOT provided:
   - The first element of the array becomes the initial accumulator.
   - Iteration should start from index 1.
6. The method must skip missing elements in sparse arrays (i.e., do not call the callback on indexes that do not exist).
7. If the array is empty and no initialValue is provided, throw a TypeError.
8. If the callback is not a function, throw a TypeError.
9. The original array must not be modified.

Example Usage:
const numbers = [1, 2, 3, 4];
const sum = numbers.reducePolyfill((acc, val) => acc + val, 0);
console.log(sum); // 10
*/
function reducePolyfill(callback, initialValue) {
  if (typeof callback !== "function") {
    throw new TypeError("Callback should be of type function");
  }
  const arr = this;
  if (arr.length === 0 && initialValue === undefined) {
    throw new TypeError(
      "TypeError: Reduce of empty array with no initial value",
    );
  }
  let res = initialValue;
  if (initialValue === undefined) {
    res = arr[0];
  }
  for (let i = 0; i < arr.length; ++i) {
    if (i === 0 && initialValue === undefined) continue;
    if (i in arr) {
      res = callback(res, arr[i], i, arr);
    }
  }
  return res;
}

Array.prototype.reducePolyfill = reducePolyfill;

const numbers = [1, 2, 3, 4, 5];
const sum = numbers.reducePolyfill((acc, val) => acc + val, 0);
console.log(sum); // 10
