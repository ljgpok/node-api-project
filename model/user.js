var mongoose = require('mongoose');

//Define a schema
var Schema = mongoose.Schema;

var schema = new Schema({
    userID: { type: String,  trim: true },
    pinCode: { type: String, trim: true }
});

var Contestant = mongoose.model('User', schema);


module.exports = Contestant;
