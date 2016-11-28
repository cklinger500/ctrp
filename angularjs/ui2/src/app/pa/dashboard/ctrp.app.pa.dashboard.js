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
        // 'ui.bootstrap.modal',
        // 'ui.bootstrap.datepicker',
        // 'ui.bootstrap.accordion',
        // 'ui.bootstrap.buttons',
        // 'ui.bootstrap.typeahead',
        // 'ui.bootstrap.pagination',
        // 'ui.bootstrap.alert',
        // 'ui.bootstrap.tooltip',
        // 'ui.bootstrap.popover',
        'ngMaterial',
        'agGrid',
        'toastr',
        'ngFileUpload',
        'angularMoment',
        'ui.grid',
        'ui.grid.pagination',
        'ui.grid.selection',
        'ui.grid.expandable',
        'ui.scrollpoint',
        'smart-table',
        'ngFileSaver',
        'angularSpinner',
        'ui.select',
        'ntt.TreeDnD',
        'mgcrea.ngStrap.tooltip',
        'ui.sortable'
    ]);
})();
