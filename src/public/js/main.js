var app = angular.module("timeTracker", ["ui.router"]);

app.config(function($stateProvider, $urlRouterProvider) {
    var home = {
        name: 'home',
        url: '/',
        controller: 'homeController',
        templateUrl: 'partials/home.html'
    };

    // var profile = {
    //     name: 'profile',
    //     url: '/profile',
    //     controller: 'profileController',
    //     templateUrl: 'partials/profile.html',
    //     resolve: {
    //         currentUser: function($http) {
    //             if (localStorage.getItem('token')) {
    //
    //                 const config = {
    //                     headers: {
    //                         'Authorization': 'Bearer ' + localStorage.getItem('token')
    //                     }
    //                 };
    //                 return $http.get('/verify', config)
    //                     .then(function(response) {
    //                         console.log("confirmed valid token");
    //                         return response.data;
    //                     })
    //                     .catch(function(response) {
    //                       console.log("resolve error");
    //                         localStorage.clear();
    //                         return null;
    //                     });
    //             }
    //         }
    //     }
    // };

    $stateProvider.state(home);
    // $stateProvider.state(profile);
    $urlRouterProvider.otherwise('/');
});
