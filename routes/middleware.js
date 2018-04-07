const jwt = require('jsonwebtoken')
const config = require('../configs/config')


module.exports.verifyToken = function (req, res, next) {
    const bearerHeader = req.headers['authorization'];
    if (typeof bearerHeader !== 'undefined') {
        const bearer = bearerHeader.split(' ');
        const bearerToken = bearer[1];
        req.token = bearerToken;
        jwt.verify(req.token, config.jwt_secret, (err, authData) => {
            if(err){
                res.status(403).json({
                    status: 'error',
                    msg: 'Your token has expired. Please login again'
                });
            }else{
                console.log('Auth data ', authData.user)
                req.authData = authData.user;
                next()
            }
        })
    }else {
        res.status(403).json({
            status: 'error',
            msg: 'You need to login again'
        });
    }
};