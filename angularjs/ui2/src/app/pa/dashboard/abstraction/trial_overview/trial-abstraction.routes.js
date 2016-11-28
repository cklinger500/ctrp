/**
 * Configure routes for pa-abstraction component
 */

(function() {
    'use strict';
    angular.module('ctrp.module.routes').config(trialAbstractionRoutes);

    trialAbstractionRoutes.$inject = ['$stateProvider'];
    function trialAbstractionRoutes($stateProvider) {
        $stateProvider
            .state('main.pa.trialOverview', {
                /* this is the parent state for the states below */
                url: '/trial/:trialId',
                templateUrl: 'app/pa/dashboard/abstraction/trial_overview/trial_overview.html',
                controller: 'paTrialOverviewCtrl as paTrialOverview',
                section: 'pa',
                resolve: {
                    TrialService: 'TrialService',
                    curTrial: function(TrialService, $stateParams) {
                        var trialId = $stateParams.trialId;
                        console.log('trialId: ' + trialId);
                        return TrialService.getTrialById(trialId);
                    },
                    researchCategories: function(TrialService) {
                        return TrialService.getResearchCategories();
                    }
                },
                ncyBreadcrumb: {
                    parent: 'main.paTrialSearch',
                    label: 'Trial Overview'
                }
            })
            .state('main.pa.trialOverview.trialIdentification', {
                url: '/identification',
                templateUrl: 'app/pa/dashboard/abstraction/trial_overview/trial_identification.html',
                controller: 'trialIdentificationCtrl as trialIdView',
                section: 'pa',
                ncyBreadcrumb: {
                    parent: 'main.pa.trialOverview',
                    label: 'Trial Identification'
                }
            })
            .state('main.pa.trialOverview.trialHistory', {
                url: '/history',
                templateUrl: 'app/pa/dashboard/abstraction/trial_overview/trial_history.html',
                controller:   'trialHistoryCtrl as trialHistoryView',
                section: 'pa',
                resolve: {
                    DateService: 'DateService',
                    UserService:'UserService',
                    userDetailObj: function (UserService) {
                        return UserService.getCurrentUserDetails();
                    }
                },
                ncyBreadcrumb: {
                    parent: 'main.pa.trialOverview',
                    label: 'Trial History'
                }
            })
            .state('main.pa.trialOverview.milestone', {
                url: '/milestone',
                templateUrl: 'app/pa/dashboard/abstraction/trial_overview/pa_milestone.html',
                controller: 'paMilestoneCtrl as milestoneView',
                resolve: {
                    TrialService: 'TrialService',
                    UserService: 'UserService',
                    milestoneObj: function(TrialService) {
                        return TrialService.getMilestones();
                    },
                    userDetailObj: function(UserService) {
                        return UserService.getCurrentUserDetails();
                    }
                },
                section: 'pa',
                ncyBreadcrumb: {
                    parent: 'main.pa.trialOverview',
                    label: 'Trial Milestones'
                }
            })
            .state('main.pa.trialOverview.onhold', {
                url: '/onhold',
                templateUrl: 'app/pa/dashboard/abstraction/trial_overview/pa_onhold.html',
                controller: 'paOnholdCtrl as onholdView',
                resolve: {
                    TrialService: 'TrialService',
                    onholdReasonObj: function (TrialService) {
                        return TrialService.getOnholdReasons();
                    }
                },
                section: 'pa',
                ncyBreadcrumb: {
                    parent: 'main.pa.trialOverview',
                    label: 'Trial On Hold Info'
                }
            })
            .state('main.pa.trialOverview.viewTSR', {
                url: '/view-tsr',
                templateUrl: 'app/pa/dashboard/abstraction/trial_overview/view_TSR.html',
                controller: 'trialReportSummaryCtrl as tsrCtrl',
                /*
                controller: function($scope, $state) {
                    console.log('trialId from trialOverview controller: ', $scope.$parent.paTrialOverview.trialId);
                    var curTrialId = $scope.$parent.paTrialOverview.trialId;
                    //redirect to trial update page
                    var url = $state.href('main.trialDetail', {trialId: curTrialId, editType: 'update'});
                    window.open(url, '_blank');
                    // $state.go('main.trialDetail', {trialId: curTrialId, editType: 'update'}, {inherit: false});
                },
                */
                section: 'pa',
                ncyBreadcrumb: {
                    parent: 'main.pa.trialOverview',
                    label: 'View TSR'
                }
            })
            .state('main.pa.trialOverview.assignOwnership', {
                url: '/assign-ownership',
                templateUrl: 'app/pa/dashboard/abstraction/trial_overview/assign_ownership.html',
                controller: 'userListCtrl as userView',
                section: 'pa',
                ncyBreadcrumb: {
                    parent: 'main.pa.trialOverview',
                    label: 'Assign Ownership'
                }
            })
            .state('main.pa.trialOverview.checkoutHistory', {
                url: '/check-out-history',
                templateUrl: 'app/pa/dashboard/abstraction/trial_overview/check_out_history.html',
                controller: 'checkoutHistoryCtrl as coHistoryView',
                section: 'pa',
                resolve: {
                    PATrialService: 'PATrialService',
                    checkoutHistoryArr: function(PATrialService, $stateParams) {
                        var trialId = $stateParams.trialId;
                        return PATrialService.getTrialCheckoutHistory(trialId);
                    }
                },
                ncyBreadcrumb: {
                    parent: 'main.pa.trialOverview',
                    label: 'Check Out History'
                }
            })
            .state('main.pa.trialOverview.emailLogs', {
                url: '/trial-email-logs',
                templateUrl: 'app/pa/dashboard/abstraction/trial_overview/email_logs.html',
                controller: 'trialEmailLogsCtrl as emailsView',
                section: 'pa',
                resolve: {
                    PATrialService: 'PATrialService',
                    emailLogs: function(PATrialService, $stateParams) {
                        var trialId = $stateParams.trialId;
                        console.log('mail logs trialId: ' + trialId);
                        return PATrialService.getMailLogs(trialId);
                    }
                },
                ncyBreadcrumb: {
                    parent: 'main.pa.trialOverview',
                    label: 'Email Logs'
                }
            })

    } //trialAbstractionRoutes


})();
