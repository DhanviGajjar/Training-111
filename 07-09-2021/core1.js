var http=require('http');
http.createServer(function (req,res) {
    res.writeHead(200,{'content-Type':'text/plain'});
    res.end("welcome");
}).listen(3000);
console.log('server is starting at http://127.0.0.1:3000/');