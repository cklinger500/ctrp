/**
 * Created by wangg5, April 26th, 2016
 */

(function() {
    'use strict';
    angular.module('ctrp.app.pa.dashboard')
        .controller('trialEmailLogsCtrl', trialEmailLogsCtrl);

    trialEmailLogsCtrl.$inject = ['$scope', 'emailLogs'];

    function trialEmailLogsCtrl($scope, emailLogs) {
        var vm = this;
        delete emailLogs.server_response;
        console.info('in trialEmailLogsCtrl: ', emailLogs);
        vm.emailLogs = emailLogs;
        vm.curEmail = vm.emailLogs[0] || '';
        vm.showEmailDetail = showEmailDetail;

        function showEmailDetail(idx) {
            vm.curEmail = vm.emailLogs[idx];
            console.info('curEmail: ', vm.curEmail);
        }

    } // trialEmailLogsCtrl

})();
