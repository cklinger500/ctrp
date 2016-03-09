/**
 * PA - trial section of the CTRP app
 */

(function() {
    'use strict';
    angular.module('ctrp.app.pa.dashboard', [
        /* Angular modules */
        'ngTouch',
        'ngAnimate',
        'ngSanitize',
        'ngMessages',

        /* Cross-app modules */
        'ctrp.module.routes',
        'ctrp.module.constants',
        'ctrp.module.common',
        'ctrp.module.underscoreWrapper',
        'LocalCacheModule',
        'ctrpApp.widgets',
        'ctrp.module.dataservices',
        'ctrp.module.validators',
        // 'ctrp.app.po',

        /* 3rd-party modules */
        'ui.bootstrap',
        'ngMaterial',
        'toastr',
        'ngFileUpload',
        'angularMoment',
        'ui.grid',
        'ui.grid.pagination',
        'ui.grid.selection',
        'ui.scrollpoint',
        'angular-json-tree',
        'smart-table',
        'ngFileSaver',

    ]);
})();
