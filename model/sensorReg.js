var mongoose = require('mongoose');

//Define a schema
var Schema = mongoose.Schema;

var schema = new Schema({
    userID: { type: String,  trim: true },
    pinCode: { type: String, trim: true },
    sensorBlueToothID: { type: String, trim: true }
});

var SensorModel = mongoose.model('Sensor', schema);


module.exports = SensorModel;
