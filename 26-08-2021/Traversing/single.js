
// //function having arr & is size
// function Single(ar,size) {
//     let a = ar[0];
// //loop to traverse till arr size
//     for (let i = 1; i <size; i++)
// //xor for chosing non empty
//         a = a ^ array[i];

//     return a;
// }
// arr
// let array = [1,2,2];
// let n = array.length;
// console.log(" element is " + Single(array, n));


//function contain arr & occurence
function Single(arr, occurence) {
    //check  that arr is not empty
    if (arr.length < 0) {
        console.log("Array is empty");
    }
    //if not empty then data
    else {
        let data = {}

        //loop for traversing arr till arr.length
        for (let i = 0; i < arr.length; i++) {
            //if data is double  then add +1
            if (data[arr[i]]) {
                data[arr[i]] = data[arr[i]] + 1;

            }
            //else 
            else {
                data[arr[i]] = 1;

            }
        }
        //retun json val
        if (!Object.values(data).includes(occurence)) {
            console.log("no occurance");
        }
        else {
            for (let key in data) {
                if (data[key] == occurence) {
                    console.log(" Data is : " + key + "  occurence : " + data[key]);

                }

            }

        }


    }
}


const arr = [1, 2, 2, 3]
Single(arr, 1);


