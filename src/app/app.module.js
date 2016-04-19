(function() {
  'use strict';

  angular.module('app', [
    'app.auth',
    'ui.router',
  ]).config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('app', {
        url: '/',
        template: '<div>index</div>'
      })
      .state('auth', {
        url: '/auth',
        templateUrl: '/app/auth/auth.home.html'
      })
    $urlRouterProvider.otherwise('/main');
  });
})();
