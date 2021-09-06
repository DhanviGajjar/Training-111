/* hello world */

console.log("Hello, World!");               

/* sum */

var a=5
var b=4
var c=a+b
console.log("output of sum  is" + c);

/* swap  */

a=a+b
b=a-b
a=a-b
console.log("output of swap is:" );
console.log(a);
console.log(b);

/* increment decrement */

var x=10
var y
var z
y=x++
z=++x
console.log("output of increment decrement is:" );
console.log(x);
console.log(y);
console.log(z);

/* conditional operator */

var a=4 , b=5, x
x=(a>b)?a:b

console.log("output of conditional operator is: ");
console.log(x);

/* if -else */

var a=4
if (a%2 == 0)
{
    console.log("a is even no");
}
else{
    console.log("a is odd no");
}

console.log("output is");

/* nested if-else */

var a=5
var b=6
var c=7
if(a>b)
{
    if(a>c){
    console.log("a is greater");
    }
    else{
        console.log("b is greater");
    }

}
else{
    if(b>c)
    {
        console.log("b is greater");
    }
    else{
        console.log("c is greater");

    }

}

/* fibonacci series */

var i,n=9,a=1,b=1,c;
console.log(a,b);
for(i=3;i<=n;i++)
{
    c=a+b
    console.log(c);
    a=b
    b=c
}

/* star */

var i,j;
for(i=1;i<=5;i++)
{
    for(j=1;j<=i;j++)
    {
        console.log("*");
        
    }
    
}









