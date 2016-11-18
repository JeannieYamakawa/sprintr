app.factory('logoutServ', ['$window', '$location', function($window, $location) {

    return {
        logout: function(){
            $window.localStorage.clear();
            $location.path( '/' );
            console.log('hitting logout funct');
        }
    }
}]);
