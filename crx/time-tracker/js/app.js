var app = angular.module("timeTracker", ['ngRoute']);

app.config(function($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'partials/login.html',
            controller: 'loginController',
        })
        .when('/dashboard', {
            templateUrl: 'partials/dashboard.html',
            controller: 'dashboardController',
            resolve: {
                currentUser: function($http) {
                    if (localStorage.getItem('token')) {

                        const config = {
                            headers: {
                                'Authorization': 'Bearer ' + localStorage.getItem('token')
                            }
                        };
                        return $http.get('/verify', config)
                            .then(function(response) {
                                console.log("confirmed valid token");
                                return response.data;
                            })
                            .catch(function(response) {
                                console.log("resolve error");
                                localStorage.clear();
                                return null;
                            });
                    }
                }
            },
        });
});

// app.config(function($routeProvider) {
//     $routeProvider
//         .when('/', {
//             templateUrl: 'partials/login.html',
//             controller: 'loginController',
//         })
//         .when('/dashboard', {
//             templateUrl: 'partials/dashboard.html',
//             controller: 'dashboardController',
//         });
// });



app.controller('loginController', ['$scope', '$http', '$location', function($scope, $http, $location){

  $scope.view = {};

  ///TODO -Change this to check verify token with server before going to dashboard
  //send the user to the dashboard if they have a token from a previous session
  chrome.storage.local.get("token", function(token){
    if (token.hasOwnProperty("token")){
      $location.path('/dashboard');
    }
  })

  $scope.login = function(){
    var data = {username: $scope.view.username, password: $scope.view.password};
    $http.post('http://localhost:8000/login', data).then(function successCallback(response) {
        console.log('response', response);
        if (response.data.token){
          var token = response.data.token;
          chrome.storage.local.set({token: token}, function(){
            console.log("stored token");
          });
          //TODO - this redirect should be nested inside the storage function, but nested it requires user to click login twice due to some $scoping issue.
          $location.path('/dashboard')
        } else {
          $scope.view.badLogin = "Bad Credentials"
        }
    });
  };

  $scope.logTokens = function(){
    chrome.storage.local.get("token", function(token){
      console.log(token);
    })
  }

}]);

app.controller('dashboardController', ['$scope', '$http', '$location', function($scope, $http, $location){

  $scope.view = {};

  $scope.logout = function(){
    chrome.storage.local.clear();
    $location.path('/');
  }

}]);