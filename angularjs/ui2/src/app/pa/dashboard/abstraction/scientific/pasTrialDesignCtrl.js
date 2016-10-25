(function() {
    'use strict';
    angular.module('ctrp.app.pa.dashboard')
        .controller('pasTrialDesignCtrl', pasTrialDesignCtrl);

    pasTrialDesignCtrl.$inject = ['$scope', 'TrialService', 'PATrialService', 'toastr',
        'MESSAGES', '_', '$timeout', 'groupedTrialDesignData', 'Common', 'maskings', 'timePerspectivesObj'];

    function pasTrialDesignCtrl($scope, TrialService, PATrialService, toastr,
        MESSAGES, _, $timeout, groupedTrialDesignData, Common, maskings, timePerspectivesObj) {
        var vm = this;
        vm.trialDetailObj = {};
        vm.trialPhases = [];
        vm.researchCategories = [];
        vm.primaryPurposes = [];
        vm.secondaryPurposes = [];
        vm.interventionModels = [];
        vm.studyModels = [];
        vm.maskings = maskings.maskings;
        vm.allocations = [];
        vm.studyClassifications = [];
        vm.timePerspectives = timePerspectivesObj.data;
        vm.biospecimenRetentions = [];
        var INTERVENTIONAL_FIELDS = ['secondary_purpose_id', 'secondary_purpose_other',
                                     'intervention_model_id', 'masking_id',
                                     'masking_role_subject', 'allocation_id',
                                     'study_classification_id',	'num_of_arms']; // fields/keys in vm.trialDetailObj

        var EXPANDEDACC_FIELDS = INTERVENTIONAL_FIELDS;
        var OBSERVATIONAL_FIELDS = ['study_model_id', 'study_model_other',
                                    'time_perspective_id', 'time_perspective_other',
                                    'biospecimen_retention_id',	'biospecimen_desc'];  // fields/keys in vm.trialDetailObj
        var ANCILLARY_FIELDS = OBSERVATIONAL_FIELDS;

        vm.isOtherPrimaryPurpose = false;
        vm.isOtherSecondaryPurpose = false;
        vm.isOtherStudyModel = false;
        // vm.showMaskingRoles = false;
        vm.isOtherTimePerspective = false;
        // information sources:
        vm.isInfoSourceProtocol = false;
        vm.isInfoSourceImport = false;

        // actions:
        vm.updateTrialDesign = updateTrialDesign;
        vm.resetForm = resetForm;
        vm.disableBtn = false;

        activate();
        function activate() {
            _unpackPromisedData();
            _getTrialDetailCopy();
            _watchPrimaryPurpose();
            _watchSecondaryPurpose();
            _watchResearchCategory();
            _watchStudyModel();
            _watchTimePerspective();
            _watchMasking();
        }

        // break down the grouped promised data as arrays
        function _unpackPromisedData() {
            if (groupedTrialDesignData.length === 4) {
                vm.trialPhases = groupedTrialDesignData[0];
                vm.researchCategories = groupedTrialDesignData[1];
                vm.primaryPurposes = groupedTrialDesignData[2];
                vm.secondaryPurposes = groupedTrialDesignData[3];
            }
        }

        function _getTrialDetailCopy() {
            $timeout(function() {
                vm.trialDetailObj = PATrialService.getCurrentTrialFromCache();
                var infoSourceName = vm.trialDetailObj.internal_source.name.toLowerCase();
                vm.isInfoSourceProtocol = infoSourceName.indexOf('protocol') > -1;
                vm.isInfoSourceImport = !vm.isInfoSourceProtocol && infoSourceName.indexOf('reg') === -1; // not from registry AND not protocol
            }, 0);
        } // _getTrialDetailCopy

        function _watchResearchCategory() {
            $scope.$watch(function() {return vm.trialDetailObj.research_category_id;},
                function(newVal, oldVal) {
                    if (newVal === oldVal) {
                        return;
                    }

                    var curResearchCategoryObj = _.findWhere(vm.researchCategories, {id: newVal});
                    vm.researchCategoryTitle = !!curResearchCategoryObj ? ' - ' + curResearchCategoryObj.name : '';
                    vm.isExpandedAccess = vm.researchCategoryTitle.toLowerCase().indexOf('expand') > -1;
                    vm.isInterventional = vm.researchCategoryTitle.toLowerCase().indexOf('intervention') > -1;
                    vm.isObservational = vm.researchCategoryTitle.toLowerCase().indexOf('observation') > -1;
                    vm.isAncillary = vm.researchCategoryTitle.toLowerCase().indexOf('ancillary') > -1;

                    // restore the last saved trial detail object upon changes in research category
                    vm.trialDetailObj = PATrialService.getCurrentTrialFromCache();
                    vm.trialDetailObj.research_category_id = newVal; // set to the new selection of research category
                    // fetch intervention models
                    if ((vm.isInterventional || vm.isExpandedAccess) && vm.interventionModels.length === 0) {
                        _fetchInterventionModels();
                    }

                    if ((vm.isInterventional || vm.isExpandedAccess) && vm.allocations.length === 0) {
                        _fetchAllocations();
                    }

                    if ((vm.isInterventional || vm.isExpandedAccess) && vm.studyClassifications.length === 0) {
                        _fetchStudyClassifications()
                    }

                    if ((vm.isObservational || vm.isAncillary) && vm.studyModels.length === 0) {
                        _fetchStudyModels();
                    }

                    if ((vm.isObservational || vm.isAncillary) && vm.biospecimenRetentions.length === 0) {
                        _fetchBiospecimenRetention()
                    }
                }, true);
        } // _watchResearchCategory

        function _watchPrimaryPurpose() {
            $scope.$watch(function() {return vm.trialDetailObj.primary_purpose_id;},
                function(newVal, oldVal) {
                if (newVal !== undefined && newVal !== null) {
                    var curPrimaryPurposeObj = _.findWhere(vm.primaryPurposes, {id: newVal});
                    vm.isOtherPrimaryPurpose = curPrimaryPurposeObj.name.toLowerCase().indexOf('other') > -1;
                    // reset to original data or empty
                    vm.trialDetailObj.primary_purpose_other = _resetValueForField('primary_purpose_other');
                }
            });
        } // _watchPrimaryPurpose

        function _watchSecondaryPurpose() {
            $scope.$watch(function() {return vm.trialDetailObj.secondary_purpose_id;},
                function(newVal, oldVal) {
                    if (newVal !== undefined && newVal !== null) {
                        var curSecondaryPurposeObj = _.findWhere(vm.secondaryPurposes, {id: newVal});
                        vm.isOtherSecondaryPurpose = curSecondaryPurposeObj.name.toLowerCase().indexOf('other') > -1;
                        // reset to original data or empty
                        vm.trialDetailObj.secondary_purpose_other = _resetValueForField('secondary_purpose_other');
                    }
                });
        }

        function _watchStudyModel() {
            $scope.$watch(function() {return vm.trialDetailObj.study_model_id;},
                function(newVal, oldVal) {
                    if (newVal !== undefined && newVal !== null) {
                        var curStudyModel = _.findWhere(vm.studyModels, {id: newVal});
                        console.info('curStudyModel: ', curStudyModel);
                        vm.isOtherStudyModel = curStudyModel.name.toLowerCase().indexOf('other') > -1;
                        // reset to original data or empty
                        vm.trialDetailObj.study_model_other = _resetValueForField('study_model_other');
                    }
                });
        }

        function _watchTimePerspective() {
            $scope.$watch(function() {return vm.trialDetailObj.time_perspective_id;},
                function(newVal, oldVal) {
                    if (newVal !== undefined && newVal !== null) {
                        var curTimePerspective = _.findWhere(vm.timePerspectives, {id: newVal});
                        vm.isOtherTimePerspective = curTimePerspective.name.toLowerCase().indexOf('other') > -1;
                        // reset to original data or empty
                        vm.trialDetailObj.time_perspective_other = ''; // _resetValueForField('time_perspective_other');
                    }
                });
        }

        /**
         * Fetch intervention models
         * @return {[type]} [description]
         */
        function _fetchInterventionModels() {
            PATrialService.getInterventionModels().then(function(res) {
                var status = res.server_response.status;

                if (status >= 200 && status <= 210) {
                    vm.interventionModels = res.models || [];
                }
            });
        }

        function _fetchAllocations() {
            PATrialService.getAllocations().then(function(res) {
                var status = res.server_response.status;

                if (status >= 200 && status <= 210) {
                    vm.allocations = res.allocations || [];
                    vm.allocations;
                }
            });
        }

        function _fetchStudyClassifications() {
            PATrialService.getStudyClassifications().then(function(res) {
                var status = res.server_response.status;

                if (status >= 200 && status <= 210) {
                    vm.studyClassifications = res.data || [];
                    vm.studyClassifications;
                }
            });
        }

        function _fetchStudyModels() {
            PATrialService.getStudyModels().then(function(res) {
                var status = res.server_response.status;

                if (status >= 200 && status <= 210) {
                    vm.studyModels = res.data || [];
                    vm.studyModels;
                }
            });
        }

        function _fetchBiospecimenRetention() {
            PATrialService.getBiospecimenRetentions().then(function(res) {
                var status = res.server_response.status;

                if (status >= 200 && status <= 210) {
                    vm.biospecimenRetentions = res.data || [];
                }
            });
        }

        function _watchMasking() {
            $scope.$watch(function() {return vm.trialDetailObj.masking_id;}, function(newVal) {
                var curMasking = _.findWhere(vm.maskings, {id: newVal});
                var maskingName = !!curMasking ? curMasking.name : '';
                vm.showMaskingRoles = maskingName.toLowerCase().indexOf('blind') > -1;
            });
        }

        /**
         * Get the value for the fieldName in the cached trial object
         * @param  {[type]} fieldName [description]
         * @return {String}  a String value that could be a blank String
         */
        function _resetValueForField(fieldName) {
            var cachedTrial = PATrialService.getCurrentTrialFromCache();
            var val = cachedTrial[fieldName] || '';
            return val;
        }

        function updateTrialDesign() {

            // clear field-value pairs in the trialDetailObj if the research category changes
            // so that the old values are not saved for the new research category
            if (vm.isAncillary) {
                vm.trialDetailObj = _clearKeyValuePairsInTrial(INTERVENTIONAL_FIELDS, vm.trialDetailObj);
            } else if (vm.isObservational) {
                var modifiedInterventionalFields = angular.copy(INTERVENTIONAL_FIELDS);
                modifiedInterventionalFields.pop(); // remove num_of_arms from cleared keys list, as it is now required field for this research category
                vm.trialDetailObj = _clearKeyValuePairsInTrial(modifiedInterventionalFields, vm.trialDetailObj);
            } else if (vm.isInterventional || vm.isExpandedAccess) {
                vm.trialDetailObj = _clearKeyValuePairsInTrial(OBSERVATIONAL_FIELDS, vm.trialDetailObj);
            }

            var outerTrial = {};
            vm.disableBtn = true;
            outerTrial.new = false;
            outerTrial.id = vm.trialDetailObj.id;
            outerTrial.trial = vm.trialDetailObj;
            outerTrial.trial.lock_version = PATrialService.getCurrentTrialFromCache().lock_version;
            PATrialService.upsertTrial(outerTrial).then(function(res) {
                var status = res.server_response.status;

                if (status >= 200 && status <= 210) {
                    vm.trialDetailObj = res;
                    vm.trialDetailObj.lock_version = res.lock_version;
                    // delete vm.trialDetailObj.admin_checkout;
                    // delete vm.trialDetailObj.scientific_checkout;
                    PATrialService.setCurrentTrial(vm.trialDetailObj); // update to cache
                    $scope.$emit('updatedInChildScope', {});

                    toastr.clear();
                    toastr.success('Trial design has been updated', 'Successful!');
                    _getTrialDetailCopy();

                    // To make sure setPristine() is executed after all $watch functions are complete
                    $timeout(function() {
                       $scope.trial_design_form.$setPristine();
                   }, 1);
                }

            }).catch(function(err) {
                console.error('error in updating trial design: ', err);
            }).finally(function() {
                vm.disableBtn = false;
            });
        }

        function resetForm() {
            _getTrialDetailCopy();
            $scope.trial_design_form.$setPristine();
        }

        /**
         * Clear value associated with the keys in the provided trialDetailObj
         *
         * @param  {[Array of String]} keyStringArray [description]
         * @param  {[Object]} trialDetailObj [description]
         * @return {[Object]}                [cleared trialDetailObj clone]
         */
        function _clearKeyValuePairsInTrial(keyStringArray, trialDetailObj) {
            var trialDetailObjClone = angular.copy(trialDetailObj);
            if (angular.isArray(keyStringArray)) {
                _.each(keyStringArray, function(key) {
                    if (trialDetailObjClone.hasOwnProperty(key)) {
                        trialDetailObjClone[key] = null; // clear the value associated with the key in trial object
                    }
                });
            }
            return trialDetailObjClone;
        }

    } //pasTrialDesignCtrl

})();
