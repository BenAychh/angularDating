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
      getMatches: (userId) => {
        return $http.get(back + userId + '/matches')
        .then (matches => {
          var matchArray = matches.reduce((prev, matchObj) => {
            prev.push(matchObj._id);
          }, []);
          return members.filter(member => matchArray.indexOf(member._id) != -1);
        })
      },

      getMember: (userId) => members.filter(member => member._id === userId)[0],

    }
    return service;
  }
})();
