var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var myschema = new Schema({
    cat_name : String,
});

module.exports = mongoose.model('Category',myschema);
