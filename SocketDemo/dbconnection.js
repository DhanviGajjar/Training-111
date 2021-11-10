
const  mongoose  = require("mongoose");
mongoose.Promise  = global.Promise;
const  url  =  "mongodb://Socket_test:Socket_test@localhost:27017/Socket_test";
const  connect  =  mongoose.connect(url, { useNewUrlParser: true  });
module.exports  =  connect;
