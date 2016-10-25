(function() {
    'use strict';
    angular.module('ctrp.app.pa.dashboard')
        .controller('pasTrialSubGroupsCtrl', pasTrialSubGroupsCtrl);

    pasTrialSubGroupsCtrl.$inject = ['$scope', 'TrialService','UserService', 'PATrialService','OutcomeMeasureService', '$state', 'toastr',
        'MESSAGES', '_', '$timeout','uiGridConstants','trialDetailObj','assayTypes', '$location', '$anchorScroll'];

    function pasTrialSubGroupsCtrl($scope, TrialService,UserService, PATrialService,OutcomeMeasureService, $state, toastr,
                                         MESSAGES, _, $timeout, uiGridConstants,trialDetailObj,assayTypes, $location, $anchorScroll) {
        var vm = this;
        vm.curTrial = trialDetailObj;
        vm.currentSubGroup= {};
        vm.setAddMode = setAddMode;
        vm.setEditMode = setEditMode;
        vm.deleteListHandler = deleteListHandler;
        vm.deleteSelected = deleteSelected;
        vm.resetSubGroup = resetSubGroup;
        vm.reload = reload;
        vm.isCurationEnabled = UserService.isCurationModeEnabled() || false;

        vm.trialDetailObj = {};
        vm.sortableListener = {
            cancel: '.locked'
        };
        vm.sortableListener.stop = dragItemCallback;
        vm.disableBtn = false;

        activate();
        function activate() {
            //submit();
            getTrialDetailCopy();
            console.log(JSON.stringify(assayTypes))
        }

        $scope.$on(MESSAGES.CURATION_MODE_CHANGED, function() {
               vm.isCurationEnabled = UserService.isCurationModeEnabled();
        });

        $scope.deleteRow = function(row) {
            OutcomeMeasureService.getGridOptions().data.splice(row.entity.id, 1);
        };


        vm.checkAllSG = function () {
            if (vm.selectedAllSG) {
                vm.selectedAllSG = true;
            } else {
                vm.selectedAllSG = false;
            }

            angular.forEach(vm.curTrial.sub_groups, function (item) {
                item.selected = vm.selectedAllSG;
                vm.deleteListHandler(vm.curTrial.sub_groups);
            });

        };

        vm.saveSubGroup = function(){
            // Prevent multiple submissions
            vm.disableBtn = true;
            if (!vm.currentSubGroup.id) {
                vm.currentSubGroup.new = true;
            }
            vm.currentSubGroup.trial_id = trialDetailObj.id;
            vm.curTrial.sub_groups_attributes=[];
            vm.curTrial.sub_groups_attributes.push(vm.currentSubGroup);

            // An outer param wrapper is needed for nested attributes to work
            var outerTrial = {};
            outerTrial.new = vm.curTrial.new;
            outerTrial.id = vm.curTrial.id;
            outerTrial.trial = vm.curTrial;
            // get the most updated lock_version
            outerTrial.trial.lock_version = PATrialService.getCurrentTrialFromCache().lock_version;

            vm.selectedDeleteSubGroupsList = [];
            TrialService.upsertTrial(outerTrial).then(function(response) {
                var status = response.server_response.status;

                if (status >= 200 && status <= 210) {
                    vm.curTrial.lock_version = response.lock_version || '';
                    vm.curTrial.sub_groups = response['sub_groups'];
                    PATrialService.setCurrentTrial(vm.curTrial);
                    $scope.$emit('updatedInChildScope', {});

                    toastr.clear();
                    toastr.success('Trial ' + vm.curTrial.lead_protocol_id + ' has been recorded', 'Operation Successful!');

                    $scope.sg_form.$setPristine();

                    vm.addEditMode=false;
                    vm.selectedAllSG = false;
                }
            }).catch(function(err) {
                console.log("error in creating or updating sub group " + JSON.stringify(outerTrial));
            }).finally(function() {
                vm.disableBtn = false;
            });
        };//saveSubGroup

        function reload() {
            $state.go($state.$current, null, { reload: true });
        };

        function deleteListHandler(subGroupsSelectedInCheckboxes){
            var deleteList = [];
            angular.forEach(subGroupsSelectedInCheckboxes, function(item) {
                if ( angular.isDefined(item.selected) && item.selected === true ) {
                    deleteList.push(item);
                }
            });
            vm.selectedDeleteSubGroupsList = deleteList ;

        };

        function deleteSelected(){
            vm.disableBtn = true;

            vm.curTrial.sub_groups_attributes=[];

            for (var i = 0; i < vm.selectedDeleteSubGroupsList.length; i++) {
                var obj={};
                obj.id = vm.selectedDeleteSubGroupsList[i].id;
                obj._destroy=true;
                vm.curTrial.sub_groups_attributes.push(obj);
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
                    vm.curTrial.sub_groups = response["sub_groups"];
                    PATrialService.setCurrentTrial(vm.curTrial);
                    $scope.$emit('updatedInChildScope', {});

                    toastr.clear();
                    toastr.success('Record(s) deleted.', 'Operation Successful!');
                }
            }).catch(function(err) {
                console.log("error in creating or updating Trial sub group " + JSON.stringify(outerTrial));
            }).finally(function() {
                vm.disableBtn = false;
            });
            vm.selectedAllSG = false;
        };


        /**
         *  Set Add Mode.
         **/
        function setAddMode(addEditModeValue) {
            if (!(typeof addEditModeValue === 'undefined' || addEditModeValue === null)) {
                vm.addEditMode = addEditModeValue;
                $location.hash('section_top');
                $anchorScroll();
            } else {
                vm.addEditMode = true;
            }

            vm.currentSubGroup= {};
            $scope.sg_form.$setPristine();
        }

        /**
         *  Set Edit Mode.
         **/
        function setEditMode(idx) {
            vm.addEditMode = true;
            vm.currentSubGroup = angular.copy(vm.curTrial.sub_groups[idx]);
        }


        function resetSubGroup() {
            vm.selectedAllSG = false;
            if(vm.currentSubGroup.id > 0){
                var cachedTrial = PATrialService.getCurrentTrialFromCache();
              for (var i = 0; i < cachedTrial.sub_groups.length; i++) {
                    if(cachedTrial.sub_groups[i].id == vm.currentSubGroup.id){
                        vm.currentSubGroup = cachedTrial.sub_groups[i];
                    }
                }


            } else {
                vm.setAddMode();
            }

            $timeout(function() {
                getTrialDetailCopy();
            }, 0);

            $scope.sg_form.$setPristine();
        }

        function getTrialDetailCopy() {
            $timeout(function() {
                vm.curTrial = PATrialService.getCurrentTrialFromCache();
                //console.log("vm.curTrial =" + JSON.stringify(vm.curTrial ));
            }, 1);
        } //getTrialDetailCopy

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
            vm.curTrial.sub_groups_attributes=[];
            vm.disableBtn = true;

            for (var i = 0; i < vm.curTrial.sub_groups.length; i++) {
                if(vm.curTrial.sub_groups[i].index !=i) {
                    var obj = {};
                    obj.id = vm.curTrial.sub_groups[i].id;
                    obj.index = i;
                    vm.curTrial.sub_groups_attributes.push(obj);
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
                    vm.curTrial.sub_groups = response["sub_groups"];
                    PATrialService.setCurrentTrial(vm.curTrial);
                    $scope.$emit('updatedInChildScope', {});
                }
            }).catch(function(err) {
                console.log("error in re-ordering trial sub groups " + JSON.stringify(outerTrial));
            }).finally(function() {
                vm.disableBtn = false;
            });
        }
    }

})();
