app.controller('joinGameController', ['$scope', '$http', '$location', 'currentUser', function($scope,$http,$location,currentUser){
    $scope.currentUser = currentUser;
    console.log($scope.currentUser.id, 'scope.currentUser in joinGameController');

    $scope.form = {};
    $scope.form.gameName = '';
    $scope.form.gamePassword = '';

    $scope.submitJoinClicked = function(event, formInfo){
        event.preventDefault();
        console.log(formInfo);
    }

}])
