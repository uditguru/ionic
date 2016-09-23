// Set up
var express  = require('express');
var app = express();

var mongoose = require('mongoose');                     // mongoose for mongodb
          // log requests to the console (express4)
var bodyParser = require('body-parser');    // pull information from HTML POST (express4)


// Configuration
mongoose.connect('mongodb://man:21081992@ds019746.mlab.com:19746/guru_test',function (err, res) {
      if (err) {
      console.log ('ERROR connecting to: ');
      } else {
      console.log ('Succeeded connected to: ' );
      }
    });

app.use(express.static('public'));



                                    // log every request to the console
app.use(bodyParser.urlencoded({'extended':'true'}));            // parse application/x-www-form-urlencoded
app.use(bodyParser.json());                                     // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json



app.use(function(req, res, next) {
   res.header("Access-Control-Allow-Origin", "*");
   res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
   next();
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
app.listen(process.env.PORT || 5000);
console.log("App listening on port 5000");
