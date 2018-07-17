
var express         = require("express");
var helmet 	    = require('helmet');
var mongoose        = require("mongoose");
var bodyParser      = require("body-parser");
var morgan          = require("morgan");
var config          = require("./config");
const cors = require("cors");
var session         = require("express-session");
var cookieParser    = require("cookie-parser");
var flash           = require("connect-flash");
var passport        = require("passport");
var LocalStrategy   = require("passport-local").Strategy;
const sendmail = require("sendmail")();
const forceDomain = require("forcedomain");
var enforce = require("express-sslify");
// configuration


var app             = express();


app.use(cors());
app.use(bodyParser.json());


// app.use(forceDomain({
//     hostname: 'www.indian-e-visa.org'
// }));
// app.set('view engine', 'html');

app.use(express.static(__dirname + "/dist"));
app.listen(process.env.PORT || 8080);

mongoose.connect(config.database);
let conn=mongoose.connection;
var ObjectId = require("mongodb").ObjectID;
console.log('api running');














//get blogs

app.get("/blogs", function(req, res) {
    //get all checks
    conn
        .collection("blogs")
        .find({})
        .toArray(function(err, results) {
            if (err) {
                return console.log("error with getting blogs", err);
            }

            res.send(JSON.stringify(results));
            //console.log("Name of Country Four " + results[3].name );

            // conn.close();
        });
});






