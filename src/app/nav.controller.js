(function() {
  'use strict';

  angular
    .module('app')
    .controller('navBarController', navBarController);

  navBarController.$inject = ['$scope', '$rootScope', 'authService', '$state'];

  function navBarController($scope, $rootScope, authService, $state) {
    $rootScope.currentUser = authService.getUserInfo();
    if ($rootScope.currentUser) {
      $state.go('home');
    }
  }
})();
