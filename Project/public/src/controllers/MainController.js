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
$scope.addUser = function(volunteer){

  //console.log($scope.user);
  $http.post('/userlist',volunteer).then(successCallback1,errorCallback1);
   function successCallback1(response){
     $rootScope.currentVolunteer = volunteer;
  }
  function errorCallback1(response){
    console.log("error");
  }
}

$scope.login = function(volunteer){
  $http.post('/loginVolunteer', volunteer).then(successCallback2,errorCallback2);
  function successCallback2(response)
  {
    //$location.path("/");
    //console.log("sent successfully");
    //console.log(response);
    $rootScope.currentVolunteer = volunteer;
  }
  function errorCallback2(response){
    console.log("error");
  }
}
}]);
