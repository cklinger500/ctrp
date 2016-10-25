
/**
 * Created by schintal, Deember 22nd, 2015
 */

(function() {
    'use strict';
    angular.module('ctrp.app.pa.dashboard')
    .controller('trialNciCtrl', trialNciCtrl);

    trialNciCtrl.$inject = ['TrialService', 'PATrialService', '$scope', '$timeout','$state',
        'toastr', 'MESSAGES', 'trialDetailObj', 'studySourceObj', 'nciDivObj', 'nciProgObj',
        'Common'];

    function trialNciCtrl(TrialService, PATrialService, $scope, $timeout, $state,
            toastr, MESSAGES,trialDetailObj, studySourceObj, nciDivObj, nciProgObj,
            Common) {
        var vm = this;
        vm.curTrial = trialDetailObj;
        //console.log("trialDetailObj.send_trial_flag  =" + JSON.stringify(trialDetailObj.send_trial_flag));
        vm.nciDivArr = nciDivObj;

        vm.nciProgArr = nciProgObj;
        vm.studySourceArr = studySourceObj;
        vm.addedFses = [];
        vm.selectedFsArray = [];
        vm.study_source_id = vm.curTrial.study_source_id;
        vm.disableBtn = false;

        vm.isSponsorNci = false;
        if(trialDetailObj["sponsor"] != null) {
            var sponsorName = Common.valueAtPathInObject(trialDetailObj, 'sponsor.name');
            vm.isSponsorNci = sponsorName === "National Cancer Institute" ? true : false;
        }
        vm.isLeadOrgNciCcr = false;
        if (trialDetailObj["lead_org"] != null) {
            var leadOrgName = Common.valueAtPathInObject(trialDetailObj, 'lead_org.name');
            vm.isLeadOrgNciCcr = leadOrgName === "NCI - Center for Cancer Research" ? true : false;
        }
        if (((vm.isSponsorNci==true) && (vm.isLeadOrgNciCcr==true) && (trialDetailObj.send_trial_rules_flag == "Yes"))==true) {
            vm.disable_send_trial = false;
            //console.log("disable set to false");
        } else if (((vm.isSponsorNci==true) && (vm.isLeadOrgNciCcr==true) && (trialDetailObj.send_trial_rules_flag == "No"))==true){
            vm.disable_send_trial = true;
            //console.log("disable set to true");
        } else if (((vm.isSponsorNci==true) && (vm.isLeadOrgNciCcr==false))==true){
            vm.disable_send_trial = true;
        } else {
            vm.disable_send_trial = true;
        }
        vm.fsNum = 0;
        //vm.nih_nci_div = trialDetailObj.nih_nci_div;
        //vm.nih_nci_prog = trialDetailObj.nih_nci_prog;

        vm.updateTrial = function () {
           //Required values
           if ((vm.fsNum == 0) || (!vm.study_source_id)) {
                return;
            }

            // Prevent multiple submissions
            vm.disableBtn = true;

            if (vm.addedFses.length > 0) {
                vm.curTrial.trial_funding_sources_attributes = [];
                _.each(vm.addedFses, function (fs) {
                    var exists = false
                    for (var i = 0; i < vm.curTrial.trial_funding_sources.length; i++) {
                        if (vm.curTrial.trial_funding_sources[i].id) {
                            if (vm.curTrial.trial_funding_sources[i].organization_id == fs.organization_id) {
                                exists = true;
                            }
                        }
                    }
                    if (!exists) {
                        fs.new = true;
                    }
                    if(fs.new || fs.edit || fs._destroy) {
                        vm.curTrial.trial_funding_sources_attributes.push(fs);
                    }
                });
            }

            console.log(" vm.curTrial.trial_funding_sources_attributes.push(fs); = "+ JSON.stringify( vm.curTrial.trial_funding_sources_attributes));

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
                    //toastr.success('Trial ' + vm.curTrial.lead_protocol_id + ' has been recorded', 'Operation Successful!');
                    vm.curTrial.trial_funding_sources = response["trial_funding_sources"];
                    vm.curTrial.funding_sources = response["funding_sources"];
                    vm.curTrial.nih_nci_div =  response["nih_nci_div"];
                    vm.curTrial.nih_nci_prog =  response["nih_nci_prog"];
                    PATrialService.setCurrentTrial(vm.curTrial); // update to cache
                    vm.addedFses = [];
                    vm.fsNum = 0;
                    appendFses();
                    $scope.$emit('updatedInChildScope', {});
                    toastr.clear();
                    toastr.success('Trial ' + vm.curTrial.lead_protocol_id + ' has been recorded', 'Operation Successful!', 'Successful!');

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


        } //updateTrial

        vm.reset = function() {
            getTrialDetailCopy();
            vm.addedFses = [];
            appendFses();
            $scope.trial_form.$setPristine();
        };


        // Delete the associations
        vm.toggleSelection = function (index, type) {
            if (type == 'funding_source') {
                if (index < vm.addedFses.length) {
                    vm.addedFses[index]._destroy = !vm.addedFses[index]._destroy;
                    if (vm.addedFses[index]._destroy) {
                        vm.fsNum--;
                    } else {
                        vm.fsNum++;
                    }
                }
            }
        }

        // Add Founding Source to a temp array
        $scope.$watch(function() {
            //console.log("1curTrial =" + JSON.stringify(vm.curTrial));
            return vm.selectedFsArray.length;
        }, function(newValue, oldValue) {
            if (newValue == oldValue + 1) {
                var newFs = {};
                newFs.organization_id = vm.selectedFsArray[vm.selectedFsArray.length - 1].id;
                newFs.organization_name = vm.selectedFsArray[vm.selectedFsArray.length - 1].name;
                newFs._destroy = false;
                vm.addedFses.push(newFs);
                vm.fsNum++;

                $scope.trial_form.$setDirty();
            }
        });

        $scope.$watch(function() {
            return vm.curTrial.study_source_id;
        }, function(newValue, oldValue) {
            if (!newValue) {
                vm.study_source_id = null;
            } else {
                vm.study_source_id = newValue;
            }
        });

        activate();

        /****************** implementations below ***************/
        function activate() {
            appendFses();
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
                //console.log("vm.curTrial =" + JSON.stringify(vm.curTrial ));
            }, 1);
        } //getTrialDetailCopy


        function appendFses() {
            for (var i = 0; i < vm.curTrial.trial_funding_sources.length; i++) {
                var tfs = {};
                tfs.id = vm.curTrial.trial_funding_sources[i].id;
                tfs.organization_id = vm.curTrial.trial_funding_sources[i].organization_id;
                _.each(vm.curTrial.funding_sources, function (fs) {
                    if (tfs.organization_id == fs.id) {
                        tfs.organization_name = fs.name;
                    }
                });
                tfs._destroy = false;
                vm.addedFses.push(tfs);
                vm.fsNum++;
            }
        }

    } //trialNciCtrl

})();
