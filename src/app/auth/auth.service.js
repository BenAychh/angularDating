(function () {
  'use strict';

  angular.module('app.auth')
    .service('authService', AuthService);
  AuthService.$inject = ['$window', '$http'];

  var back = 'https://galvanize-student-apis.herokuapp.com/gdating';
  function AuthService($window, $http) {
    var service = {
      login: function(loginForm) {
        return $.post(back + '/auth/login', loginForm);
      },
      register: function(registerForm) {
        return $http.get('http://maps.googleapis.com/maps/api/geocode/json?address=' + registerForm.zip)
        .then(locationData => {
          registerForm.address.geo.lng = locationData.data.results[0].geometry.location.lng;
          registerForm.address.geo.lat = locationData.data.results[0].geometry.location.lat;
          return $http.post(back + '/auth/register', registerForm)
        })
      },
      setUserInfo: function(userData) {
        $window.localStorage.setItem('user', JSON.stringify(userData.data.user));
        $window.localStorage.setItem('token', JSON.stringify(userData.data.token));
      },
      getUserInfo: function(userData) {
        return JSON.parse($window.localStorage.getItem('user'));
      },
    }
    return service;
  }
})();
