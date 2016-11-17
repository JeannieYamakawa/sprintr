app.factory('currentGame', function() {

    var currentGameId;

    return {
      
        setSelectedGame: function(gameId) {
            currentGameId = gameId;
        },
        getSelectedGame: function() {
            return currentGameId;
        }
    }
});
