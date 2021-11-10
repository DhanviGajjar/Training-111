
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var myschema = new Schema({
    Firstname:String,
    Middlename:String,
    Lastname:String,
    Gender:String,
    Phone:String,
    Email:String,
    Password:String,
    

   
});

module.exports = mongoose.model('usercustom', myschema);

