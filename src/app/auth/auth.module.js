(function () {
  'use strict';

  angular.module('app.auth', ['ui.router'])
  .config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('auth.login', {
        url: '/loing',
        template: '<div>Login</div>'
      })
      .state('auth.register', {
        url: '/auth',
        template: 'Register'
      })
    $urlRouterProvider.otherwise('/');
  }]);
})();
