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
      },
      searchMembers: (params) => {
        var strict = params.strict;
        var params2 = JSON.parse(JSON.stringify(params));
        delete params2.strict;
        var filledInKeys = Object.keys(params2).filter(key => params2[key] != '');
        var searchObject = {};
        filledInKeys.forEach(key => {
          searchObject[key] = params2[key];
        });
        return service.getMembers()
        .then(members => {
          return filterByObject(members, searchObject, strict);
        });
      }
    }
    return service;
  }
  function filterByObject(arrayOfObjects, filters, strict) {
    console.log(filters, strict);
    var bool1 = true;
    var bool2 = false;
    var compare = function (a, b) {
      return a == b;
    }
    if (strict == 'true') {
      var bool1 = false;
      var bool2 = true;
      compare = function (b, a) {
        return a != b;
      }
    }
    return arrayOfObjects.filter(object => {
      var flatObject = flattenObject(object);
      var keys = Object.keys(filters);
      for (var i = 0; i < keys.length; i++) {
        if (compare(flatObject[keys[i]], filters[keys[i]])) {
          return bool1;
        }
      }
      return bool2;
    });
  }
  function flattenObject(ob) {
    var toReturn = {};

    for (var i in ob) {
      if (!ob.hasOwnProperty(i)) { continue };
      if ((typeof ob[i]) == 'object') {
        var flatObject = flattenObject(ob[i]);
        for (var x in flatObject) {
          if (!flatObject.hasOwnProperty(x)) { continue };
          toReturn[i + '_' + x] = flatObject[x];
        }
      } else {
        toReturn[i] = ob[i];
      }
    }
    return toReturn;
  };
})();
