/**
 Watch some scope property, and when it becomes true (set it in your ng-click handler), execute element[0].focus().
 Depending on your use case, you may or may not need a $timeout for this one:
 */
angular.module('ctrpApp.widgets').directive('focusMe', ['$timeout', '$parse', function ($timeout, $parse) {
  return {
    //scope: true,   // optionally create a child scope
    link: function (scope, element, attrs) {
      var model = $parse(attrs.focusMe);
      scope.$watch(model, function (value) {
        if (value === true) {
          $timeout(function () {
            element[0].focus();
          });
        }
      });
      // to address @blesh's comment, set attribute value to 'false'
      // on blur event:
      element.bind('blur', function () {
        scope.$apply(model.assign(scope, false));
      });
    }
  };
}]);