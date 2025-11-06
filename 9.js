// Implement Array.prototype.flat Polyfill (Deep Flattening)

// Description:
// Recreate the functionality of JavaScript’s built-in Array.prototype.flat method, but specifically handle deep flattening (i.e., flatten nested arrays of any depth). Your implementation should be added to the Array prototype so that it can be called on any array instance just like the native flat.

// Requirements:
// 1. The method should accept a single argument `depth`, which determines how many levels of nesting should be flattened.
// 2. If `depth` is:
//    - A number (e.g., 1, 2, 3), flatten the array up to that level.
//    - `Infinity`, flatten completely regardless of nesting level.
//    - `undefined`, treat as depth = 1.
// 3. The method must iterate through the array and flatten nested arrays according to the depth level.
// 4. Must not modify the original array — return a **new** flattened array.
// 5. Must **preserve non-array values** as they are.
// 6. Must **skip missing elements** in sparse arrays (holes should not be preserved).
// 7. Should work correctly for mixed types (numbers, strings, objects, etc.).
// 8. If depth is `0`, return the array as-is.

// Example Usage:
// const arr = [1, [2, [3, 4], 5], 6];

// arr.flatPolyfill();
// // => [1, 2, [3, 4], 5, 6]

// arr.flatPolyfill(2);
// // => [1, 2, 3, 4, 5, 6]

// arr.flatPolyfill(Infinity);
// // => [1, 2, 3, 4, 5, 6]

function flatPolyfill(depth = 1) {
  const arr = this;
  if (isFinite(depth) && depth === 0) return arr;
  let result = [];
  for (let i = 0; i < arr.length; ++i) {
    if (i in arr) {
      if (Array.isArray(arr[i])) {
        const flatted = flatPolyfill.call(arr[i], depth - 1);
        result = [...result, ...flatted];
      } else {
        result.push(arr[i]);
      }
    }
  }
  return result;
}

Array.prototype.flatPolyfill = flatPolyfill;

// Test Cases for flatPolyfill

console.log("---- Basic flatten (depth = 1) ----");
console.log([1, [2, 3], 4].flatPolyfill());
// Expected: [1, 2, 3, 4]

console.log("---- Flatten with depth = 2 ----");
console.log([1, [2, [3, 4], 5], 6].flatPolyfill(2));
// Expected: [1, 2, 3, 4, 5, 6]

console.log("---- Flatten with depth = Infinity ----");
console.log([1, [2, [3, [4]]]].flatPolyfill(Infinity));
// Expected: [1, 2, 3, 4]

console.log("---- depth = 0 (no flatten) ----");
console.log([1, [2, 3], 4].flatPolyfill(0));
// Expected: [1, [2, 3], 4]

console.log("---- Mixed value types (strings, objects) ----");
console.log([1, ["a", { x: 10 }], 3].flatPolyfill());
// Expected: [1, "a", { x: 10 }, 3]

console.log("---- Sparse array (holes must be skipped) ----");
const arrWithHoles = [1, , 3, [4, , 5]];
console.log(arrWithHoles.flatPolyfill(2));
// Expected: [1, 3, 4, 5]
// (Both holes skipped: in main array and inside nested array)

console.log("---- Large nesting with Infinity ----");
console.log([[[[[[42]]]]]].flatPolyfill(Infinity));
// Expected: [42]

console.log("---- Already flat array ----");
console.log([1, 2, 3].flatPolyfill());
// Expected: [1, 2, 3]

console.log("---- Array containing empty array ----");
console.log([1, [], 3].flatPolyfill());
// Expected: [1, 3]

console.log("---- Array with multiple nested levels mixed ----");
console.log([1, [2, [3, [4, [5]]]]].flatPolyfill(3));
// Expected: [1, 2, 3, [4, [5]]]
