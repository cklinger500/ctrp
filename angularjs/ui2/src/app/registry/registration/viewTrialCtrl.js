/**
 * Created by wus4 on 2/3/16.
 */

(function () {
    'use strict';

    angular.module('ctrp.app.registry').controller('viewTrialCtrl', viewTrialCtrl);

    viewTrialCtrl.$inject = ['trialDetailObj', 'TrialService', 'toastr', '$state', 'DateService', 'HOST'];

    function viewTrialCtrl(trialDetailObj, TrialService, toastr, $state, DateService, HOST) {

        var vm = this;
        vm.curTrial = trialDetailObj;
        vm.downloadBaseUrl = HOST + '/ctrp/registry/trial_documents/download';

        vm.addMySite = function () {
            $state.go('main.addParticipatingSite', {trialId: vm.curTrial.id});
        };

        activate();

        /****************************** implementations **************************/

        function activate() {
            convertDate();
        }

        function convertDate() {
            vm.curTrial.start_date = DateService.convertISODateToLocaleDateStr(vm.curTrial.start_date);
            vm.curTrial.primary_comp_date = DateService.convertISODateToLocaleDateStr(vm.curTrial.primary_comp_date);
            vm.curTrial.comp_date = DateService.convertISODateToLocaleDateStr(vm.curTrial.comp_date);
            vm.curTrial.current_trial_status_date = DateService.convertISODateToLocaleDateStr(vm.curTrial.current_trial_status_date);
        }
    }
})();

