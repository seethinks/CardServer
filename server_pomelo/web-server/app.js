var user = require('./models/user').user;
var aes = require('./public/views/doAES');


var express = require('express');
var app     = express();
var server = app.listen(process.env.PORT || 23001, function(){
  console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});


app.use(express.static(__dirname + '/public'));
//app.use(express.bodyParser());
//app.use(app.router);
app.use(express.json());
app.use(express.urlencoded());
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
          var msg = {token:tokenJm,uid:doc._id};
          console.log(aes.decryption(tokenJm,doc._id));

          res.render('main', { title: 'main' });

        }
      }
    }
  })

});


var mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGO || 'mongodb://127.0.0.1/cardServer');

