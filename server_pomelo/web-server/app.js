// Required Modules
var user = require('./models/user').user;
var aes = require('./public/views/doAES');
var express    = require("express");
var morgan     = require("morgan");
var bodyParser = require("body-parser");
var jwt        = require("jsonwebtoken");
var mongoose   = require("mongoose");
var app        = express();

var port = process.env.PORT || 23001;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(morgan("dev"));
app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization');
    next();
});


app.use(express.static(__dirname + '/public'));
app.set('views', __dirname + '/public/views');
app.set('view engine', 'ejs');


app.get('/', function(req, res) {
    res.render('index', { title: 'index' });
});
/*login*/
app.get('/login', function(req, res) {
    res.render('login', { title: 'login' });
});
app.get('/reg',function(req,res)
    {
        res.render('reg',{title:'reg'});
    }
);
app.post('/regInfo',function(req,res){
    var queryDoc = {account: req.body.userid};
    console.log("uid:"+req.body.userid);
    user.count(queryDoc, function (err, doc) {
        if (err) {
            console.log("err:"+err);
            res.redirect('/');
        } else {
            if (doc == 0) {
                var userData = new user({
                    account: req.body.userid,
                    password: req.body.password,
                    nickName: "",
                    money: 1000
                });
                userData.save(function (err) {
                    if (err) {
                        console.log("err:"+err);
                        res.redirect('/');
                    } else {
                        console.log("reg ok");
                        res.redirect('/login');
                    }
                })
            } else {
                console.log("user already exist.");
                res.redirect('/login');
            }
        }
    })
});


/*logout*/
app.get('/logout', function(req, res) {
    res.render('logout', { title: 'logout' });
});
/*hompage*/
app.post('/main', function(req, res) {

    var queryDoc = {account: req.body.userid};

    user.findOne(queryDoc, function (err, doc) {
        if (err) {
            console.log("error")
        } else {
            if (!doc) {
                res.redirect('/');
                console.log("error not user")
            } else {
                if(doc.password != req.body.password)
                {
                    res.redirect('/');
                    console.log("password error")
                }else
                {
                    var tokenClass = require('./public/views/token');
                    var timestamp = Date.now();
                    var token = tokenClass.create(req.body.userid,timestamp,req.body.password);
                    var tokenJm = aes.encryption(token,doc._id);
//                    var profile = {
//                        first_name: 'see',
//                        last_name: 'thinks',
//                        email: 'seethinks@gmail.com',
//                        id: "rlxsbcs"
//                    };
//                    var tokenJm = jwt.sign(profile, "rlxsbcl");
//                    console.log("tokenJm:"+tokenJm);
//                    res.json({
//                        type: true,
//                        data: profile,
//                        token: tokenJm
//                    });
                    console.log("login ok");
                    //res.render('main', { title: 'main' });
                    res.redirect('http://localhost:3000/index.html?token='+tokenJm+"&account="+req.body.userid+"&uid="+doc._id.toString());
                }
            }
        }
    })

});


///////////////////////////////////////////////////////////////////////////// mongoose
var mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGO || 'mongodb://127.0.0.1/cardServer');



function ensureAuthorized(req, res, next) {
    var bearerToken;
    var bearerHeader = req.headers["authorization"];
    if (typeof bearerHeader !== 'undefined') {
        var bearer = bearerHeader.split(" ");
        bearerToken = bearer[1];
        req.token = bearerToken;
        next();
    } else {
        res.send(403);
    }
}

process.on('uncaughtException', function(err) {
    console.log(err);
});

// Start Server
app.listen(port, function () {
    console.log( "Express server listening on port " + port);
});