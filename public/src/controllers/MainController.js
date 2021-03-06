var PayItForward = angular.module('PayItForward');
PayItForward.controller('MainController',['$http','$location','$rootScope','NgMap','$scope', function($http,$location,$rootScope,NgMap,$scope){

//To get the current location of user
  var vm = this;
  $scope.eventdata = [];

  vm.types = "['establishment']";
$scope.addresscoord = {};

  vm.placeChanged = function() {
    vm.place = this.getPlace();
    //console.log(vm.place.geometry.location.lat.a);
    //console.log(vm.place.geometry.location.toJSON());
    var old = vm.place.geometry.location.toJSON();
    newo = {
      lng: old.lng,
      lat: old.lat
    };
    $scope.addresscoord = newo;
   //console.log($scope.coordinates);
  }
      //vm.message = 'You can not hide. :)';
      NgMap.getMap("map").then(function(map) {
        vm.map = map;
      });
      vm.callbackFunc = function(param) {
        console.log('I know where '+ param +' are. ' + vm.message);
        console.log('You are at' + vm.map.getCenter());
        currentlocation = "" + vm.map.getCenter();
        $scope.updateUser(currentlocation);
        lat = vm.map.getCenter().lat();
        lon = vm.map.getCenter().lng();
        //console.log(vm.map.getCenter());
        var cor = [];
        cor.push(lon);
        cor.push(lat);
        console.log(cor);
        $scope.updateUser(cor);
        $http.post('/matchEvents',cor).then(successCallback,errorCallback);
        function successCallback(response){
          $scope.eventdata = response.data;

          for(var i=0; i<response.data.length; i++){
            //console.log(response.data[i]);
          }

        }
        function errorCallback(response){
          console.log("error");
        }
      };

$scope.allskills = ['Verbal/Written Communication','Basic Computer Skills/Administrative Support','Food Delivery/Distribution','Elder Care',
'Landscaping/gardening','Fitness Instruction','Tutoring','Animal care','Book keeping'];
$scope.storeskills = [];
$http.get('/userlist').then(successCallback, errorCallback);

  function successCallback(response){
 //console.log("I got the data");
 $scope.userlist = response;
}
function errorCallback(response){
  console.log("error");
}

//To create new user
$scope.addUser = function(user){

  //console.log($scope.storeskills);
  $scope.user.skills = $scope.storeskills;
  $scope.user.location = "";
  $scope.user.addresscoordinates = $scope.addresscoord;
  console.log($scope.user);
  if($scope.user.website === undefined){
    $scope.user.role = "volunteer";
  }
  else{
    delete $scope.user.skills;
    $scope.user.role = "organiser";
  }
//  console.log("reached here");
  $http.post('/userlist',user).then(successCallback1,errorCallback1);
   function successCallback1(user){
     $rootScope.currentUser = user;
     //console.log($rootScope.currentUser);

  }
  function errorCallback1(response){
    console.log("error");
  }
}

//To update location of user
$scope.updateUser = function(currentlocation){
  //console.log(currentlocation);
  $rootScope.currentUser.data.currentlocation = currentlocation;
  console.log($rootScope.currentUser);
  $http.post('/updateUser',$rootScope.currentUser).then(successCallback,errorCallback);
}

//Login for user
$scope.login = function(user){
  $http.post('/login', user).then(successCallback2,errorCallback2);
  function successCallback2(response)
  {
    $rootScope.currentUser = response;
    localStorage.setItem('presentUser',JSON.stringify($rootScope.currentUser));
    var x= $rootScope.currentUser.data.website;
    //console.log(x);
    if($rootScope.currentUser.data.website){
      $location.url("/orgprofile");
    }
    else{
      $location.url("/userprofile");
    }

  }
  function errorCallback2(response){
    alert("Invalid credentials");
  }
}

//Logout of user
$scope.logout = function(){
  //console.log("logout");
  $http.post('/logout')
  .success(function(){
    $location.url('/home');

  });
}

//To display event the user selects
$scope.viewEvent = function(x){
console.log($scope.eventdata);

for(var event in $scope.eventdata){
  if($scope.eventdata[event].obj._id === x.obj._id){
    console.log($scope.eventdata[event]);
    $rootScope.eventname = $scope.eventdata[event].obj.name;
    $rootScope.eventloc  = $scope.eventdata[event].obj.location;
    $rootScope.eventskills = $scope.eventdata[event].obj.expskills;
    $rootScope.eventcoord = [];
    $rootScope.eventcoord.push($scope.eventdata[event].loc.lat);
    $rootScope.eventcoord.push($scope.eventdata[event].loc.lng);
    $rootScope.eventid = $scope.eventdata[event].obj._id;
  }
}
$location.url('/viewevent');
}


//To request event
$scope.requestevent = function(){
  console.log($rootScope.eventid);
  console.log($rootScope.currentUser);
  eventvol = $rootScope.currentUser;
  eventvol.data.eventid = $rootScope.eventid;
  console.log(eventvol);
  emailbody = eventvol;
  emailbody.data.eventname = $rootScope.eventname;
  emailbody.data.eventloc = $rootScope.eventloc;
  $http.post('/addreqVol',eventvol).then(successCallback,errorCallback);
  function successCallback(response){
    console.log('hello');
  }
  function errorCallback(response){
    console.log("error");
  }
  $http.post('/postEmail',emailbody).then(successCallback2,errorCallback2);
  alert('Request has been sent to the volunteer organiser. You will receive a response shortly.');

  function successCallback2(response){
    console.log('request');

  }
  function errorCallback2(response){
    console.log("error");
  }
}

$scope.getevents = function(){
  console.log("here");

  //$rootScope.currentUser = JSON.parse(localStorage.getItem('presentUser'));
  //console.log($rootScope.currentUser);
  $http.get('/getevent').then(successCallback,errorCallback);
  function successCallback(response){
    console.log(response);
    console.log(response.data.eventsparticipated);
    $rootScope.userevents = response.data.eventsparticipated;
  }
  function errorCallback(response){
    console.log(response);
  }
}

$scope.sendMessage = function(message){
  console.log(message);
  $http.post('/sendcontent',message).then(successCallback,errorCallback);
  alert('Message sent to the nearby volunteers. You will be contacted shortly!');
  $location.url('/userprofile');
function successCallback(response){

  console.log(response);
}
function errorCallback(response){
  console.log(response);
}
}


}]);
