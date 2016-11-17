app.service('saveGames', function() {

    this.allGames = [];
    this.currentGame = {};

    this.setAllGames = function(games) {
            this.allGames = games;
            console.log(this.allGames, 'setAllGames log');
        };
    this.getAllGames = function() {
            console.log(this.allGames, 'GET THE DAMN GAMES log');
            return this.allGames;
        };
    this.setCurrentGameId = function(gameId){
        this.currentGame.id = gameId;
        console.log(this.currentGame, 'this.currentGame in service SET');
    };
    this.getCurrentGameId = function(){
        console.log(this.currentGame, 'this.currentGame in service GET');
        return this.currentGame;
    }
});
