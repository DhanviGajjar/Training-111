

// function Single(ar,size) {

//     let a = ar[0];
//     for (let i = 1; i <size; i++)

//         a = a ^ array[i];

//     return a;
// }
// let array = [1,2,2];
// let n = array.length;
// console.log(" element is " + Single(array, n));







//function contain arr & occurence
// function Single(arr, occurence) {
//     //check  that arr is not empty
//     if (arr.length < 0) {
//         console.log("Array is empty");
//     } 
//     //if not empty then data
//     else {
//         let data = {}

// //loop for traversing arr till arr.length
//         for (let i = 0; i < arr.length; i++) {
//             //if data is double  then add +1
//             if (data[arr[i]]) {
//                 data[arr[i]] = data[arr[i]] + 1;

//             } 
//             //else 
//             else {
//                 data[arr[i]] = 1;

//             }
//         }

//         //return the json val
        
//         // if (!Object.values(data).includes(occurence)) {       
//         //     console.log(" occurence is not available.");
//         // } 
//         // else {
//         //     //  key, data & occurence
//             for (let key in data) {
//                 if (data[key] == occurence) {
//                     console.log(" Data is : " + key + " || occurence : " + data[key]);

//                 }

//             }
       
//     }
// }
// 

//
//
//
//



// const arr = [1,2,2,3]
// Single(arr, 1);

var input = [1,1,2,3];

var output = [];

// loop over input array in reverse order
for(var i=input.length-1, toadd = 1; i>-1; --i) { 
  // add value `toadd` to current digit
  var incremented = input[i] + toadd;
  if(incremented < 10) {
    output.unshift(incremented); // add to front of output array
    toadd = 0; // reset toadd for all following digits, if we had no overflow
  }
  else {
    output.unshift(0); // overflow occurred, so we add 0 to front of array instead
  }
}

console.log(output)









// var a = [9];

// var b = [];

// // loop over input array in reverse order
// for(var i=a.length-1; i>-1; --i) { 
//   // add value `add` to current digit
//   var add = 1
//   var incremented = a[i] + add;
//   if(incremented < 20) {
//     b.push(incremented); // add to front of output array
//     add = 0; // reset toadd for all following digits, if we had no overflow
//   }
//   else {
//     b.push(0); // overflow occurred, so we add 0 to front of array instead
//   }
// }

// console.log(b)
