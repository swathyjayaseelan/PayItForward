var express = require('express');
var app = express();

var mongojs = require('mongojs');
var db = mongojs('user', ['user']);

var bodyParser = require('body-parser');
var multer = require ('multer');

var crypto = require('crypto');
var passport = require('passport');
var LocalStrategy = require('passport-local');
var flash = require('connect-flash');

var cookieParser = require('cookie-parser');
var session      = require('express-session');


app.use(bodyParser.json());

app.use(express.static(__dirname + '/public'));
app.use(flash());

app.use(session({
  secret: 'this is the secret',
  saveUninitialized: true,
  resave: true
            }));
app.use(cookieParser());
//app.use(multer());
//app.use(multer({ dest: './uploads/'}))
app.use(multer({dest:__dirname+'public/file/uploads/'}).any());
app.use(passport.initialize());
app.use(passport.session());


//User registration
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



//User authentication
app.post('/login',passport.authenticate('user'), function(req, res){
  res.json(req.user);
  currentUser = req.user;
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
app.get('/loggedin', function(req, res, next){
 res.send(req.isAuthenticated() ? req.user : '0');
});
app.post('/logout', function(req, res){
  req.logOut();
  res.send(200);
});

//Post events
app.post('/postEvents',function(req,res){
 console.log(req.body);
 //console.log(currentUser);
 db.user.update(
   {_id: currentUser._id },
   {
     $addToSet: {events: req.body }
   }
 );
 //console.log("I reached");
 //console.log(req.body.expskills);
 var check = req.body.expskills;
db.user.find({$and: [{role: "volunteer"},{ skills: {$in: check}}]}, function(err,docs){
  console.log(docs);
  for (var key in docs) {
   if (docs.hasOwnProperty(key)) {
      var obj = docs[key];
      for (var prop in obj) {
         if (obj.hasOwnProperty(prop)) {
            //alert(prop + " = " + obj[prop]);
            console.log(obj[prop]);
         }
      }
   }
}
});

});
app.post('/updateUser',function(req, res, next){
  //console.log(req.body.data._id);
  db.user.update(
    { name: req.body.data.name},
    {$unset: {currentlocation: 0 }}
  );

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
