(function() {
    'use strict';

    angular.module('ctrp.app.main', [
        /* ctrp 3rd-party modules */
        'toastr',
        /* ctrp cross-app modules */
        'ctrp.module.routes',
        /* ctrp feature modules */
        'ctrp.app.registry',
        'ctrp.app.pa',
        'ctrp.app.po',
        'ctrp.app.user',
        'ctrp.app.layout'
    ]).config(function ($provide) {
        $provide.decorator('orderByFilter', function ($delegate) {
            // Store the last ordered state.
            var previousState;

            return function (arr, predicate, reverse, ignore) {
              // If ignore evaluates to a truthy value, return the previous state.
              if (!!ignore) {
                return previousState || arr;
              }

              // Apply the regular orderBy filter.
              var order = $delegate.apply(null, arguments);

              // Overwrite the previous state with the most recent order state.
              previousState = order;

              // Return the latest order state.
              return order;
          };
      });
    }).config(function(toastrConfig) {
          angular.extend(toastrConfig, {
            allowHtml: false,
            closeButton: true,
            timeOut: 3000,
            extendedTimeOut: 0
          });
    }).run(function() {});
})();
