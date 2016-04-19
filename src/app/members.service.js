(function () {
  'use strict';

  angular.module('app')
    .service('memberService', memberService);
  memberService.$inject = ['$http'];
  var back = 'https://galvanize-student-apis.herokuapp.com/gdating/members/';
  function memberService($http) {
    var members;
    $http.get(back)
    .then(users => members = users.data);
    var service = {
      getMember: (userId) => members.filter(member => member._id === userId)[0],
      getMembers: () => members,
    }
    return service;
  }
})();
