
app.controller('leaderboardController', ['$scope', '$http', '$location', 'currentUser', 'currentGame', function($scope, $http, $location, currentUser, currentGame) {

    $scope.view = {};

    var gameId = currentGame.getSelectedGame();

    $http.get('users/' + currentUser.id + '/games/' + gameId).then(function(game) {
        var gameDetails = game.data;
        console.log(gameDetails);
    })
  }
]);
