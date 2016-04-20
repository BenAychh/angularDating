(function() {
  'use strict';

  angular
    .module('app.home')
    .controller('homeSearchController', homeSearchController);

  homeSearchController.$inject = ['$scope', '$rootScope', 'authService'];

  function homeSearchController($scope, $rootScope, authService) {
  }
})();
