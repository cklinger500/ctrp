/**
 * Created by wangg5, July 8th, 2016
 */

(function() {
    'use strict';
    angular.module('ctrp.app.pa.dashboard')
        .controller('abstractValidCtrl', abstractValidCtrl);

    abstractValidCtrl.$inject = ['$scope', '$timeout', '_', 'validationResults',
    'trialStatuses', 'Common', 'PATrialService'];

    function abstractValidCtrl($scope, $timeout, _, validationResults,
    trialStatuses, Common, PATrialService) {
        var vm = this;
        var trialStatusDict = trialStatuses.sort(Common.a2zComparator());
        var curTrial = PATrialService.getCurrentTrialFromCache();
        vm.annoatedTrialStatuses = PATrialService.annotateTrialStatusWithNameAndCode(curTrial.trial_status_wrappers, trialStatusDict);
        vm.annoatedTrialStatuses = _.filter(vm.annoatedTrialStatuses, function(status) {return !status._destroy;}); // filter out inactive status
        vm.issues = {
            errors: {admin: [], scientific: []},
            warnings: []
        };
        var results = _.groupBy(validationResults, 'category');
        vm.issues.warnings = results.warning || [];
        var errors = _.groupBy(results.error || [], 'section');
        vm.issues.errors.admin = errors.PAA || [];
        vm.issues.errors.scientific = errors.PAS || [];
        vm.isValidationPassed = vm.issues.warnings.length === 0 &&
                                vm.issues.errors.admin.length === 0 &&
                                vm.issues.errors.scientific.length === 0;

        activate();
        function activate() {
            _validateTrialStatuses(vm.annoatedTrialStatuses);
        }

        function _validateTrialStatuses(statusArr) {
            if (angular.isArray(statusArr) && statusArr.length > 0) {
                PATrialService.abstractionValidateTrialStatus({"statuses": statusArr}).then(function(res) {
                    var status =res.server_response.status;

                    if (status >= 200 && status <= 210) {
                        var statusResults = _xformValidationMsgs(res.validation_msgs);
                        vm.issues.errors.admin = vm.issues.errors.admin.concat(statusResults.errors || []);
                        vm.issues.warnings = vm.issues.warnings.concat(statusResults.warnings || []);
                    }
                });
            }
        } // _validateTrialStatuses

        /**
         * Transform the validation message array so that the issues can be displayed
         * @param  {[type]} validationMsgsArr [description]
         * @return {[type]}                   [description]
         */
        function _xformValidationMsgs(validationMsgsArr) {
            var results = {warnings: [], errors: []};
            _.each(validationMsgsArr, function(msgObj) {
                if (msgObj.hasOwnProperty('warnings') && msgObj.warnings.length > 0) {
                    results.warnings = _.map(msgObj.warnings, function(warning) {
                        warning.category = 'warning';
                        warning.description = warning.message || 'Interim status [' + warning.status + '] is missing';
                        warning.item = 'paa_status';
                        if (!!warning.message && warning.message.indexOf('Same') > -1 && warning.sameDate) {
                            warning.description = warning.from + ' and ' + warning.to + ' have the same date';
                        }
                        warning.remark = '[Select Trial Status] from Administrative Data menu.';
                        return warning;
                    });
                } else if (msgObj.hasOwnProperty('errors') && msgObj.errors.length > 0) {
                    results.errors = _.map(msgObj.errors, function(error) {
                        error.category = 'error';
                        if (error.message) {
                            error.description = error.message + ': ' + error.from + ' to ' + error.to;
                        } else {
                            error.description = 'Trial Status ' + error.status + ' is missing';
                        }
                        error.item = 'paa_status';
                        error.remark = '[Select Trial Status] from Administrative Data menu.';
                        return error;
                    });
                }
            }); // _.each

            return results;
        } // _xformValidationMsgs

    } // abstractValidCtrl

})();
