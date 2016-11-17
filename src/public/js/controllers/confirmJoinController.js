app.controller('confirmJoinController', ['$scope', '$http', '$location', '$window','currentUser', 'currentGame','logoutServ', function($scope, $http, $location, $window, currentUser, currentGame,logoutServ){
    $scope.currentUser = currentUser;
    $scope.currentGame = {};
    $scope.confirmForm={};
    $scope.logout = logoutServ.logout;

    // console.log($scope.currentUser.id, 'scope.currentUser in joinGameController');
    $scope.currentGame.name = $window.localStorage.getItem('game');
    $scope.currentGame.gameId = $window.localStorage.getItem('gameId');
    $scope.currentGame.stats = JSON.parse($window.localStorage.getItem('gameStats'));
    $scope.currentGame.startTime = $window.localStorage.getItem('startTime');
    $scope.currentGame.sites = $scope.currentGame.stats[0];
    $scope.currentGame.gameType = $window.localStorage.getItem('gameType');
    console.log($scope.currentGame.gameType, 'game type !!');

    $scope.submitJoinClicked = function(event, formInfo){
        event.preventDefault();
        console.log(formInfo);
        // $http.post('/users/'+ $scope.currentUser.id +'/games/'+ formInfo.gameId +'/join', formInfo).then(function(response){
        //     $location.path('/dashboard')
        // })
    }

}])
