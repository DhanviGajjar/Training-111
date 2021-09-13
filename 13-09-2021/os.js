//OS Module
const os=require('os');
console.log("os.arch(): \n",os.arch());
console.log("os.cpus(): \n", os.cpus());
//console.log("os.networkinterfaces(): \n",os.networkinterfaces());
 console.log("os.freemem(): \n",os.freemem());
 console.log("os.homedir(): \n",os.homedir());
 console.log("os.hostname(): \n",os.hostname());
 console.log("os.endianness(): \n",os.endianness());
 console.log("os.loadavg(): \n",os.loadavg());
 console.log("os.platform(): \n",os.platform());
 console.log("os.release(): \n",os.release());
 console.log("os.tmpdir(): \n",os.tmpdir());
 console.log("os.totalmem(): \n",os.totalmem());
 console.log("os.type(): \n",os.type());
 console.log("os.uptime(): \n",os.uptime());
 //console.log("os.userinfo([options]): \n",os.userinfo([options]));

 //path module
 var path = require("path"); 
 // Normalization 
 console.log('normalization : ' + path.normalize('/dhanvi/..')); 
 // Join 
 console.log('joint path : ' + path.join('/test', 'technolabs', 'node/newfolder', 'tab', '..')); 
 // Resolve 
 console.log('resolve : ' + path.resolve('path_example.js')); 
 // Extension 
 console.log('ext name: ' + path.extname('path_example.js')); 


//parse()
 querystring = require('querystring'); 
const obj1=querystring.parse('name=dhanvi'); 
 console.log(obj1); 

//stringify()

querystring = require('querystring'); 
 const qs1=querystring.stringify({name:'dhanvi',company:'WCG'}); 
 console.log(qs1);



// include url module
var url = require('url');
var address = 'http://localhost:8080/index.php?type=page&action=update&id=5221';
var q = url.parse(address,true);
console.log(q.host); //returns 'localhost:8080'
console.log(q.pathname); //returns '/index.php'
console.log(q.search); //returns '?type=page&action=update&id=5221'

var qdata = q.query; // returns an object: { type: page, action: 'update',id='5221' }
console.log(qdata.type); //returns 'page'
console.log(qdata.action); //returns 'update'
console.log(qdata.id); //returns '5221'