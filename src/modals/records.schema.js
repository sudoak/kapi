let mongoose  = require('mongoose'),
    Schema = mongoose.Schema,
    SchemaTypes = mongoose.Schema.Types;

var Records = mongoose.model('records', {
    clientId: {
        type: String,
        required: true,
        //minlength: 1
    },
    deviceId: {
        type: String,
        required: true,
        //minlength: 1
    },
    totalizedWeight: {
        type: SchemaTypes.Double,
        required: true,
        //minlength: 1
    },
    speed: {
        type: SchemaTypes.Double,
        required: true,
        //minlength: 1
    },
    flowRate: {
        type: SchemaTypes.Double,
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
  
  module.exports = Records