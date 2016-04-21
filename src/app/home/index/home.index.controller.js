(function() {
  'use strict';

  angular
    .module('app.home')
    .controller('homeIndexController', homeIndexController);

  homeIndexController.$inject = ['$scope', '$rootScope', 'memberService',
      'authService', '$state', '$timeout'];

  function homeIndexController($scope, $rootScope, memberService, authService,
        $state, $timeout) {
    if ($rootScope.currentUser) {
      $scope.getNew = function(count) {
        $scope.dataReceived = false;
        memberService.getMembers(5)
        .then(members => {
          $timeout(() => {
            $scope.dataReceived = true
            $scope.profiles = members;
          });
        });
      }
      $scope.getMatches = () => {
        $scope.dataReceived = false;
        memberService.getMatches($rootScope.currentUser._id)
        .then(matches => {
          $timeout(() => {
            $scope.dataReceived = true
            $scope.profiles = matches;
          });
        });
      }
      $scope.getNew(5);
    } else {
      $state.go('auth.login');
    }
  }
})();
