(function () {
  'use strict';

  angular.module('app.auth', ['ui.router'])
  .config(function ($stateProvider) {
    $stateProvider
      .state('auth.login', {
        url: '/login',
        templateUrl: '/app/auth/auth.login.html',
        controller: 'authLoginController',
      })
      .state('auth.register', {
        url: '/register',
        templateUrl: '/app/auth/auth.register.html'
      })
  });
})();
