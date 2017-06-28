
angular.module('hospitalController',[])

.controller('HospitalController',['$scope','$http', function($scope,$http){
   console.log("Hello from Org Controller");
$scope.addHospital = function(){
  console.log("here");
  $http.post('/hospitallist',$scope.hospital).then(successCallback3,errorCallback3);
   function successCallback3(response){
    console.log(response);
  }
  function errorCallback3(response){
    console.log("error");
  }
}
}]);
