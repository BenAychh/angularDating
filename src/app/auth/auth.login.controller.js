(function() {
  'use strict';

  angular
    .module('app.auth')
    .controller('authLoginController', authLoginController);

  authLoginController.$inject = ['$scope', '$rootScope', 'authService', '$state'];

  function authLoginController($scope, $rootScope, authService, $state) {
    $scope.loginForm = {};
    $scope.loginFn = () => {
      authService.login($scope.loginForm)
      .done((res) => {
        console.log(res);
        authService.setUserInfo(res);
        $state.go('home');
        $rootScope.currentUser = authService.getUserInfo();
      })
      .fail(err => {
        console.log(err);
      })
    }
  }
})();
