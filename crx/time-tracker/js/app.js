var app = angular.module("popup", ['ngRoute']);

// app.config(function($routeProvider) {
//     $routeProvider
//         .when('/', {
//             templateUrl: 'popup.html',
//             controller: 'popupController',
//         })
//         .when('/dashboard', {
//             templateUrl: 'partials/dashboard.html',
//             controller: 'dashboardController',
//             resolve: {
//                 currentUser: function($http) {
//                     if (localStorage.getItem('token')) {
//
//                         const config = {
//                             headers: {
//                                 'Authorization': 'Bearer ' + localStorage.getItem('token')
//                             }
//                         };
//                         return $http.get('/verify', config)
//                             .then(function(response) {
//                                 console.log("confirmed valid token");
//                                 return response.data;
//                             })
//                             .catch(function(response) {
//                                 console.log("resolve error");
//                                 localStorage.clear();
//                                 return null;
//                             });
//                     }
//                 }
//             }
//         });
// });

app.config(function($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'popup.html',
            controller: 'popupController',
        })
        .when('/dashboard', {
            templateUrl: 'dashboard.html',
            controller: 'dashboardController',
        });
});



app.controller('popupController', ['$scope', '$http', '$location', function($scope, $http, $location){

  $scope.view = {};

  $scope.login = function(){
    console.log("boom");
    var data = {username: $scope.view.username, password: $scope.view.password};
    $http.post('http://localhost:8000/login', data).then(function successCallback(response) {
        console.log('response', response);
        var token = response.data.token;
        $location.path('/dashboard')
        // chrome.storage.local.set({token: token}, function(){
        //   console.log("saved token");
        // });
    });
  };

}]);

app.controller('dashboardController', ['$scope', '$http', '$location', function($scope, $http, $location){

  $scope.view = {};


}]);
