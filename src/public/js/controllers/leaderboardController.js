        app.controller('leaderboardController', ['$scope', '$http', '$location',
            'currentUser', 'currentGame', 'logoutServ',
            function($scope, $http, $location, currentUser, currentGame, logoutServ) {

                $scope.logout = logoutServ.logout;

                $scope.view = {};

                var gameId = currentGame.getSelectedGame();


                  var loadStats = function(){

                    $http.get('users/' + currentUser.id + '/games/' + gameId).then(function(
                      game) {
                        var gameDetails = game.data;
                        $scope.view.gameDetails = gameDetails;
                        console.log($scope.view.gameDetails);
                        var playerTotalTimes = [];

                        //calculate time remaining in the games

                        window.setInterval(function() {
                          var now = moment(new Date());
                          var end = moment(gameDetails.end_time);
                          var duration = moment.duration(end.diff(now));

                          $scope.view.days = duration.days();
                          $scope.view.hours = duration.hours();
                          $scope.view.minutes = duration.minutes();
                          $scope.view.seconds = duration.seconds();
                          $scope.$digest();

                        }, 1000)

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
                            'rgba(255, 159, 64, 1)',
                            'rgba(255,99,132,1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(255, 206, 86, 1)',
                            'rgba(75, 192, 192, 1)',
                            'rgba(153, 102, 255, 1)',
                          ];


                          $scope.barLabels = [];
                          $scope.barData = [];
                          $scope.donutChartLabels = [];
                          $scope.donutChartData = [];
                          $scope.donutChartColors = [
                            "#FF6384",
                            "#36A2EB",
                            "#ffce56",
                            "#4bc0c0",
                            "#9966ff"
                          ];

                          var chartLables = [];
                          var chartData = [];
                          var backgroundColor = [];
                          var borderColor = [];

                          //Structure data for ranking chart
                          for (var i = 0; i < playerTotalTimes.length; i++) {
                            $scope.barLabels.push(playerTotalTimes[i].username);
                            $scope.barLabels.reverse()
                            $scope.barData.push(playerTotalTimes[i].total_time / 60);
                            $scope.barData.reverse();
                            var border = borderOptions.splice(0, 1)[0];
                            var color = backgroundOptions.splice(0, 1)[0];
                            borderColor.push(border);
                            backgroundColor.push(color);
                          }

                          console.log($scope.barLabels);
                          console.log($scope.barData);
                          // console.log(backgroundColor);
                          // console.log(borderColor);


                          //Structure data for player stats donut chart

                          var currentUserStats;

                          gameDetails.game_stats.forEach(function(player) {
                            if (player.player_id === currentUser.id) {
                              currentUserStats = player;
                            }
                          })

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

                          var legendArray = [];

                          currentUserStats.stats.forEach(function(url) {

                            var legendItem = {};
                            legendItem.domain = url.domain;
                            legendItem.color = donutHoverOptions[0];
                            legendArray.push(legendItem);

                            $scope.donutChartLabels.push(url.domain);
                            $scope.donutChartData.push(url.total_time / 60);
                            var hover = donutHoverOptions.splice(0, 1);
                            donutHover.push(hover[0]);
                            var color = donutColorOptions.splice(0, 1);
                            donutBackground.push(color[0]);
                          });

                          console.log(legendArray);
                          $scope.view.legendArray = legendArray;

                          // console.log($scope.donutChartLabels);
                          // console.log($scope.donutChartData);

                          // console.log(donutLabels);
                          // console.log(donutData);
                          // console.log(donutBackground);
                          // console.log(donutHover);
                        });
            }



            loadStats();
            //refresh the leaderboard
            window.setInterval(loadStats, 3000)



          }
        ]);
