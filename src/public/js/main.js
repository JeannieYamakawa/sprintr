
var app = angular.module("timeTracker", ["ngMessages", "ngRoute",
  "chart.js", 'ngCookies'
]);


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
    .when('/findgame', {
      templateUrl: 'partials/findgame.html',
      controller: 'findGameController',
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
    .when('/newgame', {
      templateUrl: 'partials/newgame.html',
      controller: 'newgameController',
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
    .when('/leaderboard', {
      templateUrl: 'partials/leaderboard.html',
      controller: 'leaderboardController',
      resolve: {
        currentUser: function($http, $location) {
          if (localStorage.getItem('token')) {
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

  .when('/dwolla', {
    templateUrl: 'partials/dwolla.html',
    controller: 'dwollaController'
  })

  .when('/confirmjoin', {
    templateUrl: 'partials/confirmjoin.html',
    controller: 'confirmJoinController',
    resolve: {
      currentUser: function($http, $location) {
        if (localStorage.getItem('token')) {
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
  .when('/payment', {
    templateUrl: 'partials/payment.html',
    controller: 'paymentController',
    resolve: {
      currentUser: function($http, $location) {
        if (localStorage.getItem('token')) {
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
  });
});
