var user = require('./models/user').user;

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
/*logout*/
app.get('/logout', function(req, res) {
  res.render('logout', { title: 'logout' });
});
/*hompage*/
app.post('/main', function(req, res) {

  console.log("uid:"+req.body.userid)

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
          res.render('main', { title: 'main' });

        }
      }
    }
  })

});


var mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGO || 'mongodb://127.0.0.1/cardServer');

