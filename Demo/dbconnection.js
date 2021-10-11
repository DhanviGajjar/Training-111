
const  mongoose  = require("mongoose");
mongoose.Promise  = global.Promise;
const  url  =  "mongodb://socketio:socketio@localhost:27017/socketio";
const  connect  =  mongoose.connect(url, { useNewUrlParser: true  });
module.exports  =  connect;
