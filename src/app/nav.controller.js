(function() {
  'use strict';

  angular
    .module('app')
    .controller('navBarController', navBarController);

  navBarController.$inject = ['$scope', '$rootScope', 'authService'];

  function navBarController($scope, $rootScope, authService) {
    console.log($scope.user);
    $rootScope.currentUser = authService.getUserInfo();
  }
})();
