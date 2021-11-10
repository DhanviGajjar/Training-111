
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var myschema = new Schema({
    name:String,
    email:String,
    
});

module.exports = mongoose.model('form', myschema);

