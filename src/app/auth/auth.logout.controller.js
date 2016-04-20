(function() {
  'use strict';

  angular
    .module('app.auth')
    .controller('authLogoutController', authLogoutController);

  authLogoutController.$inject = ['$rootScope', '$state'];

  function authLogoutController($rootScope, $state) {
    $rootScope.currentUser = null;
    $state.go('app');
  }
})();
