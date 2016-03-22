/**
 * Created by schintal, Mar 15, 2016
 */

(function() {
    'use strict';
    angular.module('ctrp.app.pa.dashboard')
        .controller('pasArmsGroupsCtrl', pasArmsGroupsCtrl);

    pasArmsGroupsCtrl.$inject = ['$scope', '$state', 'TrialService', 'PATrialService', 'toastr',
        'MESSAGES', '_', '$timeout', 'trialDetailObj'];

    function pasArmsGroupsCtrl($scope, $state, TrialService, PATrialService, toastr,
                                     MESSAGES, _, $timeout, trialDetailObj) {
        var vm = this;
        vm.curTrial = trialDetailObj;
        vm.setAddMode = setAddMode;
        vm.setEditMode = setEditMode;
        vm.deleteListHandler = deleteListHandler;
        vm.selectListHandler = selectListHandler;
        vm.deleteSelected = deleteSelected;
        vm.selectedDeleteAnatomicSiteList = [];
        vm.interventionList = [];
        vm.trial_interventions = [];
        vm.interventional = false;
        if(vm.curTrial.research_category.name=='Interventional') {
            vm.interventional = true;
        }

        console.log("vm.interventional = " + JSON.stringify(vm.curTrial.research_category));
        vm.reload = function() {
            console.log("RELOAD");
            $state.go($state.$current, null, { reload: true });
        };

        vm.updateTrial = function() {
            if(vm.currentArmsGroup) {
                vm.curTrial.arms_groups_attributes = [];
                vm.currentArmsGroup.intervention_text = "";
                if(vm.interventionList.length > 0){
                    for (var i = 0; i < vm.interventionList.length; i++) {
                        vm.currentArmsGroup.intervention_text = vm.currentArmsGroup.intervention_text + vm.interventionList[i].id + ",";
                        //console.log("GOOGLE vm.currentArmsGroup.intervention_text" +vm.currentArmsGroup.intervention_text);
                    }
                }
                if (vm.currentArmsGroup.edit || vm.currentArmsGroup.new || (vm.currentArmsGroup._destroy && vm.currentArmsGroup.id)) {
                    vm.curTrial.arms_groups_attributes.push(vm.currentArmsGroup);
                }
            }
            console.log("vm.curTrial.arms_groups_attributes " + JSON.stringify(vm.curTrial.arms_groups_attributes));
            vm.saveTrial();
        }
        vm.saveTrial = function(){
            vm.disableBtn = true;

            // An outer param wrapper is needed for nested attributes to work
            var outerTrial = {};
            outerTrial.new = vm.curTrial.new;
            outerTrial.id = vm.curTrial.id;
            outerTrial.trial = vm.curTrial;
            // get the most updated lock_version
            outerTrial.trial.lock_version = PATrialService.getCurrentTrialFromCache().lock_version;
            console.log("vm.curTrial.arms_groups_attributes " + JSON.stringify(vm.curTrial.arms_groups_attributes));
            TrialService.upsertTrial(outerTrial).then(function(response) {
                //toastr.success('Trial ' + vm.curTrial.lead_protocol_id + ' has been recorded', 'Operation Successful!');
                vm.curTrial.lock_version = response.lock_version || '';
                //toastr.success('Trial ' + vm.curTrial.lead_protocol_id + ' has been recorded', 'Operation Successful!');
                $scope.$emit('updatedInChildScope', {});
                vm.curTrial = response;
                PATrialService.setCurrentTrial(vm.curTrial); // update to cache
                toastr.clear();
                toastr.success('Trial ' + vm.curTrial.lead_protocol_id + ' has been recorded', 'Operation Successful!', {
                    extendedTimeOut: 1000,
                    timeOut: 0
                });
            }).catch(function(err) {
                console.log("error in updating trial " + JSON.stringify(outerTrial));
            });

        }//saveTrial

        function setAddMode() {
            vm.addEditMode = true;
            vm.currentArmsGroup = {};
            vm.currentArmsGroup.new = true;
            vm.currentArmsGroupIndex = null;
        }


        /**
         *  Set Edit Mode.
         **/
        function setEditMode(idx) {
            vm.addEditMode = true;
            vm.currentArmsGroup = vm.curTrial.arms_groups[idx];
            vm.currentArmsGroup.edit = true;
            vm.currentArmsGroupIndex = idx;
            vm.intervention_array = new Array();
            var exists = false;
            if(vm.curTrial.arms_groups[idx].intervention_text){
                vm.intervention_array =  vm.curTrial.arms_groups[idx].intervention_text.split(",");
                console.log("vm.curTrial.arms_groups[idx].intervention_text="+JSON.stringify(vm.curTrial.arms_groups[idx].intervention_text));
                console.log("vm.intervention_array="+JSON.stringify(vm.intervention_array));
            }
            var temp_intervention = {};
            for (var i = 0; i < vm.curTrial.interventions.length; i++) {
               for (var j = 0; j < vm.intervention_array.length; j++) {
                   if(vm.curTrial.interventions[i].id == vm.intervention_array[j]){
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
               vm.trial_interventions.push(temp_intervention);
                temp_intervention = {};
                exists = false;
            }

            console.log("In setEditModel vm.trial_interventions = " + JSON.stringify(vm.trial_interventions));
        }

        function deleteListHandler(armsGroupsInCheckboxes){
            console.log("In deleteListHandler armsGroupsInCheckboxes"+JSON.stringify(armsGroupsInCheckboxes));
            var deleteList = [];
            angular.forEach(armsGroupsInCheckboxes, function(item) {
                if ( angular.isDefined(item.selected) && item.selected === true ) {
                    deleteList.push(item);
                }
            });
            vm.selectedDeleteArmsGroupsList = deleteList ;
            console.log("In vm.selectedDeleteArmsGroupsList=" + JSON.stringify(vm.selectedDeleteArmsGroupsList));

        };

        function deleteSelected(){
            vm.curTrial.arms_groups_attributes=[];
            for (var i = 0; i < vm.selectedDeleteArmsGroupsList.length; i++) {
                var armsGroupsToBeDeletedFromDb = {};
                armsGroupsToBeDeletedFromDb.id = vm.selectedDeleteArmsGroupsList[i].id;
                armsGroupsToBeDeletedFromDb._destroy = true;
                console.log("armsGroupsToBeDeletedFromDb="+JSON.stringify(armsGroupsToBeDeletedFromDb));
                vm.curTrial.arms_groups_attributes.push(armsGroupsToBeDeletedFromDb);
            }
            vm.saveTrial();

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


    } //pasArmsGroupsCtrl

})();
