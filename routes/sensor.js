const express = require('express');
const router = express.Router();

const SENSOR = require('../model/sensorReg');
const SENSOREVENT = require('../model/sensorevent');
const mid = require('./middleware');



/* GET users listing. */
router.get('/', function(req, res, next) {
  SENSOR.find().then(function(docs){
      res.json({
          status: 'success',
          msg: 'Sensorr Table',
          data: docs
      });
  })
});






/*=============================================
=            Admin Section            =
=============================================*/

//After creating sensor table comment this code

router.post('/sensor-registration', (req,  res) => {
    console.log(req.body)
    SENSOR.findOne({userID: req.body.userID}, function(err, user){
        if(user){
            res.json({
                status: 'error',
                msg: 'This Sensor Entry Already Exists In Our System'
            });
        }else{
            SENSOR.create(req.body, function (err, user) {
                if (!err) {
                    res.json({
                        status: 'success',
                        msg: 'Sensor Registed Successfully'
                    });     
                }else{
                    res.json({
                        status: 'error',
                        msg: err
                    })
                }
            });
        }
    })
});












/*=============================================
=            User Section            =
=============================================*/


// Get 
router.get('/getBLEid', mid.verifyToken, (req,  res) => {
    SENSOR.findOne({userID: req.authData.userID}).then(function(user){
        if(user){
            res.json({ 'status': 'successs', msg: '', data: {BLEid: user.sensorBlueToothID}});
        }else{
            res.json({ 'status': 'error', msg: 'Something went wrong', data: null});
        }
    })
});



// Get All Event Logs of Specific User
router.get('/store-events', mid.verifyToken, (req,  res) => {
    SENSOREVENT.findOne({sensorBlueToothID: req.authData.sensorBlueToothID}, (err, doc) => {
        if(!err){
            console.log(doc)
            res.json({
                status: 'success',
                msg: `${req.authData.userID} event logged data`,
                data: {eventData: doc}
            })
        }else{
            res.json({
                status: 'error',
                msg: 'Something went wrong',
                error: err
            });
        }
    })
});


// Store Event Logs
router.post('/store-event', mid.verifyToken, (req,  res) => {
    console.log(req.body)
    if(Object.keys(req.body).length !== 0){
        SENSOREVENT.findOneAndUpdate(
            {sensorBlueToothID: req.authData.sensorBlueToothID}, 
            {$push: {sensorEventLogs: req.body.eventLog }},
            { upsert: true, new: true, setDefaultsOnInsert: true },
            function(err, doc){
                // console.log('Error' , err);
                // console.log('Doc ' , doc);

                if(!err){
                    // console.log(doc)
                    res.json({
                        status: 'success',
                        msg: 'Successfully logged the event'
                    })
                }else{
                    res.json({
                        status: 'error',
                        msg: 'Something went wrong',
                        error: null
                    });
                }
            }
        )
    }else{
        res.json({
            status: 'error',
            msg: 'Event log object is null',
            error: null
        });
    }
});




module.exports = router;
