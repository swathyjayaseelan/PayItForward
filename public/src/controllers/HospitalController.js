
var PayItForward = angular.module('PayItForward');

PayItForward.controller('HospitalController',['$scope','$http','NgMap','$location', function($scope,$http,NgMap,$location){
   //console.log("Hello from Org Controller");
   var vm = this;
   vm.types = "['establishment']";
$scope.loccoord = {};

   vm.placeChanged = function() {
     vm.place = this.getPlace();
     //console.log(vm.place.geometry.location.lat.a);
     //console.log(vm.place.geometry.location.toJSON());
     var old = vm.place.geometry.location.toJSON();
     var newo = {
       lng: old.lng,
       lat: old.lat
     };
     $scope.loccoord = newo;
    console.log($scope.loccoord);
   }
$scope.addHospital = function(hospital){

  console.log("here");
  $scope.hospital.locationcoord = $scope.loccoord;
  console.log($scope.hospital);
  $http.post('/hospitallist',$scope.hospital).then(successCallback3,errorCallback3);
   function successCallback3(response){
    console.log(response);
    alert("Nearby donors are alerted. You will receive calls shortly!");
    $location.url('/home');
  }
  function errorCallback3(response){
    console.log("error");
  }

}

}]);
