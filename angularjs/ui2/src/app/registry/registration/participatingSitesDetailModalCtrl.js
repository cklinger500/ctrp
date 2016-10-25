/**
 * Created by aasheer on 10/11/2016.
 *
 */


(function () {

    'use strict';

    angular.module('ctrp.app.registry')
        .controller('participatingSitesDetailModalCtrl', participatingSitesDetailModalCtrl);

    participatingSitesDetailModalCtrl.$inject = ['$scope', '$uibModalInstance', 'psDetailObj', 'trialDetailObj', 'userDetailObj', 'TrialService', 'PATrialService', 'srStatusObj', 'centralContactTypes'];

    function participatingSitesDetailModalCtrl($scope, $uibModalInstance, psDetailObj, trialDetailObj, userDetailObj, TrialService, PATrialService, srStatusObj, centralContactTypes) {
        /* Define properties that are required to be passed to participatingSitesDetail directive */
        var vm = this;
        $scope.psDetailObj = psDetailObj;
        $scope.trialDetailObj = trialDetailObj;
        $scope.userDetailObj = userDetailObj;
        $scope.srStatusObj = srStatusObj;
        $scope.centralContactTypes = centralContactTypes;
        $scope.TrialService = TrialService;
        $scope.PATrialService = PATrialService;

        vm.title = $scope.psDetailObj && !$scope.psDetailObj.new ? 'Update Participating Site' : 'Add Participating Site';

        vm.close = function() {
            $uibModalInstance.close('close');
        }; //cancel

        $scope.$on('closePsDetail', function(e) {
            vm.close();
        });
    }
})();
