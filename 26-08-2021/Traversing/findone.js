
// function Single(ar, size) {
//     let a = ar[0];

//     for (let i = 1; i < size; i++)

//         a = a ^ array[i];

//     return a;
// }


// let n = array.length;
// console.log(" element is " + Single(array, n));

function addone(ar,a) {
    let n = a.size();
    a[n - 1] += 1;
    let carry = a[n - 1] / 10;
    a[n - 1] = a[n - 1] % 10;

    for (let i = n - 2; i >= 0; i--) {
        if (carry == 1) {
            a[i] += 1;
            carry = a[i] / 10;
            a[i] = a[i] % 10;
        }
    }
    if (carry == 1) {
        arr.push();

    }

    for (let i = 0; i < arr.size(); i++)
        console.log("element is :" + ar[i]);

    
}

addone(a);
let ar=[1,2,3];