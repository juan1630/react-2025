const myArray:number[] = [1,2,3,4,5,6,7];
myArray.push(9)

const myArray2 = [...myArray];
myArray2.push(8);

console.log(myArray, "array 1");
console.log(myArray2, "array 2");
