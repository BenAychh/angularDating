(function() {
  'use strict';

  angular
    .module('app.auth')
    .controller('authLoginController', authLoginController);

  authLoginController.$inject = ['$scope', '$rootScope', 'authService', '$location'];

  function authLoginController($scope, $rootScope, authService, $location) {
    $scope.loginForm = {};
    $scope.loginFn = () => {
      authService.login($scope.loginForm)
      .done((res) => {
        console.log(res);
        authService.setUserInfo(res);
        $location.path('#/home');
        $rootScope.currentUser = authService.getUserInfo();
      })
      .fail(err => {
        console.log(err);
      })
    }
  }
})();
