(function() {
  'use strict';

    angular.module('ctrpApp.widgets')
        .directive('maskPhoneNumber', maskPhoneNumber);

    function maskPhoneNumber() {
        var directive = {
            restrict: 'A',
            require: 'ngModel',
            link: linkerFn
        };

        return directive;

        function linkerFn(scope, element, attrs, controller) {
            var elem = element,
                countryVal = null,
                ctrl = controller;

            /* Update phone number format when country value is changed */
            attrs.$observe('maskCountry', function(newVal) {
                if (newVal) {
                    countryVal = newVal;

                    if (ctrl.$modelValue) {
                        applyMask(ctrl.$modelValue);
                    }
                }
            });

            ctrl.$formatters.push(applyMask);
            ctrl.$parsers.push(applyMask);

            function applyMask(viewValue) {
                var phoneNum = viewValue;
                var countryCode;
                var output;

                if (countryVal) {
                    countryCode = countryToCountryCode(countryVal); // (ex: 'United States' to 'US')

                    output = formatLocal(countryCode, phoneNum);

                } else {
                    output = formatInternational('US', phoneNum); // If no country, return phone number w/o formatting
                }

                ctrl.$setViewValue(output);
                ctrl.$render(); // update input field with formatted phone number
                return output;  // update underlying model
            }
        }
    }
}());
