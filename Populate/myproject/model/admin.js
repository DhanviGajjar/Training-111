var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var myschema = new Schema({
            Email: String,
            Password:String
    
       
});

module.exports = mongoose.model('Admin', myschema);
