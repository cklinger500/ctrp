/**
 * Created by kigonyapa.

 * This directive allows you to transfer items from a multiselect to another
 */

(function() {
    'use strict';

    angular.module('ctrpApp.widgets')
    .directive('ctrptransferselect', function () {
        return {
            restrict: 'E',
            scope: {
                options: '='
            },
            controller: function($scope) {
                $scope.transfer = function(from, to, index) {
                    if (index >= 0) {
                        to.push(from[index]);
                        from.splice(index, 1);
                    } else {
                        for (var i = 0; i < from.length; i++) {
                            to.push(from[i]);
                        }
                        from.length = 0;
                    }
                };
            },
            templateUrl: 'app/modules/widgets/ctrp.widgets.ctrptransferselect.directive_template.html'
        };
    });
})();