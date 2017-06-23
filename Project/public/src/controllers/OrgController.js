//
//angular.module('PayItForward',[])
var PayItForward = angular.module('PayItForward');
PayItForward.controller('OrgController',['$scope','$http','$location','$rootScope', 'NgMap', function($scope,$http,$location,$rootScope,NgMap){
   console.log("Hello from Org Controller");

   var vm = this;
   vm.types = "['establishment']";
$scope.coordinates = {};

   vm.placeChanged = function() {
     vm.place = this.getPlace();
     //console.log(vm.place.geometry.location.lat.a);
     //console.log(vm.place.geometry.location.toJSON());
     var old = vm.place.geometry.location.toJSON();
     newo = {
       lng: old.lng,
       lat: old.lat
     };
     $scope.coordinates = newo;
    //console.log($scope.coordinates);
   }


  console.log($scope.coordinates);
   $scope.allskills = ['Verbal/Written Communication','Basic Computer Skills/Administrative Support','Food Delivery/Distribution','Elder Care',
   'Landscaping/gardening','Fitness Instruction','Tutoring','Animal care','Book keeping'];
   $scope.skills =[];
//Function to post event
   $scope.postEvent = function(event){
   $scope.event.expskills = $scope.skills;
   console.log($scope.coordinates);
   $scope.event.loc = $scope.coordinates;
   console.log($scope.event.loc);
     $http.post('/postEvents',event).then(successCallback,errorCallback);
     function successCallback(response){
       $rootScope.currentEvent = event;
     }
     function errorCallback(response){
       console.log("error");
     }
   }


}]);
