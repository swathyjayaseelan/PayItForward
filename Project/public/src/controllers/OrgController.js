//
//angular.module('PayItForward',[])
var PayItForward = angular.module('PayItForward');
PayItForward.controller('OrgController',['$scope','$http','$location','$rootScope', 'NgMap','$window', function($scope,$http,$location,$rootScope,NgMap,$window){
   //console.log("Hello from Org Controller");

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


  //console.log($scope.coordinates);
   $scope.allskills = ['Verbal/Written Communication','Basic Computer Skills/Administrative Support','Food Delivery/Distribution','Elder Care',
   'Landscaping/gardening','Fitness Instruction','Tutoring','Animal care','Book keeping'];
   $scope.skills =[];
//Function to post event
   $scope.postEvent = function(event){
   $scope.event.expskills = $scope.skills;
   //console.log($rootScope.currentUser);
   $scope.event.loc = $scope.coordinates;
   //console.log($scope.event.loc);
     $http.post('/postEvents',event).then(successCallback,errorCallback);
     function successCallback(response){
       $rootScope.currentEvent = event;
     }
     function errorCallback(response){
       console.log("error");
     }
   }

   $scope.load = function(){
    // console.log("Ready");
     $http.get('/vollist').then(successCallback,errorCallback);

     function successCallback(response){
       console.log(response.data);
       console.log($rootScope.reqvolarray);
       $rootScope.reqvolarray = response.data.filter(function(dat){
         console.log(dat.reqvollist);
         if(dat.reqvollist !== undefined && dat.reqvollist.length > 0){
           document.getElementById("hidethis").style.display = 'none';
           return dat;
         }

       });

   }
     function errorCallback(response){
       console.log(error);
     }
   }

$scope.accept =function(y,x){
//console.log(x);
//console.log(y);
y.eventID = x._id;
console.log(y);
$http.post('/addaccvol',y).then(successCallback1,errorCallback1);

$window.location.reload();

function successCallback1(response){
console.log(response);
}
function errorCallback1(response){
  console.log("error");
}
}

$scope.reject = function(y,x){
  console.log(y);
  y.eventID = x._id;
  $http.post('/removevol',y).then(successCallback1,errorCallback1);
  $window.location.reload();
  function successCallback1(response){
  console.log(response);
  }
  function errorCallback1(response){
    console.log("error");
  }
  }
$scope.callthis = function(){
  console.log("here");
$http.get('/toratevol').then(successCallback,errorCallback);
function successCallback(response){
console.log(response.data);
$rootScope.volratingarray = [];

for(var i in response.data){
  $rootScope.volratingarray.push(response.data[i]);
}
console.log($rootScope.volratingarray);
$rootScope.volratingarray = $rootScope.volratingarray.filter(function(x){
  if(x.acceptedvollist !== undefined && x.acceptedvollist.length > 0)
  {
    document.getElementById("hide").style.display = "none";
    return x;
  }
});

}
function errorCallback(response){
  console.log("error");
}
}

$scope.rate = function(y,x){
  console.log(y);
  console.log(x);

  y.eventname = x.name;
  y.eventlocation = x.location;
  y.eventrating = y.rating;
  $http.post('/ratevol',y).then(successCallback,errorCallback);
  $window.location.reload();
  function successCallback(response){
    console.log(response);
    $window.location.reload();
  }
  function errorCallback(response){
    console.log(response);
  }
}


}]);
