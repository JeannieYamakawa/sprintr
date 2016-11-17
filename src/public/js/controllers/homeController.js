app.controller('homeController', ['$scope', '$http', '$location', '$window',
  function($scope, $http, $location, $window) {
      
    $scope.view = {};

    // $scope.login = function() {
    //   var data = {
    //     username: $scope.view.username,
    //     password: $scope.view.password
    //   };
    //   $http.post('/login', data).then(function successCallback(response) {
    //     console.log('response', response);
    //     $window.localStorage.setItem('token', response.data.token);
    //     $location.path('/dashboard');
    //   });
    // }

  }
]);
