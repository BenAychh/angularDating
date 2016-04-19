(function() {
  'use strict';

  angular
    .module('app.auth')
    .controller('authLoginController', authLoginController);

  AdminController.$inject = ['$scope', '$rootScope', 'authService'];

  function AdminController($scope, $rootScope, authService) {
    $scope.loginForm = {};
    $scope.loginFn = () => {
      authService.login($scope.loginForm)
      .then((user) => {
        console.log(user);
        authService.setUserInfo(user);
        $location.path('/home');
        $rootScope.currentUser = authService.getUserInfo();
      })
    }
  }
})();
