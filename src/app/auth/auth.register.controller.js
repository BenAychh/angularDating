(function() {
  'use strict';

  angular
    .module('app.auth')
    .controller('authRegisterController', authRegisterController);

  authRegisterController.$inject = ['$scope', '$rootScope', 'authService'];

  function authRegisterController($scope, $rootScope, authService) {
    $scope.registerForm = {};
    $scope.registerFn = () => {
      authService.register($scope.registerForm)
      .then((user) => {
        console.log(user);
        authService.setUserInfo(user);
        $location.path('/home');
        $rootScope.currentUser = authService.getUserInfo();
      })
    }
  }
})();
