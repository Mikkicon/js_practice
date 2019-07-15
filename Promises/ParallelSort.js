var array = [...new Array(100)]
  .map((_, index) => index)
  .sort(() => 0.5 - Math.random());

/*
  00001011
  00001101

  '7u 3d 1u 2u 4d 6d 5u 8d'
*/
// let promise1 = new Promise((resolve, reject) =>
//   setTimeout(resolve, 5000, "foo")
// );
// let promise2 = new Promise((resolve, reject) =>
//   setTimeout(resolve, 5000, "bar")
// );

// Promise.all([promise2, promise1]).then(val => console.log(val));

// let arr = [4, 2, 5, 3, 7, 5, 9, 5];
// let promiseArray = [];

// function fillStack() {
//   for (let i = 0; i < 3; i++) {
//     const middle = Math.floor(arr.length / 2); // get the middle item of the array rounded down
//     const left = arr.slice(0, middle); // items on the left side
//     const right = arr.slice(middle); // items on the right side

//     promiseArray.push(Promise.resolve(left.sort()));
//     promiseArray.push(Promise.resolve(right.sort()));
//     arr = arr.slice(middle);
//   }
// }

// let aaa = Promise.resolve(fillStack());
// aaa.then(value => console.log(promiseArray));
// let mergeArray = [];
// function mrg(promiseArray) {
//   for (let i = 0; i < 3; i++) {
//     let a = promiseArray.pop();
//     let b = promiseArray.pop();
//     mergeArray.push(merge(a, b));
//   }
//   return mergeArray;
// }

// Promise.all(promiseArray)
//   .then(promises => {
//     console.log(promises);
//     mrg(promises);
//     return mergeArray;
//   })
//   .then(a => console.log("MergeArray: ", a));
var promiseStack = [];
// Split the array into halves and merge them recursively
function mergeSort(arr) {
  if (arr.length === 1) {
    // return once we hit an array with a single item

    return arr;
  }

  const middle = Math.floor(arr.length / 2); // get the middle item of the array rounded down
  const left = arr.slice(0, middle); // items on the left side
  const right = arr.slice(middle); // items on the right side
  // promiseStack.push(mergeSort(left));
  // promiseStack.push(mergeSort(right));

  Promise.all([
    new Promise((resolve, reject) => resolve(mergeSort(left))),
    new Promise((resolve, reject) => resolve(mergeSort(right)))
  ]).then(([leftPromise, rightPromise]) => merge(leftPromise, rightPromise));
  // return merge(promiseStack.pop(), promiseStack.pop());
}

// compare the arrays item by item and return the concatenated result
function merge(left, right) {
  let result = [];
  let indexLeft = 0;
  let indexRight = 0;

  while (indexLeft < left.length && indexRight < right.length) {
    if (left[indexLeft] < right[indexRight]) {
      result.push(left[indexLeft]);
      indexLeft++;
    } else {
      result.push(right[indexRight]);
      indexRight++;
    }
  }
  return result.concat(left.slice(indexLeft)).concat(right.slice(indexRight));
}

const list = [2, 5, 1, 3, 7, 2, 3, 8, 6, 3];
console.log(mergeSort(list)); // [ 1, 2, 2, 3, 3, 3, 5, 6, 7, 8 ]

var cmp = mask => {
  mask = mask
    .toLowerCase()
    .replace(/(.{2})/gi, "$1 ")
    .trim()
    .split(" ")
    .map(_ => ({ order: Number(_[0]), direction: _[1] }))
    .map((_, bit, A) => ({ bit: A.length - 1 - bit, ..._ }))
    .map((_, bit, A) => ({ ..._, bit: x => (x >> _.bit) & 1 }))
    .sort((a, b) => a.order - b.order);
  return (
    mask,
    (a, b) => {
      const m = mask.find(_ => _.bit(a) !== _.bit(b));
      return (
        m &&
        ((m.bit(a) < m.bit(b) && m.direction === "u") ||
          (m.bit(a) > m.bit(b) && m.direction === "d"))
      );
    }
  );
};
// cmp("7u3d1u2u4d6d5u8d");
// console.log('cmp("7u3d1u2u4d6d5u8u")(0, 0)');
// console.log(cmp("7u3d1u2u4d6d5u8u")(1, 1));
