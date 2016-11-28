(function() {
      'use strict';

      angular.module('ctrpApp.widgets')
      .directive('toggleVisibility', toggleVisibility);

      toggleVisibility.$inject = ['$compile', '$window'];

      function toggleVisibility($compile, $window) {
          var directive = {
            restrict: 'E',
            templateUrl: 'app/modules/widgets/visibility/ctrp.widgets.toggleVisibility.tpl.html',
            link: function(scope, element, attrs) {
                var elementToToggle = attrs.elementToToggle.split(',');
                scope.windowElem = angular.element($window);
                scope.isHidden = attrs.toggleVisibilityDefault ? attrs.toggleVisibilityDefault : false;
                scope.label = attrs.elementLabel ? ' ' + attrs.elementLabel : '';

                element.on('click', function(e) {
                    toggleElem();
                    scope.$apply();
                });

                toggleElem();


                function toggleElem() {
                    if (scope.isHidden) {
                        show();
                    } else {
                        hide();
                    }

                    scope.isHidden = !scope.isHidden;
                }

                function show() {
                    _.each(elementToToggle, function(elem) {
                        $(elem).slideDown();
                    });

                    /* Manually trigger a window resize event to resolve grid rendering issues */
                    scope.windowElem.resize();
                }

                function hide() {
                    _.each(elementToToggle, function(elem) {
                        $(elem).slideUp();
                    });
                }
            }
         }

         return directive;
     }
}());
