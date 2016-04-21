(function() {
  'use strict';

  angular
    .module('app.home')
    .controller('homeSearchController', homeSearchController);

  homeSearchController.$inject = ['$scope', '$rootScope', 'memberService'];
  function homeSearchController($scope, $rootScope, memberService) {
    $scope.doSearch = function() {
      $scope.searching = true;
      memberService.searchMembers($scope.searchForm).
      then(searchResults => {
        $scope.searching = false;
        $scope.searchProfiles = searchResults;
        $scope.$digest();
      });
    }
  }
})();
