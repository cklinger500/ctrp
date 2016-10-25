/**
 * Created by wus4 on 3/10/16.
 */

(function () {
    'use strict';

    angular.module('ctrp.app.registry').controller('verifyTrialDataCtrl', verifyTrialDataCtrl);

    verifyTrialDataCtrl.$inject = ['trialDetailObj', 'TrialService', 'toastr', '$state', 'DateService', 'Common'];

    function verifyTrialDataCtrl(trialDetailObj, TrialService, toastr, $state, DateService, Common) {

        var vm = this;
        vm.curTrial = trialDetailObj;

        vm.updateTrial = function() {
            var isConfirmed = false;
            var confirmMsg = 'Are you sure you would like to save a Data Verification record with today\'s date';
            Common.alertConfirm(confirmMsg).then(function(ok) {
                isConfirmed = ok;

                // Prevent multiple submissions
                vm.disableBtn = true;

                vm.curTrial.verification_date = DateService.convertISODateToLocaleDateStr(new Date());
                vm.curTrial.edit_type = 'verify'

                // An outer param wrapper is needed for nested attributes to work
                var outerTrial = {};
                outerTrial.id = vm.curTrial.id;
                outerTrial.trial = vm.curTrial;

                TrialService.upsertTrial(outerTrial).then(function (response) {
                    var status = response.server_response.status;

                    if (status >= 200 && status <= 210) {
                        $state.go('main.verifyTrialData', {trialId: response.id}, {reload: true});
                        toastr.success('Trial data has been verified', 'Operation Successful!');
                    }
                }).catch(function (err) {
                    console.log("error in verifying trial data " + JSON.stringify(outerTrial));
                }).finally(function() {
                    // Enable buttons in case of backend error
                    vm.disableBtn = false;
                });
            }).catch(function(cancel) {
                // isConfirmed = cancel;
            });
        }; // updateTrial

        activate();

        /****************************** implementations **************************/

        function activate() {
            convertDate();
        }

        function convertDate() {
            vm.curTrial.verification_date = DateService.convertISODateToLocaleDateStr(vm.curTrial.verification_date);
        }
    }
})();
