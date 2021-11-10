var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var myschema = new Schema({
    product_name: String,
    _subcategory:
        {
          type: mongoose.Schema.Types.ObjectId, 
          ref: 'subcategory'
        }
      
});

module.exports = mongoose.model('Product', myschema);
