
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
const nodemailer = require("nodemailer");
var path = require("path");
const forceDomain = require("forcedomain");
var enforce = require("express-sslify");
// configuration


var app             = express();


app.use(cors());
app.use(bodyParser.json());

 app.set('view engine', 'html');

app.use(express.static(__dirname + "/dist"));
app.listen(process.env.PORT || 8080);
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "dist/index.html"));
});




