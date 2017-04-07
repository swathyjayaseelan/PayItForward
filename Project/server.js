var express = require('express');
var app = express();
var mongojs = require('mongojs');
var db = mongojs('user', ['user']);
var bodyParser = require('body-parser');
var crypto = require('crypto');

app.use(bodyParser.json());

app.use(express.static(__dirname + '/public'));

app.get('/userlist',function(req,res){
  console.log("I received a get request");
  db.user.find(function(err,docs){
    console.log(docs);
    res.json(docs);
  });
});
app.post('/userlist',function(req, res, next){
console.log(req.body);
db.user.insert(req.body, function(err,doc){
  res.json(doc);
});
});

app.post('/login', function(req, res){


});
app.get('/orglist',function(req, res){
  console.log("I received a org get request");
  db.org.find(function(err,docs){
    console.log(docs);
    res.json(docs);
  });
});
app.post('/orglist',function(req, res, next){
console.log(req.body);
console.log("reached server");
db.org.insert(req.body, function(err,doc){
  res.json(doc);
});
});




app.get('/hospitallist',function(req, res){
  db.hospital.find(function(err,docs){
    console.log(docs);
    res.json(docs);
  });
});
app.post('/hospitallist',function(req, res, next){
console.log(req.body);
console.log("reached server");
db.hospital.insert(req.body, function(err,doc){
  res.json(doc);
});
});

app.listen(3000);
console.log("Server running on port 3000");
