var http=require('http');

http.createServer(function(req,res){


    res.writeHead(200,{'Content-Type':'text/plain'});
    res.end("welcome to node js 1");

}).listen(8081);

console.log('server is starting at http://127.0.0.1:8081/');