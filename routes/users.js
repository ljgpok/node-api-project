var express = require('express');
var router = express.Router();
var SENSOR = require('../model/sensorReg');
var jwt = require('jsonwebtoken');
const config = require('../configs/config');
var mid = require('./middleware');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});






/*=============================================
=            USER LOGIN            =
=============================================*/

router.post('/login', function(req, res){
  console.log('------------------------------------');
  console.log('-----------LOGIN REQUEST------------');
  console.log('------------------------------------');
  console.log(req.body)
  
  SENSOR.findOne({userID: req.body.userID}).then(function(user){
    console.log('user ' , user);
    if(user){
      if(user.pinCode === req.body.pinCode ){
        let userToken = {
          userID: user.userID,
          sensorBlueToothID: user.sensorBlueToothID
        }

        jwt.sign({user: userToken}, config.jwt_secret, (err, token) => {
          console.log('Working1');
          res.json({
            status: 'success',
            msg: 'Login Successfull',
            data: { userToken: token}
          });
        })
      }else{
        res.json({
          status: 'error',
          msg: 'Invalid pincode'
        });  
      }
    }else{
      res.json({
        status: 'error',
        msg: 'This is invalid user and pincode'
      });
    }
  })
})





/*=============================================
=            USER LOGOUT            =
=============================================*/

//This is an extra route.
//Logout can be done on front end by deleteing token
router.get('/logout', mid.verifyToken, function(req, res){
  res.json({
    status: 'success',
    msg: 'User log out successfully',
    data: null
  })
})

module.exports = router;
