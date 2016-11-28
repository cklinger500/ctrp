(function() {
  'use strict';
  angular.module('ctrpApp.widgets')
  .filter('maskPhoneNumber', function() {
    return function(phoneNum, country) {
        var countryCode,
            maskedPhoneNumber;

        /* formatLocal() will only work correctly if a country exists */
        if (country) {
            countryCode = countryToCountryCode(country);
            maskedPhoneNumber = formatLocal(countryCode, phoneNum);
        } else {
            // default to international formatting based on 'US'
            maskedPhoneNumber = formatInternational('US', phoneNum);
        }

        return maskedPhoneNumber;
    };
  });
})();
