/**
 * Created by schintal, Mar 07, 2016
 */

(function() {
    'use strict';
    angular.module('ctrp.app.pa.dashboard')
        .controller('pasAnatomicSitesCtrl', pasAnatomicSitesCtrl);

    pasAnatomicSitesCtrl.$inject = ['$scope', '$state', 'TrialService', 'PATrialService', 'toastr',
        'MESSAGES', '_', '$timeout', 'trialDetailObj','anatomicSitesObj'];

    function pasAnatomicSitesCtrl($scope, $state, TrialService, PATrialService, toastr,
                                     MESSAGES, _, $timeout, trialDetailObj, anatomicSitesObj) {
        var vm = this;

        vm.selectedDeleteAnatomicSiteList = [];
        vm.anatomic_sites_selected = [];
        vm.selected_anatomic_site = {};

        // injected objects
        vm.curTrial = trialDetailObj;
        vm.anatomicSitesArr = anatomicSitesObj;

        // actions
        vm.setAddMode = setAddMode;
        vm.deleteListHandler = deleteListHandler;
        vm.deleteSelected = deleteSelected;
        vm.saveSelection = saveSelection;
        vm.reset = reset();
        vm.disableBtn = false;
        vm.anatomicSitesError = false;

        //console.log('IN pasAnatomicSitesCtrl anatomicView.curTrial.anatomic_sites='+ JSON.stringify(vm.curTrial.anatomic_site_wrappers));

       // console.log("vm.curTrial.anatomic_sites="+ JSON.stringify(vm.curTrial.anatomic_site_wrappers));

        /**
         *  Set Add Mode. This causes the dropdown of Anatomic Sites to appear for selection
         **/
        function setAddMode() {
            //console.log("SETTING TO ADDMODE");
            vm.addMode = true;
        }



        vm.checkAllAS = function () {
            if (vm.selectedAllAS) {
                vm.selectedAllAS = true;
            } else {
                vm.selectedAllAS = false;
            }

            angular.forEach(vm.curTrial.anatomic_site_wrappers, function (item) {
                item.selected = vm.selectedAllAS;
                vm.deleteListHandler(vm.curTrial.anatomic_site_wrappers);
            });

        };

        vm.saveTrial = function(params){
            vm.disableBtn = true;

            var successMsg = '';

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
                    PATrialService.setCurrentTrial(vm.curTrial); // update to cache

                    if (params && params.del) {
                        successMsg = 'Record(s) deleted.';
                    } else {
                        successMsg = 'Trial ' + vm.curTrial.lead_protocol_id + ' has been recorded';
                    }
                    toastr.clear();
                    toastr.success(successMsg, 'Operation Successful!');
                }
            }).catch(function(err) {
                console.log("error in updating trial " + JSON.stringify(outerTrial));
            }).finally(function() {
                vm.disableBtn = false;
            });

        }//saveTrial

        vm.reset = function() {
            vm.anatomic_sites_selected = [];
            $scope.anatomic_sites_form.$setPristine();
        };

        function deleteListHandler(anatomicSitesSelectedInCheckboxes){
            var deleteList = [];
            angular.forEach(anatomicSitesSelectedInCheckboxes, function(item) {
                if ( angular.isDefined(item.selected) && item.selected === true ) {
                    deleteList.push(item);
                }
            });
            vm.selectedDeleteAnatomicSiteList = deleteList ;
        };

        function deleteSelected() {
            if (vm.selectedDeleteAnatomicSiteList.length === 0) {
                // do nothing when nothing is selected for deletion
                return
            }
            vm.curTrial.anatomic_site_wrappers_attributes = [];
            for (var i = 0; i < vm.selectedDeleteAnatomicSiteList.length; i++) {
                var anatomicSiteToBeDeletedFromDb = {};
                anatomicSiteToBeDeletedFromDb.id = vm.selectedDeleteAnatomicSiteList[i].id;
                anatomicSiteToBeDeletedFromDb._destroy = true;
                vm.curTrial.anatomic_site_wrappers_attributes.push(anatomicSiteToBeDeletedFromDb);
            }
            vm.saveTrial({"del": anatomicSiteToBeDeletedFromDb});
        }

        function saveSelection() {
            if (!vm.anatomic_sites_selected.length) {
                vm.anatomicSitesError = true;
                return;
            } else if (vm.anatomic_sites_selected.length > 0) {
                vm.anatomicSitesError = false;
                vm.curTrial.anatomic_site_wrappers_attributes = [];
                _.each(vm.anatomic_sites_selected, function (selected_anatomic_site) {
                    var exists = false
                    for (var i = 0; i < vm.curTrial.anatomic_site_wrappers.length; i++) {
                        if (vm.curTrial.anatomic_site_wrappers[i].anatomic_site_id == selected_anatomic_site.id){
                            exists = true;
                        }
                    }
                    console.log("update Trial exists ="+exists);
                    if (!exists){
                        var anatomicSiteToBeAddedToDb = {};
                        anatomicSiteToBeAddedToDb.new = true;
                        anatomicSiteToBeAddedToDb.anatomic_site_id = selected_anatomic_site.id;
                        anatomicSiteToBeAddedToDb.trial_id = vm.curTrial.id;
                        anatomicSiteToBeAddedToDb._destroy = false;
                        vm.curTrial.anatomic_site_wrappers_attributes.push(anatomicSiteToBeAddedToDb);
                    }
                });
                vm.selectedAllAS = false;
            }
            //console.log(" vm.curTrial.anatomic_site_wrappers_attributes="+ JSON.stringify(vm.curTrial.anatomic_site_wrappers_attributes));
            vm.anatomic_sites_selected = [];
            vm.saveTrial();
            vm.addMode = false;
        }
        function reset() {
            //console.log("IN RESET");
            $scope.anatomic_sites_selected = [];
            vm.selectedAllAS = false;
        }

    } //pasAnatomicSitesCtrl

})();
