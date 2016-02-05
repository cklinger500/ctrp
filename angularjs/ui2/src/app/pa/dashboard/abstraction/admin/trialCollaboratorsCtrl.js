
/**
 * Created by schintal, Deember 22nd, 2015
 */

(function() {
    'use strict';
    angular.module('ctrp.app.pa.dashboard')
    .controller('trialCollaboratorsCtrl', trialCollaboratorsCtrl);

    trialCollaboratorsCtrl.$inject = ['TrialService', 'PATrialService', '$scope', '$timeout','$state', 'toastr', 'MESSAGES', 'trialDetailObj'];

    function trialCollaboratorsCtrl(TrialService, PATrialService, $scope, $timeout, $state, toastr, MESSAGES, trialDetailObj) {

        var vm = this;
        vm.deleteCollaborator = deleteCollaborator;
        vm.deleteListHandler = deleteListHandler;
        vm.deleteSelected = deleteSelected;
        vm.setAddMode = setAddMode;
        vm.curTrial = trialDetailObj;
        console.log("trialDetailObj = " + JSON.stringify(trialDetailObj));
        console.log("pa_editable = " + JSON.stringify(trialDetailObj["pa_editable"]));
        vm.curTrial.collaborators_attributes = [];
        vm.addedCollaborators = [];
        vm.selectedCollaborators = [];
        vm.selectedDeleteCollaboratorsList = [];
        vm.collaboratorsNum = 0;
        vm.addMode=false;

        vm.updateTrial = function(updateType) {
            // Prevent multiple submissions
            vm.disableBtn = true;

            // An outer param wrapper is needed for nested attributes to work
            var outerTrial = {};
            outerTrial.new = vm.curTrial.new;
            outerTrial.id = vm.curTrial.id;
            outerTrial.trial = vm.curTrial;

            if (vm.addedCollaborators.length > 0) {
                vm.curTrial.collaborators_attributes = [];
                _.each(vm.addedCollaborators, function (collaborator) {
                    var index = 0;
                    vm.curTrial.collaborators_attributes.push(collaborator);
                    if (!vm.addedCollaborators[index]._destroy) {
                        vm.curTrial.collaborators.push(collaborator);
                    }
                    index++;
                });
            }

            //vm.curTrial.collaborators_attributes = vm.curTrial.collaborators;
            console.log("vm.curTrial.collaborators_attributes " + JSON.stringify(vm.curTrial.collaborators));
            //console.log("outertrial IN SAVE! " + JSON.stringify(outerTrial));


            TrialService.upsertTrial(outerTrial).then(function(response) {
                //toastr.success('Trial ' + vm.curTrial.lead_protocol_id + ' has been recorded', 'Operation Successful!');
                vm.curTrial.lock_version = response.lock_version || '';
                //toastr.success('Trial ' + vm.curTrial.lead_protocol_id + ' has been recorded', 'Operation Successful!');
                PATrialService.setCurrentTrial(vm.curTrial); // update to cache
                $scope.$emit('updatedInChildScope', {});
                vm.addedCollaborators = [];
                toastr.clear();
                toastr.success('Trial ' + vm.curTrial.lead_protocol_id + ' has been recorded', 'Operation Successful!', {
                    extendedTimeOut: 1000,
                    timeOut: 0
                });
            }).catch(function(err) {
                console.log("error in updating trial " + JSON.stringify(outerTrial));
            });

        } // updateTrial

        vm.reload = function() {
            $state.go($state.$current, null, { reload: true });
        };

        // Delete the associations
        vm.toggleSelection = function (index) {
            if (index < vm.addedCollaborators.length) {
                vm.addedCollaborators[index]._destroy = !vm.addedCollaborators[index]._destroy;
                if (vm.addedCollaborators[index]._destroy) {
                    vm.collaboratorsNum--;
                } else {
                    vm.collaboratorsNum++;
                }
            }
        }


        // Add Collaborator to a temp array
        $scope.$watch(function() {
            //console.log("1curTrial =" + JSON.stringify(vm.curTrial));
            return vm.selectedCollaborators.length;
        }, function(newValue, oldValue) {
            if (newValue == oldValue + 1) {
                var newCollaborator = {};
                newCollaborator.organization_id = vm.selectedCollaborators[vm.selectedCollaborators.length - 1].id;
                newCollaborator.org_name = vm.selectedCollaborators[vm.selectedCollaborators.length - 1].name;
                newCollaborator._destroy = false;
                vm.addedCollaborators.push(newCollaborator);
                vm.collaboratorsNum++;
            }
        });

        activate();

        /****************** implementations below ***************/
        function activate() {
            //appendCollaborators();
            getTrialDetailCopy();
            watchTrialDetailObj();
        }

        /**
         * Get trial detail object from parent scope
         */
        function watchTrialDetailObj() {
            $scope.$on(MESSAGES.TRIAL_DETAIL_SAVED, function() {
                getTrialDetailCopy();
            });
        } //watchTrialDetailObj

        function getTrialDetailCopy() {
            $timeout(function() {
                vm.curTrial = PATrialService.getCurrentTrialFromCache();
                console.log("vm.curTrial =" + JSON.stringify(vm.curTrial ));
            }, 1);
        } //getTrialDetailCopy

        /**
         * Toggle the identifier for destroy or restore for the
         * specified identifier with index 'idx'
         * @param  {Int} idx [Index for the other identifier in other_ids array]
         * @return {Void}
         */
        function deleteCollaborator(idx) {
            console.log("idx="+idx);
            console.log("curTrial.collaborators[idx]="+vm.curTrial.collaborators[idx]);
            if (idx < vm.curTrial.collaborators.length) {
                vm.curTrial.collaborators[idx]._destroy = !vm.curTrial.collaborators[idx]._destroy;
            }
        }


        function appendCollaborators() {
            for (var i = 0; i < vm.curTrial.collaborators.length; i++) {
                var viewCollaborator = {};
                viewCollaborator.id = vm.curTrial.collaborators[i].id;
                viewCollaborator.organization_id = vm.curTrial.collaborators[i].organization_id;
                viewCollaborator.org_name = vm.curTrial.collaborators[i].org_name;
                viewCollaborator._destroy = false;
                vm.addedCollaborators.push(viewCollaborator);
                vm.collaboratorsNum++;
            }
        }

        function deleteListHandler(cList){

            console.log("In deleteListHandler");
            var deleteList = [];
            angular.forEach(cList, function(item) {
                if ( angular.isDefined(item.selected) && item.selected === true ) {
                    deleteList.push(item);
                }
            });
            vm.selectedDeleteCollaboratorsList = deleteList ;
            console.log(deleteList);

        };

        function deleteSelected(){
            console.log("In deleteSelected");
            console.log(vm.selectedDeleteCollaboratorsList);
            vm.curTrial.collaborators_attributes=[];
            console.log(vm.selectedDeleteCollaboratorsList);
            for (var i = 0; i < vm.selectedDeleteCollaboratorsList.length; i++) {
                var collaboratorToBeDeletedFromDb = {};
                collaboratorToBeDeletedFromDb.id =  vm.selectedDeleteCollaboratorsList[i].id;
                collaboratorToBeDeletedFromDb.organization_id = vm.selectedDeleteCollaboratorsList[i].organization_id;
                collaboratorToBeDeletedFromDb.org_name = vm.selectedDeleteCollaboratorsList[i].org_name;
                collaboratorToBeDeletedFromDb._destroy = true;
                vm.curTrial.collaborators_attributes.push(collaboratorToBeDeletedFromDb);
            }
            for (var i = 0; i < vm.selectedDeleteCollaboratorsList.length; i++) {
                console.log("IN LOOP" + JSON.stringify(vm.curTrial.collaborators));
                for (var j = 0; j < vm.curTrial.collaborators.length; j++) {
                    console.log("INNER LOOP" + JSON.stringify(vm.curTrial.collaborators[j].organization_id));
                    console.log("INNER LOOP" + JSON.stringify(vm.selectedDeleteCollaboratorsList[i].organization_id));
                    if (vm.curTrial.collaborators[j].organization_id == vm.selectedDeleteCollaboratorsList[i].organization_id){
                        var collaboratorToBeDeletedFromView = vm.curTrial.collaborators[j];
                        console.log("coll to be delview ="+ JSON.stringify(collaboratorToBeDeletedFromView));
                        vm.curTrial.collaborators.splice(j, 1);
                    }
                }
            }
                var outerTrial = {};
            outerTrial.new = vm.curTrial.new;
            outerTrial.id = vm.curTrial.id;
            outerTrial.trial = vm.curTrial;
            console.log("vm.curTrial.collaborators_attributes " + JSON.stringify(vm.curTrial.collaborators_attributes));
            TrialService.upsertTrial(outerTrial).then(function(response) {
                //toastr.success('Trial ' + vm.curTrial.lead_protocol_id + ' has been recorded', 'Operation Successful!');
                vm.curTrial.lock_version = response.lock_version || '';
                //toastr.success('Trial ' + vm.curTrial.lead_protocol_id + ' has been recorded', 'Operation Successful!');
                PATrialService.setCurrentTrial(vm.curTrial); // update to cache
                $scope.$emit('updatedInChildScope', {});
                toastr.clear();
                toastr.success('Trial ' + vm.curTrial.lead_protocol_id + ' has been recorded', 'Operation Successful!', {
                    extendedTimeOut: 1000,
                    timeOut: 0
                });
            }).catch(function(err) {
                console.log("error in updating trial " + JSON.stringify(outerTrial));
            });

        };

        function updateTrial(outerTrial){

        }

        function setAddMode() {
            console.log("In addParticipatingSite");
            vm.addMode = true;
        }


    } //trialCollaboratorsCtrl

})();
