var array = [...new Array(100)]
  .map((_, index) => index)
  .sort(() => 0.5 - Math.random());

/*
  00001011
  00001101

  '7u 3d 1u 2u 4d 6d 5u 8d'
*/
// Split the array into halves and merge them recursively
async function mergeSort(arr) {
  if (arr.length === 1) {
    // return once we hit an array with a single item

    return arr;
  }

  const middle = Math.floor(arr.length / 2); // get the middle item of the array rounded down
  const left = arr.slice(0, middle); // items on the left side
  const right = arr.slice(middle); // items on the right side
  // promiseStack.push(mergeSort(left));
  // promiseStack.push(mergeSort(right));
  let [leftPromise, rightPromise] = await Promise.all([
    new Promise((resolve, reject) => resolve(mergeSort(left))),
    new Promise((resolve, reject) => resolve(mergeSort(right)))
  ]);

  return merge(leftPromise, rightPromise);
}
// Promise.resolve(mergeSort([3])).then(a => console.log("a", a));

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
mergeSort(list).then(v => console.log(v)); // [ 1, 2, 2, 3, 3, 3, 5, 6, 7, 8 ]

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
