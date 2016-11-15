var app = angular.module("timeTracker", ['ngMessages', 'ngRoute']);

app.config(function($routeProvider, $locationProvider) {
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
    .when('/dashboard', {
      templateUrl: 'partials/dashboard.html',
      controller: 'dashboardController',
      resolve: {
        currentUser: function($http, $location) {
          if (localStorage.getItem('token')) {
            console.log(localStorage.getItem('token'),
              'token from config resolve');
            const config = {
              headers: {
                'Authorization': 'Bearer ' + localStorage.getItem(
                  'token')
              }
            };
            return $http.get('/verify', config)
              .then(function(response) {
                return response.data;
              })

            .catch(function(error) {
              console.log(error, 'resolve error');
              localStorage.clear();
              return null;
            });
          }
        }
      }
    })
});
