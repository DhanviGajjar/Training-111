var string="",
var data ={
    "2" :"abc",
    "3" :"def",
    "4" :"ghi",
    "5" :"jkl",
    "6" :"nmo",
    "7" :"pqrs",
    "8" :"tuv",
    "9" :"wxyz",
}
inArray=[]

for(char of String){
 if((char == inArray[(inArray.length)-1]) | inArray.length ==0){
    inArray.push(char)
 }
 else{
     var dataString =data[[inArray[0]]]
     console.log(dataString[inArray.length-1])
     inArray=[]
     inArray.push(char)
 }
}
var dataString = data[[inArray[0]]]
console.log(dataString[inArray.length-1])