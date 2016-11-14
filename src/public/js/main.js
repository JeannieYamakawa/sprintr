var app = angular.module( "timeTracker", [ 'ngMessages', 'ngRoute' ] );

app.config( function( $routeProvider ) {
    $routeProvider
        .when( '/', {
            templateUrl: 'partials/home.html',
            controller: 'homeController'
        } )
        .when( '/signup', {
            templateUrl: 'partials/signup.html',
            controller: 'signupController'
        } )
        .when( '/login', {
            templateUrl: 'partials/login.html',
            controller: 'loginController'
        } )
        .when( '/users/:user_id/games', {
            templateUrl: 'partials/dashboard.html',
            controller: 'dashboardController',
            resolve: {
                currentUser: function( $http ) {
                    if ( localStorage.getItem( 'token' ) ) {
                        console.log( localStorage.getItem( 'token' ), 'token from config resolve' );
                        const config = {
                            headers: {
                                'Authorization': 'Bearer ' + localStorage.getItem(
                                    'token' )
                            }
                        };
                        return $http.get( '/verify', config )
                            .then( function( response ) {
                                console.log( "confirmed valid token in dashboard view" );
                                return response.data;
                            } )
                            .catch( function( error ) {
                                console.log( error, 'resolve error' );
                                localStorage.clear();
                                return null;
                            } );
                    }
                }
            }
        } )
} );
