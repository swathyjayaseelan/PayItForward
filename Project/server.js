var express = require('express');
var app = express();
var mongojs = require('mongojs');
var db = mongojs('user', ['user']);
var bodyParser = require('body-parser');
var multer = require ('multer');
var crypto = require('crypto');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var flash = require('connect-flash');
//var session = require('express-session');

app.use(bodyParser.json());

app.use(express.static(__dirname + '/public'));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());



app.get('/userlist',function(req,res){
  //console.log("I received a get request");
  db.user.find(function(err,docs){
    //console.log(docs);
    res.json(docs);
  });
});
app.post('/userlist',function(req, res, next){
console.log(req.body);
//console.log("Empty object");
db.user.insert(req.body, function(err,doc){
  res.json(doc);
});
});

app.get('/orglist',function(req, res){
  //console.log("I received a org get request");
  db.org.find(function(err,docs){
    //console.log(docs);
    res.json(docs);
  });
});
app.post('/orglist',function(req, res, next){
//console.log(req.body);
//console.log("reached server");
db.org.insert(req.body, function(err,doc){
  res.json(doc);
});
});

app.post('/loginVolunteer',passport.authenticate('local'), function(req, res){
  res.json(req.user);
});

//User authentication

passport.use(new LocalStrategy(
  {
    usernameField: 'email',
    passwordField: 'password'
  },
  function(username, password, done)
{

db.user.findOne({$and : [{email: { $eq: username}}, {password: {$eq: password}}]}, function(err, user){
  if(user){
    console.log(user);
  }
  else{
    console.log("not der");
  }

});
}
  /*
  if(username == password){
    return done(null, {username: username, firstName: "Alex"});
  }
  return done(null, false, {message: 'Unable to login'});
}
*/
));

passport.serializeUser(function(volunteer, done){
  done(null, volunteer);
});

passport.deserializeUser(function(volunteer, done){
  done(null, volunteer);
});


app.get('/hospitallist',function(req, res){
  db.hospital.find(function(err,docs){
    res.json(docs);
  });
});
app.post('/hospitallist',function(req, res, next){
db.hospital.insert(req.body, function(err,doc){
  res.json(doc);
});
});

app.listen(3000);
console.log("Server running on port 3000");
