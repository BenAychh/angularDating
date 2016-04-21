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
      $scope.currentSelection = 'new';
      $scope.getNew = function(count) {
        $scope.currentSelection = 'new';
        $scope.dataReceived = false;
        memberService.getMembers(5)
        .then(members => {
          updateScope(members);
        });
      }
      $scope.getMatches = () => {
        $scope.currentSelection = 'matches';
        $scope.dataReceived = false;
        memberService.getMatches($rootScope.currentUser._id)
        .then(matches => {
          updateScope(matches);
        });
      }
      $scope.getPopular = (forwards) => {
        $scope.currentSelection = 'popular';
        $scope.dataReceived = false;
        memberService.getPopular(forwards)
        .then(plastics => {
          updateScope(plastics)
        })
      }
      $scope.getNear = (forwards) => {
        $scope.currentSelection = 'near';
        $scope.dataReceived = false;
        memberService.getNear($rootScope.currentUser.address.geo.lat,
          $rootScope.currentUser.address.geo.lng, forwards)
        .then(closeMembers => {
          updateScope(closeMembers)
        })
      }
      $scope.getNew(5);
    } else {
      $state.go('auth.login');
    }
    function updateScope(members) {
      $timeout(() => {
        $scope.dataReceived = true
        $scope.profiles = members;
      });
    }
  }
})();
