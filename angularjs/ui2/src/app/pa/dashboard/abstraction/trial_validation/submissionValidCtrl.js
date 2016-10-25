/**
 * Created by wangg5, June 27th, 2016
 */

(function() {
    'use strict';
    angular.module('ctrp.app.pa.dashboard')
        .controller('submissionValidCtrl', submissionValidCtrl);

    submissionValidCtrl.$inject = ['$scope', '$timeout', 'trialPhaseArr', 'primaryPurposeArr',
    'milestoneList', 'userDetailObj', 'processingStatuses', 'PATrialService', '_', 'amendmentReasonObj',
    'toastr', '$popover', '$state'];

    function submissionValidCtrl($scope, $timeout, trialPhaseArr, primaryPurposeArr,
        milestoneList, userDetailObj, processingStatuses, PATrialService, _, amendmentReasonObj,
        toastr, $popover, $state) {
        var vm = this;
        vm.trialDetailObj = {};
        vm.disableBtn = false;
        vm.isOtherPrimaryPurpose = false;
        vm.isAmendmentSubmission = false;
        vm.isOriginalSubmission = false;
        vm.trialPhaseArr = trialPhaseArr;
        vm.primaryPurposeArr = primaryPurposeArr;
        vm.amendReasonArr = amendmentReasonObj.data || [];
        vm.formErrors = {
            phase: false,
            primaryPurpose: false,
            otherDesc: false,
            amendReason: false,
        };
        $scope.rejectionReasonArr = ['Out of Scope', 'Duplicate', 'Other'];
        var subAcceptDateCode = 'SAC'; // code for Submission Accepted Date
        var subRejectDateCode = 'SRJ'; // code for Submission Rejection Date
        var acceptStatusCode = 'ACC';
        var rejectStatusCode = 'REJ';
        var popover = null;

        var REQUIRED_FIELDS_ORIGINAL_PROTOCOL = {
            'lead_org_id': 'Lead Organization identifier',
            'official_title': 'Official Title',
            'phase_id': 'Phase',
            'primary_purpose_id': 'Primary Purpose',
            'lead_org': 'Lead Organization',
            'pi_id': 'Principal Investigator',
            'sponsor_id': 'Sponsor Organization',
            'responsible_party_id': 'Responsible Party',
            'investigator_id': 'Investigator',
            'investigator_title': 'Investigator Title',
            'investigator_aff': 'Investigator Affiliation',
        }; // for submission_num = 1
        var REQUIRED_FIELDS_AMEND_PROTOCOL = angular.copy(REQUIRED_FIELDS_ORIGINAL_PROTOCOL); // for submission_num > 1
        REQUIRED_FIELDS_AMEND_PROTOCOL['amendment_reason_id'] = 'Amendment Reason Code';

        var REQUIRED_FIELDS_IMPORTED = {
            'lead_org_id': 'Lead Organization identifier',
            'official_title': 'Official Title',
            'phase_id': 'Phase',
            'primary_purpose_id': 'Primary Purpose',
            'lead_org': 'Lead Organization',
        };

        // actions
        vm.acceptTrialValidation = acceptTrialValidation;
        // vm._rejectTrialValidation = _rejectTrialValidation;
        vm.confirmRejection = confirmRejection;
        vm.placeTrialOnHold = placeTrialOnHold;
        vm.saveValidation = saveValidation;
        vm.resetForm = resetForm;

        activate();
        function activate() {
            _getTrialDetailCopy();
            _watchPrimaryPurpose();
            _checkSubmissionType(vm.trialDetailObj);
        }

        function _getTrialDetailCopy() {
            vm.trialDetailObj = PATrialService.getCurrentTrialFromCache();
            // sort submissions by submission_num in 'ascending order' (1, 2, 3,...)
            vm.trialDetailObj.submissions = _.sortBy(vm.trialDetailObj.submissions, function(sub) {
                return sub.submission_num;
            });
        } // _getTrialDetailCopy

        function _watchPrimaryPurpose() {
            $scope.$watch(function() {return vm.trialDetailObj.primary_purpose_id;},
                function(newVal, oldVal) {
                if (newVal !== undefined && newVal !== null) {
                    var curPrimaryPurposeObj = _.findWhere(vm.primaryPurposeArr, {id: newVal});
                    vm.isOtherPrimaryPurpose = curPrimaryPurposeObj.name.toLowerCase().indexOf('other') > -1;
                    // reset to original data or empty
                    vm.trialDetailObj.primary_purpose_other = _resetValueForField('primary_purpose_other');
                } else {
                    vm.isOtherPrimaryPurpose = false;
                    vm.trialDetailObj.primary_purpose_other = '';
                }
            });
        } // _watchPrimaryPurpose

        /**
         * Get the value for the fieldName in the cached trial object
         * @param  {[type]} fieldName [description]
         * @return {String}  a String value that could be a blank String
         */
        function _resetValueForField(fieldName) {
            var cachedTrial = PATrialService.getCurrentTrialFromCache();
            var val = cachedTrial[fieldName] || '';
            return val;
        }

        function saveValidation() {
            vm.trialDetailObj.submissions_attributes = vm.trialDetailObj.submissions; // for update
            vm.trialDetailObj.edit_type += vm.isAmendmentSubmission ? '_amd' : '_ori'; // mark for 'amendment' or 'original'
            vm.disableBtn = true;
            PATrialService.updateTrial(vm.trialDetailObj).then(function(res) {
                var status = res.server_response.status;

                if (status >= 200 && status <= 210) {
                    vm.trialDetailObj = res;
                    PATrialService.setCurrentTrial(vm.trialDetailObj); // update to cache
                    $scope.$emit('updatedInChildScope', {});
                    toastr.clear();
                    toastr.success('Submission validation has been updated', 'Successful!');

                    _getTrialDetailCopy();
                    // To make sure setPristine() is executed after all $watch functions are complete
                    $timeout(function() {
                       $scope.sub_validation_form.$setPristine();
                    }, 1);
                }
            }).catch(function(err) {
                console.error('trial upsert error: ', err);
            }).finally(function() {
                vm.disableBtn = false;
                vm.missingFieldsWarning = []; // re-init
            });
        } // saveValidation

        function resetForm() {
            _getTrialDetailCopy();
        } // resetForm

        function confirmRejection(evt) {
            if (!_isFormValid(vm.trialDetailObj)) {
                return;
            }
            $scope.rejectionObj = {reason: null, comment: null};
            var confirmMsg = '';
            if (vm.isOriginalSubmission) {
                confirmMsg = 'Rejecting this submission will reject this trial';
            } else if (vm.isAmendmentSubmission) {
                confirmMsg = 'Rejecting this submission will roll back the trial to the prior submission'
            }
            if (confirmMsg.length > 0) {
                // decorate it with warning
                confirmMsg = '<div class="alert alert-warning"><strong>' + confirmMsg + '</strong></div>';
            }
            popover = $popover(angular.element(evt.target), {
                title: 'Please Confirm Rejection',
                show: true,
                html: true,
                trigger: 'manual',
                placement: 'top', // bottom
                templateUrl: 'app/pa/dashboard/abstraction/trial_validation/_reject_trial_popover.tpl.html',
                animation: 'am-flip-x',
                content: confirmMsg + '<strong>Rejection Reason: <small>(Required)</small></strong>',
                autoClose: false,
                scope: $scope,
            });
            popover.event = evt;
        }
        // the following two $scope. functions
        // are used in the popover dialog window
        $scope.closePopover = function() {
            popover.hide();
            vm.trialDetailObj.edit_type = ''; // clear edit_type when canceling rejection
        };
        $scope.confirmReject = function() {
            _rejectTrialValidation();
            popover.hide();
        };

        function placeTrialOnHold() {
            if (_isFormValid(vm.trialDetailObj)) {
                saveValidation();
                $state.go('main.pa.trialOverview.onhold', {}, {reload: true});
            }
        }

        function _rejectTrialValidation() {
            resetForm(); // do not save data in the form

            // concatenate the reason and comment in the popover confirm dialog
            var rejectionComment = $scope.rejectionObj.reason + ': ' + $scope.rejectionObj.comment;
            var milestone = _genMilestone(subRejectDateCode, vm.trialDetailObj.current_submission_id, rejectionComment);
            vm.trialDetailObj.milestone_wrappers_attributes.push(milestone);

            var processStatus = _genProcessingStatus(rejectStatusCode, vm.trialDetailObj.current_submission_id, vm.trialDetailObj.id);
            vm.trialDetailObj.processing_status_wrappers_attributes.push(processStatus);
            vm.trialDetailObj.edit_type = 'submission_rejected';
            saveValidation(); // update the trial validation
            $state.go('main.pa.trialOverview.trialIdentification', {}, {reload: true});
        }

        function acceptTrialValidation() {
            if (_isFormValid(vm.trialDetailObj) && _isValidForAccept(vm.trialDetailObj)) {
                var milestone = _genMilestone(subAcceptDateCode, vm.trialDetailObj.current_submission_id, null);
                vm.trialDetailObj.milestone_wrappers_attributes.push(milestone);

                var processStatus = _genProcessingStatus(acceptStatusCode, vm.trialDetailObj.current_submission_id, vm.trialDetailObj.id);
                vm.trialDetailObj.processing_status_wrappers_attributes.push(processStatus);
                vm.trialDetailObj.edit_type = 'submission_accepted';
                saveValidation(); // update the trial validation
                $state.go('main.pa.trialOverview.trialIdentification', {}, {reload: true});
            }
        }

        var processingStatusesArr = processingStatuses; // from resolved promise
        function _genProcessingStatus(statusCode, curSubmissionId, trialId) {
            var statusObj = _.findWhere(processingStatusesArr, {code: statusCode});
            var processStatus = {
                status_date: new Date(),
                processing_status_id: statusObj.id || '',
                trial_id: trialId,
                submission_id: curSubmissionId,
            };
            if (!angular.isDefined(vm.trialDetailObj.processing_status_wrappers_attributes)) {
                vm.trialDetailObj.processing_status_wrappers_attributes = [];
            }

            return processStatus;
        }

        var milestoneArr = milestoneList; // from resolved promise
        var curUser = userDetailObj; // from resolved promise
        function _genMilestone(milestoneCode, curSubmissionId, comment) {
            var milestoneObj = _.findWhere(milestoneArr, {code: milestoneCode});
            var milestone = {
                submission_id: curSubmissionId,
                milestone_id: !!milestoneObj ? milestoneObj.id : '',
                comment: comment || null,
                milestone_date: new Date(),
                created_by: curUser.last_name + ', ' + curUser.first_name // get full name
            };
            if (!angular.isDefined(vm.trialDetailObj.milestone_wrappers_attributes)) {
                vm.trialDetailObj.milestone_wrappers_attributes = [];
            }
            return milestone;
        }

        // check if the form is valid
        function _isFormValid(trialObj) {

            if (!angular.isDefined(trialObj.phase_id)) {
                vm.formErrors.phase = true; // show error
                return false;
            }
            if ((trialObj.isInfoSourceImport || trialObj.isInfoSourceProtocol) && !angular.isDefined(trialObj.primary_purpose_id)) {
                vm.formErrors.primaryPurpose = true; // show error
                return false;
            }
            if (vm.isOtherPrimaryPurpose && !trialObj.primary_purpose_other) {
                vm.formErrors.otherDesc = true; // show error
                return false;
            }
            if (vm.isAmendmentSubmission && !angular.isDefined(trialObj.submissions[trialObj.submissions.length-1].amendment_reason_id)) {
                vm.formErrors.amendReason = true;
                return false;
            }
            // re-init to false - no errors!
            Object.keys(vm.formErrors).forEach(function(key) {
                vm.formErrors[key] = false;
            });

            return true;

        }

        /**
         * Validate the trial if has any missing fields
         * @param  {[JSON]}  trialObj [description]
         * @return {Boolean}
         */
        function _isValidForAccept(trialObj) {
            vm.missingFieldsWarning = []; // to be filled with string values in required fields
            if (trialObj.onholds.length > 0) {
                _.each(trialObj.onholds, function(holdEntry) {
                    if (!holdEntry.offhold_date) {

                    }
                });

                for (var i = 0; i < trialObj.onholds.length; i++) {
                    var holdEntry = trialObj.onholds[i];
                    var isOnhold = false;
                    if (!angular.isDefined(holdEntry.offhold_date)) {
                        // null or undefined offhold_date means still on-hold
                        isOnhold = true;
                    } else {
                        if (moment(holdEntry.offhold_date).isValid()) {
                            var today = moment();
                            isOnhold = moment(holdEntry.offhold_date).isAfter(today); // if offhold_date after today, the trial is still onhold
                        } else {
                            isOnhold = true; // if offhold_date (should be in the format '2016-07-30') cannot be parsed, assume the trial is still on hold
                        }
                    }
                    if (isOnhold) {
                        vm.missingFieldsWarning.unshift('This trial is currently on hold and cannot be accepted');
                        vm.trialDetailObj.edit_type = '';
                        return;
                    }
                }
            }

            if (trialObj.current_submission_num === 1 && trialObj.isInfoSourceProtocol) {
                vm.missingFieldsWarning = _findMissingFields(REQUIRED_FIELDS_ORIGINAL_PROTOCOL, trialObj);
            } else if (trialObj.current_submission_num > 1 && trialObj.isInfoSourceProtocol) {
               vm.missingFieldsWarning = _findMissingFields(REQUIRED_FIELDS_AMEND_PROTOCOL, trialObj);
            } else if (trialObj.isInfoSourceImport) {
               vm.missingFieldsWarning = _findMissingFields(REQUIRED_FIELDS_IMPORTED, trialObj);
            }

            if (vm.missingFieldsWarning.length > 0) {
                // empty the edit_type if not valid for acceptance
                vm.trialDetailObj.edit_type = '';
            }

            return vm.missingFieldsWarning.length === 0
        }

        /**
         * Find what field is missing in the trial
         * @param  {[type]} fieldKVObj [description]
         * @param  {[type]} trialObj   [description]
         * @return {Array of string}            [description]
         */
        function _findMissingFields(fieldKVObj, trialObj) {
            var missingFields = [];
            Object.keys(fieldKVObj).forEach(function(key) {
                if (key === 'amendment_reason_id') {
                    if (!angular.isDefined(trialObj.submissions[trialObj.submissions.length-1].amendment_reason_id)) {
                        missingFields.push(fieldKVObj[key] + ' is missing value');
                    }
                } else if (!angular.isDefined(trialObj[key])) {
                    missingFields.push(fieldKVObj[key] + ' is missing value'); // push in the value string
                }
            });

            return missingFields;
        }

        function _checkSubmissionType(trialObj) {
            if (!angular.isArray(trialObj.submissions)) {
                return;
            }
            // var latestSubNum = trialObj.submissions[trialObj.submissions.length-1].submission_num;
            var latestSubNum = trialObj.current_submission_num;
            vm.isAmendmentSubmission = _.findIndex(trialObj.submissions, {submission_num: latestSubNum, submission_type_code: 'AMD'}) > -1;
            vm.isOriginalSubmission = !vm.isAmendmentSubmission && _.findIndex(trialObj.submissions, {submission_num: latestSubNum, submission_type_code: 'ORI'}) > -1;
        }
    } // submissionValidCtrl

})();
