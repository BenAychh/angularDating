(function() {
  'use strict';

  angular
    .module('app.home')
    .controller('homeMatchController', homeMatchController);

  homeMatchController.$inject = ['$scope', '$rootScope', 'authService'];

  function homeMatchController($scope, $rootScope, authService) {
  }
})();
