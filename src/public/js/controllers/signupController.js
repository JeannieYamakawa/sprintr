app.controller('signupController', ['$scope', '$http', '$location',
            '$window', 'logoutServ',
            function($scope, $http, $location, $window, logoutServ) {

                $scope.view = {};
                $scope.view.signupFormInfo = {
                    firstname: "",
                    lastname: "",
                    username: "",
                    password: "",
                    email: ""
                }
                $scope.logout = logoutServ.logout;

                $scope.submitSignupForm = function(event) {
                    event.preventDefault();

                    console.log($scope.view.signupFormInfo,
                        'signupFormInfo from controller');

                    $http.post('/signup', $scope.view.signupFormInfo)
                        .then(function(response) {
                            console.log(response, 'response in dot then function');
                            $window.localStorage.setItem('token', response.data.token);
                            var userId = response.data.id;
                            $location.path('/dashboard')
                        })
                }
              }
            ]);
