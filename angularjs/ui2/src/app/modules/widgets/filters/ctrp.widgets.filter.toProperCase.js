(function() {
  'use strict';
  angular.module('ctrpApp.widgets')
  .filter('toProperCase', function (){
    return function (objectStr) {
      return objectStr.toLowerCase().replace(/(^[a-z]| [a-z]|-[a-z])/g,
          function($1){
            return $1.toUpperCase();
          }
      );
    };
  });

})();
