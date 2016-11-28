(function() {
  'use strict';
  angular.module('ctrpApp.widgets')
  .filter('dateFormat', function() {
    return function(d, currentFormat, nFormat) {
        var curFormat = currentFormat ? currentFormat : 'YYYY-MM-DD';
        var newFormat = nFormat ? nFormat : 'DD-MMM-YYYY';
        var date;

        if (!d) return;

        /* Means date is already a date object that just needs the correct formatting */
        if (typeof d === 'object') {
            date = moment(d).format(newFormat); // Use more reliable Moment.js library for date conversions
        } else {
            /* date is just the date string(d) if the format is already correct, otherwise change to the correct format  */
            if (moment(d, 'DD-MMM-YYYY', true).isValid()) {
                date = d;
            } else if (moment(d, curFormat, true).isValid()) {
                date = moment(d, curFormat).format(newFormat);
            } else {
                date = moment(d).format('DD-MMM-YYYY, H:mm');
            }
        }

        return date;
    };
  });
})();
