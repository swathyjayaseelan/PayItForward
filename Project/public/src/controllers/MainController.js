angular.module('mainController',[])
.controller('MainController',['$scope','$http','$location','$rootScope', function($scope,$http,$location,$rootScope){
   console.log("Hello from Main Controller");

$http.get('/userlist').then(successCallback, errorCallback);

  function successCallback(response){
 console.log("I got the data");
 $scope.userlist = response;
}
function errorCallback(response){
  console.log("error");
}
$scope.addUser = function(user){

  //console.log($scope.user);
  $http.post('/userlist',user).then(successCallback1,errorCallback1);
   function successCallback1(user){
     $rootScope.currentUser = user;
  }
  function errorCallback1(response){
    console.log("error");
  }
}

$scope.login = function(user){
  $http.post('/loginVolunteer', user).then(successCallback2,errorCallback2);
  function successCallback2(response)
  {
    $rootScope.currentUser = response;
      $location.url("/userprofile");
  }
  function errorCallback2(response){
    alert("Invalid credentials");
  }
}
$scope.logout = function(){
  console.log("logout");
  $http.post('/logoutVolunteer')
  .success(function(){
    $location.url('/home');

  });
}

$scope.postEvent = function(event){
  console.log(event);
  $http.post('/postEvents',event).then(successCallback,errorCallback);
  function successCallback(response){
    $rootScope.currentEvent = event;
  }
  function errorCallback(response){
    console.log("error");
  }
}

}]);
