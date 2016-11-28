(function() {
    'use strict';

    angular.module('ctrp.module.dataservices', [
        'ctrp.module.constants',
        'ctrp.module.common',
        'ctrp.module.PromiseTimeoutService',
        'ctrp.module.PromiseService',
        'LocalCacheModule',
        'toastr',
        'ui.bootstrap.modal',
        'ui.bootstrap.datepicker',
        'ui.bootstrap.accordion',
        'ui.bootstrap.buttons',
        'ui.bootstrap.typeahead',
        'ui.bootstrap.pagination',
        'ui.bootstrap.alert',
        'ctrp.module.underscoreWrapper',
        'ctrp.module.timeout',
        'angularMoment',
        'ngFileUpload'
    ]);

})();
