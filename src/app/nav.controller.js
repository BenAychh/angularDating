(function() {
  'use strict';

  angular
    .module('app')
    .controller('navBarController', navBarController);

  navBarController.$inject = ['$scope', '$rootScope', 'authService'];

  function navBarController($scope, $rootScope, authService) {
    $scope.user = $rootScope.user;
    console.log($scope.user);
  }
})();
