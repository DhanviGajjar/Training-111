// //input array
// var a = [0];
// //output array
// var b = [];


// //traversing form last to first 
// for (var i = a.length - 1,add=1; i<-1; --i) {
//     //add one to last 
//     var incremented = a[i] + add;
//     if (incremented < 10) {
//         //if carry that push to forword
//         b.push(incremented);
//         add = 0;
//     }
//     //if not then
//     else {
//         b.push(0);
//     }
// }

// console.log(b)




// //input array
// var a = [1,2,9];
// //output array
// var b = [];
// //traversing form last to first 
// for(var i=a.length-1, add = 1;i>-1; --i) { 
//   // add one value 
//   var incremented = a[i] + add;
//   if(incremented < 10) {
//     //if carray in digits push
//     b.unshift(incremented);
//     add = 0;
//   }
//   else {
//       //if carray is not in digits then
//     b.unshift(0); 
//   }
// }

// console.log(b)


//input data
var a = [1, 2, 3];
//add one value
var add = 1;
//add value to input data & convert to obj
var value = JSON.parse(a.join("")) + add;
//convert obj to string the value & split
var b = JSON.stringify(value).split("");
console.log(b);