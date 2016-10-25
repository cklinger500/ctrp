(function() {
    'use strict';
    angular.module('ctrp.app.pa.dashboard')
        .controller('pasTrialOutcomeMeasuresCtrl', pasTrialOutcomeMeasuresCtrl);

    pasTrialOutcomeMeasuresCtrl.$inject = ['$scope', '$filter', 'TrialService','UserService', 'PATrialService','OutcomeMeasureService','outcomeTypesObj', '$state', 'toastr',
        'MESSAGES', '_', '$timeout','uiGridConstants','trialDetailObj', '$location','$anchorScroll'];

    function pasTrialOutcomeMeasuresCtrl($scope, $filter, TrialService,UserService, PATrialService,OutcomeMeasureService,outcomeTypesObj, $state, toastr,
                                         MESSAGES, _, $timeout, uiGridConstants,trialDetailObj, $location, $anchorScroll) {
        var vm = this;
        vm.curTrial = trialDetailObj;
        vm.currentOutcomeMeasure= {};

        vm.setAddMode = setAddMode;
        vm.setEditMode = setEditMode;
        vm.setCopyMode = setCopyMode;
        vm.deleteListHandler = deleteListHandler;
        vm.deleteSelected = deleteSelected;
        vm.resetOutcomeMeasure = resetOutcomeMeasure;

        //ui-grid plugin options
        vm.gridOptions = OutcomeMeasureService.getGridOptions();
        vm.gridOptions.enableVerticalScrollbar = uiGridConstants.scrollbars.NEVER;
        vm.gridOptions.enableHorizontalScrollbar = uiGridConstants.scrollbars.NEVER;

        vm.trialDetailObj = {};
        vm.om_types = outcomeTypesObj;
        vm.safety_issues=['Yes','No']

        vm.isCurationEnabled = UserService.isCurationModeEnabled() || false;
        vm.sortableListener = {
            cancel: '.locked'
        };
        vm.sortableListener.stop = dragItemCallback;
        vm.disableBtn = false;

        $scope.$on(MESSAGES.CURATION_MODE_CHANGED, function() {
            vm.isCurationEnabled = UserService.isCurationModeEnabled();
        });

        $scope.$on("$destroy", function() {
            for (var i = 0; i < vm.curTrial.outcome_measures.length; i++) {
                if(vm.curTrial.outcome_measures[i].index !=i) {
                    vm.curTrial.outcome_measures[i].index=i;
                    var currentOM= vm.curTrial.outcome_measures[i];
                    vm.disableBtn = true;

                     TrialService.upsertOutcomeMeasure(currentOM).then(function (response) {
                         var status = response.server_response.status;

                         if (status >= 200 && status <= 210) {
                             PATrialService.setCurrentTrial(vm.curTrial); // update to cache
                             vm.selectedAllOM = false;
                         }
                    }).catch(function (err) {
                     console.log("error in re-ordering outcome measures " + JSON.stringify(outerPS));
                 }).finally(function() {
                     vm.disableBtn = false;
                 });
                }
            }
        });

        activate();
        function activate() {
            //submit();
            getTrialDetailCopy();
        }

        $scope.deleteRow = function(row) {
            OutcomeMeasureService.getGridOptions().data.splice(row.entity.id, 1);
        };

        vm.setToDefaultMode = function() {
            vm.addMode = vm.editMode = vm.copyMode = false;
            vm.currentOutcomeMeasure = {};
            vm.copyOM = {};

            $location.hash('section_top');
            $anchorScroll();
        }

        vm.checkAllOM = function () {
            if (vm.selectedAllOM) {
                vm.selectedAllOM = true;
            } else {
                vm.selectedAllOM = false;
            }

            angular.forEach(vm.curTrial.outcome_measures, function (item) {
                item.selected = vm.selectedAllOM;
                vm.deleteListHandler(vm.curTrial.outcome_measures);
            });

        };

        vm.saveOutcomeMeasure = function(){
            vm.disableBtn = true;
            var successMsg = '';

            if (!vm.currentOutcomeMeasure.id || vm.copyMode) {
                vm.currentOutcomeMeasure.new = true;
                vm.currentOutcomeMeasure.id = null;
            }
            // An outer param wrapper is needed for nested attributes to work
            //var outerOM = {};
            //outerOM.new = vm.currentOutcomeMeasure.new;
            //outerOM.id = vm.currentOutcomeMeasure.id;
            //outerOM.outcome_measure = vm.currentOutcomeMeasure;
            vm.currentOutcomeMeasure.trial_id = trialDetailObj.id;

            console.log(vm.currentOutcomeMeasure);

            TrialService.upsertOutcomeMeasure(vm.currentOutcomeMeasure).then(function(response) {
                var status = response.server_response.status;

                if (status >= 200 && status <= 210) {
                    var newOutcomeMeasure = false;
                    if(!vm.currentOutcomeMeasure.id){
                        // New OutcomeMeasure
                        newOutcomeMeasure = true;
                        vm.currentOutcomeMeasure.id = response.id;
                    }
                    if(vm.currentOutcomeMeasure.id) {
                        //setting up "outcome measure type" on the fly to display on grid
                        for (var i = 0; i < vm.om_types.length; i++) {
                            if(vm.om_types[i].id == vm.currentOutcomeMeasure.outcome_measure_type_id){
                                console.log(vm.om_types[i].name)
                                vm.currentOutcomeMeasure.outcome_measure_type=vm.om_types[i].name;
                            }
                        }

                        if(newOutcomeMeasure){
                            vm.currentOutcomeMeasure.new = false;
                            //vm.curTrial.outcome_measure_type=vm.curTrial.outcome_measure_type
                            vm.curTrial.outcome_measures.push(vm.currentOutcomeMeasure);
                            successMsg = 'Record Created.';
                        } else {
                            for (var i = 0; i < vm.curTrial.outcome_measures.length; i++) {
                                if (vm.curTrial.outcome_measures[i].id == vm.currentOutcomeMeasure.id) {
                                    vm.curTrial.outcome_measures[i] = vm.currentOutcomeMeasure;
                                }
                            }
                            successMsg = 'Record Updated.';
                        }
                        toastr.clear();
                        toastr.success(successMsg, 'Operation Successful!');
                        vm.setToDefaultMode();
                        PATrialService.setCurrentTrial(vm.curTrial); // update to cache
                    }

                    $scope.om_form.$setPristine();

                    vm.selectedAllOM = false;
                }
            }).catch(function(err) {
                console.log("error in creating or updating outcome measures trial " + JSON.stringify(outerPS));
            }).finally(function() {
                vm.disableBtn = false;
            });
        };//saveOutcomeMeasure

        vm.reload = function() {
            $state.go($state.$current, null, { reload: true });
        };

        function deleteListHandler(outcomeMeasuresSelectedInCheckboxes){
            var deleteList = [];
            angular.forEach(outcomeMeasuresSelectedInCheckboxes, function(item) {
                if ( angular.isDefined(item.selected) && item.selected === true ) {
                    deleteList.push(item);
                }
            });
            vm.selectedDeleteOutcomeMeasuresList = deleteList ;
            // console.log("In vm.selectedDeleteParticipatingSitesList=" + JSON.stringify(vm.selectedDeleteParticipatingSitesList));

            console.log(deleteList)
        };

        function deleteSelected(){
            vm.setToDefaultMode();
            vm.curTrial.outcome_measures_attributes=[];
            for (var i = 0; i < vm.selectedDeleteOutcomeMeasuresList.length; i++) {
                vm.deleteOutcomeMeasure( vm.selectedDeleteOutcomeMeasuresList[i].id);
            }
            resetOutcomeMeasure();
        };

        vm.deleteOutcomeMeasure = function(psId){
            vm.disableBtn = true;

            TrialService.deleteOutcomeMeasure(psId).then(function(response) {
                var status = response.status;

                if (status >= 200 && status <= 210) {
                    vm.curTrial.lock_version = response.lock_version || '';
                    $scope.$emit('updatedInChildScope', {});
                    for (var j = 0; j < vm.curTrial.outcome_measures.length; j++) {
                        if (vm.curTrial.outcome_measures[j].id == psId){
                            vm.curTrial.outcome_measures.splice(j, 1);
                        }
                    }
                    PATrialService.setCurrentTrial(vm.curTrial); // update to cache
                    toastr.clear();
                    toastr.success('Record(s) deleted.', 'Operation Successful!');
                }
            }).catch(function(err) {
                console.log("error in deleting outcome measure =" + psId);
            }).finally(function() {
                vm.disableBtn = false;
            });
        }//saveTrial



        /**
         *  Set Add Mode.
         **/
        function setAddMode() {
            vm.setToDefaultMode();
            vm.addMode = true;
            vm.currentOutcomeMeasure = {};
            $scope.om_form.$setPristine();
        }

        /**
         *  Set Edit Mode.
         **/
        function setEditMode(idx) {
            vm.editMode || vm.copyMode || vm.addMode ? resetOutcomeMeasure() : vm.addMode = vm.copyMode = false;
            vm.editMode = true;
            vm.currentOutcomeMeasure = angular.copy(vm.curTrial.outcome_measures[idx]);
            saveCopyCurrentOutcomeMeasure(vm.curTrial.outcome_measures[idx]);
        }

        /**
         *  Save copy of currentOutcomeMeasure "TO" vm.copyOM.
         **/
        function saveCopyCurrentOutcomeMeasure(currentOutcomeMeasure) {
            vm.copyOM = {};
            angular.copy(currentOutcomeMeasure, vm.copyOM);
        }

        /**
         *  Set Copy Mode.
         **/
        function setCopyMode(idx) {
            vm.copyMode || vm.addMode || vm.editMode ? resetOutcomeMeasure() : vm.addMode = vm.editMode = false;
            vm.copyMode = true;
            vm.currentOutcomeMeasure = angular.copy(vm.curTrial.outcome_measures[idx]);
            saveCopyCurrentOutcomeMeasure(vm.curTrial.outcome_measures[idx]);
        }

        function resetOutcomeMeasure() {
            vm.addMode || vm.editMode || vm.copyMode ? angular.copy(vm.copyOM, vm.currentOutcomeMeasure) : vm.currentOutcomeMeasure = {};
            $scope.om_form.$setPristine();
        }

        function getTrialDetailCopy() {
            $timeout(function() {
                vm.curTrial = PATrialService.getCurrentTrialFromCache();
            }, 1);
        } //getTrialDetailCopy

        /**
         * Callback for dragging item around
         * @param  {[type]} event [description]
         * @param  {[type]} ui    [description]
         * @return {[type]}       [description]
         */
        function dragItemCallback(event, ui) {
            vm.curTrial.outcome_measures_attributes=[];

            for (var i = 0; i < vm.curTrial.outcome_measures.length; i++) {
                if(vm.curTrial.outcome_measures[i].index !=i) {
                    var obj = {};
                    obj.id = vm.curTrial.outcome_measures[i].id;
                    obj.index = i;
                    vm.curTrial.outcome_measures_attributes.push(obj);
                }
            }

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
                    vm.curTrial.sub_groups = response["outcome_measures"];
                    PATrialService.setCurrentTrial(vm.curTrial);
                    $scope.$emit('updatedInChildScope', {});
                }
            }).catch(function(err) {
                console.log("error in re-ordering trial outcome measures " + JSON.stringify(outerTrial));
            });
        }

    }

})();
