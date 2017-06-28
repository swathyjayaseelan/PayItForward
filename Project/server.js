var express = require('express');
var app = express();

var mongojs = require('mongojs');
var ObjectId = require("mongojs").ObjectId;
var db = mongojs('user', ['user']);

var bodyParser = require('body-parser');
var multer = require ('multer');

var crypto = require('crypto');
var passport = require('passport');
var LocalStrategy = require('passport-local');
var flash = require('connect-flash');

var cookieParser = require('cookie-parser');
var session      = require('express-session');
var nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');

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
    //console.log(user);
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
 console.log(currentUser);
/* db.user.update(
   {_id: currentUser._id },
   {
     $addToSet: {events: req.body }
   }
 );*/
req.body.orgid = currentUser._id;
db.events.insert(req.body, function(err,doc){
  res.json(doc);
});

 //console.log("I reached");
 //console.log(req.body.expskills);
 var check = req.body.expskills;
db.user.find({$and: [{role: "volunteer"},{ skills: {$in: check}}]}, function(err,docs){
  //console.log(docs);
  for (var key in docs) {
   if (docs.hasOwnProperty(key)) {
      var obj = docs[key];
      for (var prop in obj) {
         if (obj.hasOwnProperty(prop)) {
            //alert(prop + " = " + obj[prop]);
            //console.log(obj[prop]);
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

//matching events with volunteers
app.post('/matchEvents',function(req,res,next){
  //console.log(req.body);
  db.runCommand( { geoNear: "events", near: req.body, spherical: true, distanceMultiplier: 6371,  includeLocs: true , distanceField:"dist.calculated"}, function(err,docs){
    docs.resultsnew = [];
    var count = 0;
  //  console.log(docs.results);
    console.log(currentUser.skills);

      docs.resultsnew = docs.results.filter(function(result){
        count =0;
        console.log(result.obj.expskills);

        var temp = result.obj.expskills.filter(function(x){
         for(var i=0; i<currentUser.skills.length;i++){
           console.log(currentUser.skills[i]);
           console.log(x);
           if(currentUser.skills[i] === x){
             count =  count +1;
           }
           console.log(count);
         }
         if(count>0){
           console.log(x);
           return x;
         }

        });
        console.log(temp);
        if(temp.length!==0){
          console.log(result);

          return result;
        }

      });
    //  console.log(docs.results[event].obj.expskills);
    console.log(docs.resultsnew);
    docs.results = docs.resultsnew;
  res.json(docs.results);
  });
});

//Nodemailer to send email to volunteer organiser

app.post('/postEmail',function(req,res,next){
  //console.log("reched here");
  console.log(req.body);
  var mailOpts, smtpTrans;
  //Setup Nodemailer transport, I chose gmail. Create an application-specific password to avoid problems.

  /*smtpTrans = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    xoauth2: xoauth2.createXOAuth2Generator({
    user: 'swathyjayaseelan@gmail.com',
    pass: 'payitforward'
  }
)
});
*/
var transporter = nodemailer.createTransport({
    service: 'Gmail',
    //secure: true, // secure:true for port 465, secure:false for port 587
    auth: {
        user: 'swathyjayaseelan@gmail.com',
        pass: 'Jayaseelan3773'
    }
});

  //Mail options
  mailOpts = {
      from: 'swathyjayaseelan@gmail.com',
      to: 'reeves.skr@gmail.com',
      subject: 'New volunteer request for event: '+req.body.data.eventname,
      text: 'A new volunteer has requested for the below events',
      html: '<b>Event name: </b>'+req.body.data.eventname+'<br>'+'<b>Event location: </b>'+req.body.data.eventloc+'br>'+'<b>Volunteer name: </b>'+req.body.data.name+ '<br>'+'<b>Contact Email: </b>'+req.body.data.email+'<br>'+ '<b>Skills: </b>'+req.body.data.skills
  };
  transporter.sendMail(mailOpts, function (error, response) {
      //Email not sent
      if (error) {
        console.log(error);
      }

      //Yay!! Email sent
      else {
        console.log("success");
      }
  });


});

//adding volunteer to the requested event
app.post('/addreqVol',function(req,res,next){
  console.log(req.body);
  voldetails = {};
  voldetails.name = req.body.data.name;
  voldetails.email = req.body.data.email;
  voldetails.skills = req.body.data.skills;
  //console.log(req.body.data.eventid);
  console.log(voldetails);
  db.events.update(
    {_id: ObjectId(req.body.data.eventid)},
    {$addToSet:{reqvollist: voldetails}}
  );
});

app.get('/vollist',function(req,res){
  console.log(currentUser);
  db.events.find({orgid: ObjectId(currentUser._id)},function(err,docs){
    res.json(docs);
  });
});

app.post('/addaccvol',function(req,res,next){

  console.log(req.body.email);
  db.events.update(
    {_id: ObjectId(req.body.eventID)},
    {$pull: {reqvollist: {email: req.body.email}}},
    {$addToSet:{acceptedvollist: req.body}}
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
