(function() {
  'use strict';

  angular
    .module('app.home')
    .controller('homeIndexController', homeIndexController);

  homeIndexController.$inject = ['$scope', '$rootScope', 'memberService', 'authService', '$state'];

  function homeIndexController($scope, $rootScope, memberService, authService, $state) {
    if ($rootScope.currentUser) {
      console.log($rootScope.currentUser);
      $scope.test = 'This is a test';
      $scope.dataReceived = false;
      memberService.getMembers(5)
      .then(members => {
        $scope.dataReceived = true
        $scope.profiles = members;
      });
      $scope.user = authService.getUserInfo();
    } else {
      $state.go('auth.login');
    }
  }
})();
