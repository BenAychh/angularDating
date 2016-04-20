(function() {
  'use strict';

  angular
    .module('app.home')
    .controller('homeIndexController', homeIndexController);

  homeIndexController.$inject = ['$scope', '$rootScope', 'memberService'];

  function homeIndexController($scope, $rootScope, memberService) {
    $scope.test = 'This is a test';
    $scope.dataReceived = false;
    memberService.getMembers(5)
    .then(members => {
      $scope.dataReceived = true
      $scope.profiles = members;
      ;
    });
  }
})();
