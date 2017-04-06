var PayItForward = angular.module('PayItForward');
 PayItForward.controller('MainController',['$scope','$http', function($scope,$http){
   console.log("Hello from Main Controller");

 person1 = {
 name: "Tim",
 email: "tim@email.com",
 address: "wwwww",
 mobile: "44444444",
 blood: "q",
  password: "qqqq"
 };

 person2 = {
 name: "Tim1",
 email: "tim@email.com",
 address: "wwwww",
 mobile: "44444444",
 blood: "q",
  password: "qqqq"
 };

 var userlist = [person1, person2];
 $scope.userlist = userlist;
}]);
