(function() {
    'use strict';

    angular.module('ctrp.app.user', [
        /* Angular modules */
        'ngTouch',
        'ngAnimate',
        'ngSanitize',

        /* ctrp cross-app modules */
        'ctrp.module.routes',
        'ctrp.module.constants',
        'ctrp.module.common',
        'LocalCacheModule',
        'ctrpApp.widgets',
        'ctrp.module.dataservices',
        'ctrp.module.underscoreWrapper',
        'ctrp.module.validators',


        /* 3rd party */
        'ui.bootstrap.modal',
        'ui.bootstrap.datepicker',
        'ui.bootstrap.accordion',
        'ui.bootstrap.buttons',
        'ui.bootstrap.typeahead',
        'ui.bootstrap.pagination',
        'ui.bootstrap.alert',
        'ngMaterial',
        'toastr',
        'ngFileUpload',
        'angularMoment'
    ]);

})();
