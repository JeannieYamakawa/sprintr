app.controller('homeController', ['$scope', '$http', '$location', '$window', function($scope, $http, $location, $window){

  $scope.view = {}

  $scope.view.test = "Angularzzzzz Router wokksss";

  $scope.login = function(){
    var data = {username: $scope.view.username, password: $scope.view.password};
    $http.post('/login', data).then(function successCallback(response) {
        console.log('response', response);
        $window.localStorage.setItem('token', response.data.token);
        $location.path('/dashboard');
    });
  }

}]);

app.controller('dashboardController', ['$scope', '$http', '$location', '$window', 'currentUser', function($scope, $http, $location, $window, currentUser){

  $scope.view = {}

  //only render this part of the page if the user is using a valid token
  if (currentUser){
    $scope.view.hi = "You can only see this if you have a valid token";
  } else {
    $location.path('/')
  }

}]);
