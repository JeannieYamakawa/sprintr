app.controller('paymentController', ['$scope', '$http', '$location', '$window', 'currentUser', 'currentGame', function($scope, $http, $location, $window, currentUser, currentGame) {



    $scope.currentUser = currentUser;
    $scope.currentGame = {};
    $scope.currentGame.gameId = $window.localStorage.getItem('gameId');


    $http.get('/payment/' + currentUser.id + '/' + $scope.currentGame.gameId).then(function(res){
      console.log(res);
    })

    $scope.goDashboard = function(){
      $location.path('/dashboard');
    }


}]);
