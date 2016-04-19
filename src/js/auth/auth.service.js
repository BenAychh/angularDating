(function () {
  'use strict';

  angular.module('app.auth')
    .service('authService', authService);

  // var ping = 'https://galvanize-dating-app-server.herokuapp.com/gdating/members/ping';
  function authService() {
    var service = {
      login: function(loginForm) {
        // return $http.post(ping + '/auth/login', loginForm)
      },
      register: function(registerForm) {
        // return $http.post(ping + '/auth/register', registerForm)
      },
      setUserInfo: function(userData) {
        // $window.localStorage.setItem('user', JSON.stringify(userData.data.data.user));
        // $window.localStorage.setItem('token', JSON.stringify(userData.data.data.token));
      },
      getUserInfo: function(userData) {
        // return $window.localStorage.getItem('user');
      },
    }
    return service;
  }
})();
