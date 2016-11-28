/**
 * created by wangg5 on Feb 10, 2016
 */
(function() {
    'use strict';
    angular.module('ctrp.app.pa.dashboard')
        .controller('pasEligibilityCtrl', pasEligibilityCtrl);

    pasEligibilityCtrl.$inject = ['$scope', 'TrialService', 'UserService', 'PATrialService', 'toastr',
        'MESSAGES', '_', '$timeout', 'genderList', 'ageUnits', 'samplingMethods', 'Common'];

    function pasEligibilityCtrl($scope, TrialService, UserService, PATrialService, toastr,
        MESSAGES, _, $timeout, genderList, ageUnits, samplingMethods, Common) {
        var vm = this;
        var MAX_CHARS = 5000; // maximal character counts for the description field in ALL other criterion
        vm.trialDetailObj = {};
        vm.genderList = genderList;
        vm.ageUnits = ageUnits;
        delete samplingMethods.server_response;
        vm.samplingMethods = samplingMethods; // array
        vm.otherCriterion = {};
        vm.descCharsRemaining = MAX_CHARS;
        // vm.otherCriteriaPerPage = 10; // pagination
        vm.addOtherCriterionFormShown = false;
        vm.deleteAllOCCheckbox = false;

        vm.prepareOtherCriterion = prepareOtherCriterion;
        vm.upsertOtherCriterion = upsertOtherCriterion;
        vm.deleteOtherCriterion = deleteOtherCriterion;
        vm.updateCriteria = updateCriteria;
        vm.deleteAllOC = deleteAllOC;
        vm.editOtherCriterion = editOtherCriterion;
        vm.resetForm = resetForm;
        vm.cancelEditOtherCriterion = cancelEditOtherCriterion;
        vm.updateOtherCriteria = updateOtherCriteria;
        vm.isCurationEnabled = UserService.isCurationModeEnabled() || false;
        vm.sortableListener = {
            cancel: '.locked'
        };
        $scope.$on(MESSAGES.CURATION_MODE_CHANGED, function() {
            vm.isCurationEnabled = UserService.isCurationModeEnabled();
        });


        vm.sortableListener.stop = dragItemCallback;
        vm.disableBtn = false;
        //vm.updateOtherCriteriaDesc = updateOtherCriteriaDesc;
        //vm.updateOtherCriteriaType = updateOtherCriteriaType;

        activate();
        function activate() {
            _getTrialDetailCopy();
            watchOtherCriteriaDesc();
            // mockupData();
        }

        function _getTrialDetailCopy() {
            vm.trialDetailObj = PATrialService.getCurrentTrialFromCache();
            vm.numCharsUsedInOC = OCDescCharCount(vm.trialDetailObj.other_criteria);
        }

        function resetForm() {
            _getTrialDetailCopy();
            vm.addOtherCriterionFormShown = false;
            vm.otherCriterion.edit = false;
            $scope.criteria_form.$setPristine();
        }

        function updateCriteria(showToastr) {
            vm.trialDetailObj.other_criteria_attributes = _labelSortableIndex(vm.trialDetailObj.other_criteria);
            var outerTrial = {};
            outerTrial.new = false;
            outerTrial.id = vm.trialDetailObj.id;
            outerTrial.trial = vm.trialDetailObj;
            outerTrial.trial.lock_version = PATrialService.getCurrentTrialFromCache().lock_version;

            vm.disableBtn = true;

            PATrialService.upsertTrial(outerTrial).then(function(res) {
                var status = res.server_response.status;

                if (status >= 200 && status <= 210) {
                    vm.trialDetailObj = res;
                    vm.trialDetailObj.lock_version = res.lock_version;
                    vm.deleteAllOCCheckbox = false;

                    PATrialService.setCurrentTrial(vm.trialDetailObj); // update to cache
                    $scope.$emit('updatedInChildScope', {});
                    if (showToastr) {
                        toastr.clear();
                        toastr.success('Eligibility Criteria has been updated', 'Successful!');
                    }
                    _getTrialDetailCopy();

                    // To make sure setPristine() is executed after all $watch functions are complete
                    $timeout(function() {
                       $scope.criteria_form.$setPristine();
                   }, 1);
                }

            }).catch(function(err) {
                console.error('error in updating trial design: ', err);
            }).finally(function() {
                vm.disableBtn = false;
            });
        }

        /**
         * Add 'index' field to each other_criterion, persisted to database
         * @param  {[Array]} ocArray [description]
         * @return {[Array]}         [with the additional 'index' field to each element]
         */
        function _labelSortableIndex(ocArray) {
            var sortedArray = _.map(ocArray, function(oc, idx) {
                oc.index = idx;
                return oc;
            });
            return sortedArray;
        }

        function prepareOtherCriterion(criterionType) {
            vm.addOtherCriterionFormShown = true;
            vm.otherCriterion = newOtherCriterion(criterionType);
        }

        /**
         * Generate a new criterion object
         * @param  {String} criterionType [inclusion or exclusion]
         * @return {JSON Object}  initialized other criterion object
         */
        function newOtherCriterion(criterionType) {
            return {
                id: undefined,
                criteria_type: criterionType,
                trial_id: vm.trialDetailObj.id,
                criteria_desc: '',
                edit: false,
                _destroy: false
            };
        }

        function deleteOtherCriterion(idx) {
            vm.trialDetailObj.other_criteria[idx]._destroy = !vm.trialDetailObj.other_criteria[idx]._destroy;
        }

        /**
         * Delete/Undelete all other criteria
         * @param booleanFlag {Boolean}
         * @return {Void}
         */
        function deleteAllOC(booleanFlag) {
            _.each(vm.trialDetailObj.other_criteria, function(oc, idx) {
                vm.trialDetailObj.other_criteria[idx]._destroy = booleanFlag;
            });
        }

        /**
         * update or insert the otherCriterionObj
         * @param  {Object} otherCriterionObj
         * @return {Void}
         */
        function upsertOtherCriterion(otherCriterionObj) {
            if (otherCriterionObj.criteria_desc.trim() === '') {
                // return if the description is empty
                return;
            }
            var isConfirmed = false;
            var confirmMsg = 'Click OK to add a duplicate Eligibility Criterion Description.  Click Cancel to abort';

            if (otherCriterionObj.id === undefined && isOCDescDuplicate(otherCriterionObj.criteria_desc, vm.trialDetailObj.other_criteria)) {
                vm.disableBtn = true;

                // if OC exists already
                Common.alertConfirm(confirmMsg).then(function(ok) {
                    isConfirmed = ok;
                }).catch(function(cancel) {
                    // isConfirmed = cancel;
                }).finally(function() {
                    if (isConfirmed === true) {
                        // user confirmed
                        _insertOC(otherCriterionObj);
                    } // isConfirmed

                    vm.disableBtn = false;
                });
            } else {
                _insertOC(otherCriterionObj);
            }

        } // upsertOtherCriterion

        /**
         * Interner function called by upsertOtherCriterion
         * @param  {JSON Object} otherCriterionObj [description]
         * @return {Void}                   [description]
         */
        function _insertOC(otherCriterionObj) {
            if (otherCriterionObj.id === undefined) {
                otherCriterionObj._destroy = vm.deleteAllOCCheckbox;
                vm.trialDetailObj.other_criteria.unshift(otherCriterionObj);
            } else {
                vm.trialDetailObj.other_criteria[otherCriterionObj.index] = otherCriterionObj;
            }
            cancelEditOtherCriterion();
        }

        /**
         * Edit other criterion
         * @param  {Integer} index [description]
         * @return {JSON object}  Other criterion object
         */
        function editOtherCriterion(index) {
            vm.trialDetailObj.other_criteria[index].edit = true;

            vm.otherCriterion = angular.copy(vm.trialDetailObj.other_criteria[index]);
            vm.otherCriterion.edit = true;
            vm.otherCriterion.index = index;
            vm.numCharsUsedInOC = OCDescCharCount(vm.trialDetailObj.other_criteria);
            vm.numCharsUsedInOC -= vm.otherCriterion.criteria_desc.length;
            vm.descCharsRemaining = MAX_CHARS - vm.numCharsUsedInOC;
            // vm.descCharsRemaining += vm.otherCriterion.criteria_desc.length; // recalculate the characters remaining
            vm.addOtherCriterionFormShown = true;
        }

        function cancelEditOtherCriterion() {
            resetOtherCriterionEdit();

            vm.addOtherCriterionFormShown = false;
            vm.otherCriterion = newOtherCriterion('');
        }

        function updateOtherCriteria(otherCriterion) {
            var otherCriterionDesc = otherCriterion.criteria_desc;
            var otherCriterionType = otherCriterion.criteria_type;
            var otherCriterionIndex = vm.otherCriterion.index;

            if (otherCriterionDesc.length === 0) {
                return;
            }

            vm.trialDetailObj.other_criteria[otherCriterionIndex].criteria_type = otherCriterionType;
            vm.trialDetailObj.other_criteria[otherCriterionIndex].criteria_desc = otherCriterionDesc;
            resetOtherCriterionEdit();  // resets edit property of currently edited criterion back to false

            vm.addOtherCriterionFormShown = false;
            vm.otherCriterion = newOtherCriterion(''); // reset to empty because edit/update is complete
        }

        function resetOtherCriterionEdit() {
            var otherCriterionIndex = vm.otherCriterion.index;
            if (vm.trialDetailObj.other_criteria[otherCriterionIndex]) {
                vm.trialDetailObj.other_criteria[otherCriterionIndex].edit = false;
            }
        }

/*
        ADIL: Removed inline editing feature so no longer required since
              function updateOtherCriteria() performs both tasks in one function.
              Commented out for now

        function updateOtherCriteriaDesc(otherCriterionDesc, index) {
            if (otherCriterionDesc.length === 0) {
                return;
            }
            vm.trialDetailObj.other_criteria[index].criteria_desc = otherCriterionDesc;
        }

        function updateOtherCriteriaType(otherCriterionType, index) {
            vm.trialDetailObj.other_criteria[index].criteria_type = otherCriterionType;
        }
*/

        /**
         * Check whether the Other Criterion description is duplicate
         * @param  {String}  otherCriterionDesc
         * @param  {Array of object}  otherCriteriaArr: an array of other criteria
         * @return {Boolean}
         */
        function isOCDescDuplicate(otherCriterionDesc, otherCriteriaArr) {
            return _.findIndex(otherCriteriaArr, {criteria_desc: otherCriterionDesc.trim()}) > -1;
        }

        /**
         * Watch the other_criteria array in the vm.trialDetailObj
         * @return {Void}
         */
        function watchOtherCriteriaDesc() {
            $scope.$watchCollection(function() {return vm.trialDetailObj.other_criteria;}, function(
                newVal, oldVal) {
                    // number of characters for other criterion description (cumulative)
                    if (angular.isArray(newVal) && newVal.length > 0) {
                        vm.numCharsUsedInOC = OCDescCharCount(newVal);
                        vm.descCharsRemaining = MAX_CHARS - vm.numCharsUsedInOC;
                    }
                });
        } // watchOtherCriteriaDesc

        /**
         * Count the characters in other criteria's description field
         * @param:  {array of other_criteria} ocArray
         * @return {Integer}
         */
        function OCDescCharCount(ocArray) {
            var totalCounts = 0;
            _.each(ocArray, function(oc, idx) {
                totalCounts += oc.criteria_desc.length;
            });
            return totalCounts;
        }

        /**
         * Callback for dragging item around
         * @param  {[type]} event [description]
         * @param  {[type]} ui    [description]
         * @return {[type]}       [description]
         */
        function dragItemCallback(event, ui) {
            var item = ui.item.scope().item;
            var fromIndex = ui.item.sortable.index;
            var toIndex = ui.item.sortable.dropindex;
            if (isFormModelsComplete()) {
                console.info('form models are all completed!');
                // only update when the other fields in the form are also completed!
                updateCriteria(false);
            }
        }

        function isFormModelsComplete() {
            return vm.trialDetailObj.gender_id !== null && vm.trialDetailObj.accept_vol !== null &&
                 vm.trialDetailObj.min_age !== null && vm.trialDetailObj.min_age_unit_id !== null &&
                         vm.trialDetailObj.max_age !== null && vm.trialDetailObj.max_age_unit_id !== null;
        }

    } // pasEligibilityCtrl

})();
