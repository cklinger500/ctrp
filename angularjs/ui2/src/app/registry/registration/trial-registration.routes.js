/**
 * Configure routes for trial component
 */

(function() {
    'use strict';
    angular.module('ctrp.module.routes').config(trialRegistrationRoutes);

    trialRegistrationRoutes.$inject = ['$stateProvider'];
    function trialRegistrationRoutes($stateProvider) {
        $stateProvider
            .state('main.trials', {
                url: '/trials',
                templateUrl: 'app/registry/registration/trial_list.html',
                controller: 'trialCtrl as trialView',
                section: 'registry',
                resolve: {
                    TrialService: 'TrialService',
                    OrgService: 'OrgService',
                    studySourceObj: function(TrialService) {
                        return TrialService.getStudySources();
                    },
                    phaseObj: function(TrialService) {
                        return TrialService.getPhases();
                    },
                    primaryPurposeObj: function(TrialService) {
                        return TrialService.getPrimaryPurposes();
                    },
                    trialStatusObj: function(TrialService) {
                        return TrialService.getTrialStatuses();
                    }
                },
                ncyBreadcrumb: {
                    parent: 'main.defaultContent',
                    label: 'Search Trials'
                }
            })

            .state('main.addTrial', {
                url: '/new-trial/:studySourceCode',
                templateUrl: 'app/registry/registration/trialDetails.html',
                controller: 'trialDetailCtrl as trialDetailView',
                section: 'registry',
                resolve: {
                    TrialService: 'TrialService',
                    trialDetailObj: function($q) {
                        var deferred = $q.defer();
                        deferred.resolve(null);
                        return deferred.promise;
                    },
                    studySourceCode: function($stateParams) {
                        return $stateParams.studySourceCode;
                    },
                    studySourceObj: function(TrialService) {
                        return TrialService.getStudySources();
                    },
                    protocolIdOriginObj: function(TrialService) {
                        return TrialService.getProtocolIdOrigins();
                    },
                    phaseObj: function(TrialService) {
                        return TrialService.getPhases();
                    },
                    researchCategoryObj: function(TrialService) {
                        return TrialService.getResearchCategories();
                    },
                    primaryPurposeObj: function(TrialService) {
                        return TrialService.getPrimaryPurposes();
                    },
                    secondaryPurposeObj: function(TrialService) {
                        return TrialService.getSecondaryPurposes();
                    },
                    accrualDiseaseTermObj: function(TrialService) {
                        return TrialService.getAccrualDiseaseTerms();
                    },
                    responsiblePartyObj: function(TrialService) {
                        return TrialService.getResponsibleParties();
                    },
                    fundingMechanismObj: function(TrialService) {
                        return TrialService.getFundingMechanisms();
                    },
                    instituteCodeObj: function(TrialService) {
                        return TrialService.getInstituteCodes();
                    },
                    nciObj: function(TrialService) {
                        return TrialService.getNci();
                    },
                    trialStatusObj: function(TrialService) {
                        return TrialService.getTrialStatuses();
                    },
                    holderTypeObj: function(TrialService) {
                        return TrialService.getHolderTypes();
                    },
                    countryList: function(TrialService) {
                        return TrialService.getCountryList();
                    },
                    acceptedFileTypesObj: function(TrialService) {
                        return TrialService.getAcceptedFileTypesForRegistry();
                    }
                },
                ncyBreadcrumb: {
                    parent: 'main.trials',
                    label: 'Register Trial'
                }
            })

            .state('main.trialDetail', {
                url: '/trials/:trialId/{editType}',
                templateUrl: 'app/registry/registration/trialDetails.html',
                controller: 'trialDetailCtrl as trialDetailView',
                section: 'registry',
                resolve: {
                    TrialService: 'TrialService',
                    trialDetailObj: function($stateParams, TrialService) {
                        return TrialService.getTrialById($stateParams.trialId);
                    },
                    studySourceCode: function() {
                        return '';
                    },
                    studySourceObj: function(TrialService) {
                        return TrialService.getStudySources();
                    },
                    protocolIdOriginObj: function(TrialService) {
                        return TrialService.getProtocolIdOrigins();
                    },
                    phaseObj: function(TrialService) {
                        return TrialService.getPhases();
                    },
                    researchCategoryObj: function(TrialService) {
                        return TrialService.getResearchCategories();
                    },
                    primaryPurposeObj: function(TrialService) {
                        return TrialService.getPrimaryPurposes();
                    },
                    secondaryPurposeObj: function(TrialService) {
                        return TrialService.getSecondaryPurposes();
                    },
                    accrualDiseaseTermObj: function(TrialService) {
                        return TrialService.getAccrualDiseaseTerms();
                    },
                    responsiblePartyObj: function(TrialService) {
                        return TrialService.getResponsibleParties();
                    },
                    fundingMechanismObj: function(TrialService) {
                        return TrialService.getFundingMechanisms();
                    },
                    instituteCodeObj: function(TrialService) {
                        return TrialService.getInstituteCodes();
                    },
                    nciObj: function(TrialService) {
                        return TrialService.getNci();
                    },
                    trialStatusObj: function(TrialService) {
                        return TrialService.getTrialStatuses();
                    },
                    holderTypeObj: function(TrialService) {
                        return TrialService.getHolderTypes();
                    },

                    countryList: function(TrialService) {
                        return TrialService.getCountryList();
                    },
                    acceptedFileTypesObj: function(TrialService) {
                        return TrialService.getAcceptedFileTypesForRegistry();
                    }
                },
                ncyBreadcrumb: {
                    parent: 'main.trials',
                    label: 'Trial Detail'
                }
            })

            .state('main.importTrial', {
                url: '/import-trial',
                templateUrl: 'app/registry/registration/importTrial.html',
                controller: 'importTrialCtrl as importTrialView',
                section: 'registry',
                ncyBreadcrumb: {
                    parent: 'main.trials',
                    label: 'Import Trials'
                }
            })

            .state('main.viewTrial', {
                url: '/view-trial/:trialId',
                templateUrl: 'app/registry/registration/viewTrial.html',
                controller: 'viewTrialCtrl as viewTrialView',
                section: 'registry',
                resolve: {
                    TrialService: 'TrialService',
                    trialDetailObj: function($stateParams, TrialService) {
                        return TrialService.getTrialById($stateParams.trialId);
                    }
                },
                ncyBreadcrumb: {
                    parent: 'main.trials',
                    label: 'View Trial'
                }
            })

            .state('main.addParticipatingSite', {
                url: '/add-participating-site/:trialId',
                templateUrl: 'app/registry/registration/psDetails.html',
                controller: 'psDetailCtrl as psDetailView',
                section: 'registry',
                resolve: {
                    TrialService: 'TrialService',
                    UserService: 'UserService',
                    PATrialService: 'PATrialService',
                    psDetailObj: function($q) {
                        var deferred = $q.defer();
                        deferred.resolve(null);
                        return deferred.promise;
                    },
                    trialDetailObj: function($stateParams, TrialService) {
                        return TrialService.getTrialById($stateParams.trialId);
                    },
                    userDetailObj: function(UserService) {
                        return UserService.getCurrentUserDetails();
                    },
                    srStatusObj: function(TrialService) {
                        return TrialService.getSrStatuses();
                    },
                    centralContactTypes: function(PATrialService) {
                        return PATrialService.getCentralContactTypes();
                    }
                },
                ncyBreadcrumb: {
                    parent: 'main.trials',
                    label: 'Add Participating Site'
                }
            })

            .state('main.manageParticipatingSite', {
                url: '/manage-participating-site/:trialId',
                templateUrl: 'app/registry/registration/psDetails.html',
                controller: 'psDetailCtrl as psDetailView',
                section: 'registry',
                resolve: {
                    TrialService: 'TrialService',
                    UserService: 'UserService',
                    PATrialService: 'PATrialService',
                    psDetailObj: function($q) {
                        var deferred = $q.defer();
                        deferred.resolve(null);
                        return deferred.promise;
                    },
                    trialDetailObj: function($stateParams, TrialService) {
                        return TrialService.getTrialById($stateParams.trialId);
                    },
                    userDetailObj: function(UserService) {
                        return UserService.getCurrentUserDetails();
                    },
                    srStatusObj: function(TrialService) {
                        return TrialService.getSrStatuses();
                    },
                    centralContactTypes: function(PATrialService) {
                        return PATrialService.getCentralContactTypes();
                    }
                },
                ncyBreadcrumb: {
                    parent: 'main.trials',
                    label: 'Manage Participating Site'
                }
            })

            .state('main.participatingSiteDetail', {
                url: '/participating-sites/:psId',
                templateUrl: 'app/registry/registration/psDetails.html',
                controller: 'psDetailCtrl as psDetailView',
                section: 'registry',
                resolve: {
                    TrialService: 'TrialService',
                    UserService: 'UserService',
                    PATrialService: 'PATrialService',
                    psDetailObj: function($stateParams, TrialService) {
                        return TrialService.getParticipatingSiteById($stateParams.psId);
                    },
                    trialDetailObj: function($stateParams, TrialService) {
                        return null;
                    },
                    userDetailObj: function(UserService) {
                        return UserService.getCurrentUserDetails();
                    },
                    srStatusObj: function(TrialService) {
                        return TrialService.getSrStatuses();
                    },
                    centralContactTypes: function(PATrialService) {
                        return PATrialService.getCentralContactTypes();
                    }
                },
                ncyBreadcrumb: {
                    parent: 'main.trials',
                    label: 'Update Participating Site'
                }
            })

            .state('main.verifyTrialData', {
                url: '/verify-trial-data/:trialId',
                templateUrl: 'app/registry/registration/verifyTrialData.html',
                controller: 'verifyTrialDataCtrl as verifyTrialDataView',
                section: 'registry',
                resolve: {
                    TrialService: 'TrialService',
                    trialDetailObj: function($stateParams, TrialService) {
                        return TrialService.getTrialById($stateParams.trialId);
                    }
                },
                ncyBreadcrumb: {
                    parent: 'main.trials',
                    label: 'Verify Trial Data'
                }
            });
    } //trialRegistrationRoutes
})();
