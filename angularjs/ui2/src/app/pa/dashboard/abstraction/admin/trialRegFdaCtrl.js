
/**
 * Created by schintal, Deember 22nd, 2015
 */

(function() {
    'use strict';
    angular.module('ctrp.app.pa.dashboard')
    .controller('trialRegFdaCtrl', trialRegFdaCtrl);

    trialRegFdaCtrl.$inject = ['TrialService', 'PATrialService', '$scope', '$timeout','$state', 'toastr', 'MESSAGES', 'trialDetailObj', 'responsiblePartyObj', 'countryList'];//, 'studySourceObj', 'nciDivObj', 'nciProgObj'];

    function trialRegFdaCtrl(TrialService, PATrialService, $scope, $timeout, $state, toastr, MESSAGES, trialDetailObj, responsiblePartyObj, countryList){// studySourceObj, nciDivObj, nciProgObj) {
        var vm = this;
        vm.curTrial = trialDetailObj;
        vm.responsiblePartyArr = angular.copy(responsiblePartyObj);
        vm.countryArr = countryList;
        vm.showInvestigator = false;
        vm.showInvSearchBtn = true;
        vm.selectedLoArray = [];
        vm.selectedPiArray = [];
        vm.selectedSponsorArray = [];
        vm.selectedInvArray = [];
        vm.selectedIaArray = [];
        vm.selectedFsArray = [];
        vm.addedAuthorities = [];
        vm.indIdeNum = 0;
        vm.toaNum = 0;
        vm.sponsor_id = null;
        vm.showSponsor = false;
        vm.sponsorName = "";
        vm.disableBtn = false;

        vm.initialize = function() {
            for (var i = 0; i < vm.responsiblePartyArr.length; i++) {
                if (vm.responsiblePartyArr[i].code == "SPONSOR") {
                    vm.sponsor_id = vm.responsiblePartyArr[i].id;
                }
            }
            if (vm.curTrial.responsible_party_id == vm.sponsor_id) {
                vm.showSponsor = true;
            }
            if (vm.curTrial.sponsor){
                vm.sponsorName = vm.curTrial.sponsor.name;
            } else {
                vm.sponsorName = "";
            }

            console.log('responsible_party_id is: ', vm.curTrial.responsible_party_id);
        }

        vm.initialize();

        vm.reset = function() {
            vm.curTrial = PATrialService.getCurrentTrialFromCache();
            vm.responsiblePartyArr = angular.copy(responsiblePartyObj);
            vm.initialize();

            vm.authority_org = null;
            vm.authority_country = null;
            vm.addedAuthorities = [];
            appendAuthorities();

            vm.watchOption('responsible_party');

            $scope.trial_form.$setPristine();
        };

        vm.deleteAllAuthorities  = function () {
            if (vm.authoritiesDestroyAll) {
                vm.authoritiesDestroyAll = false;
            } else {
                vm.authoritiesDestroyAll = true;
            }
            angular.forEach(vm.addedAuthorities, function (item) {
                item._destroy = vm.authoritiesDestroyAll;
            });
        };
        vm.updateTrial = function() {
            if ((!vm.curTrial.responsible_party_id) || (!vm.toaNum || vm.toaNum <= 0)) {
                return;
            }

            if (vm.selectedPiArray.length > 0) {
                vm.curTrial.pi_id = vm.selectedPiArray[0].id;
            } else {
                vm.curTrial.pi_id = null;
            }

            if (vm.selectedInvArray.length > 0) {
                vm.curTrial.investigator_id = vm.selectedInvArray[0].id;
            } else {
                vm.curTrial.investigator_id = null;
            }

            if (vm.selectedIaArray.length > 0) {
                vm.curTrial.investigator_aff_id = vm.selectedIaArray[0].id;
            } else {
                vm.curTrial.investigator_aff_id = null;
            }

            if (vm.addedAuthorities.length > 0) {
                vm.curTrial.oversight_authorities_attributes = [];
                _.each(vm.addedAuthorities, function (authority) {
                    vm.curTrial.oversight_authorities_attributes.push(authority);
                });
                vm.selectedAuthority = true;
            } else {
                vm.selectedAuthority = false;
            }

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
                    vm.curTrial = response;
                    vm.addedAuthorities = vm.curTrial.oversight_authorities;

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

        // Delete the associations
        vm.toggleSelection = function (index, type) {
             if (type == 'authority') {
                if (index < vm.addedAuthorities.length) {
                    vm.addedAuthorities[index]._destroy = !vm.addedAuthorities[index]._destroy;
                    if (vm.addedAuthorities[index]._destroy) {
                        vm.toaNum--;
                    } else {
                        vm.toaNum++;
                    }
                }
                 if(vm.toaNum <= 0){
                     vm.selectedAuthority = false;
                 }
            }
            vm.authoritiesDestroyAll = false;
        };// toggleSelection


        // Add Oversight Authority to a temp array
        vm.addAuthority = function () {
            var errorMsg = TrialService.checkAuthority(vm.authority_country, vm.authority_org, vm.addedAuthorities);

            if (!errorMsg) {
                var newAuthority = {};
                newAuthority.country = vm.authority_country;
                newAuthority.organization = vm.authority_org;
                newAuthority._destroy = false;
                vm.addedAuthorities.push(newAuthority);
                vm.toaNum++;
                vm.authority_country = null;
                vm.authority_org = null;
                vm.authorityOrgArr = [];
                vm.addAuthorityError = '';
                vm.showAddAuthorityError = false;
                vm.authoritiesDestroyAll = false;
            } else {
                vm.addAuthorityError = errorMsg;
                vm.showAddAuthorityError = true;
            }
        };

        // If the responsible party is PI, the Investigator field changes with PI field
        $scope.$watch(function() {
            return vm.selectedPiArray;
        }, function(newValue, oldValue) {
            var piOption = vm.responsiblePartyArr.filter(findPiOption);
            if (piOption[0].id == vm.curTrial.responsible_party_id) {
                vm.selectedInvArray = vm.selectedPiArray;
            }
        });

        // If the responsible party is Sponsor Investigator, the Investigator Affiliation field changes with Sponsor field
        $scope.$watch(function() {
            return vm.selectedSponsorArray;
        }, function(newValue, oldValue) {
            var siOption = vm.responsiblePartyArr.filter(findSiOption);
            if (siOption[0].id == vm.curTrial.responsible_party_id) {
                vm.selectedIaArray = vm.selectedSponsorArray;
            }
        });

        $scope.$watch(function() {
            return vm.selectedInvArray;
        }, function(newValue, oldValue) {
            if (!angular.equals(newValue, oldValue)) {
                $scope.trial_form.$setDirty();
            }
        });

        $scope.$watch(function() {
            return vm.selectedIaArray;
        }, function(newValue, oldValue) {
            if (!angular.equals(newValue, oldValue)) {
                $scope.trial_form.$setDirty();
            }
        });

        // Scenario 6: I have selected "No" for FDA Regulated Intervention Indicator
        // And the number of Authorities > 0
        // Then the required Regulatory Information for the trial will be associated
        // And the Section 801 Indicator will be set to "No"
        vm.checkIndicatorValue = function(value) {
            if(value == "No" && (vm.addedAuthorities.length > 0)){
                vm.curTrial.sec801_indicator = "No";
            }
        }

        vm.watchOption = function(type) {
            if (type == 'responsible_party') {
                vm.showSponsor = false;
                var piOption = vm.responsiblePartyArr.filter(findPiOption);
                var siOption = vm.responsiblePartyArr.filter(findSiOption);
                if (piOption[0].id == vm.curTrial.responsible_party_id) {
                    vm.showInvestigator = true;
                    vm.showInvSearchBtn = false;
                    vm.showSponsor = false;
                    vm.curTrial.investigator_title = 'Principal Investigator';
                    // Copy the value from PI and Sponsor
                    vm.selectedInvArray = vm.selectedPiArray;
                    vm.selectedIaArray = vm.selectedLoArray;
                } else if (siOption[0].id == vm.curTrial.responsible_party_id) {
                    vm.showInvestigator = true;
                    vm.showInvSearchBtn = true;
                    vm.showSponsor = false;
                    vm.curTrial.investigator_title = 'Principal Investigator';
                    // Copy the value from PI and Sponsor
                    vm.selectedInvArray = vm.selectedPiArray;
                    vm.selectedIaArray = vm.selectedSponsorArray;
                } else {
                    // else Sponsor
                    if (vm.curTrial.responsible_party_id == vm.sponsor_id){
                        vm.showSponsor = true;
                    }
                    vm.showInvestigator = false;
                    vm.curTrial.investigator_title = '';
                    vm.selectedInvArray = [];
                    vm.selectedIaArray = [];
                }
            }  else if (type == 'authority_country') {
                vm.authority_org = '';
                TrialService.getAuthorityOrgArr(vm.authority_country).then(function (response) {
                    var status = response.server_response.status;

                    if (status >= 200 && status <= 210) {
                        vm.authorityOrgArr  = response.authorities;
                    }
                }).catch(function (err) {
                    console.log("Error in retrieving authorities for country");
                });
            }
        };

        activate();

        /****************** implementations below ***************/
        function activate() {
            appendAuthorities();
            displayPOs();
            rpFieldChange();
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


        // Return true if the option is "Principal Investigator"
        function findPiOption(option) {
            if (option.code == 'PI') {
                return true;
            } else {
                return false;
            }
        }

        // Return true if the option is "Sponsor Investigator"
        function findSiOption(option) {
            if (option.code == 'SI') {
                return true;
            } else {
                return false;
            }
        }

        function appendAuthorities() {
            for (var i = 0; i < vm.curTrial.oversight_authorities.length; i++) {
                var authority = {};
                authority.id = vm.curTrial.oversight_authorities[i].id;
                authority.country = vm.curTrial.oversight_authorities[i].country;
                authority.organization = vm.curTrial.oversight_authorities[i].organization;
                authority._destroy = false;
                vm.addedAuthorities.push(authority);
                vm.toaNum++;
            }
        }

        function rpFieldChange() {
            var piOption = vm.responsiblePartyArr.filter(findPiOption);
            var siOption = vm.responsiblePartyArr.filter(findSiOption);
            if (piOption[0].id == vm.curTrial.responsible_party_id) {
                vm.showInvestigator = true;
                vm.showInvSearchBtn = false;
            } else if (siOption[0].id == vm.curTrial.responsible_party_id) {
                vm.showInvestigator = true;
            }
        }

        function displayPOs() {
            if (vm.curTrial.lead_org_id) {
                $timeout( function(){ vm.selectedLoArray.push(vm.curTrial.lead_org); }, 1500);
            }

            if (vm.curTrial.pi_id) {
                $timeout( function(){ vm.selectedPiArray.push(vm.curTrial.pi); }, 1500);
            }

            if (vm.curTrial.sponsor_id) {
                $timeout( function(){ vm.selectedSponsorArray.push(vm.curTrial.sponsor); }, 1500);
            }

            if (vm.curTrial.investigator_id) {
                $timeout( function(){ vm.selectedInvArray.push(vm.curTrial.investigator); }, 1500);
            }

            if (vm.curTrial.investigator_aff_id) {
                $timeout( function(){ vm.selectedIaArray.push(vm.curTrial.investigator_aff); }, 1500);
            }
        }


    } //trialNciCtrl

})();
