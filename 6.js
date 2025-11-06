// Implement Array.prototype.findIndex Polyfill

// Description:
// Recreate the functionality of JavaScript’s built-in Array.prototype.findIndex method without using the original findIndex. Your implementation should be added to the Array prototype so that it can be called on any array instance just like the native findIndex.

// Requirements:
// 1. The method should accept a callback function as its first argument.
// 2. The callback should receive three arguments:
//    - currentValue (the current element being processed)
//    - index (the index of the current element)
//    - array (the array on which findIndex was called)
// 3. The method may accept an optional second argument (thisArg) to be used as the value of `this` inside the callback.
// 4. The method should iterate through the array from left to right.
// 5. It must return the **index** of the first element for which the callback returns a truthy value.
// 6. If no element satisfies the callback condition, return **-1**.
// 7. The method must **skip missing elements** in sparse arrays (do not call the callback for indices that do not exist).
// 8. If the callback is not a function, throw a TypeError.
// 9. The original array must not be modified.

// Example Usage:
// const arr = [5, 8, 12, 20];
// const index = arr.findIndexPolyfill(num => num > 10);
// console.log(index); // 2

function findIndexPolyfill(callback, thisArg) {
  if (typeof callback !== "function") {
    throw new TypeError("Callback must be of type function");
  }
  if (thisArg !== undefined) {
    callback = callback.bind(thisArg);
  }
  const arr = this;
  for (let i = 0; i < arr.length; ++i) {
    if (i in arr) {
      if (callback(arr[i], i, arr)) {
        return i;
      }
    }
  }
  return -1;
}

Array.prototype.findIndexPolyfill = findIndexPolyfill;
