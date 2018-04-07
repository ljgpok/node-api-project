var mongoose = require('mongoose');

//Define a schema
var Schema = mongoose.Schema;

var schema = new Schema({
    sensorBlueToothID: { type: String, trim: true },
    sensorEventLogs: []
});

var SensorEventLogModel = mongoose.model('SensorEvent', schema);


module.exports = SensorEventLogModel;
