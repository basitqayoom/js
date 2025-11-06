// Implement Array.prototype.every Polyfill

// Description:
// Recreate the functionality of JavaScript’s built-in Array.prototype.every method without using the original every. Your implementation should be added to the Array prototype so it can be called on any array instance just like the native every.

// Requirements:
// 1. The method should accept a callback function as its first argument.
// 2. The callback should receive three arguments:
//    - currentValue (the current element being processed)
//    - index (the index of the current element)
//    - array (the array on which every was called)
// 3. The method may accept an optional second argument (thisArg) to be used as the value of `this` inside the callback.
// 4. Iterate from left to right.
// 5. If the callback returns a falsy value for **any** visited element, return **false** immediately.
// 6. If the callback returns truthy for **all** visited elements, return **true**.
// 7. **Skip missing elements** in sparse arrays (do not call the callback for indices that do not exist).
// 8. If the callback is not a function, throw a **TypeError**.
// 9. The original array must not be modified.

// Example Usage:
// const arr = [2, 4, 6];
// const allEven = arr.everyPolyfill(x => x % 2 === 0);
// console.log(allEven); // true

function everyPolyfill(callback, thisArg) {
  if (typeof callback !== "function") {
    throw new TypeError("Callback must be of type function");
  }
  if (thisArg !== undefined) {
    callback = callback.bind(thisArg);
  }
  const arr = this;
  for (let i = 0; i < arr.length; ++i) {
    if (i in arr) {
      if (!callback(arr[i], i, arr)) return false;
    }
  }
  return true;
}
Array.prototype.everyPolyfill = everyPolyfill;
