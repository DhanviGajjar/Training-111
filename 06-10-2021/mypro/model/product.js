var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var myschema = new Schema({
    pro_name : String,
    pro_details : String,
    pro_price : Number,
    pro_qty: Number,
    
});
module.exports = mongoose.model('Products',myschema);