app.controller('loginController', ['$scope', '$http', '$location',
  '$window',
  function($scope, $http, $location, $window) {
    
    $scope.view = {}

    $scope.view.loginFormInfo = {
      username: "",
      password: ""
    }

    $scope.submitLoginForm = function(event) {
      event.preventDefault();
      console.log($scope.view.loginFormInfo);
      $http.post('/login', $scope.view.loginFormInfo).then(function(
        response) {
        console.log(response, 'response in dot then function login');
        $window.localStorage.setItem('token', response.data.token);
        var userId = response.data.id;
        $location.path('/dashboard')
      })
    };

  }
]);
