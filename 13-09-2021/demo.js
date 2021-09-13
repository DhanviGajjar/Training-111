var fs = require('fs');

//File Open
fs.open('demo.txt', 'w', function (err, file) {
if (err) throw err;
console.log('File Open in Write Mode!');
});

//Create File
fs.writeFile('test.txt', 'Hello Word!', function (err) {
if (err) throw err;
console.log('File Created!');
});

//File Content Append
fs.appendFile('test.txt', 'Hello Node JS!', function (err) {
    if (err) throw err;
    console.log('File Content Updated!');
    });

//File Rename
fs.rename('demo.txt', 'demo1.txt', function (err) {
    if (err) throw err;
    console.log('File Renamed!');
    });
/*
//Delete file code
fs.unlink('demo1.txt', function (err) {
    if (err) throw err;
    console.log('File deleted ');
    });
*/
//Read File (Asynchronous)
fs.readFile("test.txt","utf-8", function (err, data) {
    if (err) throw err;
    console.log(data);
    });

//// Synchronous Read
var data = fs.readFileSync('test.txt');
console.log("Synchronous read: " + data.toString());
console.log("Program Ended");


//Read html file
var http = require('http');
http.createServer(function (req, res) {
fs.readFile('demo.html', function(err, data) {
res.writeHead(200, {'Content-Type': 'text/html'});
res.write(data);
res.end();
});
}).listen(3000);
console.log("Server Started ");

//Get File Information using stats
fs.stat('test.txt', function (err, stats) {
    if (err) {
    return console.error(err);
    }
    //Check File Information
    console.log(stats);
    // Check file type
    console.log("isFile ? " + stats.isFile());
    console.log("isDirectory ? " + stats.isDirectory());
    });
    
//Print FileName
console.log( __filename );

//print diractory name
console.log(__dirname);