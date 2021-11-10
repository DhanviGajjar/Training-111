
// // CPP implementation for Adding one
// // to number represented by digits
// #include <bits/stdc++.h>
// using namespace std;

// // function for adding one to number
// void incrementVector(vector<int> &a)
// {
//     int n = a.size();

//     // Add 1 to last digit and find carry
//     a[n-1] += 1;
//     int carry = a[n-1]/10;
//     a[n-1] = a[n-1] % 10;

//     // Traverse from second last digit
//     for (int i=n-2; i>=0; i--)
//     {
//         if (carry == 1)
//         {
//            a[i] += 1;
//            carry = a[i]/10;
//            a[i] = a[i] % 10;
//         }
//     }

//     // If carry is 1, we need to add
//     // a 1 at the beginning of vector
//     if (carry == 1)
//       a.insert(a.begin(), 1);
// }

// // driver code
// int main()
// {
//     vector<int> vect{1, 7, 8, 9};

//     incrementVector(vect);

//     for (int i=0; i<vect.size(); i++)
//        cout << vect[i] << " ";

//     return 0;
// }





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



// //input data
// var a = [1, 2, 3];
// //add one value
// var add = 1;
// //add value to input data & convert to obj
// var value = JSON.parse(a.join("")) + add;
// //convert obj to string the value & split
// var b = JSON.stringify(value).split("");
// console.log(b);
