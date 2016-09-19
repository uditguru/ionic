var User = require('../model/user');
var session = require('../model/session');
var jwt  = require('jwt-simple');
var config = require('../config/database');


 

var functions = {


    authenticate: function(req, res) {
        User.findOne({
            name: req.body.name
        }, function(err, user){
            if (err) throw err;
            if(!user){
                return res.status(403).send({success: false, msg: 'Authenticaton failed, user not found.'});
            } else {
                user.comparePassword(req.body.password, function(err, isMatch){
                    if(isMatch && !err) {
                        var token = jwt.encode(user, config.secret);
                        res.json({success: true, token:  token});
                    } else {
                        return res.status(403).send({success: false, msg: 'Authenticaton failed, wrong password.'});
                    }
                })
            }
        })
    },


};
module.exports = functions;