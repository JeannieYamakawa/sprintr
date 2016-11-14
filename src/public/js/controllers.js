app.controller( 'homeController', [ '$scope', '$http', '$location', '$window',
    function( $scope, $http, $location, $window ) {

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
] );

app.controller( 'signupController', [ '$scope', '$http', '$location',
    '$window',
    function( $scope, $http, $location, $window ) {

        $scope.view = {};
        $scope.view.signupFormInfo = {
            firstname: "",
            lastname: "",
            username: "",
            password: "",
            email: ""
        }

        $scope.submitSignupForm = function( event ) {
            event.preventDefault();

            console.log( $scope.view.signupFormInfo, 'signupFormInfo from controller' );

            $http.post( '/signup', $scope.view.signupFormInfo )
                .then( function( response ) {
                    console.log( response, 'response in dot then function' );
                    $window.localStorage.setItem( 'token', response.data.token );
                    var userId = response.data.id;
                    $location.path( '/users/' + userId + '/games/' )
                } )
        }
    }
] );

app.controller( 'loginController', [ '$scope', '$http', '$location',
    '$window',
    function( $scope, $http, $location, $window ) {

        $scope.view = {}

        $scope.view.loginFormInfo = {
            username: "",
            password: ""
        }

        $scope.submitLoginForm = function( event ) {
            event.preventDefault();
            console.log( $scope.view.loginFormInfo );
        };

    }
] );

app.controller( 'dashboardController', [ '$scope', '$http', '$location',
    '$window', 'currentUser',
    function( $scope, $http, $location, $window, currentUser ) {

        $scope.view = {};

        only render this part of the page
        if the user is using a valid token
        if ( currentUser ) {
            $scope.view.hi = "You have a valid token";
        } else {
            $location.path( '/' )
        }

    }
] );
