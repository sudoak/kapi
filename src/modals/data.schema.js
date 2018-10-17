let mongoose  = require('mongoose'),
    Schema = mongoose.Schema,
    SchemaTypes = mongoose.Schema.Types;

var Data = mongoose.model('data', {
    data: {
        type: String,
        required: true,
        //minlength: 1
    },
    date: {
        type: String,
        require: true
    },
    timestamp:{
        type: String,
        required: true,
        //minlength: 1
    }
  });
  
  module.exports = Data