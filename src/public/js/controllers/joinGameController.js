app.controller('joinGameController', ['$scope', '$http', '$location', 'currentUser', 'currentGame', function($scope,$http,$location,currentUser, currentGame){
    $scope.currentUser = currentUser;
    // console.log($scope.currentUser.id, 'scope.currentUser in joinGameController');

    $scope.submitJoinClicked = function(event, formInfo){
        event.preventDefault();
        // console.log(formInfo);
        $http.post('/users/'+ $scope.currentUser.id +'/games/'+ formInfo.gameId +'/join', formInfo).then(function(response){
            $location.path('/dashboard')
        })
    }

    $scope.cancelClicked = function(event){
        event.preventDefault()
        $location.path('/dashboard')
    }


    // Submit button click function sends info in $http.post to /:game_id/query route.
    //This route queries all the game info from the DB and returns data to the dot then function in the joinGameController.
    //This data needs to include: game name, start time, players currently signed up, and websites associates with the game



    $scope.goToConfirm = function(event, gameInfo){
        event.preventDefault();
        // console.log(gameInfo, 'gameInfo', $scope.currentUser.id);
        $http.get('/users/'+ $scope.currentUser.id +'/games/'+ gameInfo.gameId).then(function(response){
            console.log(response.data, 'Dot then function inside goToConfirm inside joinGameController');
            currentGame.set(response.data);
            $location.path('/confirmjoin')
        })
    }

}])
