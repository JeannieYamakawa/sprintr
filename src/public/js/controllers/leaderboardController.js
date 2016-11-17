app.controller('leaderboardController', ['$scope', '$http', '$location', 'currentUser', 'currentGame', 'logoutServ', function($scope, $http, $location, currentUser, currentGame, logoutServ) {
    $scope.logout = logoutServ.logout;

    $scope.view = {};

    var gameId = currentGame.getSelectedGame();

    $http.get('users/' + currentUser.id + '/games/' + gameId).then(function(game) {
        var gameDetails = game.data;
        var playerTotalTimes = [];


        //TODO- duplicate code below with dashbaord Controller logic. put this into an angular service.
        //build arrays for main ranked chart
        //loop through each player
        gameDetails.game_stats.forEach(function(player) {

            var playerTime = {};
            playerTime.username = player.username;
            playerTime.player_id = player.player_id;
            var totalTime = 0;

            //loop through every tracked url and add a players total time
            player.stats.forEach(function(stat) {
                totalTime += stat.total_time;
            });
            playerTime.total_time = totalTime;
            playerTotalTimes.push(playerTime);
        });

        //sort the players according to total total time
        for (var i = playerTotalTimes.length - 1; i >= 0; i--) {

            for (var j = 1; j <= i; j++) {

                if (playerTotalTimes[j - 1].total_time >
                    playerTotalTimes[j].total_time) {
                    var temp = playerTotalTimes[j - 1];
                    playerTotalTimes[j - 1] = playerTotalTimes[j];
                    playerTotalTimes[j] = temp;
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
        for (var i = 0; i < playerTotalTimes.length; i++) {
            chartLables.push(playerTotalTimes[i].username);
            chartData.push(playerTotalTimes[i].total_time);
            var border = borderOptions.splice(0, 1)[0];
            var color = backgroundOptions.splice(0, 1)[0];
            borderColor.push(border);
            backgroundColor.push(color);
        }

        console.log(chartLables);
        console.log(chartData);
        console.log(backgroundColor);
        console.log(borderColor);


        //Strutre data for player stats chart



    })
}]);
