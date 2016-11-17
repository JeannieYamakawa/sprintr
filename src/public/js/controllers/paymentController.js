app.controller('confirmJoinController', ['$scope', '$http', '$location', '$window', 'currentUser', 'currentGame', 'logoutServ', function($scope, $http, $location, $window, currentUser, currentGame) {


    $scope.currentUser = currentUser;
    $scope.currentGame = {};
    $scope.currentGame.gameId = $window.localStorage.getItem('gameId');


}]);
