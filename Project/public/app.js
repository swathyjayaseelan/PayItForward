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
