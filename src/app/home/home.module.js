(function() {
  'use strict';

  angular.module('app.home', [
    'ui.router',
  ]).config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('home.index', {
        url: '/index',
        templateUrl: '/app/home/index/index.html',
        controller: 'homeIndexController'
      })
      .state('home.view', {
        url: '/view?id',
        templateUrl: '/app/home/view/index.html',
        controller: 'homeViewController',
      })
      .state('home.match', {
        url: '/match',
        templateUrl: '/app/home/match/index.html',
        controller: 'homeMatchController',
      })
      .state('home.search', {
        url: '/search',
        templateUrl: '/app/home/search/index.html',
        controller: 'homeSearchController',
      })
      .state('home.edit', {
        url: '/edit',
        templateUrl: '/app/home/edit/index.html',
        controller: 'homeEditController',
      })
  });
})();
