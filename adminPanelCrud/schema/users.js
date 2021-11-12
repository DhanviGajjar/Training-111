
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var myschema = new Schema({
    firstname:String,
    lastname:String,
    address:String,
    gender:String,
    hobby:String,
    interestArea:String,
    photo:String,
});

module.exports = mongoose.model('users', myschema);

