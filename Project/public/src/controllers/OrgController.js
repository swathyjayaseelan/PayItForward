
angular.module('orgController',[])

.controller('OrgController',['$scope','$http', function($scope,$http){
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
