(function() {
  'use strict';
  angular.module('ctrp.module.validators')
  .directive('capitalizeFirst', function ($parse){
      return {
          require: 'ngModel',
          link: function(scope, element, attrs, modelCtrl) {
              var capitalize = function(inputValue) {
                  if (inputValue === undefined) { inputValue = ''; }
                  var capitalized = inputValue.charAt(0).toUpperCase() +
                      inputValue.substring(1);
                  if(capitalized !== inputValue) {
                      modelCtrl.$setViewValue(capitalized);
                      modelCtrl.$render();
                  }
                  return capitalized;
              }
              modelCtrl.$parsers.push(capitalize);
              capitalize($parse(attrs.ngModel)(scope)); // capitalize initial value
          }
      };
  });

})();
