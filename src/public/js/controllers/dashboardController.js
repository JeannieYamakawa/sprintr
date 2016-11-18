app.controller('dashboardController', ['$scope', '$http', '$location','$window', '$cookies', 'currentUser', '$routeParams', 'currentGame', 'logoutServ',
    function($scope, $http, $location, $window, $cookies, currentUser, $routeParams, currentGame,logoutServ) {
        $scope.logout = logoutServ.logout;

        $scope.view = {};
        $scope.currentUser = currentUser;
        // console.log($scope.currentUser, 'scope.currentUser');

        // only render this part of the page if the user is using a valid token
        if ($scope.currentUser) {
            $scope.view.hi = "You have a valid token";
            $http.get('users/' + currentUser.id + '/games').then(function(
                response) {
                var gamesList = response.data;

                var promiseArray = [];


        gamesList.forEach(function(game) {
          promiseArray.push(new Promise(function(resolve, reject) {

            $http.get('users/' + currentUser.id + '/games/' +
              game.game_id).then(function(game) {
              var gameDetails = game.data;
              resolve(gameDetails);
            })
          }));
        })

        Promise.all(promiseArray).then(function(gamesDetails) {
          gamesList.forEach(function(game) {
            game.player_stats = [];
            gamesDetails.forEach(function(gameDetails) {
              if (parseInt(game.game_id) === parseInt(
                  gameDetails.game_id)) {
                gameDetails.game_stats.forEach(function(
                  game_stat) {
                  game.player_stats.push(game_stat);
                })
              }
            });
          })


          //TODO- duplicate code below with leaderboard Controller logic. put this into an angular service.
          //Determine game rankings for each game
          gamesList.forEach(function(game) {
            console.log(game);
            var playerTotalTimes = [];
            //loop through each player in the game
            game.player_stats.forEach(function(player) {
              var playerTime = {};
              playerTime.username = player.username;
              playerTime.player_id = player.player_id;
              var totalTime = 0;

              //loop through every tracked url and add a players total time
              player.stats.forEach(function(stat) {
                totalTime += stat.total_time;
              });
              playerTime.total_time = totalTime;
              playerTotalTimes.push(playerTime);
            });

            //sort the players according to total total time
            for (var i = playerTotalTimes.length - 1; i >= 0; i--) {

              for (var j = 1; j <= i; j++) {

                if (playerTotalTimes[j - 1].total_time >
                  playerTotalTimes[j].total_time) {
                  var temp = playerTotalTimes[j - 1];
                  playerTotalTimes[j - 1] = playerTotalTimes[j];
                  playerTotalTimes[j] = temp;
                }
              }
            }
            var thirdLast = playerTotalTimes.length-3;
            var secondLast = playerTotalTimes.length-2;
            var last = playerTotalTimes.length-1;

            game.first_place = playerTotalTimes[last];
            game.second_place = playerTotalTimes[secondLast];
            game.third_place = playerTotalTimes[thirdLast];


          })

          $scope.view.games = gamesList;
          $scope.$digest();
        });
      });

    } else {
      $location.path('/')
    }

    $scope.singleGameClicked = function(gameId) {
      console.log(gameId, 'gameId from single clicked game funct');
      currentGame.setSelectedGame(gameId);
      $location.path('/leaderboard');
    }
  }
]);
