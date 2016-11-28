(function() {
  'use strict';

  angular.module('ctrpApp.widgets')
  .directive('dateFormatter', dateFormatter);

  function dateFormatter() {
      var directive = {
        restrict: 'A',
        priority: 999,
        require: 'ngModel',
        link: function(scope, element, attributes, ctrl) {
          var ngModel = ctrl;
          var scope = scope;
          scope.element = element;
          scope.ctrl = ctrl;

          ngModel.$formatters.push(function(value) {
              var output = null;

              if (value) {
                output = moment(value, 'DD-MMM-YYYY', true).isValid() ? moment(value, 'DD-MMM-YYYY').toDate() : moment(value).toDate();
                return output;
              }
          });

          ngModel.$parsers.push(function(value) {
              var output = null;

              if (value) {
                output = moment(value).toDate();
                return output;
              }
          });
        }
      };

      return directive;
  }
}());
