var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var myschema = new Schema({
    pro_qty: Number,
    _product: {
          type: mongoose.Schema.Types.ObjectId, 
          ref: 'Products'
        }
});

module.exports = mongoose.model('cart', myschema);