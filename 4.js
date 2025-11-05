/*
Implement Array.prototype.forEach Polyfill

Description:
Recreate the functionality of JavaScript’s built-in Array.prototype.forEach method without using the original forEach. Your implementation should be added to the Array prototype so that it can be called on any array instance just like the native forEach.

Requirements:
1. The method should accept a callback function as its first argument.
2. The callback should receive three arguments:
   - currentValue (the current element being processed)
   - index (the index of the current element)
   - array (the array on which forEach was called)
3. The method may accept an optional second argument (thisArg) to be used as the value of `this` inside the callback.
4. The method does **not** return anything (it always returns undefined).
5. The method should **not** modify the original array, unless the callback itself does so intentionally.
6. The method must **skip missing elements** in sparse arrays (do not execute the callback for indices that do not exist).
7. If the callback is not a function, throw a TypeError.

Example Usage:
const numbers = [1, 2, 3];
numbers.forEachPolyfill((num, index) => {
  console.log(`Index ${index}: ${num}`);
});
// Output:
// Index 0: 1
// Index 1: 2
// Index 2: 3

*/

function forEachPolyfill(callback, thisArg) {
  if (typeof callback !== "function") {
    throw new TypeError("Callback must of type function");
  }
  if (thisArg !== undefined) {
    callback = callback.bind(thisArg);
  }
  const arr = this;
  for (let i = 0; i < arr.length; i++) {
    if (i in arr) {
      callback(arr[i], i, arr);
    }
  }
}

Array.prototype.forEachPolyfill = forEachPolyfill;
