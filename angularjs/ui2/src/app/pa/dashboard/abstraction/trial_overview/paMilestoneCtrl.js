/**
 * Created by wus4 on 4/21/16.
 */

(function() {
    'use strict';
    angular.module('ctrp.app.pa.dashboard')
        .controller('paMilestoneCtrl', paMilestoneCtrl);

    paMilestoneCtrl.$inject = ['$scope', '$state', 'toastr', 'milestoneObj', 'TrialService', 'userDetailObj',
        'DateService', 'PATrialService', '$popover'];

    function paMilestoneCtrl($scope, $state, toastr, milestoneObj, TrialService, userDetailObj,
                             DateService, PATrialService, $popover) {
        var vm = this;
        vm.curTrial = PATrialService.getCurrentTrialFromCache();
        vm.curUser = userDetailObj;
        vm.addMode = false;
        vm.submission_num = vm.curTrial.most_recent_submission_num;
        vm.milestoneArr = milestoneObj;
        vm.showRejectionReason = false;
        vm.validationErrors = [];
        vm.confirmMsg = '';
        vm.showValidationMsg = false;
        var popover = null;

        vm.setAddMode = function (mode) {
            vm.addMode = mode;
            if (!mode) {
                $scope.milestone_form.$setPristine();
                vm.resetMilestone();
            }
        };

        vm.watchOption = function () {
            var rejectionOptions = vm.milestoneArr.filter(findRejectionOptions);
            for (var i = 0; i < rejectionOptions.length; i++) {
                if (rejectionOptions[i].id === vm.milestone_id) {
                    vm.showRejectionReason = true;
                    break;
                } else {
                    vm.showRejectionReason = false;
                    vm.rejection_reason = '';
                }
            }

            var srjOption = vm.milestoneArr.filter(findSrjOption);
            if (srjOption[0].id === vm.milestone_id) {
                if (vm.curTrial.most_recent_submission_type_code === 'ORI') {
                    vm.confirmMsg = 'Adding the Submission Rejection Date will reject this Trial';
                } else if (vm.curTrial.most_recent_submission_type_code === 'AMD') {
                    vm.confirmMsg = 'Adding the Submission Rejection Date will reject this submission and roll back the trial to the prior submission';
                } else {
                    vm.confirmMsg = '';
                }
            } else {
                vm.confirmMsg = '';
            }
        };

        vm.resetMilestone = function () {
            vm.milestone_id = null;
            vm.showRejectionReason = false;
            vm.rejection_reason = null;
            vm.comment = null;
            $scope.milestone_form.$setPristine();
            vm.showValidationMsg = false;
            vm.validationErrors = [];
        };

        vm.saveMilestone = function (evt) {
            if ($scope.milestone_form.$invalid) {
                vm.showValidationMsg = true;
                return;
            }

            TrialService.validateMilestone({"id": vm.curTrial.id, "milestone_id": vm.milestone_id, "submission_id": vm.curTrial.most_recent_submission_id}).then(function(response) {
                var status = response.server_response.status;

                if (status >= 200 && status <= 210) {
                    if (response.validation_msgs.errors.length > 0) {
                        vm.validationErrors = response.validation_msgs.errors;
                        vm.disableBtn = false;
                    } else {
                        if (vm.confirmMsg) {
                            popover = $popover(angular.element(evt.target), {
                                title: 'Please Confirm Rejection',
                                show: true,
                                html: true,
                                trigger: 'manual',
                                placement: 'top', // bottom
                                templateUrl: 'app/pa/dashboard/abstraction/trial_overview/_pa_milestone_popover.tpl.html',
                                animation: 'am-flip-x',
                                content: vm.confirmMsg,
                                autoClose: true,
                                scope: $scope
                            });
                            popover.event = evt;
                        } else {
                            $scope.persistMilestone();
                        }
                    }
                }
            }).catch(function (err) {
                console.log("Error in validating milestone: " + err);
            });
        };

        $scope.persistMilestone = function () {
            // Prevent multiple submissions
            vm.disableBtn = true;

            vm.validationErrors = [];

            vm.curTrial.milestone_wrappers_attributes = [];
            var milestoneWrapperObj = {};
            milestoneWrapperObj.submission_id = vm.curTrial.most_recent_submission_id;
            milestoneWrapperObj.milestone_id = vm.milestone_id;
            milestoneWrapperObj.comment = vm.comment;
            if (vm.showRejectionReason) {
                milestoneWrapperObj.comment = vm.rejection_reason + ': ' + milestoneWrapperObj.comment;
            }
            if (vm.curUser.first_name && vm.curUser.last_name) {
                milestoneWrapperObj.created_by = vm.curUser.last_name + ', ' + vm.curUser.first_name;
            }
            vm.curTrial.milestone_wrappers_attributes.push(milestoneWrapperObj);

            // An outer param wrapper is needed for nested attributes to work
            var outerTrial = {};
            outerTrial.id = vm.curTrial.id;
            outerTrial.trial = vm.curTrial;

            TrialService.upsertTrial(outerTrial).then(function (response) {
                var status = response.server_response.status;

                if (status >= 200 && status <= 210) {
                    vm.curTrial = response;
                    PATrialService.setCurrentTrial(vm.curTrial); // cache the updated trial
                    $scope.$emit('updatedInChildScope', {}); // signal for updates
                    vm.setAddMode(false);
                    toastr.success('Milestone have been recorded', 'Operation Successful!');
                }
            }).catch(function (err) {
                console.log("Error in saving milestone " + JSON.stringify(outerTrial));
            }).finally(function () {
                vm.disableBtn = false;
            });
        };

        $scope.closePopover = function() {
            popover.hide();
        };

        activate();

        /****************************** implementations **************************/

        function activate () {
        }

        // Return true if the option is rejection option
        function findRejectionOptions (option) {
            if (option.code === 'SRJ' || option.code === 'LRD') {
                return true;
            } else {
                return false;
            }
        }

        function findSrjOption (option) {
            if (option.code === 'SRJ') {
                return true;
            } else {
                return false;
            }
        }
    } //paMilestoneCtrl
})();
