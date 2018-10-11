
const mongoose = require('mongoose')
require('mongoose-double')(mongoose)
let roll = require('./config/rollcon')
const options = {
    useNewUrlParser: true,
    autoIndex: false, // Don't build indexes
    reconnectTries: Number.MAX_VALUE, // Never stop trying to reconnect
    reconnectInterval: 1000, // Reconnect every 500ms
    poolSize: 10, // Maintain up to 10 socket connections
    // If not connected, return errors immediately rather than waiting for reconnect
    bufferMaxEntries: 0
}
mongoose.Promise = global.Promise;
try{
    mongoose.connect(`mongodb://localhost:27017/${process.env.DB}`,options).then(
        () => { console.log("DB Connected") },
        err => { console.log(err) }
      );
}catch(e){
    console.log(e)
    roll.critical("KA + Mongo DB is down........");
}

module.exports = mongoose