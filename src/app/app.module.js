(function() {
  'use strict';

  angular.module('app', [
    'app.auth',
    'app.home',
    'ui.router',
  ]).config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('app', {
        url: '/',
        templateUrl: '/app/app.main.html',
      })
      .state('auth', {
        url: '/auth',
        templateUrl: '/app/auth/auth.home.html'
      })
      .state('home', {
        url: '/home',
        templateUrl: '/app/home/index/index.html',
        controller: 'homeIndexController'
      })
    $urlRouterProvider.otherwise('/');
  });
})();
