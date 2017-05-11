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

var cookieParser = require('cookie-parser');
var session      = require('express-session');


app.use(bodyParser.json());

app.use(express.static(__dirname + '/public'));
app.use(flash());
app.use(cookieParser());
app.use(session({
  secret: 'my secret',
  saveUninitialized: true,
  resave: true
            }));
//app.use(multer());
//app.use(multer({ dest: './uploads/'}))
app.use(multer({dest:__dirname+'public/file/uploads/'}).any());
app.use(passport.initialize());
app.use(passport.session());

app.post('/postEvents',function(req,res){
 console.log(req.body);

});

//Volunteer
app.get('/userlist',function(req,res,next){
  db.user.find(function(err,docs){
    res.json(docs);
  });
});
app.post('/userlist',function(req, res, next){
db.user.findOne({email: {$eq:req.body.email}}, function(err, user){
  if(user){
    res.json(null);
    console.log("user exists");
    return;
  }
  else{
    console.log("insert");
    db.user.insert(req.body, function(err,doc){
        res.json(doc);
      });
  }
});
});
app.get('/loggedin', function(req, res, next){
 res.send(req.isAuthenticated() ? req.user : '0');
});

app.post('/logoutVolunteer', function(req, res){
  req.logOut();
  res.send(200);
});

//User authentication
app.post('/loginVolunteer',passport.authenticate('user'), function(req, res){
  res.json(req.user);
});
passport.use('user', new LocalStrategy(
  {
    usernameField: 'email',
    passwordField: 'password'
  },
  function(username, password, done)
{
db.user.findOne({$and : [{email: { $eq: username}}, {password: {$eq: password}}]}, function(err, user){
  if(user){
    console.log(user);
    return done(null, user);
  }
    return done(null, false, {message: 'Unable to login'} );
});
}
));
passport.serializeUser(function(user, done){
  done(null, user);
});

passport.deserializeUser(function(user, done){
  done(null, user);
});


//organisation

app.get('/orglist',function(req,res,next){
  db.org.find(function(err,docs){
    res.json(docs);
  });
});
app.post('/orglist',function(req, res, next){
db.org.findOne({email: {$eq:req.body.email}}, function(err, user){
  if(user){
    res.json(null);
    console.log("user exists");
    return;
  }
  else{
    console.log("insert");
    db.org.insert(req.body, function(err,doc){
        res.json(doc);
      });
  }
});
});

app.post('/loginOrg',passport.authenticate('org'), function(req, res){
  res.json(req.user);
});
passport.use('org', new LocalStrategy(
  {
    usernameField: 'email',
    passwordField: 'password'
  },
  function(username, password, done)
{
db.org.findOne({$and : [{email: { $eq: username}}, {password: {$eq: password}}]}, function(err, org){
  if(org){
    console.log(org);
    return done(null, org);
  }
    return done(null, false, {message: 'Unable to login'} );
});
}
));
app.post('/logoutOrg', function(req, res){
  req.logOut();
  res.send(200);
});

app.get('/loggedinorg', function(req, res, next){
 res.send(req.isAuthenticated() ? req.org : '0');
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
