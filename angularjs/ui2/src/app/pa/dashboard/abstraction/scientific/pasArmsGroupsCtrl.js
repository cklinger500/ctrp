/**
 * Created by schintal, Mar 15, 2016
 */

(function() {
    'use strict';
    angular.module('ctrp.app.pa.dashboard')
        .controller('pasArmsGroupsCtrl', pasArmsGroupsCtrl);

    pasArmsGroupsCtrl.$inject = ['$scope','$filter','UserService', '$state', 'TrialService', 'PATrialService', 'toastr',
        'MESSAGES', '_', '$timeout', '$anchorScroll', '$location', 'Common'];

    function pasArmsGroupsCtrl($scope,$filter, UserService,$state, TrialService, PATrialService, toastr,
                                     MESSAGES, _, $timeout, $anchorScroll, $location, Common) {
        var vm = this;
        vm.curTrial = {};
        vm.setAddMode = setAddMode;
        vm.setEditMode = setEditMode;
        vm.selectListHandler = selectListHandler;
        vm.deleteSelected = deleteSelected;
        vm.resetArmsGroup = resetArmsGroup;
        vm.selectedDeleteAnatomicSiteList = [];
        vm.currentArmsGroup = {index: ''};
        vm.currentArmsGroup.label = '';
        vm.interventionList = [];
        vm.trial_interventions = [];
        vm.interventional = false;
        vm.isCurationEnabled = UserService.isCurationModeEnabled() || false;
        vm.sortableListener = {
            cancel: '.locked'
        };
        vm.sortableListener.stop = dragItemCallback;
        vm.disableBtn = false;
        vm.deleteBtnDisabled = true;
        vm.old_assigned_interventions_array = [];

        $scope.$on(MESSAGES.CURATION_MODE_CHANGED, function() {
            vm.isCurationEnabled = UserService.isCurationModeEnabled();
        });

        //vm.watchArmLabel = watchArmLabel();
        activate();
        console.log("ARMS_GROUPS = ", vm.curTrial.arms_groups);

        vm.interventional = vm.curTrial.isInterventional || false;


        /****************** implementations below ***************/
        function activate() {
           // watchArmLabel();
           _getTrialDetailCopy();
           _watchDeletionCheckbox();
        }

        function _getTrialDetailCopy() {
            vm.curTrial = PATrialService.getCurrentTrialFromCache();
        }

        function _watchDeletionCheckbox() {
            $scope.$watch(function() { return vm.curTrial.arms_groups;},
                function(newVal, oldVal) {
                    if (angular.isDefined(newVal) && angular.isArray(newVal)) {
                        vm.deleteBtnDisabled = _.findIndex(newVal, {_destroy: true}) === -1;
                    }
                }, true);
        }

        vm.checkAllAG = function (isChecked) {
            _.each(vm.curTrial.arms_groups, function(ag) {
                ag._destroy = isChecked;
            });
        };

        vm.checkDuplicates = function () {
            var isConfirmed = false;
            var confirmMsg = 'Click OK to add a duplicate entry.  Click Cancel to abort';
            console.info('vm.curTrial.arms_groups: ', vm.curTrial.arms_groups);
            //check for duplicates
            var duplicateLabelIndex = _.findIndex(vm.curTrial.arms_groups, {label: vm.currentArmsGroup.label});
            if (duplicateLabelIndex === -1) {
                // also check the description field for duplication
                duplicateLabelIndex = _.findIndex(vm.curTrial.arms_groups, {description: vm.currentArmsGroup.description});
            }
            if (duplicateLabelIndex > -1 && duplicateLabelIndex !== vm.currentArmsGroup.index) {
                vm.disableBtn = true;
                Common.alertConfirm(confirmMsg).then(function(ok) {
                    isConfirmed = ok;
                }).catch(function(cancel) {
                    // isConfirmed = cancel;
                }).finally(function() {
                    vm.disableBtn = false;

                    if (isConfirmed === true) {
                        // user confirmed
                        vm.updateTrial();
                    } // isConfirmed
                });
            } else {
                vm.updateTrial();
            }

        }

        vm.updateTrial = function() {
            if(vm.currentArmsGroup) {
                vm.curTrial.arms_groups_attributes = [];
                vm.currentArmsGroup.arms_groups_interventions_associations_attributes = [];

                //vm.currentArmsGroup.intervention_text = "";
                console.log("vm.interventionList.length ="+ vm.interventionList.length);
                console.log("vm.interventionList ="+ JSON.stringify(vm.interventionList.length));
                if (vm.interventionList.length > 0){
                    for (var i = 0; i < vm.interventionList.length; i++) {
                        var interventionHash={}
                        var result = $filter('filter')(vm.old_assigned_interventions_array, {id:vm.interventionList[i].id})[0];
                        if(!angular.isDefined(result)) {
                            interventionHash.intervention_id=vm.interventionList[i].id;
                            vm.currentArmsGroup.arms_groups_interventions_associations_attributes.push(interventionHash);
                        }
                    }
                }

                // delete already assigned interventions if they are not selected now

                console.log("arms_groups_interventions_array " + vm.arms_groups_interventions_array)
                for (var i = 0; i < vm.old_assigned_interventions_array.length; i++) {
                    var interventionHash={}
                    var result = $filter('filter')(vm.interventionList, {id:vm.old_assigned_interventions_array[i].id})[0];
                    if(!angular.isDefined(result)) {
                        interventionHash._destroy = true;
                       var result = $filter('filter')(vm.arms_groups_interventions_array, {intervention_id:vm.old_assigned_interventions_array[i].id,arms_group_id:vm.currentArmsGroup.id})[0];
                        console.log("hey this is inside delete loop" + result.id)
                        interventionHash.id=result.id;
                        vm.currentArmsGroup.arms_groups_interventions_associations_attributes.push(interventionHash);
                    }
                }

                if (vm.currentArmsGroup.edit || vm.currentArmsGroup.new || (vm.currentArmsGroup._destroy && vm.currentArmsGroup.id)) {
                    vm.curTrial.arms_groups_attributes.push(vm.currentArmsGroup);
                }
            }
            console.log("vm.curTrial.arms_groups_attributes " + JSON.stringify(vm.curTrial.arms_groups_attributes));
            vm.saveTrial();
        }

        vm.saveTrial = function(params){
            if(vm.currentArmsGroup){
                if(!vm.currentArmsGroup.label || !vm.currentArmsGroup.description){
                    return;
                }
            }
            var successMsg = '';
            vm.disableBtn = true;

            // An outer param wrapper is needed for nested attributes to work
            var outerTrial = {};
            outerTrial.new = vm.curTrial.new;
            outerTrial.id = vm.curTrial.id;
            outerTrial.trial = vm.curTrial;
            // get the most updated lock_version
            outerTrial.trial.lock_version = PATrialService.getCurrentTrialFromCache().lock_version;

            TrialService.upsertTrial(outerTrial).then(function(response) {
                var status = response.server_response.status;

                if (status >= 200 && status <= 210) {
                    vm.curTrial.lock_version = response.lock_version || '';
                    vm.curTrial = response;
                    vm.curTrial.arms_groups_attributes=[];
                    PATrialService.setCurrentTrial(vm.curTrial); // update to cache
                    $scope.$emit('updatedInChildScope', {});
                    //if(vm.currentArmsGroup.new){
                        vm.currentArmsGroup.new =false;
                        vm.addEditMode = false;
                    //}
                    $state.go('main.pa.trialOverview.armsGroups');

                    if (params && params.del) {
                        successMsg = 'Record(s) deleted.';
                    } else {
                        successMsg = 'Trial ' + vm.curTrial.lead_protocol_id + ' has been recorded';
                    }
                    toastr.clear();
                    toastr.success(successMsg, 'Operation Successful!');
                    vm.selectedAllAG = false;
                }
            }).catch(function(err) {
                console.log("error in updating trial " + JSON.stringify(outerTrial));
            }).finally(function() {
                vm.disableBtn = false;
            });

        }; //saveTrial

        vm.reload = function() {
            $state.go($state.$current, null, { reload: true });
        };

        function setAddMode(isAddMode) {
            vm.currentArmsGroup = {};
            vm.currentArmsGroup.label = null;
            vm.currentArmsGroup.description = null;
            vm.currentArmsGroup.new = true;
            vm.currentArmsGroupIndex = null;
            vm.trial_interventions = [];
            vm.old_assigned_interventions_array = [];

            if (isAddMode) {
                vm.addEditMode = true;
                var tempIntervention = {};
                for (var i = 0; i < vm.curTrial.interventions.length; i++) {
                    tempIntervention.id = vm.curTrial.interventions[i].id;
                    tempIntervention.name = vm.curTrial.interventions[i].name;
                    tempIntervention.description = vm.curTrial.interventions[i].description;
                    tempIntervention.selected = false;
                    vm.trial_interventions.push(tempIntervention);
                    console.log("vm.trial_interventions="+JSON.stringify(vm.trial_interventions));
                    tempIntervention = {};
                }
            } else {
                vm.addEditMode = false;
                $location.hash('section_top');
                $anchorScroll();
            }

            $scope.arm_form.$setPristine();
        }

        /**
         *  Set Edit Mode.
         **/
        function setEditMode(idx) {
            vm.addEditMode = true;
            vm.currentArmsGroup = angular.copy(vm.curTrial.arms_groups[idx]);
            vm.interventionList = vm.currentArmsGroup.arms_groups_interventions;
            vm.currentArmsGroup.edit = true;
            vm.currentArmsGroup.index = idx;
            vm.currentArmsGroupIndex = idx;
            vm.trial_interventions = [];
            var exists = false;
            vm.intervention_array = vm.curTrial.arms_groups[idx].arms_groups_interventions;
            vm.old_assigned_interventions_array = angular.copy(vm.intervention_array);
            vm.arms_groups_interventions_array = vm.curTrial.arms_groups[idx].arms_groups_interventions_array;


            // Show the list of Trial interventions with the checkbox selected if they are assigned to the Arms Group
            var temp_intervention = {};
            for (var i = 0; i < vm.curTrial.interventions.length; i++) {
               for (var j = 0; j < vm.intervention_array.length; j++) {
                   if(vm.curTrial.interventions[i].id == vm.intervention_array[j].id){
                       exists = true;
                   }
               }
                temp_intervention.id = vm.curTrial.interventions[i].id;
                temp_intervention.name = vm.curTrial.interventions[i].name;
                temp_intervention.description = vm.curTrial.interventions[i].description;
               if(exists) {
                   temp_intervention.selected = true;
               } else {
                   temp_intervention.selected = false;
               }
                temp_intervention._destroy = false;
               vm.trial_interventions.push(temp_intervention);
                temp_intervention = {};
                exists = false;
            }

            console.log("In setEditModel vm.trial_interventions = " + JSON.stringify(vm.trial_interventions));
        }

        function deleteSelected() {
            if (vm.curTrial.arms_groups.length === 0) {
                return;
            }
            vm.curTrial.arms_groups_attributes= vm.curTrial.arms_groups;
            var successMsg = '';
            vm.disableBtn = true;

            // An outer param wrapper is needed for nested attributes to work
            var outerTrial = {};
            outerTrial.new = vm.curTrial.new;
            outerTrial.id = vm.curTrial.id;
            outerTrial.trial = vm.curTrial;
            // get the most updated lock_version
            outerTrial.trial.lock_version = PATrialService.getCurrentTrialFromCache().lock_version;

            TrialService.upsertTrial(outerTrial).then(function(response) {
                var status = response.server_response.status;

                if (status >= 200 && status <= 210) {
                    vm.curTrial.lock_version = response.lock_version || '';
                    $scope.$emit('updatedInChildScope', {});
                    vm.curTrial = response;
                    vm.curTrial.arms_groups_attributes=[];
                    PATrialService.setCurrentTrial(vm.curTrial); // update to cache
                    vm.currentArmsGroup.new =false;
                    vm.addEditMode = false;

                    successMsg = 'Trial ' + vm.curTrial.lead_protocol_id + ' has been updated';
                    toastr.clear();
                    toastr.success(successMsg, 'Operation Successful!');
                }
            }).catch(function(err) {
                console.log("error in updating trial " + JSON.stringify(outerTrial));
            }).finally(function() {
                vm.disableBtn = false;
                vm.selectedAllAG = false;
            });
        };

        function selectListHandler(interventionCheckboxes){
            console.log("In selectListHandler interventionCheckboxes"+JSON.stringify(interventionCheckboxes));
            var selectList = [];
            angular.forEach(interventionCheckboxes, function(item) {

                if ( angular.isDefined(item.selected) && item.selected === true ) {
                    selectList.push(item);
                }
            });
            vm.interventionList = selectList ;
           // vm.currentArmsGroup.interventions =  vm.interventionList;
            console.log("In selectList=" + JSON.stringify(selectList));

        };

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

            vm.curTrial.arms_groups_attributes = _labelSortableIndex(vm.curTrial.arms_groups);
            vm.saveTrial();
        }

        function resetArmsGroup() {
            var curIndex = vm.currentArmsGroup.index;
            if (curIndex !== undefined) {
                setEditMode(curIndex);
                return;
            }

            vm.setAddMode(true);
        }


    } //pasArmsGroupsCtrl

})();
