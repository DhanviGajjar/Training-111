var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var myschema = new Schema({
    sub_category_name: String,
    _category:
        {
          type: mongoose.Schema.Types.ObjectId, 
          ref: 'Category'
        }
      
});

module.exports = mongoose.model('subcategory', myschema);