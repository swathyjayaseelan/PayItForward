var PayItForward = angular.module('PayItForward');
PayItForward.controller('MainController',['$scope','$http','$location','$rootScope','NgMap', function($scope,$http,$location,$rootScope,NgMap){

  var vm = this;
  
      vm.message = 'You can not hide. :)';
      NgMap.getMap("map").then(function(map) {
        vm.map = map;
      });
      vm.callbackFunc = function(param) {
        console.log('I know where '+ param +' are. ' + vm.message);
        console.log('You are at' + vm.map.getCenter());
        currentlocation = "" + vm.map.getCenter();
        $scope.updateUser(currentlocation);
      };
$scope.allskills = ['Verbal/Written Communication','Basic Computer Skills/Administrative Support','Food Delivery/Distribution','Elder Care',
'Landscaping/gardening','Fitness Instruction','Tutoring','Animal care','Book keeping'];
$scope.storeskills = [];
$http.get('/userlist').then(successCallback, errorCallback);

  function successCallback(response){
 console.log("I got the data");
 $scope.userlist = response;
}
function errorCallback(response){
  console.log("error");
}
$scope.addUser = function(user){

  console.log($scope.storeskills);
  $scope.user.skills = $scope.storeskills;
  $scope.user.location = "";
  console.log($scope.user);
  if($scope.user.website === undefined){
    $scope.user.role = "volunteer";

    //console.log("volunteer");
  }
  else{
    delete $scope.user.skills;
    $scope.user.role = "organiser";
  }
  console.log("reached here");
  $http.post('/userlist',user).then(successCallback1,errorCallback1);
   function successCallback1(user){
     $rootScope.currentUser = user;
     //console.log($rootScope.currentUser);
  }
  function errorCallback1(response){
    console.log("error");
  }
}

$scope.updateUser = function(currentlocation){
  console.log(currentlocation);
  $rootScope.currentUser.data.currentlocation = currentlocation;
  console.log($rootScope.currentUser);
  $http.post('/updateUser',$rootScope.currentUser).then(successCallback,errorCallback);
}

$scope.login = function(user){
  $http.post('/login', user).then(successCallback2,errorCallback2);
  function successCallback2(response)
  {
    $rootScope.currentUser = response;
    var x= $rootScope.currentUser.data.website;
    console.log(x);
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
$scope.logout = function(){
  console.log("logout");
  $http.post('/logout')
  .success(function(){
    $location.url('/home');

  });
}

}]);
