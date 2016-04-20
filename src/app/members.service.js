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
      searchMembers: (params) => {
        var strict = params.strict;
        delete params.strict;
        var filledInKeys = Object.keys(params).filter(key => params[key] != '');
        var searchObject = {};
        filledInKeys.forEach(key => {
          searchObject[key] = params[key];
        });
        return filterByObject(members, searchObject, strict);
      }
    }
    return service;
  }
  function filterByObject(arrayOfObjects, filters, strict) {
    var bool1 = false;
    var bool2 = true;
    if (strict) {
      bool1 = true;
      bool2 = false;
    }
    return arrayOfObjects.filter(object => {
      var keys = Object.keys(filter);
      for (i = 0; i < keys.length; i++) {
        if (object[keys[i]] !== filter[keys[i]]) {
          return bool1;
        }
      }
      return bool2;
    });
  }
})();
