/**
 * Created by wus4 on 9/24/15.
 */

(function () {
    'use strict';

    angular.module('ctrp.app.registry').controller('trialCtrl', trialCtrl);

    trialCtrl.$inject = ['TrialService', 'uiGridConstants', '$scope', '$rootScope', 'Common', '$uibModal',
                         'studySourceObj', 'phaseObj', 'primaryPurposeObj', '$state', 'trialStatusObj','HOST'];

    function trialCtrl(TrialService, uiGridConstants, $scope, $rootScope, Commo, $uibModal,
                       studySourceObj, phaseObj, primaryPurposeObj, $state, trialStatusObj,HOST) {

        var vm = this;
        $scope.downloadTSRUrl = HOST + '/ctrp/registry/trial_documents/download_tsr_in_rtf';

        vm.searchParams = TrialService.getInitialTrialSearchParams();
        vm.studySourceArr = studySourceObj;
        vm.phaseArr = phaseObj;
        vm.primaryPurposeArr = primaryPurposeObj;
        vm.trialStatusArr = trialStatusObj;
        vm.gridScope=vm;
        vm.searchWarningMessage = '';
        vm.searching = false;
        var fromStateName = $state.fromState.name || '';

        //ui-grid plugin options
        vm.gridOptions = TrialService.getGridOptions();
        vm.gridOptions.enableVerticalScrollbar = uiGridConstants.scrollbars.WHEN_NEEDED;
        vm.gridOptions.enableHorizontalScrollbar = uiGridConstants.scrollbars.WHEN_NEEDED;
        vm.gridOptions.onRegisterApi = function(gridApi) {
            vm.gridApi = gridApi;
            vm.gridApi.core.on.sortChanged($scope, sortChangedCallBack);
            vm.gridApi.pagination.on.paginationChanged($scope, function(newPage, pageSize) {
                vm.searchParams.start = newPage;
                vm.searchParams.rows = pageSize;
                vm.searchTrials();
            });
        }; //gridOptions

        vm.searchTrials = function(newSearchFlag, searchType) {
            if (newSearchFlag === 'fromStart') {
                vm.searchParams.start = 1; //from first page
            }

            vm.searchParams.searchType = searchType || vm.searchParams.searchType;

            /**
             * If not, it should throw a warning to the user to select atleast one parameter.
             * Right now, ignoring the alias parameter as it is set to true by default.
             * To refactor and look at default parameters instead of hardcoding -- radhika
             */
            var isEmptySearch = true;
            var excludedKeys = ['sort', 'order', 'rows', 'start', 'wc_search', 'searchType'];
            Object.keys(vm.searchParams).forEach(function (key) {
                if (excludedKeys.indexOf(key) === -1 && vm.searchParams[key] !== '' && vm.searchParams[key].length !== 0) {
                    isEmptySearch = false;
                }
            });

            if (isEmptySearch && newSearchFlag === 'fromStart') {
                vm.gridOptions.data = [];
                vm.gridOptions.totalItems = null;
                vm.searchWarningMessage = 'At least one selection value must be entered prior to running the search';
            } else {
                vm.searchWarningMessage = '';
            }

            if (!isEmptySearch) {
                vm.searching = true;

                TrialService.searchTrials(vm.searchParams).then(function (data) {
                    vm.gridOptions.data = data.trials;
                    vm.gridOptions.totalItems = data.total;
                }).catch(function (err) {
                    console.log('search trial failed');
                }).finally(function() {
                    console.log('search finished');
                    vm.searching = false;
                });
            }
        };

        vm.resetSearch = function() {
            Object.keys(vm.searchParams).forEach(function(key, index) {
                vm.searchParams[key] = '';
            });

            vm.gridOptions.data = [];
            vm.gridOptions.totalItems = null;
            vm.searchWarningMessage = '';
        };

        $scope.capitalizeFirst = function(str) {
            var splits = str.split('-');
            var resultStr = '';
            for (var i = 0; i < splits.length; i++) {
                if (i > 0) {
                    resultStr += ' ';
                }
                resultStr += splits[i].charAt(0).toUpperCase() + splits[i].slice(1);
            }
            return resultStr;
        };

        activate();

        /****************************** implementations **************************/

        function activate() {
            if (fromStateName != 'main.trialDetail') {
                vm.resetSearch();
            } else {
                vm.searchTrials(); //refresh search results
            }
        }

        /**
         * callback function for sorting UI-Grid columns
         * @param grid
         * @param sortColumns
         */
        function sortChangedCallBack(grid, sortColumns) {
            if (sortColumns.length == 0) {
                console.log("removing sorting");
                //remove sorting
                vm.searchParams.sort = '';
                vm.searchParams.order = '';
            } else {
                vm.searchParams.sort = sortColumns[0].name; //sort the column
                switch( sortColumns[0].sort.direction ) {
                    case uiGridConstants.ASC:
                        vm.searchParams.order = 'ASC';
                        break;
                    case uiGridConstants.DESC:
                        vm.searchParams.order = 'DESC';
                        break;
                    case undefined:
                        break;
                }
            }

            //do the search with the updated sorting
            vm.searchTrials();
        }; //sortChangedCallBack
    }
})();
