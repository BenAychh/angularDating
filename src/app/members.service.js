(function () {
  'use strict';

  angular.module('app')
    .service('memberService', memberService);
  memberService.$inject = ['$http'];
  var back = 'https://galvanize-student-apis.herokuapp.com/gdating/members/';
  function memberService($http) {
    var service = {
      getMember: (userId) => $http.get(back + '/' + userId).then(res => res.data.data),
      getMembers: (count) => {
        var members;
        return $http.get(back)
        .then(users => {
          var members = users.data.data;
          if (!count) {
            return members;
          }
          var randoms = [];
          while (randoms.length < count) {
            var number = Math.floor(Math.random() * members.length);
            while (randoms.indexOf(number) !== -1) {
              number = Math.floor(Math.random() * members.length);
            }
            randoms.push(number);
          }
          var tempMembers = [];
          randoms.forEach(number => {
            tempMembers.push(members[number]);
          });
          return tempMembers;
        })
        .catch(err => console.log(err));
      }
    }
    return service;
  }
})();
