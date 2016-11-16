app.controller('dashboardController', ['$scope', '$http', '$location',
    '$window', 'currentUser', '$routeParams',
    function($scope, $http, $location, $window, currentUser, $routeParams) {

        $scope.view = {};
        $scope.currentUser = currentUser;
        // console.log($scope.currentUser, 'scope.currentUser');

        // only render this part of the page if the user is using a valid token
        if ($scope.currentUser) {
            console.log($scope.currentUser, '$scope.currentUser');
            $scope.view.hi = "You have a valid token";
            $http.get('users/' + currentUser.id + '/games').then(function(
                response) {
                var gamesList = response.data;

                var promiseArray = [];

                gamesList.forEach(function(game) {
                    promiseArray.push(new Promise(function(resolve, reject) {

                        $http.get('users/' + currentUser.id + '/games/' + game.game_id).then(function(game) {
                            var gameDetails = game.data;
                            resolve(gameDetails);
                        })
                    }));
                })

                Promise.all(promiseArray).then(function(gamesDetails) {
                    gamesList.forEach(function(game) {
                      game.player_stats = [];
                        gamesDetails.forEach(function(gameDetails) {
                            if (parseInt(game.game_id) === parseInt(gameDetails.game_id)) {
                                game.player_stats.push(gameDetails);
                            }
                        });
                    })
                    console.log(gamesList);
                    $scope.view.games = gamesList;
                });

            });

        } else {
            $location.path('/')
        }

        $scope.singleGameClicked = function(gameId) {
            console.log(gameId, 'gameId from single clicked game funct');
            $http.get('users/' + $scope.currentUser.id + '/games/' + gameId).then(function(response) {
                // console.log( response, 'response from singleGameClicked function in dash controller' );
                //this will be set to go to the view single game leaderboard page.
                // $location.path('/')
            })
        }
    }
]);
