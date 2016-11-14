app.controller('homeController', ['$scope', '$http', '$location', '$window', function($scope, $http, $location, $window){

  $scope.view = {}

  $scope.view.hi = "Angularzzzzz Router wokksss";

  $scope.login = function(){
    var data = {username: $scope.view.username, password: $scope.view.password};
    $http.post('/login', data).then(function successCallback(response) {
        console.log('response', response);
        $window.localStorage.setItem('token', response.data.token);
        $location.path('/secured');
    });
  }

}]);

app.controller('securedController', ['$scope', '$http', '$location', '$window', 'currentUser', function($scope, $http, $location, $window, currentUser){

  $scope.view = {}

  console.log(currentUser);


  if (currentUser){
    $scope.view.hi = "You can only see this if you have a valid token";
  }

}]);
