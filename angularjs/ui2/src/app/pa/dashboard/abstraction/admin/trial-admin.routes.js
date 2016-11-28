/**
 * Configure routes for pa-abstraction component
 */

(function() {
    'use strict';
    angular.module('ctrp.module.routes').config(trialAbstractionRoutes);

    trialAbstractionRoutes.$inject = ['$stateProvider'];
    function trialAbstractionRoutes($stateProvider) {
        $stateProvider
                .state('main.pa.trialOverview.generalTrialDetails', {
                    url: '/general-trial-details',
                    templateUrl: 'app/pa/dashboard/abstraction/admin/general_trial_details.html',
                    controller: 'generalTrialDetailsCtrl as generalTrialDetailView',
                    section: 'pa',
                    resolve: {
                        TrialService: 'TrialService',
                        PATrialService: 'PATrialService',
                        protocolIdOriginObj: function(TrialService) {
                            return TrialService.getProtocolIdOrigins();
                        },
                        centralContactTypes: function(PATrialService) {
                            return PATrialService.getCentralContactTypes();
                        }
                    },
                    ncyBreadcrumb: {
                        parent: 'main.pa.trialOverview',
                        label: 'General Details'
                    }
                })
            .state('main.pa.trialOverview.regulatoryFda', {
                url: '/reg-fda',
                templateUrl: 'app/pa/dashboard/abstraction/admin/trial_regulatory_fda.html',
                controller: 'trialRegFdaCtrl as trialDetailView',
                section: 'pa',
                resolve: {
                    TrialService: 'TrialService',
                    PATrialService: 'PATrialService',
                    trialDetailObj: function($stateParams, TrialService) {
                        return TrialService.getTrialById($stateParams.trialId);
                    },
                    responsiblePartyObj: function(TrialService) {
                        return TrialService.getResponsibleParties();
                    },
                    GeoLocationService : 'GeoLocationService',
                    countryList: function(GeoLocationService) {
                        return GeoLocationService.getCountryList();
                    },
                },
                ncyBreadcrumb: {
                    parent: 'main.pa.trialOverview',
                    label: 'Regulatory FDA Details'
                }
            })
            .state('main.pa.trialOverview.regulatoryInfoHumanSafety', {
                url: '/regulatory-info-human-subject-safety',
                templateUrl: 'app/pa/dashboard/abstraction/admin/regulatory_info_human_subject_safety.html',
                controller: 'regulatoryInfoHumanSafetyCtrl as regInfoSafetyView',
                resolve: {
                    PATrialService: 'PATrialService',
                    boardApprovalStatuses: function(PATrialService) {
                        return PATrialService.getBoardApprovalStatuses();
                    }
                },
                section: 'pa',
                ncyBreadcrumb: {
                    parent: 'main.pa.trialOverview',
                    label: 'Regulatory Information - Human Subject Safety'
                }
            })
            .state('main.pa.trialOverview.regulatoryInd', {
                url: '/reg-ind',
                templateUrl: 'app/pa/dashboard/abstraction/admin/trial_regulatory_ind.html',
                controller: 'trialRegIndCtrl as trialDetailView',
                section: 'pa',
                resolve: {
                    TrialService: 'TrialService',
                    PATrialService: 'PATrialService',
                    trialDetailObj: function($stateParams, TrialService) {
                        return TrialService.getTrialById($stateParams.trialId);
                    },
                    nciObj: function(TrialService) {
                        return TrialService.getNci();
                    },
                    holderTypeObj: function(TrialService) {
                        return TrialService.getHolderTypes();
                    },
                },
                ncyBreadcrumb: {
                    parent: 'main.pa.trialOverview',
                    label: 'Regulatory IND/IDE Details'
                }
            })
            .state('main.pa.trialOverview.paTrialStatus', {
                url: '/trial-status',
                templateUrl: 'app/pa/dashboard/abstraction/admin/pa_trial_status.html',
                controller: 'paTrialStatusCtrl as trialStatusView',
                resolve: {
                    TrialService: 'TrialService',
                    trialStatuses: function(TrialService) {
                        return TrialService.getTrialStatuses();
                    }
                },
                section: 'pa',
                ncyBreadcrumb: {
                    parent: 'main.pa.trialOverview',
                    label: 'Trial Status'
                }
            })
            .state('main.pa.trialOverview.funding', {
                url: '/funding',
                templateUrl: 'app/pa/dashboard/abstraction/admin/trial_funding.html',
                controller: 'trialFundingCtrl as trialDetailView',
                section: 'pa',
                resolve: {
                    TrialService: 'TrialService',
                    PATrialService: 'PATrialService',
                    trialDetailObj: function($stateParams, TrialService) {
                        return TrialService.getTrialById($stateParams.trialId);
                    },
                    nciObj: function(TrialService) {
                        return TrialService.getNci();
                    },
                    instituteCodeObj: function(TrialService) {
                        return TrialService.getInstituteCodes();
                    },
                    fundingMechanismObj: function(TrialService) {
                        return TrialService.getFundingMechanisms();
                    },
                },
                ncyBreadcrumb: {
                    parent: 'main.pa.trialOverview',
                    label: 'Funding Details'
                }
            })
            .state('main.pa.trialOverview.participatingSites', {
                url: '/participating-sites',
                templateUrl: 'app/pa/dashboard/abstraction/admin/trial_participating_sites.html',
                controller: 'trialParticipatingSitesCtrl as psView',
                section: 'pa',
                resolve: {
                    TrialService: 'TrialService',
                    PATrialService: 'PATrialService',
                    trialDetailObj: function($stateParams, TrialService) {
                        return TrialService.getTrialById($stateParams.trialId);
                    },
                    siteRecruitmentStatusesObj: function(PATrialService) {
                        return PATrialService.getSiteRecruitementStatuses();
                    },
                    investigatorTypes: function(PATrialService) {
                        return PATrialService.getInvestigatorTypes();
                    },
                    centralContactTypes: function(PATrialService) {
                        return PATrialService.getCentralContactTypes();
                    }
                },
                ncyBreadcrumb: {
                    parent: 'main.pa.trialOverview',
                    label: 'Participating Sites Details'
                }
            })
            .state('main.pa.trialOverview.collaborators', {
                url: '/collaborators',
                templateUrl: 'app/pa/dashboard/abstraction/admin/trial_collaborators.html',
                controller: 'trialCollaboratorsCtrl as trialDetailView',
                section: 'pa',
                resolve: {
                    TrialService: 'TrialService',
                    PATrialService: 'PATrialService',
                    trialDetailObj: function($stateParams, TrialService) {
                        return TrialService.getTrialById($stateParams.trialId);
                    },
                    fundingMechanismObj: function(TrialService) {
                        return TrialService.getFundingMechanisms();
                    },
                },
                ncyBreadcrumb: {
                    parent: 'main.pa.trialOverview',
                    label: 'Collaborators Details'
                }
            })

            .state('main.pa.trialOverview.nciInfo', {
                    url: '/nci-info',
                    templateUrl: 'app/pa/dashboard/abstraction/admin/trial_nci.html',
                    controller: 'trialNciCtrl as trialNciView',
                    section: 'pa',
                resolve: {
                    TrialService: 'TrialService',
                    PATrialService: 'PATrialService',
                    trialDetailObj: function($stateParams, TrialService) {
                        return TrialService.getTrialById($stateParams.trialId);
                    },
                    studySourceObj: function(TrialService) {
                        return TrialService.getStudySources();
                    },
                    nciDivObj: function(PATrialService) {
                        return PATrialService.getNciDiv();
                    },
                    nciProgObj: function(PATrialService) {
                        return PATrialService.getNciProg();
                    },
                    },
                    ncyBreadcrumb: {
                        parent: 'main.pa.trialOverview',
                        label: 'NCI Specific Information'
                    }
                })
                .state('main.pa.trialOverview.paTrialRelatedDocs', {
                    url: '/trial-related-documents',
                    templateUrl: 'app/pa/dashboard/abstraction/admin/pa_trial_related_docs.html',
                    controller: 'paTrialRelatedDocsCtrl as trialRelatedDocsView',
                    resolve: {
                        PATrialService: 'PATrialService',
                        acceptedFileTypesObj: function(PATrialService) {
                            return PATrialService.getAcceptedFileTypesPA();
                        },
                        documentTypes: function(PATrialService) {
                            return PATrialService.getTrialDocumentTypes();
                        }
                    },
                    section: 'pa',
                    ncyBreadcrumb: {
                        parent: 'main.pa.trialOverview',
                        label: 'Trial Related Documents'
                    }
                });


    } //trialAbstractionRoutes


})();
