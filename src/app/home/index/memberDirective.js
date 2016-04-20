(function () {
  angular.module('app.home')
  .directive('person', person);

  function person () {
    return {
      templateUrl: '/app/home/index/person.html',
      scope: {
        profile: '=info'
      }
    };
  }
})();
