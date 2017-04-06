var PayItForward = angular.module('PayItForward', ['ngRoute'])

.config(['$routeProvider', function($routeProvider){

$routeProvider
.when('/home',{
templateUrl: 'src/views/home.html',
controller: "MainController"
})
.when('/hospitals',{
  templateUrl: 'src/views/hospitals.html',
  controller: "MainController"
})
.when('/organisation',{
  templateUrl: 'src/views/organisation.html',
  controller: "OrgController"
})
.when('/newvolunteer',{
  templateUrl: 'src/views/newvolunteer.html',
  controller: "MainController"
})
.when('/volunteerlogin',{
  templateUrl: 'src/views/volunteerlogin.html',
  controller: "MainController"
})
.when('/organisationlogin',{
  templateUrl: 'src/views/organisationlogin.html',
  controller: "MainController"
})
.otherwise({
  redirectTo: '/home',
  controller: "MainController"
});
}]);


PayItForward.controller('MainController',['$scope','$http', function($scope,$http){
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

PayItForward.controller('OrgController',['$scope','$http', function($scope,$http){
   console.log("Hello from Org Controller");

$http.get('/orglist').then(successCallback2, errorCallback2);

  function successCallback2(response){
 console.log("I got the org data");
 $scope.orglist = response;
}
function errorCallback2(response){
  console.log("error");
}
$scope.addOrg = function(){
console.log("hi");
  console.log($scope.org);
  $http.post('/orglist',$scope.org).then(successCallback3,errorCallback3);
   function successCallback3(response){
    console.log(response);
  }
  function errorCallback3(response){
    console.log("error");
  }
}
}]);
