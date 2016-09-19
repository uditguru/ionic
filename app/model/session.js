var User = require('../model/user');
var jwtsimple = require('jwt-simple');

module.exports = function(req, res, next) {
  var token = (req.body && req.body.access_token) || (req.query && req.query.access_token) || req.headers['x-access-token'];

        if (token) {
          try {
            var decoded = jwt.decode(token, app.get('jwtTokenSecret'));

            // handle token here

          } catch (err) {
            return next();
          }
        } else {
          next();
        }

        if (decoded.exp <= Date.now()) {
          res.end('Access token has expired', 400);
        }
        User.findOne({ _id: decoded.iss }, function(err, user) {
          req.user = user;
        });
};