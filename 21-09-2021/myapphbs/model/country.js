

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var myschema = new Schema({
    countryname: String
});

module.exports = mongoose.model('country', myschema);