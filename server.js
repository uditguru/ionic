// Set up
var passport = require('passport');
var express  = require('express');
var app      = express();                               // create our app w/ express
var mongoose = require('mongoose');                     // mongoose for mongodb
var morgan = require('morgan');             // log requests to the console (express4)
var bodyParser = require('body-parser');    // pull information from HTML POST (express4)
var methodOverride = require('method-override'); // simulate DELETE and PUT (express4)
var cors = require('cors');
var jwt = require('jsonwebtoken');
var router = require('../routes/routes');

// Configuration
mongoose.connect('mongodb://localhost/Goserv',function (err, res) {
      if (err) {
      console.log ('ERROR connecting to: ');
      } else {
      console.log ('Succeeded connected to: ' );
      }
    });

app.use(express.static('public'));



app.use(morgan('dev'));                                         // log every request to the console
app.use(bodyParser.urlencoded({'extended':'true'}));            // parse application/x-www-form-urlencoded
app.use(bodyParser.json());                                     // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(methodOverride());
app.use(cors());
app.use(passport.initialize());
require('../config/passport')(passport);
var requireAuth = passport.authenticate('local', { session: false });

app.use(router);
app.use(function(req, res, next) {
   res.header("Access-Control-Allow-Origin", "*");
   res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
   next();
});



passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});

    var Schema = mongoose.Schema;

        var schema = new Schema({

        type: String,
        address: String,

        servicecost: String

    }, { collection: 'Goserv' });





    var Goserv = mongoose.model('Goserv', schema  );

     module.exports = Goserv ;


        app.get('/api/centre', function(req, res) {


            Goserv.find({},function(err, centre){
                if(err){
                    res.send(err);
               } else {
                    res.json(centre);
                    console.log(centre);
               }

            });

        });


    app.post('/adduser', function(req, res) {
    if(!req.body.name || !req.body.password) {
    res.json({ success: false, message: 'Please enter name and password.' });
    } else {
    var newUser = new User({
      name: req.body.name,
      password: req.body.password
    });

    // Attempt to save the user
    newUser.save(function(err) {
      if (err) {
        return res.json({ success: false, message: 'That name address already exists.'});
      }
      res.json({ success: true, message: 'Successfully created new user.' });
        });
      }
    });



        app.post('/dashboard',requireAuth, function(req, res){
             res.send({message: req.user})
                        });



        app.post('/api/centre/request', function(req, res) {

        console.log(req.body._id);

        Centre.findByIdAndUpdate(req.body._id, {
            $push: {"reserved": {address: req.body.address}}
        }, {
            safe: true,
            new: true
        }, function(err, centre){
            if(err){
                res.send(err);
            } else {
                res.json(centre);
            }
        });

        });

// listen (start app with node server.js) ======================================
app.listen(5000);
console.log("App listening on port 5000");
