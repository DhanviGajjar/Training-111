var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var myschema = new Schema({
   name: String,
   email_id: String,
   contact: String,
   experience:String,
   department:String,
   salary:String,
    
});

module.exports = mongoose.model('emp', myschema);