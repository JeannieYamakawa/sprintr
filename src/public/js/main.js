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
        .when('/joingame', {
            templateUrl: 'partials/joingame.html',
            controller: 'joinGameController',
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
});
