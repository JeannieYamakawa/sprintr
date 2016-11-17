
app.controller('leaderboardController', ['$scope', '$http', '$location', 'currentUser', 'currentGame', 'logoutServ', function($scope, $http, $location, currentUser, currentGame, logoutServ) {
    $scope.logout = logoutServ.logout;

    $scope.view = {};

    var gameId = currentGame.getSelectedGame();

    $http.get('users/' + currentUser.id + '/games/' + gameId).then(function(game) {
        var gameDetails = game.data;
        console.log(gameDetails);
    })
  }
]);
