(function() {
  'use strict';

  angular
    .module('app.home')
    .controller('homeViewController', homeViewController);

  homeViewController.$inject
    = ['$scope', '$rootScope', 'memberService', 'authService', '$stateParams', '$state'];

  function homeViewController($scope, $rootScope, memberService, authService, $stateParams, $state) {
    if ($rootScope.currentUser) {
      memberService.getMember($stateParams.id)
      .then(member => {
        $scope.profile = member;
      });
    } else {
      $state.go('auth.login');
    }
  }
})();
