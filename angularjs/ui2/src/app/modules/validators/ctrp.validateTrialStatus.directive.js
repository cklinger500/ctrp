/**
 * Created by wus4 on 12/23/15.
 */

(function() {
    'use strict';
    angular.module('ctrp.module.validators')
        .directive('validateTrialStatus', validateTrialStatus);

    function validateTrialStatus() {
        var directiveObj = {
            require: 'ngModel',
            link: linkerFn
        };

        return directiveObj;

        /***************** implementations below ****************/

        function linkerFn(scope, element, attrs, ctrl) {
            ctrl.$validators.validateTrialStatus = function(modelValue, viewValue) {
                if (ctrl.$isEmpty(modelValue)) {
                    // Consider empty file to be valid
                    return true;
                }

                for (var i = 0; i < modelValue.length; i++) {
                    if (modelValue[i].hasOwnProperty('errors')) {
                        return false;
                    }
                }

                return true;
            };
        }
    }
})();
