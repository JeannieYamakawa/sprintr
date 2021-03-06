var app = angular.module( "timeTracker", [ 'ngRoute', "chart.js" ] );

app.config( function( $routeProvider ) {
    $routeProvider
        .when( '/', {
            templateUrl: 'partials/login.html',
            controller: 'loginController',
        } )
        .when( '/dashboard', {
            templateUrl: 'partials/dashboard.html',
            controller: 'dashboardController',
        } )
        .when( '/choosegame', {
            templateUrl: 'partials/choosegame.html',
            controller: 'chooseGameController'
        } )
        .when( '/leaderboard', {
            templateUrl: 'partials/leaderboard.html',
            controller: 'leaderboardController'
        } )
} );

app.controller( 'chooseGameController', [ '$scope', '$http', '$location', 'saveGames', 'logoutServ', function( $scope, $http, $location, saveGames, logoutServ ) {
    $scope.view = {};
    $scope.logout = logoutServ.logout;

    $scope.view.currentUser = false;

    chrome.storage.local.get( 'token', function( token ) {
        if ( token.hasOwnProperty( "token" ) ) {

            const config = {
                headers: {
                    'Authorization': 'Bearer ' + token.token
                }
            };
            $http.get( 'http://localhost:8000/verify', config )
                .then( function( response ) {
                    console.log( "confirmed valid token" );
                    console.log( response.data );
                    $scope.view.currentUser = response.data;
                    chrome.storage.local.set( {
                        currentUser: response.data
                    }, function() {
                        console.log( "stored currentUser" );
                    } )
                } )
                .catch( function( response ) {
                    console.log( "resolve error" );
                } );
        }
    } );

    $scope.view.games = saveGames.getAllGames();
    console.log( saveGames.getAllGames(), 'view games in choose game controller' );

    $scope.viewSingleGame = function( gameId ) {
        //fetch data from single game route
        //send that data via service to another controller
        //
        //display miniature chart for that game.
        console.log( gameId, 'gameId from single clicked game funct' );
        saveGames.setCurrentGameId( gameId );
        $location.path( '/leaderboard' );
    }

} ] );


app.controller( 'leaderboardController', [ '$scope', '$http', '$location', 'saveGames', 'logoutServ', function( $scope, $http, $location, saveGames , logoutServ ) {
    $scope.logout = logoutServ.logout;
    $scope.view = {};
    $scope.donutChartLabels = [];
    $scope.donutChartData = [];
    $scope.barLabels = [];
    $scope.barData = [];
    var currentUserStats;
    $scope.view.currentUser = saveGames.getCurrentUser();
    console.log( $scope.view.currentUser, 'scope.currentUser' );

    var gameId = saveGames.getCurrentGameId()
    console.log( gameId, 'gameId in leaderboardController' );

    chrome.storage.local.get( 'token', function( token ) {
        if ( token.hasOwnProperty( "token" ) ) {
            const config = {
                headers: {
                    'Authorization': 'Bearer ' + token.token
                }
            };
            $http.get( 'http://localhost:8000/verify', config )
                .then( function( response ) {
                    console.log( "confirmed valid token" );
                    console.log( response.data, 'booyah' );
                    $scope.view.currentUser = response.data;
                    console.log( $scope.view.currentUser, 'scope.currentUser' );

                    chrome.storage.local.set( {
                        currentUser: response.data
                    }, function() {
                        console.log( "stored currentUser" );
                    } )
                } )
                .catch( function( response ) {
                    console.log( "resolve error" );
                } );
        }
    } );






    $http.get( 'http://localhost:8000/users/' + $scope.view.currentUser.id + '/games/' + gameId.id ).then( function(
        game ) {
        console.log( game, 'game, yo!!' );
        var gameDetails = game.data;
        $scope.view.gameDetails = gameDetails;
        console.log( $scope.view.gameDetails );
        var playerTotalTimes = [];


        //TODO- duplicate code below with dashbaord Controller logic. put this into an angular service.
        //build arrays for main ranked chart
        //loop through each player
        gameDetails.game_stats.forEach( function( player ) {

            var playerTime = {};
            playerTime.username = player.username;
            playerTime.player_id = player.player_id;
            var totalTime = 0;
            // console.log( playerTime, 'playerTime object' );

            //loop through every tracked url and add a players total time
            player.stats.forEach( function( stat ) {
                totalTime += stat.total_time;
            } );
            playerTime.total_time = totalTime;
            playerTotalTimes.push( playerTime );
        } );

        //sort the players according to total total time
        for ( var i = playerTotalTimes.length - 1; i >= 0; i-- ) {

            for ( var j = 1; j <= i; j++ ) {

                if ( playerTotalTimes[ j - 1 ].total_time >
                    playerTotalTimes[ j ].total_time ) {
                    var temp = playerTotalTimes[ j - 1 ];
                    playerTotalTimes[ j - 1 ] = playerTotalTimes[ j ];
                    playerTotalTimes[ j ] = temp;
                }
            }
        }

        var borderOptions = [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)'
        ];

        var backgroundOptions = [
            'rgba(255,99,132,1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
        ];

        var chartLables = [];
        var chartData = [];
        var backgroundColor = [];
        var borderColor = [];

        //Structure data for ranking chart
        for ( var i = 0; i < playerTotalTimes.length; i++ ) {
            $scope.barLabels.push( playerTotalTimes[ i ].username );
            $scope.barData.push( playerTotalTimes[ i ].total_time );
            var border = borderOptions.splice( 0, 1 )[ 0 ];
            var color = backgroundOptions.splice( 0, 1 )[ 0 ];
            borderColor.push( border );
            backgroundColor.push( color );
        }

        console.log( $scope.barLabels );
        console.log( $scope.barData );
        console.log( backgroundColor );
        console.log( borderColor );


        //Structure data for player stats donut chart

        var currentUserStats;

        gameDetails.game_stats.forEach( function( player ) {
            if ( player.player_id === $scope.view.currentUser.id ) {
                currentUserStats = player;
                console.log( currentUserStats, 'currentUserStats' );
            }
        } )

        var donutHoverOptions = [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)'
        ];

        var donutColorOptions = [
            'rgba(255,99,132,1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
        ];

        var donutLabels = [];
        var donutData = [];
        var donutBackground = [];
        var donutHover = [];

        currentUserStats.stats.forEach( function( url ) {
            $scope.donutChartLabels.push( url.domain );
            $scope.donutChartData.push( url.total_time );
            var hover = donutHoverOptions.splice( 0, 1 )[ 0 ];
            donutHover.push( hover );
            var color = donutColorOptions.splice( 0, 1 )[ 0 ];
            donutBackground.push( color );
        } );

        console.log( $scope.donutChartLabels );
        console.log( $scope.donutChartData );

        // console.log(donutLabels);
        // console.log(donutData);
        // console.log(donutBackground);
        // console.log(donutHover);

    } )





    //
    // $http.get( 'http://localhost:8000/users/' + $scope.view.currentUser.id + '/games/' + gameId.id ).then( function( game ) {
    //     var gameDetails = game.data;
    //     console.log( 'in the dot then after call' );
    //     console.log( gameDetails, 'gameDetails inside the leaderboard Controller' );
    // } )




} ] )





app.controller( 'loginController', [ '$scope', '$http', '$window', '$location', 'logoutServ',function( $scope, $http, $window, $location , logoutServ ) {
    $scope.logout = logoutServ.logout;
    $scope.view = {};

    ///TODO -Change this to check verify token with server before going to dashboard
    //send the user to the dashboard if they have a token from a previous session
    chrome.storage.local.get( "token", function( token ) {
        if ( token.hasOwnProperty( "token" ) ) {
            $location.path( '/dashboard' );
        }
    } )

    $scope.login = function() {
        console.log( 'sending credentials' );
        var data = {
            username: $scope.view.username,
            password: $scope.view.password
        };
        $http.post( 'http://localhost:8000/login', data ).then( function successCallback( response ) {
            console.log( 'response', response );
            if ( response.data.token ) {
                console.log( response.data.token );
                console.log( $window.localStorage, '$window.localStorage' );
                var token = response.data.token;
                chrome.storage.local.set( {
                    token: token
                }, function() {
                    console.log( "stored token" );
                } );
                $window.localStorage.setItem( 'token', token );
                //BUG- this redirect should be nested inside the storage function, but nesting it requires user to click login twice due to some $scoping issue.
                $location.path( '/dashboard' )
            } else {
                $scope.view.badLogin = "Bad Credentials"
            }
        } );
    };

    $scope.logTokens = function() {
        chrome.storage.local.get( "token", function( token ) {
            console.log( token, 'token from $scope.logTokens' );
        } )
    }

} ] );

app.controller( 'dashboardController', [ '$scope', '$http', '$location', '$window', 'saveGames', 'logoutServ',function( $scope, $http, $location, $window, saveGames , logoutServ ) {
    $scope.logout = logoutServ.logout;
    $scope.view = {};
    // chrome.cookies.set({controllerCookie: 'booyahController'}, function(data){
    //     console.log(data, 'controllerCookie');
    // })

    $scope.view.currentUser = false;

    chrome.storage.local.get( 'token', function( token ) {
        if ( token.hasOwnProperty( "token" ) ) {

            const config = {
                headers: {
                    'Authorization': 'Bearer ' + token.token
                }
            };
            $http.get( 'http://localhost:8000/verify', config )
                .then( function( response ) {
                    console.log( "confirmed valid token" );
                    console.log( response.data );
                    $scope.view.currentUser = response.data;
                    chrome.storage.local.set( {
                        currentUser: response.data
                    }, function() {
                        console.log( "stored currentUser" );
                    } )
                } )
                .catch( function( response ) {
                    console.log( "resolve error" );
                } );
        }
    } );

    $scope.logout = function() {
        chrome.storage.local.clear();
        $location.path( '/' );
    }
    $scope.viewChooseGame = function() {
        if ( $scope.view.currentUser ) {
            $scope.view.hi = "You have a valid token";
            $http.get( 'http://localhost:8000/users/' + $scope.view.currentUser.id + '/games' ).then( function(
                response ) {
                var gamesList = response.data;
                console.log( gamesList, 'gamesList inside view choose game funct' );

                var promiseArray = [];
                gamesList.forEach( function( game ) {
                    promiseArray.push( new Promise( function( resolve, reject ) {

                        $http.get( 'http://localhost:8000/users/' + $scope.view.currentUser.id + '/games/' +
                            game.game_id ).then( function( game ) {
                            var gameDetails = game.data;
                            resolve( gameDetails );
                        } )
                    } ) );
                } )

                Promise.all( promiseArray ).then( function( gamesDetails ) {
                    gamesList.forEach( function( game ) {
                        game.player_stats = [];
                        gamesDetails.forEach( function( gameDetails ) {
                            if ( parseInt( game.game_id ) === parseInt(
                                    gameDetails.game_id ) ) {
                                gameDetails.game_stats.forEach( function(
                                    game_stat ) {
                                    game.player_stats.push( game_stat );
                                } )
                            }
                        } );
                    } )

                    //Determine game rankings for each game
                    gamesList.forEach( function( game ) {
                        console.log( game );
                        var playerTotalTimes = [];
                        //loop through each player in the game
                        game.player_stats.forEach( function( player ) {
                            var playerTime = {};
                            playerTime.username = player.username;
                            playerTime.player_id = player.player_id;
                            var totalTime = 0;

                            //loop through every tracked url and add a players total time
                            player.stats.forEach( function( stat ) {
                                totalTime += stat.total_time;
                            } );
                            playerTime.total_time = totalTime;
                            playerTotalTimes.push( playerTime );
                        } );

                        //sort the players according to total total time
                        for ( var i = playerTotalTimes.length - 1; i >= 0; i-- ) {

                            for ( var j = 1; j <= i; j++ ) {

                                if ( playerTotalTimes[ j - 1 ].total_time >
                                    playerTotalTimes[ j ].total_time ) {
                                    var temp = playerTotalTimes[ j - 1 ];
                                    playerTotalTimes[ j - 1 ] = playerTotalTimes[ j ];
                                    playerTotalTimes[ j ] = temp;
                                }
                            }
                        }
                        game.first_place = playerTotalTimes[ 0 ];
                        game.second_place = playerTotalTimes[ 1 ];
                        game.third_place = playerTotalTimes[ 2 ];

                    } )
                    $scope.view.games = gamesList;
                    $scope.$digest();
                    //   console.log($scope.view.games, 'scope.view.games inside of function viewChooseGame function');
                    saveGames.setAllGames( gamesList )
                    saveGames.setCurrentUser( $scope.view.currentUser )
                        //   console.log(saveGames.getAllGames(), 'service games')
                    $location.path( '/choosegame' );
                } );
            } )

        } else {
            $location.path( '/' );
        }


    }


    $scope.viewWebPortal = function() {

        chrome.tabs.create( {
            url: 'http://localhost:8000/#/'
        } )


    }

} ] );
