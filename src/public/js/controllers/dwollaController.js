app.controller('dwollaController', ['$scope', '$http', '$location','$window',
  function($scope, $http, $location, $window) {

    $scope.view = {}

    $scope.view.test = "Sucessful test";


    var client_id = 'GFZgliT3KeVdD63qpeyqujF9WSyjy49zMk55Ipk4D13TItFG16';
    var redirect_uri = 'http://localhost:8000/dwolla_redirect';
    var scope = 'Send|Transactions|Funding';

    var url = 'https://uat.dwolla.com/oauth/v2/authenticate?client_id=' + client_id + '&response_type=code&redirect_uri=' + redirect_uri + '&scope=' + scope + '&dwolla_landing=register';

    url = encodeURI(url);


    $scope.view.dwollaURL = url;

    // $scope.dwolla = function(){
    //   $location.url(url);
    // }

    // $http.get(url).then(function(res){
    //   console.log(res);
    // })

  }
]);
