
/**
 * Created by aasheer, February 10, 2016
 */

(function() {
    'use strict';
    angular.module('ctrp.app.pa.dashboard')
    .controller('trialReportSummaryCtrl', trialReportSummaryCtrl);

    trialReportSummaryCtrl.$inject = ['$scope', 'TrialService', 'MESSAGES',
        '$timeout', '_', 'PATrialService', 'toastr', 'FileSaver','Blob','HOST','$window'];

    function trialReportSummaryCtrl($scope, TrialService, MESSAGES,
        $timeout, _, PATrialService, toastr, FileSaver, Blob,HOST,$window) {
        var vm = this;

        $scope.downloadBaseUrl = HOST + '/ctrp/registry/trial_documents/download_tsr_in_rtf/';
        var trialId = $scope.$parent.paTrialOverview.trialDetailObj.id || vm.trialProcessingObj.trialId;
        $scope.downloadBaseUrl = $scope.downloadBaseUrl + trialId
    } //trialReportSummaryCtrl
})();
