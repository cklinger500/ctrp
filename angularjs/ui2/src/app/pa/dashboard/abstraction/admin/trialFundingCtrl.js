
/**
 * Created by schintal, January 07, 2016
 */

(function() {
    'use strict';
    angular.module('ctrp.app.pa.dashboard')
    .controller('trialFundingCtrl', trialFundingCtrl);

    trialFundingCtrl.$inject = ['TrialService', 'PATrialService', '$scope', '$timeout','$state', 'toastr', 'MESSAGES', 'trialDetailObj', 'instituteCodeObj', 'fundingMechanismObj', 'nciObj'];//, 'studySourceObj', 'nciDivObj', 'nciProgObj'];

    function trialFundingCtrl(TrialService, PATrialService, $scope, $timeout, $state, toastr, MESSAGES, trialDetailObj, instituteCodeObj, fundingMechanismObj, nciObj){// studySourceObj, nciDivObj, nciProgObj) {
        var vm = this;
        vm.curTrial = trialDetailObj;
        vm.grantorArr = [];
        vm.fundingMechanismArr = fundingMechanismObj;
        vm.nihNciArr = [];
        vm.nciArr = nciObj;
        vm.instituteCodeArr = instituteCodeObj;
        vm.addedGrants = [];
        vm.addedIndIdes = [];
        vm.showAddGrantError = false;
        vm.serial_number = null;
        vm.grantNum = 0;
        vm.grantsInputs = {grantResults: [], disabled: true};
        vm.disableBtn = false;

        vm.reset = function() {
            getTrialDetailCopy();

            /* Reset form fields */
            vm.serial_number = null;
            vm.institute_code = null;
            vm.funding_mechanism = null;
            vm.nci = null;

            vm.showAddGrantError = false;
            vm.addedGrants = [];
            appendGrants();
            $scope.trial_form.$setPristine();
        };

        vm.updateTrial = function(updateType) {
            // Prevent multiple submissions
            vm.disableBtn = true;

            if (vm.grant_question === 'Yes' && vm.grantNum <= 0){
                console.log("vm.grantNum = 0");
                return;
            }
            if (vm.addedGrants.length > 0) {
                vm.curTrial.grants_attributes = [];
                _.each(vm.addedGrants, function (grant) {
                    vm.curTrial.grants_attributes.push(grant);
                });
            }
            //console.log("vm.curTrial.grants_attributes" + JSON.stringify(vm.curTrial.grants_attributes));
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
                    vm.curTrial.grants = response["grants"];
                    console.log("vm.grants="+JSON.stringify(vm.curTrial.grants));
                    vm.addedGrants = [];
                    vm.grantNum = 0;
                    appendGrants();
                    PATrialService.setCurrentTrial(vm.curTrial); // update to cache
                    $scope.$emit('updatedInChildScope', {});

                    toastr.clear();
                    toastr.success('Trial ' + vm.curTrial.lead_protocol_id + ' has been recorded', 'Operation Successful!');

                    // To make sure setPristine() is executed after all $watch functions are complete
                    $timeout(function() {
                       $scope.trial_form.$setPristine();
                   }, 1);
                }
            }).catch(function(err) {
                console.log("error in updating trial " + JSON.stringify(outerTrial));
            }).finally(function() {
                vm.disableBtn = false;
            });

        }

        $scope.refreshGrants = function(serial_number) {

            if (vm.funding_mechanism && vm.institute_code && serial_number.length > 1) {
                var queryObj = {
                    "funding_mechanism": vm.funding_mechanism,
                    "institute_code": vm.institute_code,
                    "serial_number": serial_number
                };
                return TrialService.getGrantsSerialNumber(queryObj).then(function(res) {
                    var status = res.server_response.status;
                    var transformedGrantsObjs = [];
                    var unique = [];

                    if (status >= 200 && status <= 210) {
                        vm.grantsInputs.grantResults = res.tempgrants;
                    }
                    /*
                     transformedGrantsObjs = res.tempgrants.map(function (tempgrant) {
                     return tempgrant; //.serial_number;
                     });
                     unique = transformedGrantsObjs.filter(function (g) {
                     return _.findIndex(unique, {serial_number: g.serial_number}) === -1;
                     });

                     console.log('unique: ', unique);

                     vm.grantsInputs.grantResults = transformedGrantsObjs; // unique; //['13467']; // uniquesnums;
                     console.log(vm.grantsInputs.grantResults);
                     */
                });

            }
        }

        // Add grant to a temp array
        vm.addGrant = function () {
            if (vm.funding_mechanism && vm.institute_code && vm.serial_number && vm.nci) {
                var newGrant = {};
                newGrant.funding_mechanism = vm.funding_mechanism;
                newGrant.institute_code = vm.institute_code;
                //console.log("vm.serial_number" + JSON.stringify(vm.serial_number));
                newGrant.serial_number = vm.serial_number.serial_number;
                newGrant.nci = vm.nci;
                newGrant._destroy = false;
                vm.addedGrants.push(newGrant);
                vm.grantNum++;
                vm.funding_mechanism = null;
                vm.institute_code = null;
                vm.serial_number = null;
                vm.nci = null;
                vm.showAddGrantError = false;
                vm.grantsInputs.grantResults= [];
            } else {
                vm.showAddGrantError = true;
            }
        };



        // Delete the associations
        vm.toggleSelection = function (index, type) {
            if (type == 'grant') {
                if (index < vm.addedGrants.length) {
                    vm.addedGrants[index]._destroy = !vm.addedGrants[index]._destroy;
                    if (vm.addedGrants[index]._destroy) {
                        vm.grantNum--;
                    } else {
                        vm.grantNum++;
                    }
                }
            }
        };// toggleSelection


        vm.watchOption = function(type) {
        };

        activate();

        /****************** implementations below ***************/
        function activate() {
            appendGrants();
            getTrialDetailCopy();
            watchTrialDetailObj();
            watchFundingMechanismFields();
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
                //console.log("vm.curTrial =" + JSON.stringify(vm.curTrial ));
            }, 1);
        } //getTrialDetailCopy



        function appendGrants() {
            for (var i = 0; i < vm.curTrial.grants.length; i++) {
                var grant = {};
                grant.id = vm.curTrial.grants[i].id;
                grant.funding_mechanism = vm.curTrial.grants[i].funding_mechanism;
                grant.institute_code = vm.curTrial.grants[i].institute_code;
                grant.serial_number = vm.curTrial.grants[i].serial_number;
                grant.nci = vm.curTrial.grants[i].nci;
                grant._destroy = false;
                vm.addedGrants.push(grant);
                vm.grantNum++;
            }
        }

        /* Clears Add Funding Mechanism UI if question value === 'No' */
        function watchFundingMechanismFields() {
            $scope.$watch(function() {return vm.curTrial.grant_question;}, function(newVal, oldVal) {
                if (newVal === 'No') {
                    resetFundingMechanismFields();
                }
            });
        }

        function resetFundingMechanismFields() {
            vm.serial_number = null;
            vm.institute_code = null;
            vm.funding_mechanism = null;
            vm.nci = null;

            vm.showAddGrantError = false;
        }


    } //trialRegIndCtrl

})();
