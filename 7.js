// Implement Array.prototype.some Polyfill

// Description:
// Recreate the functionality of JavaScript’s built-in Array.prototype.some method without using the original some. Your implementation should be added to the Array prototype so that it can be called on any array instance just like the native some.

// Requirements:
// 1. The method should accept a callback function as its first argument.
// 2. The callback should receive three arguments:
//    - currentValue (the current element being processed)
//    - index (the index of the current element)
//    - array (the array on which some was called)
// 3. The method may accept an optional second argument (thisArg) to be used as the value of `this` inside the callback.
// 4. The method should iterate through the array from left to right.
// 5. If the callback returns a truthy value for **any** element, return **true** immediately.
// 6. If the callback never returns truthy for any element, return **false**.
// 7. The method must **skip missing elements** in sparse arrays (do not call the callback for indices that do not exist).
// 8. If the callback is not a function, throw a TypeError.
// 9. The original array must not be modified.

// Example Usage:
// const arr = [5, 8, 12, 20];
// const result = arr.somePolyfill(num => num > 10);
// console.log(result); // true

function somePolyfill(callback, thisArg) {
  if (typeof callback !== "function") {
    throw new TypeError("Callback must be of type function");
  }
  if (thisArg !== undefined) {
    callback = callback.bind(thisArg);
  }
  const arr = this;
  for (let i = 0; i < arr.length; ++i) {
    if (i in arr) {
      if (callback(arr[i], i, arr)) return true;
    }
  }
  return false;
}
Array.prototype.somePolyfill = somePolyfill;
