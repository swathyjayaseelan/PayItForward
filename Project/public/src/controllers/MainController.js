angular.module('mainController',[])
.controller('MainController',['$scope','$http', function($scope,$http){
   console.log("Hello from Main Controller");

$http.get('/userlist').then(successCallback, errorCallback);

  function successCallback(response){
 console.log("I got the data");
 $scope.userlist = response;
}
function errorCallback(response){
  console.log("error");
}
$scope.addUser = function(){

  console.log($scope.user);
  $http.post('/userlist',$scope.user).then(successCallback1,errorCallback1);
   function successCallback1(response){
    console.log(response);
  }
  function errorCallback1(response){
    console.log("error");
  }
}
}]);
