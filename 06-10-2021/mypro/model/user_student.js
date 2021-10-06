var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var myschema = new Schema({
    stud_name : String,
    stud_mobile : Number,
    stud_email : String,
    stud_gender :String,
    stud_dob :String,
    stud_hobbies :String,
    
});

module.exports = mongoose.model('stud',myschema);