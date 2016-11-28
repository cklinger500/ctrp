/**
 * Configure routes for pa-abstraction component
 */

(function() {
    'use strict';
    angular.module('ctrp.module.routes').config(trialAbstractionScientificRoutes);

    trialAbstractionScientificRoutes.$inject = ['$stateProvider'];

    function trialAbstractionScientificRoutes($stateProvider) {
        $stateProvider
            .state('main.pa.trialOverview.trialDescription', {
                url: '/trial-description',
                templateUrl: 'app/pa/dashboard/abstraction/scientific/pas_trial_description.html',
                controller: 'pasTrialDescriptionCtrl as descView',
                resolve: {
                    TrialService: 'TrialService',
                    PATrialService: 'PATrialService',
                    trialDetailObj: function($stateParams, TrialService) {
                        return TrialService.getTrialById($stateParams.trialId);
                    },
                },
                section: 'pa',
                ncyBreadcrumb: {
                    parent: 'main.pa.trialOverview',
                    label: 'Trial Description'
                }
            })
            .state('main.pa.trialOverview.trialDesign', {
                url: '/trial-design',
                templateUrl: 'app/pa/dashboard/abstraction/scientific/pas_trial_design.html',
                controller: 'pasTrialDesignCtrl as designView',
                resolve: {
                    PATrialService: 'PATrialService',
                    groupedTrialDesignData: function(PATrialService) {
                        return PATrialService.groupTrialDesignData();
                    },
                    maskings: function(PATrialService) {
                        return PATrialService.getMaskings();
                    },
                    timePerspectivesObj: function(PATrialService) {
                        return PATrialService.getTimePerspectives()
                    }
                },
                section: 'pa',
                ncyBreadcrumb: {
                    parent: 'main.pa.trialOverview',
                    label: 'Trial Design'
                }
            })
            .state('main.pa.trialOverview.anatomicSites', {
                url: '/anatomic-sites',
                templateUrl: 'app/pa/dashboard/abstraction/scientific/pas_anatomic_sites.html',
                controller: 'pasAnatomicSitesCtrl as anatomicView',
                resolve: {
                    TrialService: 'TrialService',
                    PATrialService: 'PATrialService',
                    trialDetailObj: function($stateParams, TrialService) {
                        return TrialService.getTrialById($stateParams.trialId);
                    },
                    anatomicSitesObj: function(PATrialService) {
                        return PATrialService.getAnatomicSites();
                    },
                },
                section: 'pa',
                ncyBreadcrumb: {
                    parent: 'main.pa.trialOverview',
                    label: 'Anatomic Sites'
                }
            })
            .state('main.pa.trialOverview.trialOutcomeMeasures', {
                url: '/trial-outcome-measures',
                templateUrl: 'app/pa/dashboard/abstraction/scientific/pas_trial_outcome_measures.html',
                controller: 'pasTrialOutcomeMeasuresCtrl as omView',
                resolve: {
                    TrialService: 'TrialService',
                    OutcomeMeasureService: 'OutcomeMeasureService',
                    PATrialService: 'PATrialService',
                    trialDetailObj: function($stateParams, TrialService) {
                        return TrialService.getTrialById($stateParams.trialId);
                    },
                    outcomeTypesObj: function($stateParams, TrialService) {
                        return TrialService.getOutcomeMeasureTypes();
                    }
                },
                section: 'pa',
                ncyBreadcrumb: {
                    parent: 'main.pa.trialOverview',
                    label: 'Outcome Measures'
                }
            })
            .state('main.pa.trialOverview.trialSubGroups', {
            url: '/trial-sub-groups',
            templateUrl: 'app/pa/dashboard/abstraction/scientific/pas_trial_sub_groups.html',
            controller: 'pasTrialSubGroupsCtrl as sgView',
            resolve: {
                TrialService: 'TrialService',
                PATrialService: 'PATrialService',
                trialDetailObj: function($stateParams, TrialService) {
                    return TrialService.getTrialById($stateParams.trialId);
                },
                assayTypes: function($stateParams, TrialService) {
                    return TrialService.getAssayTypes();
                },
            },
                section: 'pa',
                ncyBreadcrumb: {
                    parent: 'main.pa.trialOverview',
                    label: 'Sub Groups'
                }
            })
            .state('main.pa.trialOverview.eligibilityCriteria', {
                url: '/eligibility-critiera',
                templateUrl: 'app/pa/dashboard/abstraction/scientific/pas_eligibility_criteria.html',
                controller: 'pasEligibilityCtrl as criteriaView',
                section: 'pa',
                resolve: {
                    PATrialService: 'PATrialService',
                    genderList: function(PATrialService) {
                        return PATrialService.getGenderList();
                    },
                    ageUnits: function(PATrialService) {
                        return PATrialService.getAgeUnits();
                    },
                    samplingMethods: function(PATrialService) {
                        return PATrialService.getSamplingMethods();
                    }
                },
                ncyBreadcrumb: {
                    parent: 'main.pa.trialOverview',
                    label: 'Eligibility Criteria'
                }
            })
            .state('main.pa.trialOverview.associatedTrials', {
                url: '/associated-trials',
                templateUrl: 'app/pa/dashboard/abstraction/scientific/pas_associated_trials.html',
                controller: 'pasAssociatedTrialCtrl as assoTrialsView',
                section: 'pa',
                resolve: {
                    PATrialService: 'PATrialService',
                    identifierTypes: function(PATrialService) {
                        return PATrialService.getTrialIdentifierTypes();
                    }
                },
                ncyBreadcrumb: {
                    parent: 'main.pa.trialOverview',
                    label: 'Associated Trials'
                }
            })
            .state('main.pa.trialOverview.armsGroups', {
                url: '/arms-groups',
                templateUrl: 'app/pa/dashboard/abstraction/scientific/pas_arms_groups.html',
                controller: 'pasArmsGroupsCtrl as armView',
                section: 'pa',
                ncyBreadcrumb: {
                    parent: 'main.pa.trialOverview',
                    label: 'Arms Groups'
                }
            })

            .state('main.pa.trialOverview.bioMarkers', {
                url: '/bio-markers',
                templateUrl: 'app/pa/dashboard/abstraction/scientific/pas_trial_bio_markers.html',
                controller: 'pasBioMarkersCtrl as markersView',
                section: 'pa',
                resolve: {
                    TrialService: 'TrialService',
                    PATrialService: 'PATrialService',
                    trialDetailObj: function($stateParams, TrialService) {
                        return TrialService.getTrialById($stateParams.trialId);
                    },
                    assayTypes: function(TrialService) {
                        return TrialService.getAssayTypes();
                    },
                    evaluationTypes: function(TrialService) {
                        return TrialService.getEvaluationTypes();
                    },
                    specimenTypes: function(TrialService) {
                        return TrialService.getSpecimenTypes();
                    },
                    biomarkerUses: function(TrialService) {
                        return TrialService.getBiomarkerUses();
                    },
                    biomarkerPurposes: function(TrialService) {
                        return TrialService.getBiomarkerPurposes();
                    }

                },
                ncyBreadcrumb: {
                    parent: 'main.pa.trialOverview',
                    label: 'Bio Markers'
                }
            })

            .state('main.pa.trialOverview.disease', {
                url: '/disease',
                templateUrl: 'app/pa/dashboard/abstraction/scientific/pas_disease.html',
                controller: 'pasDiseaseCtrl as diseaseView',
                resolve: {
                    DiseaseService: 'DiseaseService',
                    TrialService: 'TrialService'
                },
                section: 'pa',
                ncyBreadcrumb: {
                    parent: 'main.pa.trialOverview',
                    label: 'Disease/Condition'
                }
            })

            .state('main.pa.trialOverview.intervention', {
                url: '/interventions',
                templateUrl: 'app/pa/dashboard/abstraction/scientific/pas_intervention.html',
                controller: 'pasInterventionCtrl as interventionView',
                resolve: {
                    PATrialService: 'PATrialService',
                    interventionTypes: function(PATrialService) {
                        return PATrialService.getInterventionTypes();
                    }
                },
                section: 'pa',
                ncyBreadcrumb: {
                    parent: 'main.pa.trialOverview',
                    label: 'Interventions'
                }
            });
    }
})();
