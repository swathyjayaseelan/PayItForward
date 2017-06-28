var PayItForward = angular.module('PayItForward', ['ngRoute','checklist-model','ngMap','720kb.socialshare'])

.config(['$routeProvider','$locationProvider', function($routeProvider,$locationProvider){

$routeProvider
.when('/home',{
templateUrl: 'src/views/home.html',
controller: "MainController"
})
.when('/hospitals',{
  templateUrl: 'src/views/hospitals.html',
  controller: "HospitalController"
})
.when('/organisation',{
  templateUrl: 'src/views/organisation.html',
  controller: "MainController"
})
.when('/editorgprofile',{
  templateUrl: 'src/views/editorgProfile.html'
})
.when('/addvolreview', {
  templateUrl: 'src/views/addvolreview.html'
})
.when('/postevents',{
  templateUrl: 'src/views/postevents.html',
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
.when('/userprofile', {
  templateUrl: 'src/views/userprofile.html',
  resolve: {
    logincheck: checkLoggedin
  },
  controller: "MainController"
})
.when('/orgprofile', {
  templateUrl: 'src/views/orgprofile.html',
  resolve: {
    logincheck: checkLoggedin
  },
  controller: "MainController"
})
.when('/organisationlogin',{
  templateUrl: 'src/views/organisationlogin.html',
  controller: "MainController"
})
.when('/event',{
  templateUrl: 'src/views/events.html',
  controller: "MainController"
})
.when('/viewevent',{
  templateUrl: 'src/views/viewevent.html',
  controller: "MainController"
})
.otherwise({
  redirectTo: '/home',
  controller: "MainController"
});
}]);

var checkLoggedin = function($q, $timeout, $http, $location, $rootScope)
{
    var deferred = $q.defer();
//console.log("checking");
//console.log(user);
   $http.get('/loggedin').then(successCallback, errorCallback);

    function successCallback(user)
    {
      //console.log("inside http");
      console.log(user);
      $rootScope.currentUser = user;
        $rootScope.errorMessage = null;
        // User is Authenticated
        if (user.data !== '0'){
          console.log("success");
            deferred.resolve();
          }
        // User is Not Authenticated
        else
        {
          //console.log("failure");
            $rootScope.errorMessage = 'You need to log in.';
            deferred.reject();
            //console.log(user);
            $location.url('/home');
        }
    }
    function errorCallback(response){
      console.log("error");
    }

//http.get('/loggedin').success(function(user))
    return deferred.promise;
};
