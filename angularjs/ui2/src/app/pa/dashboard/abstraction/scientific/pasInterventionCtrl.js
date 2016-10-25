/**
 * created by wangg5 on Feb 10, 2016
 *         <ctrp-ncit-interventions-search max-row-selectable="1" ng-model="personSearchView.selection"></ctrp-ncit-interventions-search>
 */
(function() {
    'use strict';
    angular.module('ctrp.app.pa.dashboard')
        .controller('pasInterventionCtrl', pasInterventionCtrl)
        .controller('pasInterventionLookupModalCtrl',pasInterventionLookupModalCtrl);

    pasInterventionCtrl.$inject = ['$scope', 'TrialService', 'PATrialService', '$state', 'toastr',
        'MESSAGES', '_', '$timeout', 'Common', '$uibModal', 'interventionTypes', 'UserService','$location', '$anchorScroll'];

    pasInterventionLookupModalCtrl.$inject = ['$scope', '$uibModalInstance', 'PATrialService'];

    function pasInterventionCtrl($scope, TrialService, PATrialService, $state, toastr,
        MESSAGES, _, $timeout, Common, $uibModal, interventionTypes, UserService, $location, $anchorScroll) {

            var vm = this;
            vm.interventionTypes = interventionTypes;
            vm.trialDetailObj = {};
            vm.showInterventionForm = false;
            vm.curInterventionObj = {};
            vm.deleteBtnDisabled = true;
            vm.upsertBtnDisabled = true;
            vm.disableBtn = false;
            vm.isCurationEnabled = UserService.isCurationModeEnabled() || false;
            vm.sortableListener = {
                cancel: '.locked'
             };
            vm.sortableListener.stop = dragItemCallback;

            var curUserRole = UserService.getUserRole() || '';
            var USERS_ALLOWED_CHANGE_TYPE = ['ROLE_SUPER', 'ROLE_ABSTRACTOR-SU', 'ROLE_ADMIN']; // user roles allowed to change intervention type
            var isUserAllowedToSelectType = _.contains(USERS_ALLOWED_CHANGE_TYPE, curUserRole);

            // actions
            vm.addIntervention = addIntervention;
            vm.editIntervention = editIntervention;
            vm.upsertIntervention = upsertIntervention;
            vm.resetLookupForm = resetLookupForm;
            vm.flagAllInterventionsForDeletion = flagAllInterventionsForDeletion;
            vm.deleteInterventions = deleteInterventions;
            vm.openLookupModal = openLookupModal;
            vm.reload = reload;

            activate();
            function activate() {
                _getTrialDetailCopy();
                watchInterventionList();
            }

            function _getTrialDetailCopy() {
                vm.trialDetailObj = PATrialService.getCurrentTrialFromCache();
                vm.isInterventionTypeListEnabled = false;
            }

            function addIntervention(addModeValue) {
                if (!(typeof addModeValue === 'undefined' || addModeValue === null)) {
                    vm.showInterventionForm = addModeValue;
                    $location.hash('section_top');
                    $anchorScroll();
                } else {
                    // console.info('showing intervention');
                    vm.showInterventionForm = true;
                    vm.upsertBtnDisabled = false;
                    vm.curInterventionObj = _newInterventionObj();
                }

                $scope.intervention_form.$setPristine();
            }

            function upsertIntervention(inventionObj) {

                if (angular.isDefined(inventionObj)) {

                    if (inventionObj.index !== undefined) {
                        // insert at index: index
                        vm.trialDetailObj.interventions[inventionObj.index] = angular.copy(inventionObj);
                    } else {
                        // unshift at index: 0
                        vm.trialDetailObj.interventions.unshift(angular.copy(inventionObj));
                    }

                    updateInterventions(true);
                }
            }

            function _labelSortableIndex(interventionArr) {
                var reorderedArr = _.map(interventionArr, function(inter, idx) {
                    inter.index = idx;
                    return inter;
                });
                return reorderedArr;
            }

            function updateInterventions(showToastr) {
                vm.trialDetailObj.interventions_attributes = _labelSortableIndex(vm.trialDetailObj.interventions);
                vm.deleteBtnDisabled = true;
                vm.upsertBtnDisabled = true;
                vm.disableBtn = true;
                vm.deleteAll = false;
                PATrialService.updateTrial(vm.trialDetailObj).then(function(res) {
                    var status = res.server_response.status;

                    if (status >= 200 && status <= 210) {
                        vm.trialDetailObj = res;
                        PATrialService.setCurrentTrial(vm.trialDetailObj); // update to cache
                        $scope.$emit('updatedInChildScope', {});
                        if (showToastr) {
                            toastr.clear();
                            toastr.success('Intervention has been updated', 'Successful!');
                        }
                        _getTrialDetailCopy();

                        // To make sure setPristine() is executed after all $watch functions are complete
                        $timeout(function() {
                           $scope.intervention_form.$setPristine();
                        }, 1);

                        vm.curInterventionObj = null;
                        vm.showInterventionForm = false; // hide the form
                    }
                }).catch(function(err) {
                    console.error('trial upsert error: ', err);
                }).finally(function() {
                    vm.disableBtn = false;
                });
            }

            function editIntervention(index) {
                vm.showInterventionForm = true;
                vm.isInterventionTypeListEnabled = isUserAllowedToSelectType;
                vm.upsertBtnDisabled = false;
                vm.curInterventionObj = angular.copy(vm.trialDetailObj.interventions[index]);
                vm.curInterventionObj.edit = true;
                vm.curInterventionObj.index = index;
            }

            function _newInterventionObj() {
                return {
                    name: null,
                    other_name: null,
                    description: null,
                    intervention_type_id: null, // for clinicaltrials.gov
                    trial_id: vm.trialDetailObj.id,
                    edit: false
                };
            }

            function resetLookupForm(form) {
                var curIndex = vm.curInterventionObj.index;
                if (curIndex !== undefined) {
                    editIntervention(curIndex);
                    return;
                }
                vm.curInterventionObj = _newInterventionObj();
                $scope.intervention_form.$setPristine();
            }

            function watchInterventionList() {
                $scope.$watch(function() {return vm.trialDetailObj.interventions;},
                    function(newVal, oldVal) {
                        if (angular.isDefined(newVal) && angular.isArray(newVal)) {
                            vm.deleteBtnDisabled = _.findIndex(newVal, {_destroy: true}) === -1;
                        }
                }, true);
            }

            function flagAllInterventionsForDeletion(booleanFlag) {
                _.each(vm.trialDetailObj.interventions, function(inter, idx) {
                    inter._destroy = booleanFlag;
                });
            }

            function deleteInterventions() {
                // console.info('deleting interventions');
                if (vm.trialDetailObj.interventions.length === 0) {
                    return;
                }
                updateInterventions(true);
            }

            function dragItemCallback(event, ui) {
                var item = ui.item.scope().item;
                var fromIndex = ui.item.sortable.index;
                var toIndex = ui.item.sortable.dropindex;
                updateInterventions(false); // update without showing toastr
            }

            var modalOpened = false;
            function openLookupModal(size) {
                if (modalOpened) return;

                var modalInstance = $uibModal.open({
                    animation: true,
                    backdrop: 'static',
                    keyboard: false,
                    templateUrl: 'app/pa/dashboard/abstraction/scientific/_intervention_lookup_form.html',
                    controller: 'pasInterventionLookupModalCtrl as lookupModalView',
                    size: size,
                });
                modalOpened = true;

                modalInstance.result.then(function(selectedInterventionObj) {
                    // vm.selectedInterventionObj = selectedInterventionObj;
                    // console.info('selected intervention obj: ', selectedInterventionObj);
                    vm.curInterventionObj.name = selectedInterventionObj.preferred_name;
                    vm.curInterventionObj.other_name = selectedInterventionObj.synonyms;
                    vm.curInterventionObj.c_code = selectedInterventionObj.c_code;
                    vm.curInterventionObj.description = vm.curInterventionObj.description || selectedInterventionObj.definition;
                    vm.curInterventionObj.intervention_type_id = selectedInterventionObj.intervention_type_id || '';
                    vm.isInterventionTypeListEnabled = vm.curInterventionObj.intervention_type_id === '' && isUserAllowedToSelectType;
                    console.info('received vm.curInterventionObj: ', vm.curInterventionObj);

                    $scope.intervention_form.$setDirty();
                }).catch(function(err) {
                    console.error('error in modal instance: ', err);
                }).finally(function() {
                    console.info('completed modal instance');
                    modalOpened = false;
                });
            } // openLookupModal

            function reload() {
                $state.go($state.$current, null, { reload: true });
            };

    } // pasInterventionCtrl


    function pasInterventionLookupModalCtrl($scope, $uibModalInstance, PATrialService) {
        var vm = this;
        vm.selection = {"intervention_type_id": ''};

        vm.cancel = function() {
            $uibModalInstance.dismiss('canceled');
        };

        vm.confirmSelection = function() {
            // var interventionName = vm.selection.preferred_name || '';
            var interventionCCode = vm.selection.c_code || '';
            // search ctrp interventions for same name, if exists, get its intervention type id for
            // trials to use
            PATrialService.searchCtrpInterventionsByName(interventionCCode).then(function(searchResponse) {
                var status = searchResponse.server_response.status;

                if (status >= 200 && status <= 210) {
                    var result = searchResponse.data;
                    if (result !== null) {
                        vm.selection.intervention_type_id = result.intervention_type_id;
                        // vm.selection.intervention_type_ct_gov_id = result.intervention_type_ct_gov_id;
                    }
                }
            }).catch(function(err) {
                console.error('error in search CTRP Interventions: ', err);
            }).finally(function() {
                $uibModalInstance.close(vm.selection);
            });
        };

        $scope.$watch(function() {return vm.selection;}, function(newVal) {
            // console.info('selection is: ', newVal);
            if (newVal !== '') {
                // $uibModalInstance.close(newVal);
            }
        });

    } // pasInterventionLookupModalCtrl

})();
