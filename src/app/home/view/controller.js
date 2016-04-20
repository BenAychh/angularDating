(function() {
  'use strict';

  angular
    .module('app.home')
    .controller('homeViewController', homeViewController);

  homeViewController.$inject
    = ['$scope', '$rootScope', 'memberService', 'authService', '$stateParams'];

  function homeViewController($scope, $rootScope, memberService, authService, $stateParams) {
    memberService.getMember($stateParams.id)
    .then(member => {
      $scope.profile = member;
    });
  }
})();
