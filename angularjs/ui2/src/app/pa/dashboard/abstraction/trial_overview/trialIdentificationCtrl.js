
/**
 * Created by wangg5, Deember 2nd, 2015
 */

(function() {
    'use strict';
    angular.module('ctrp.app.pa.dashboard')
    .controller('trialIdentificationCtrl', trialIdentificationCtrl);

    trialIdentificationCtrl.$inject = ['$scope', 'TrialService', 'MESSAGES',
        '$timeout', '_', 'PATrialService', 'toastr', 'UserService'];

    function trialIdentificationCtrl($scope, TrialService, MESSAGES,
        $timeout, _, PATrialService, toastr, UserService) {
        var vm = this;
        vm.trialProcessingObj = {comment: '', priority: 'Normal'};
        vm.saveProcessingInfo = saveProcessingInfo;
        vm.resetView = resetView;
        var USER_ROLES_ALLOWD = ['ROLE_ADMIN', 'ROLE_SUPER', 'ROLE_ABSTRACTOR-SU', 'ROLE_ABSTRACTOR'];
        var curUserRole = UserService.getUserRole();
        vm.isFieldEditable = _.contains(USER_ROLES_ALLOWD, curUserRole);
        vm.priorities = [
            {id: 1, name: 'High'},
            {id: 2, name: 'Normal'},
            {id: 3, name: 'Low'},
        ];
        vm.disableBtn = false;

        activate();

        function activate() {
            getTrialDetailObj();
            _getProcessingInfo();
        }

        /**
         * Get trial detail object from parent scope
         */
        function getTrialDetailObj() {
            $scope.$on(MESSAGES.TRIAL_DETAIL_SAVED, _getProcessingInfo);
        }


        function _getProcessingInfo() {
            $timeout(function() {
                var _defaultPriorityObj = _.findWhere(vm.priorities, {name: $scope.$parent.paTrialOverview.trialDetailObj.process_priority});
                var _defaultPriority = !!_defaultPriorityObj ? _defaultPriorityObj.name : vm.trialProcessingObj.priority;
                vm.trialProcessingObj = {
                    trialId: $scope.$parent.paTrialOverview.trialDetailObj.id || vm.trialProcessingObj.trialId,
                    priority: _defaultPriority,
                    comment: $scope.$parent.paTrialOverview.trialDetailObj.process_comment || vm.trialProcessingObj.comment
                };
            }, 0);
        }

        /* implementations below */
        function saveProcessingInfo() {
            var updatedTrial = PATrialService.getCurrentTrialFromCache();
            //angular.copy($scope.$parent.paTrialOverview.trialDetailObj);
            updatedTrial.process_priority = vm.trialProcessingObj.priority;
            updatedTrial.process_comment = vm.trialProcessingObj.comment;

            vm.disableBtn = true;

            TrialService.upsertTrial(updatedTrial).then(function(res) {
                var status = res.server_response.status;

                if (status >= 200 && status <= 210) {
                    // console.log('priority and commented updated: ', res);
                    updatedTrial.lock_version = res.lock_version;
                    PATrialService.setCurrentTrial(updatedTrial);
                    // $scope.$emit('updatedInChildScope', {});
                    toastr.clear();
                    toastr.success('Trial processing information has been recorded', 'Successful!');
                }
            }).finally(function() {
                vm.disableBtn = false;
            });
        }

        function resetView() {
            vm.trialProcessingObj.comment = $scope.$parent.paTrialOverview.trialDetailObj.comment || '';
            vm.trialProcessingObj.priority = $scope.$parent.paTrialOverview.trialDetailObj.priority || '';
            $scope.abstraction_form.$setPristine();
        }

    } //trialIdentificationCtrl

})();
