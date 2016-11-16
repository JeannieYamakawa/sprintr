app.controller('newgameController', ['$scope', '$http', '$location',
  'currentUser',
  function($scope, $http, $location, currentUser) {
    $scope.view = {};
    $scope.view.newgameFormInfo = {};
    $scope.view.newgameFormInfo.websites = [];



    $scope.view.newWebsite = function(event, site) {
      event.preventDefault()
      console.log(site, 'site.....');
      if (site) {
        if ($scope.view.newgameFormInfo.websites.indexOf(
            site) === -1) {
          $scope.view.newgameFormInfo.websites.push(site)
          $scope.website.name = ''
          console.log($scope.view.newgameFormInfo.websites,
            '$scope.view.newgameFormInfo.websites');
        }
      }
    }
    $scope.removeWebsite = function() {
      var indexInArray = $scope.view.newgameFormInfo.websites
        .indexOf(
          this.site);
      $scope.view.newgameFormInfo.websites.splice(
        indexInArray, 1)
    }

    $scope.editWebsite = function() {
      this.editShow = false;
      this.editShow = !this.editShow;
      $scope.editIndex = $scope.view.newgameFormInfo.websites
        .indexOf(
          this.site);
      console.log($scope.editIndex);
      console.log(this, 'this');
    }

    $scope.updateSite = function(siteItself) {
      let siteIndex = this.$index;
      this.site = siteItself;
      $scope.view.newgameFormInfo.websites[siteIndex] =
        siteItself;
      console.log($scope.view.newgameFormInfo.websites,
        'updated websites');
    }
    $scope.cancelClicked = function(event){
        event.preventDefault();
        $location.path('/dashboard')
    }

    $scope.currentUser = currentUser;
    console.log($scope.currentUser.id,
      'scope.currentUser in newGameController');

    $scope.submitNewgameForm = function(event, gameInfo) {
      event.preventDefault();
      console.log(gameInfo, 'gameInfo inside submitNewgameForm funct');

      $http.post('/users/' + $scope.currentUser.id + '/games/new', {
        data: gameInfo,
        currentUser: $scope.currentUser
      }).then(function() {
        console.log(
          'dot then function after post new game route working'
        );
        $location.path('/dashboard')
      })
    }

  }]);
