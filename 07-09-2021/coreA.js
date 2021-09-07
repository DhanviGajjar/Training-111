var http=require('http');

http.createServer(function(req,res){
    res.writeHead(200,{'Content-Type':'text/plain'});

    if(req.url=="/student"){
    res.end("welcome student");
}
else if(req.url=="/admin"){
    res.end("welcome admin");
}else{
    res.end("welcome to node js");
}


}).listen(8081);

console.log('server is starting at http://127.0.0.1:8081/');