var app = angular.module("timeTracker", ['ngRoute']);

app.config(function($routeProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'partials/home.html',
      controller: 'homeController'
    })
    .when('/signup', {
      templateUrl: 'partials/signup.html',
      controller: 'signupController'
    })
    .when('/login', {
      templateUrl: 'partials/login.html',
      controller: 'loginController'
    })



  // .when('/dashboard', {
  //   templateUrl: 'partials/dashboard.html',
  //   controller: 'dashboardController',
  //   resolve: {
  //     currentUser: function($http) {
  //       if (localStorage.getItem('token')) {
  //
  //         const config = {
  //           headers: {
  //             'Authorization': 'Bearer ' + localStorage.getItem(
  //               'token')
  //           }
  //         };
  //         return $http.get('/verify', config)
  //           .then(function(response) {
  //             console.log("confirmed valid token");
  //             return response.data;
  //           })
  //           .catch(function(response) {
  //             console.log("resolve error");
  //             localStorage.clear();
  //             return null;
  //           });
  //       }
  //     }
  //   }
  // });
});
