(function() {
  'use strict';

  angular
    .module('app.home')
    .controller('homeEditController', homeEditController);

  homeEditController.$inject = ['$scope', '$rootScope', 'authService'];

  function homeEditController($scope, $rootScope, authService) {
  }
})();
