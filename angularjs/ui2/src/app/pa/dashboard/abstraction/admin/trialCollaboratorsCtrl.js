
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
        vm.deleteListHandler = deleteListHandler;
        vm.deleteSelected = deleteSelected;
        vm.setAddMode = setAddMode;
        vm.curTrial = trialDetailObj;
        vm.curTrial.collaborators_attributes = [];
        vm.addedCollaborators = [];
        vm.selectedCollaborators = [];
        vm.selectedDeleteCollaboratorsList = [];
        vm.collaboratorsNum = 0;
        vm.addMode=false;
        vm.disableOrderBy =true;
        vm.disableBtn = false;

        /*
         * This function is invoked when the organizations are added and saved
         */
        vm.updateTrial = function() {
            // Prevent multiple submissions
            if (vm.addedCollaborators.length == 0){
                return;
            }
            if (vm.addedCollaborators.length > 0) {
                vm.curTrial.collaborators_attributes = [];
                _.each(vm.addedCollaborators, function (collaborator) {
                    var exists = false
                    for (var i = 0; i < vm.curTrial.collaborators.length; i++) {
                        if (vm.curTrial.collaborators[i].id) {
                            if (vm.curTrial.collaborators[i].organization_id == collaborator.organization_id) {
                                exists = true;
                            }
                        }
                    }

                    if (!exists){
                        vm.curTrial.collaborators_attributes.push(collaborator);
                    }
                });
            }

            vm.saveTrial();
            vm.addedCollaborators = [];
        } // updateTrial

        vm.checkAllCos = function () {
            if (vm.selectedAllSites) {
                vm.selectedAllSites = true;
            } else {
                vm.selectedAllSites = false;
            }

            angular.forEach(vm.curTrial.collaborators, function (item) {
                item.selected = vm.selectedAllCos;
                vm.deleteListHandler(vm.curTrial.collaborators);
            });

        };

        vm.saveTrial = function(params){
            vm.disableBtn = true;
            var successMsg = '';
            vm.disableOrderBy = false;

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
                    vm.curTrial.collaborators = response["collaborators"];
                    PATrialService.setCurrentTrial(vm.curTrial); // update to cache
                    if (params && params.del) {
                        successMsg = 'Record(s) deleted.';
                    } else {
                        successMsg = 'Trial ' + vm.curTrial.lead_protocol_id + ' has been recorded';
                    }
                    toastr.clear();
                    toastr.success(successMsg, 'Operation Successful!');
                    vm.addMode = false;
                    vm.selectedAllCos = false;
                    vm.selectedDeleteCollaboratorsList.length = 0; // Clear selected items for deletion list after saving trial

                    // To make sure setPristine() is executed after all $watch functions are complete
                    $timeout(function() {
                       $scope.trial_form.$setPristine();
                   }, 1);
                }
            }).catch(function(err) {
                console.log("error in updating trial " + JSON.stringify(outerTrial));
            }).finally(function() {
                vm.disableBtn = false;
                vm.disableOrderBy = true;
            });

        }//saveTrial

        /**
         * The in-line editing of the Organization name for Organizations without PO_ID
         * @param org_name
         * @param idx
         */
        vm.updateCollaborator = function(org_name, idx) {
            if(!org_name){
                vm.curTrial = PATrialService.getCurrentTrialFromCache();
                toastr.error('The collaborator organization name cannot be empty.', '', { timeOut: 0});
                return;
            }
            vm.curTrial.collaborators_attributes=[];
            var collaborator = null;
            for (var i = 0; i < vm.curTrial.collaborators.length; i++) {
                if( vm.curTrial.collaborators[i].id == idx){
                    collaborator =  vm.curTrial.collaborators[i];
                }
            }
            if (collaborator == null) {
                return;
            }
            collaborator.org_name = org_name;
            vm.curTrial.collaborators_attributes.push(collaborator);
            vm.saveTrial();
        } // updateCollaborator


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
            }, 1);
        } //getTrialDetailCopy


        function deleteListHandler(collaboratorsSelectedInCheckboxes){
            var deleteList = [];
            angular.forEach(collaboratorsSelectedInCheckboxes, function(item) {
                if ( angular.isDefined(item.selected) && item.selected === true ) {
                    deleteList.push(item);
                }
            });
            vm.selectedDeleteCollaboratorsList = deleteList ;
        };

        function deleteSelected(){
            if (vm.selectedDeleteCollaboratorsList.length === 0) {
                // do nothing when nothing is selected for deletion
                return;
            }
            vm.curTrial.collaborators_attributes=[];
            for (var i = 0; i < vm.selectedDeleteCollaboratorsList.length; i++) {
                var collaboratorToBeDeletedFromDb = {};
                collaboratorToBeDeletedFromDb.id =  vm.selectedDeleteCollaboratorsList[i].id;
                collaboratorToBeDeletedFromDb.organization_id = vm.selectedDeleteCollaboratorsList[i].organization_id;
                collaboratorToBeDeletedFromDb.org_name = vm.selectedDeleteCollaboratorsList[i].org_name;
                collaboratorToBeDeletedFromDb._destroy = true;
                vm.curTrial.collaborators_attributes.push(collaboratorToBeDeletedFromDb);
            }
            for (var i = 0; i < vm.selectedDeleteCollaboratorsList.length; i++) {
                for (var j = 0; j < vm.curTrial.collaborators.length; j++) {
                    if (vm.curTrial.collaborators[j].organization_id == vm.selectedDeleteCollaboratorsList[i].organization_id){
                        var collaboratorToBeDeletedFromView = vm.curTrial.collaborators[j];
                        vm.curTrial.collaborators.splice(j, 1);
                    }
                }
            }

            vm.saveTrial({"del": collaboratorToBeDeletedFromDb});
        };



        function setAddMode() {
            vm.addMode = true;
        }


    } //trialCollaboratorsCtrl

})();
