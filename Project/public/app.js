var PayItForward = angular.module('PayItForward', ['ngRoute', 'mainController', 'orgController', 'hospitalController'])

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
.when('/profile', {
  templateUrl: 'src/views/profile.html',
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
  controller: "OrgController"
})
.otherwise({
  redirectTo: '/home',
  controller: "MainController"
});
}]);

var checkLoggedin = function($q, $timeout, $http, $location, $rootScope)
{
    var deferred = $q.defer();
console.log("checking");
//console.log(user);
   $http.get('/loggedin').then(successCallback, errorCallback);

    function successCallback(user)
    {
      console.log("inside http");
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
          console.log("failure");
            $rootScope.errorMessage = 'You need to log in.';
            deferred.reject();
            $location.url('/volunteerlogin');
        }
    }
    function errorCallback(response){
      console.log("error");
    }

//http.get('/loggedin').success(function(user))

    return deferred.promise;
};
