(function () {
  'use strict';

  angular.module('app')
    .service('memberService', memberService);
  memberService.$inject = ['$http'];
  var back = 'https://galvanize-student-apis.herokuapp.com/gdating/members/';
  function memberService($http) {
    var members = [];
    var popularOffset = 0;
    var service = {
      getMember: (userId) => $http.get(back + '/' + userId).then(res => res.data.data),
      getMembers: (count) => {
        if (members.length === 0 || count === true) {
          return $http.get(back + '?limit=100')
            .then(users => {
              members = users.data.data;
            })
            .then(() => getMembersFromLocal(count))
            .catch(err => console.log(err));
        } else {
          return Promise.resolve(getMembersFromLocal(count));
        }
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
        })
        .catch(err => console.log('Error:', err));
      },
      getMatches: (id, force) => {
        console.log(id);
        return $http.get(back + id + '/matches')
        .then(matches => {
          var arrayOfMatchIds = matches.data.data.reduce((prev, match) => {
            prev.push(match._id);
            return prev;
          }, []);
          return service.getMembers(force)
          .then(members => {
            var fullInfoMatches =
                members.filter(member => arrayOfMatchIds.indexOf(member._id) !== -1);
            if (matches.data.data.length != fullInfoMatches.length) {
              return service.getMatches(id, true);
            }
            return fullInfoMatches;
          })
          .catch(err => console.log('Error:', err));
        })
      },
      getPopular: (forwards) => {
        return service.getMembers()
        .then(members => {
          var popSorted =  members.sort((a, b) => {
            return a.matches.length - b.matches.length;
          })
          if (forwards === true) {
            popularOffset += 5;
            popularOffset = Math.min(popSorted.length - 5, popularOffset);
          } else if (forwards === false) {
            popularOffset -= 5;
            popularOffset = Math.max(0, popularOffset);
          }
          return popSorted.slice(popularOffset, popularOffset + 5);
        })
      }
    }
    return service;

    /**
     * getMembersFromLocal - Returns the (count) members from our local
     * store of the the members. Has to be inside the service so it has
     * access to members.
     *
     * @param {Number} count How many members to grab.
     *
     * @returns {Array} An array of length count with random members in it.
     * or all the members if count isn't specified.
     */
    function getMembersFromLocal(count) {
      console.log('count: ', count);
      if (!count || count === true) {
        return members.slice();
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
    }

    /**
     * filterByObject is my attempt to write a filtering/searching function
     * that allows me to add more search terms later without having to
     * refactor the code after every add.
     *
     * @param {Array} arrayOfObjects Usually all of the members.
     * @param {Object} filters our filtering parameters.
     * @param {bool} strict match all filters (true) or any filters (false)
     * @return {Array} The filtered version of arrayOfObjects
     */
    function filterByObject(arrayOfObjects, filters, strict) {
      // Return a random 20 if no filters are applied.
      if (Object.keys(filters).length === 0) {
        service.getMembers(20);
      }
      var bool1 = true;
      var bool2 = false;
      var compare = function (a, b) {
        if (!Array.isArray(a)) {
          return a.substring(0, b.length).toLowerCase() == b.toLowerCase();
        }
        return a.indexOf(b) !== -1;
      }
      // Mirror image of above for Any vs All.
      if (strict == 'true') {
        var bool1 = false;
        var bool2 = true;
        compare = function (a, b) {
          if (!Array.isArray(a)) {
            return a.substring(0, b.length).toLowerCase() != b.toLowerCase();
          }
          return a.indexOf(Number(b)) === -1;
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
  }

  /**
   * flattenObject - Flattens an object for easy searching but does not flatten
   * arrays.
   *
   * @param  {Object} ob The object to be flattened
   * @return {Object}    A flattened array (names.firstName becomes
   * names_firstName). Arrays are not flattened.
   */
  function flattenObject(ob) {
    var toReturn = {};

    for (var i in ob) {
      if (!ob.hasOwnProperty(i)) { continue };
      if (!Array.isArray(ob[i]) && (typeof ob[i]) == 'object') {
        var flatObject = flattenObject(ob[i]);
        for (var x in flatObject) {
          if (!flatObject.hasOwnProperty(x)) { continue };
          toReturn[i + '_' + x] = flatObject[x] + '';
        }
      } else {
        if (!Array.isArray(ob[i])) {
          toReturn[i] = ob[i] + '';
        } else {
          toReturn[i] = ob[i];
        }
      }
    }
    return toReturn;
  };
})();
