/**
 * wangg5
 * July 8th 2016
 *
 * Configure routes for completion component
 */

(function() {
    'use strict';
    angular.module('ctrp.module.routes').config(trialCompletionRoutes);
    trialCompletionRoutes.$inject = ['$stateProvider'];

    function trialCompletionRoutes($stateProvider) {
        $stateProvider
            .state('main.pa.trialOverview.abstractValidation', {
                url: '/abstraction-validation',
                templateUrl: 'app/pa/dashboard/abstraction/completion/abstraction_validation.html',
                controller:   'abstractValidCtrl as abstractValidView',
                section: 'pa',
                resolve: {
                    PATrialService: 'PATrialService',
                    validationResults: function($stateParams, PATrialService) {
                        return PATrialService.validateAbstractionOnTrial($stateParams.trialId);
                    },
                    TrialService: 'TrialService',
                    trialStatuses: function(TrialService) {
                        return TrialService.getTrialStatuses();
                    }
                },
                ncyBreadcrumb: {
                    parent: 'main.pa.trialOverview',
                    label: 'Abstraction Validation'
                }
            });
    } // trialCompletionRoutes

})();
