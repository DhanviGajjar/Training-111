var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var myschema = new Schema({
    area_name: String,
    _city:
        {
          type: mongoose.Schema.Types.ObjectId, 
          ref: 'City'
        },
       
});

module.exports = mongoose.model('Area', myschema);
