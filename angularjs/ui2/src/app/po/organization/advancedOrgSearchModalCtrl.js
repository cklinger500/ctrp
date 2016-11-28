/**
 * Created by wangg5 on 8/7/15.
 *
 */


(function () {

    'use strict';

    angular.module('ctrp.app.po')
        .controller('advancedOrgSearchModalCtrl', advancedOrgSearchModalCtrl);

    advancedOrgSearchModalCtrl.$inject = ['$scope', '$uibModalInstance', '$q'];

    function advancedOrgSearchModalCtrl($scope, $uibModalInstance, $q) {
        var vm = this;
        $scope.selectedOrgsArray = [];
        $scope.orgSearchResults = {orgs: [], total: 0, start: 1, rows: 10, sort: 'name', order: 'asc'};

        vm.cancel = function() {
            $uibModalInstance.dismiss('cancel');
        }; //cancel

        vm.confirmSelection = function() {
            $uibModalInstance.close($scope.selectedOrgsArray);
        }; //confirmSelection


        activate();

        function activate() {
            watchOrgSearchResults();
            watchSelectedOrgs();
        }


        /******** implementations below **********/

        /**
         * Watch the organization search results from advanced search
         */
        function watchOrgSearchResults() {
            $scope.$watch('orgSearchResults', function (newVal, oldVal) {
                $scope.orgSearchResults = newVal;
            }, true);
        } //watchOrgSearchResults


        function watchSelectedOrgs() {
            $scope.$watch('selectedOrgsArray', function(newVal, oldVal) {
                console.log('selectedOrgsArray.length: ' + $scope.selectedOrgsArray.length);
            }, true);

        } //watchSelectedOrgs


    }


})();
