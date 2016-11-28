(function() {
  'use strict';
  angular.module('ctrpApp.widgets')
  .filter('findObjByAttribute', function (){
    return function (objectArr, attr, value) {
      var objFound = [];
      for (var i = 0; i < objectArr.length; i++) {
        var obj = objectArr[i];
        if (objectArr[i][attr] === value) {
          objFound.push(objectArr[i]);
        }
      }
      return objFound;
    };
  });

})();
