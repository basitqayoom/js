/*
Implement Array.prototype.map Polyfill

Description:
Recreate the functionality of JavaScript's built-in Array.prototype.map method without using the original map function. Your implementation should be added to the Array prototype so that it can be called on any array instance just like the native map.

Requirements:
1. The method should accept a callback function as its first argument.
2. The callback function should receive three arguments:
   - currentValue (the current element being processed)
   - index (the index of the current element)
   - array (the array on which map was called)
3. The method should optionally accept a second argument (thisArg) which defines the value of `this` inside the callback.
4. The original array must not be modified. Return a new array containing the results of applying the callback to each element.
5. The method must skip missing elements in sparse arrays (i.e., it should not call the callback for indexes that do not exist).
6. If the callback is not a function, throw a TypeError.

Example Usage:
const numbers = [1, 2, 3];
const doubled = numbers.mapPolyfill(x => x * 2);
console.log(doubled); // [2, 4, 6]
console.log(numbers); // [1, 2, 3]

*/

function mapPolyfill(callback, thisArg) {
  if (typeof callback !== "function") {
    throw new TypeError("callback cannot be of type function only");
  }
  const arr = this;
  if (thisArg !== undefined) {
    callback = callback.bind(thisArg);
  }
  const result = [];
  for (let i = 0; i < arr.length; i++) {
    if (i in arr) {
      result[i] = arr[i];
    }
  }
  return result;
}

Array.prototype.mapPolyfill = mapPolyfill;

// Testing the mapPolyfill

const numbers = [1, 2, 3, 4];

function multiplyByTwo(value) {
  return value * 2;
}

const result = numbers.mapPolyfill(multiplyByTwo);

console.log(result); // Expected: [2, 4, 6, 8]
console.log(numbers); // Original array should remain unchanged: [1, 2, 3, 4]

// Testing with index + array args
const result2 = numbers.mapPolyfill((value, index, array) => {
  return value + index + array.length;
});
console.log(result2);
// Expected: [1+0+4, 2+1+4, 3+2+4, 4+3+4] => [5, 7, 9, 11]

// Testing with thisArg
const obj = { add: 10 };
const result3 = numbers.mapPolyfill(function (value) {
  return value + this.add;
}, obj);

console.log(result3); // Expected: [11, 12, 13, 14]
