var loops = 0;
var triangle = "";
while(loops < 7)
{
    triangle += "#"
    console.log(triangle)
    loops++
}


//fizzbuzz
var count = 1;
while (count <= 100)
{
    if ((count % 3 == 0) && (count % 5 == 0))
    {
        console.log("FizzBuzz");
    }
    else if (count % 3 == 0)
    {
    console.log("Fizz");
    }
    else if (count % 5 == 0)
    {
        console.log("Buzz");
    }
    else
    {
        console.log(count);
     }
    count++
}


//chess board
var size = 8;
var len = 1;
var wid = 1;
var txt = "";

while (len <= size)
{
    txt = "";
    while (wid <= size)
    {
        if (!(len % 2)) {wid++}
        if (wid % 2) {txt += " "}
        if (!(wid % 2)) {txt += "#"}
        if (!(len % 2)) {wid--}
        wid++
    }
    console.log(txt);
    len++;
    wid = 1;
}