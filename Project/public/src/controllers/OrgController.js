
angular.module('OrgController',[])

.controller('OrgController',['$scope','$http','$location','$rootScope', function($scope,$http,$location,$rootScope){
   console.log("Hello from Org Controller");

$http.get('/orglist').then(successCallback2, errorCallback2);

  function successCallback2(response){
 console.log("I got the org data");
 $scope.orglist = response;
}
function errorCallback2(response){
  console.log("error");
}
$scope.addOrg = function(org){
  $http.post('/orglist',org).then(successCallback1,errorCallback1);
   function successCallback1(org){
     $rootScope.currentOrg = org;
  }
  function errorCallback1(response){
    console.log("error");
  }
}

$scope.login = function(org){
  $http.post('/loginOrg', org).then(successCallback2,errorCallback2);
  function successCallback2(response)
  {
    $rootScope.currentOrg = response;
    console.log($rootScope.currentOrg);
      $location.url("/orgprofile");
  }
  function errorCallback2(response){
    alert("Invalid credentials");
  }
}
$scope.logout = function(){
  console.log("logout");
  $http.post('/logoutOrg')
  .success(function(){
    $location.url('/home');

  });
}

}]);
