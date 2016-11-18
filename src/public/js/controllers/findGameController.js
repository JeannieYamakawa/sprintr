app.controller('findGameController', ['$scope', '$http', '$location', '$window', 'currentUser', 'currentGame', 'logoutServ',function($scope,$http,$location,$window, currentUser, currentGame, logoutServ){
    $scope.currentUser = currentUser;
    // console.log($scope.currentUser.id, 'scope.currentUser in joinGameController');
    $scope.logout = logoutServ.logout;
    console.log($scope.currentUser.id, 'current user id in confirm controller');



    $scope.cancelClicked = function(event){
        event.preventDefault()
        $location.path('/dashboard')
    }


    $scope.goToConfirm = function(event, gameInfo){
        event.preventDefault();
        console.log(gameInfo, 'gameInfo');
        $http.get('/users/'+ $scope.currentUser.id +'/games/'+ gameInfo.gameId).then(function(response){
            console.log(response.data, 'Dot then function inside goToConfirm inside joinGameController');
            // currentGame.setWholeGame(response.data.name);
            $window.localStorage.setItem('game', response.data.name);
            $window.localStorage.setItem('gameId', response.data.game_id);
            $window.localStorage.setItem('gameStats', JSON.stringify(response.data.game_stats));
            $window.localStorage.setItem('startTime', response.data.start_time);
            $window.localStorage.setItem('gameType', response.data.game_type);
            $location.path('/confirmjoin')
        })
    }

}])
