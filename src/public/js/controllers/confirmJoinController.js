app.controller('confirmJoinController', ['$scope', '$http', '$location', 'currentUser', 'currentGame', function($scope,$http,$location,currentUser, currentGame){
    $scope.currentUser = currentUser;
    // console.log($scope.currentUser.id, 'scope.currentUser in joinGameController');
    $scope.currentGame = currentGame.get();
    console.log($scope.currentGame, 'currentGame _+_+_+_+_+_+')

}])
