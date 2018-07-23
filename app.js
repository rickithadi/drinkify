
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
const forceDomain = require("forcedomain");
var enforce = require("express-sslify");
// configuration


var app             = express();


app.use(cors());
app.use(bodyParser.json());


app.use(forceDomain({
    hostname: 'rickithadi.com'
}));
app.use(enforce.HTTPS({ trustProtoHeader: true }));
 app.set('view engine', 'html');

app.use(express.static(__dirname + "/dist"));
app.listen(process.env.PORT || 8080);

mongoose.connect(config.database);
let conn=mongoose.connection;
var ObjectId = require("mongodb").ObjectID;
console.log('api running');


// email me bitch

let transporter = nodemailer.createTransport({
    host  : "smtp.gmail.com",
    port  : 465,
    secure: true,
    auth  : {
        user: "indianFella3000@gmail.com",
        pass: "Singapore98"
    }
});



app.get("/", function(req, res) {
    console.log("f namecheap");
    res.send("f namecheap");
});
// send me an email bitch
app.post("/contact", function(req, res) {
                      var dt                  = new Date();
                      var utcDate             = dt.toUTCString();

  req.body.created = utcDate;
  console.log("cck", req.body);
    let tesits2 = {
      from   : '"WERK" <indianFella3000@gmail.com>',   // sender address
      to     : "rickithadi@gmail.com",                 // list of receivers
        subject: ""+ JSON.stringify(req.body.ref)+ "at "+ JSON.stringify(req.body.created),                     // Subject line
        text   : JSON.stringify(req.body.name) + " at "+  JSON.stringify(req.body.from) ,                           
        html   : JSON.stringify(req.body.name) + " at "+  JSON.stringify(req.body.email)+ 
        "<b><h1>Sent you a message </h1></b> <br> <h3>" +
        JSON.stringify(req.body.comment) +
        "</h3>" 
    };

    transporter.sendMail(tesits2, (error, info) => {
      if (error) {
        return console.log(error);
      }
      console.log("Message %s sent: %s", info.messageId, info.response);
    });
});


// get blogs
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


// modidy content
app.post("/blog", function(req, res) {
    console.log("updating", req.body);

    conn.collection("blogs").updateOne(
        {
            _id: new ObjectId(req.body._id)
        },
        {
            $set: {
               
                content: req.body.content
            }
        },
        function(err, doc) { 
            if (err) {
                console.log("error", err);
            } else {
                console.log('success', doc.modifiedCount);
                console.log('??', doc.matchedCounted);
                res.status(200).json(res.body);
            }
        }
    );
});
app.post('/new/blog', function(req,res){
    var dt                  = new Date();
    var utcDate             = dt.toUTCString();

    req.body.created_at = utcDate;
    console.log('new', req.body);  

    conn.collection('blogs').insertOne(req.body, function(err, res){
        if(err){
            return console.log('error with blog', err);
        }
        console.log('success');
    });
});

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "dist/index.html"));
});




