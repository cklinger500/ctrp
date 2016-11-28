/**
 * Created by wus4 on 2/10/16.
 */

(function () {
    'use strict';

    angular.module('ctrp.app.registry').controller('psDetailCtrl', psDetailCtrl);

    psDetailCtrl.$inject = ['$scope', 'psDetailObj', 'trialDetailObj', 'userDetailObj', 'TrialService', 'PATrialService', 'srStatusObj', 'centralContactTypes'];

    function psDetailCtrl($scope, psDetailObj, trialDetailObj, userDetailObj, TrialService, PATrialService, srStatusObj, centralContactTypes) {

        /* Define properties that are required to be passed to participatingSitesDetail directive */
        $scope.psDetailObj = psDetailObj;
        $scope.trialDetailObj = trialDetailObj;
        $scope.userDetailObj = userDetailObj;
        $scope.srStatusObj = srStatusObj;
        $scope.centralContactTypes = centralContactTypes;
        $scope.TrialService = TrialService;
        $scope.PATrialService = PATrialService;
    }
})();
