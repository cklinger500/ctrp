/**
 * Created by wangg5, January 25th, 2016
 */

(function() {
    'use strict';
    angular.module('ctrp.app.pa.dashboard')
    .controller('regulatoryInfoHumanSafetyCtrl', regulatoryInfoHumanSafetyCtrl);

    regulatoryInfoHumanSafetyCtrl.$inject = ['$scope', 'PATrialService', 'TrialService',
        'boardApprovalStatuses', '_', '$timeout', 'toastr', 'MESSAGES', 'DateService', '$state'];

    function regulatoryInfoHumanSafetyCtrl($scope, PATrialService, TrialService,
        boardApprovalStatuses, _, $timeout, toastr, MESSAGES, DateService, $state) {

        var vm = this;
        vm.boardAffiliationArray = [];
        vm.statuses = boardApprovalStatuses.statuses;
        vm.changeStatus = changeStatus;
        vm.updateHumanSafetyInfo = updateHumanSafetyInfo;
        vm.resetHumanSafetyInfo = resetHumanSafetyInfo;
        vm.approvalNumRequired = false;
        vm.boardNameRequired = false;
        vm.boardAffRequired = false;
        vm.approvalStatusRequired = false;
        vm.boardAffShown = false;
        vm.disableBtn = false;

        activate();

        function activate() {
            _getTrialDetailCopy();
            _watchAffiliationSelection();
            _watchTrialDetailObj();
        }

        /**
         * get a data clone of the trial detail object from Local Cache
         * @return {Void}
         */
        function _getTrialDetailCopy() {
            $timeout(function() {
                vm.trialDetailsObj = PATrialService.getCurrentTrialFromCache();
                var internalSourceObj = vm.trialDetailsObj.internal_source;
                // approval status is required only for *reported/registered* trial thru CTRP
                vm.approvalStatusRequired = !!internalSourceObj ? (internalSourceObj.code === 'REG') : false;
                _watchApprovalStatus();
            }, 0);
        } // _getTrialDetailCopy

        function _watchAffiliationSelection() {
            $scope.$watchCollection(function() {return vm.boardAffiliationArray;},
                function(newVal, oldVal) {
                if (angular.isArray(newVal) && newVal.length > 0) {
                    console.log('affiliation newVal: ', newVal);
                    vm.trialDetailsObj.board_affiliation_id = newVal[0].id;
                    // vm.trialDetailsObj.board_name = newVal[0].name;
                    vm.trialDetailsObj.board_affiliated_org = newVal[0];

                    if (!angular.equals(newVal, oldVal)) {
                        $scope.human_safety_form.$setDirty();
                    }
                }
            });
        } // watchAffiliationSelection

        function _watchApprovalStatus() {
            $scope.$watch(function() {
                return vm.trialDetailsObj.board_approval_status_id;
            }, function(newVal, oldVal) {
                changeStatus();

                if (newVal !== oldVal) {
                    // clear the old values
                    vm.trialDetailsObj.board_affiliated_org = {id: ''};
                    vm.trialDetailsObj.board_name = '';
                    vm.trialDetailsObj.board_approval_num = '';
                }
            });
        }

        /**
         * action triggered upon changing approval status
         * @return {Void}
         */
        function changeStatus() {
            var approvalStatus = _.findWhere(vm.statuses, {id: vm.trialDetailsObj.board_approval_status_id});
            // console.log('approval status: ', approvalStatus);
            var statusName = !!approvalStatus ? approvalStatus.name.toLowerCase() : '';
            // approval number is required if the status is 'Submitted, approved'
            vm.approvalNumRequired = statusName.indexOf('approv') > -1;
            // board affiliation is required when status is
            // 'Submitted, exempt' or 'Submitted, approved'
            vm.boardAffRequired = statusName.indexOf('approv') > -1 ||
                                  statusName.indexOf('pend') > -1 ||
                                  statusName.indexOf('denied') > -1 ||
                                  statusName.indexOf('exempt') > -1;
            // show board affiliation for statuses: approved, exempt,
            vm.boardAffShown = vm.boardAffRequired || statusName.indexOf('pend') > -1 ||
                                statusName.indexOf('denied') > -1;
            // board name is required unless status is 'Submission not required'
            vm.boardNameRequired = statusName !== '' && statusName.indexOf('not required') === -1;
        } // changeStatus

        function updateHumanSafetyInfo() {
            if (vm.trialDetailsObj.board_approval_status_id === '') return;

            vm.trialDetailsObj.board_affiliation_id = vm.trialDetailsObj.board_affiliated_org.id;
            console.log('updating human safety info... ', vm.trialDetailsObj);
            var outerTrial = {};
            outerTrial.new = false;
            // if the approval number is not entered, enter the date (dd-MMM-yyyy)
            vm.trialDetailsObj.board_approval_num = !vm.trialDetailsObj.board_approval_num ? moment().format('DD-MMM-YYYY') : vm.trialDetailsObj.board_approval_num;
            outerTrial.id = vm.trialDetailsObj.id;
            outerTrial.trial = vm.trialDetailsObj;
            // get the most updated lock_version
            outerTrial.trial.lock_version = PATrialService.getCurrentTrialFromCache().lock_version;
            vm.disableBtn = true;

            TrialService.upsertTrial(outerTrial).then(function(res) {
                var status = res.server_response.status;

                if (status >= 200 && status <= 210) {
                    vm.trialDetailsObj = res;
                    vm.trialDetailsObj.lock_version = res.lock_version;

                    PATrialService.setCurrentTrial(vm.trialDetailsObj); // update cache
                    $scope.$emit('updatedInChildScope', {});

                    toastr.clear();
                    toastr.success('Human subject safety information has been updated', 'Successful!');
                    _getTrialDetailCopy();

                    // To make sure setPristine() is executed after all $watch functions are complete
                    $timeout(function() {
                       $scope.human_safety_form.$setPristine();
                    }, 1);
                }
            }).finally(function() {
                vm.disableBtn = false;
            });
        }

        function _watchTrialDetailObj() {
            $scope.$on(MESSAGES.TRIAL_DETAIL_SAVED, function() {
                _getTrialDetailCopy();
            });
        } //watchTrialDetailObj


        function resetHumanSafetyInfo() {
            activate();
            $scope.human_safety_form.$setPristine();
        } // resetHumanSafetyInfo

    } // regulatoryInfoHumanSafetyCtrl

})();
