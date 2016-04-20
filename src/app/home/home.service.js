(function () {
  'use strict';

  angular.module('app.home')
    .service('homeService', homeService);
  homeService.$inject = ['$http', 'memberService'];
  var back = 'https://galvanize-student-apis.herokuapp.com/gdating/members/';
  function homeService($http, memberService) {
    var service = {
      getMatches: (userId) => {
        return $http.get(back + userId + '/matches')
        .then (matches => {
          var matchArray = matches.reduce((prev, matchObj) => {
            prev.push(matchObj._id);
          }, []);
          return memberService.getMembers().filter(member => matchArray.indexOf(member._id) != -1);
        })
      },

    }
    return service;
  }
})();
