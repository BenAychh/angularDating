(function () {
  'use strict';

  angular.module('app.auth')
    .service('authService', AuthService);
  AuthService.$inject = ['$window'];

  var back = 'https://galvanize-student-apis.herokuapp.com/gdating';
  function AuthService($window) {
    var service = {
      login: function(loginForm) {
        return $.post(back + '/auth/login', loginForm);
      },
      register: function(registerForm) {
        console.log(registerForm);
        return $.post(back + '/auth/register', registerForm)
      },
      setUserInfo: function(userData) {
        $window.localStorage.setItem('user', JSON.stringify(userData.user));
        $window.localStorage.setItem('token', JSON.stringify(userData.token));
      },
      getUserInfo: function(userData) {
        return $window.localStorage.getItem('user');
      },
    }
    return service;
  }
})();
