/**
 * Created by schintal, Mar 02, 2016
 */

(function() {
    'use strict';
    angular.module('ctrp.app.pa.dashboard')
        .controller('pasTrialDescriptionCtrl', pasTrialDescriptionCtrl);

    pasTrialDescriptionCtrl.$inject = ['$scope', '$state', 'TrialService', 'PATrialService', 'toastr',
        'MESSAGES', '_', '$timeout', 'trialDetailObj'];

    function pasTrialDescriptionCtrl($scope, $state, TrialService, PATrialService, toastr,
                                     MESSAGES, _, $timeout, trialDetailObj) {
        var vm = this;
        vm.curTrial = trialDetailObj;
        vm.disableBtn = false;

        vm.reset = function() {
            getTrialDetailCopy();
            $scope.desc_form.$setPristine();
        };

        vm.saveTrialDescription = function(){
            vm.disableBtn = true;

            // An outer param wrapper is needed for nested attributes to work
            var outerTrial = {};
            outerTrial.new = vm.curTrial.new;
            outerTrial.id = vm.curTrial.id;
            outerTrial.trial = vm.curTrial;


            // get the most updated lock_version
            outerTrial.trial.lock_version = PATrialService.getCurrentTrialFromCache().lock_version;

            TrialService.upsertTrial(outerTrial).then(function(response) {
                var status = response.server_response.status;

                if (status >= 200 && status <= 210) {
                    vm.curTrial = response;
                    vm.curTrial.lock_version = response.lock_version || '';

                    PATrialService.setCurrentTrial(angular.copy(vm.curTrial)); // update to cache
                    toastr.clear();
                    toastr.success('Trial ' + vm.curTrial.lead_protocol_id + ' has been recorded', 'Operation Successful!');

                    $scope.desc_form.$setPristine();
                }
            }).catch(function(err) {
                console.log('error in updating trial ' + JSON.stringify(outerTrial));
            }).finally(function() {
                vm.disableBtn = false;
            });

        }//saveTrial

        function getTrialDetailCopy() {
            $timeout(function() {
                vm.curTrial = PATrialService.getCurrentTrialFromCache();
            }, 1);
        } //getTrialDetailCopy

    } //pasTrialDescriptionCtrl

})();
