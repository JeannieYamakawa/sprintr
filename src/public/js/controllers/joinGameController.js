app.controller('joinGameController', ['$scope', '$http', '$location', 'currentUser', function($scope,$http,$location,currentUser){
    $scope.currentUser = currentUser;
    console.log($scope.currentUser.id, 'scope.currentUser in joinGameController');


    $scope.submitJoinClicked = function(event, formInfo){
        event.preventDefault();
        console.log(formInfo);
        $http.post('/users/'+ $scope.currentUser.id +'/games/'+ formInfo.gameId +'/join', formInfo).then(function(response){
            $location.path('/dashboard')
        })
    }

    $scope.cancelClicked = function(event){
        event.preventDefault()
        $location.path('/dashboard')
    }

}])
