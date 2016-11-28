/**
 * Created by wus4 on 5/9/16.
 */

(function () {
    'use strict';
    angular.module('ctrp.app.pa.dashboard')
        .controller('paOnholdCtrl', paOnholdCtrl);

    paOnholdCtrl.$inject = ['$scope', '$state', 'toastr', 'onholdReasonObj', 'TrialService', 'DateService',
        'PATrialService'];

    function paOnholdCtrl($scope, $state, toastr, onholdReasonObj, TrialService, DateService,
                          PATrialService) {
        var vm = this;
        vm.curTrial = PATrialService.getCurrentTrialFromCache();
        vm.addMode = false;
        vm.showAddBtn = true;
        vm.onholdReasonArr = onholdReasonObj;
        vm.offhold_date_opened = false;

        vm.setAddMode = function (mode) {
            vm.addMode = mode;
            if (mode) {
                vm.onhold_date = DateService.today();
            } else {
                $scope.onhold_form.$setPristine();
                vm.onhold_id = null;
                vm.onhold_reason_id = null;
                vm.onhold_desc = null;
                vm.offhold_date = null;
            }
        };

        vm.setEditMode = function (index) {
            vm.addMode = true;
            vm.onhold_id = vm.curTrial.onholds[index].id;
            vm.onhold_reason_id = vm.curTrial.onholds[index].onhold_reason.id;
            vm.onhold_desc = vm.curTrial.onholds[index].onhold_desc;
            vm.onhold_date = vm.curTrial.onholds[index].onhold_date;
            vm.offhold_date = vm.curTrial.onholds[index].offhold_date;
        };

        vm.resetOnhold = function () {
            if (vm.onhold_id) {
                vm.offhold_date = null;
            } else {
                vm.onhold_reason_id = null;
                vm.onhold_desc = null;
            }

            $scope.onhold_form.$setPristine();
        };

        vm.dateFormat = DateService.getFormats()[1];
        vm.dateOptions = DateService.getDateOptions();
        vm.today = DateService.today();
        vm.openCalendar = function ($event, type) {
            $event.preventDefault();
            $event.stopPropagation();

            if (type === 'offhold_date') {
                vm.offhold_date_opened = !vm.offhold_date_opened;
            }
        };

        // PA F08 Scenario #7 validation
        vm.validateOffholdDate1 = function () {
            var offholdDate = new Date(vm.offhold_date);
            var today = new Date();
            today.setHours(0, 0, 0, 0);
            if (offholdDate.getTime() > today.getTime()) {
                return true;
            }
            return false;
        };

        // PA F08 Scenario #7 validation
        vm.validateOffholdDate2 = function () {
            var onholdDate = new Date(vm.onhold_date);
            var offholdDate = new Date(vm.offhold_date);
            if (onholdDate.getTime() > offholdDate.getTime()) {
                return true;
            }
            return false;
        };

        vm.saveOnhold = function () {
            // Prevent multiple submissions
            vm.disableBtn = true;

            vm.curTrial.onholds_attributes = [];
            var onholdObj = {};
            if (vm.onhold_id) {
                onholdObj.id = vm.onhold_id;
            }
            onholdObj.onhold_reason_id = vm.onhold_reason_id;
            onholdObj.onhold_desc = vm.onhold_desc;
            onholdObj.onhold_date = vm.onhold_date;
            onholdObj.offhold_date = vm.offhold_date;
            vm.curTrial.onholds_attributes.push(onholdObj);

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
                    showHideAddBtn();
                    toastr.success('On hold has been recorded', 'Operation Successful!');
                }
            }).catch(function (err) {
                console.log("Error in saving on hold " + JSON.stringify(outerTrial));
            }).finally(function() {
                vm.disableBtn = false;
            });
        };

        activate();

        /****************************** implementations **************************/

        function activate() {
            showHideAddBtn();
        }

        function showHideAddBtn() {
            if (vm.curTrial.is_rejected) {
                vm.showAddBtn = false;
                return;
            }

            for (var i = 0; i < vm.curTrial.onholds.length; i++) {
                if (!vm.curTrial.onholds[i].offhold_date) {
                    vm.showAddBtn = false;
                    return;
                }
            }
            vm.showAddBtn = true;
        }
    } //paOnholdCtrl
})();
