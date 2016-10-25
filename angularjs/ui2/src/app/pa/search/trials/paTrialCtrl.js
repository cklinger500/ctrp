/**
 * Created by wus4 on 9/24/15.
 */

(function () {
    'use strict';

    angular.module('ctrp.app.pa').controller('paTrialCtrl', paTrialCtrl);

    paTrialCtrl.$inject = ['TrialService', 'uiGridConstants', '$scope', '$rootScope', 'Common', '$uibModal',
        'studySourceObj', 'phaseObj', 'primaryPurposeObj', '$state', 'trialStatusObj', 'PATrialService',
        'milestoneObj', 'processingStatusObj', 'protocolIdOriginObj', 'researchCategoriesObj', 'nciDivObj',
        'nciProgObj', 'submissionTypesObj', 'submissionMethodsObj', 'internalSourceObj', '_'];

    function paTrialCtrl(TrialService, uiGridConstants, $scope, $rootScope, Commo, $uibModal,
                         studySourceObj, phaseObj, primaryPurposeObj, $state, trialStatusObj, PATrialService,
                         milestoneObj, processingStatusObj, protocolIdOriginObj, researchCategoriesObj, nciDivObj,
                         nciProgObj, submissionTypesObj, submissionMethodsObj, internalSourceObj, _) {

        var vm = this;
        var fromStateName = $state.fromState.name || '';
        vm.searchParams = PATrialService.getInitialTrialSearchParams();
        // clean search params
        vm.studySourceArr = studySourceObj;
        vm.phaseArr = phaseObj;
        vm.primaryPurposeArr = primaryPurposeObj;
        vm.trialStatusArr = trialStatusObj;
        vm.milestoneArr = milestoneObj;
        vm.processingStatusArr = processingStatusObj;
        console.info('protocolIdOriginObj: ', protocolIdOriginObj);
        vm.protocolIdOriginArr = protocolIdOriginObj.filter(function(idType) {
            var types = idType.section.split(',') || [];
            return _.contains(types, 'pa') || _.contains(types, 'paSearch');
        });
        vm.researchCategoriesArr = researchCategoriesObj;
        vm.nciDivArr = nciDivObj;
        vm.nciProgArr = nciProgObj;
        vm.submissionTypesArr = submissionTypesObj;
        vm.submissionMethodsArr = submissionMethodsObj;
        vm.internalSourceArr = internalSourceObj;
        vm.gridScope = vm;
        vm.searching = false;

        //ui-grid plugin options
        vm.gridOptions = PATrialService.getGridOptions();
        //vm.gridOptions.enableVerticalScrollbar = uiGridConstants.scrollbars.NEVER;
        //vm.gridOptions.enableHorizontalScrollbar = uiGridConstants.scrollbars.NEVER;

        vm.gridOptions.exporterAllDataFn = function () {
            var allSearchParams = angular.copy(vm.searchParams);
            var origGridColumnDefs = angular.copy(vm.gridOptions.columnDefs);

            allSearchParams.start = null;
            allSearchParams.rows = null;

            return PATrialService.searchTrialsPa(allSearchParams).then(
                function (data) {
                    var status = data.server_response.status;

                    if (status >= 200 && status <= 210) {
                        vm.gridOptions.useExternalPagination = false;
                        vm.gridOptions.useExternalSorting = false;
                        vm.gridOptions.data = data['trials'];

                        vm.gridOptions.columnDefs = origGridColumnDefs;
                    }
                }
            );
        };

        vm.gridOptions.onRegisterApi = function (gridApi) {
            vm.gridApi = gridApi;
            vm.gridApi.core.on.sortChanged($scope, sortChangedCallBack);
            vm.gridApi.pagination.on.paginationChanged($scope, function (newPage, pageSize) {
                vm.searchParams.start = newPage;
                vm.searchParams.rows = pageSize;
                vm.searchTrials();
            });
        }; //gridOptions

        var FIELDS_REQUIRED = ['protocol_id', 'protocol_origin_type_codes', 'phases',
                                'pilot', 'org_types', 'study_sources', 'processing_status',
                                'submission_type', 'nih_nci_div', 'checkout', 'official_title',
                                'purposes', 'pi', 'org', 'trial_status', 'milestone', 'research_category',
                                'submission_method', 'nih_nci_prog', 'internal_sources']; // at least one field must be filled
        vm.searchTrials = function () {
            vm.isEmptySearch = true;
            for (var i = 0; i < FIELDS_REQUIRED.length; i++) {
                var field = FIELDS_REQUIRED[i];
                var value = vm.searchParams[field];
                if (field in vm.searchParams && angular.isDefined(value)) {
                    vm.isEmptySearch = angular.isArray(value) ? value.length === 0 : false;
                }
                if (vm.isEmptySearch === false) {
                    break;
                }
            }

            if (vm.isEmptySearch) {
                vm.searchWarningMessage = 'At least one selection value must be entered prior to running the search';
                vm.gridOptions.totalItems = null;
                vm.gridOptions.data = [];
                return;
            }

            vm.searching = true;
            vm.searchParams.protocol_origin_type = _.map(vm.searchParams.protocol_origin_type_codes, function(type) {
                return type.id;
            });
            PATrialService.searchTrialsPa(vm.searchParams).then(function (data) {
                var status = data.server_response.status;

                if (status >= 200 && status <= 210) {
                    vm.gridOptions.data = data.trials;
                    vm.gridOptions.totalItems = data.total;
                }
            }).catch(function (err) {
                console.error('search trial failed');
            }).finally(function () {
                console.log('finished search');
                vm.searching = false;
            });
        };

        vm.resetSearch = function () {
            vm.searchParams = PATrialService.getInitialTrialSearchParams();
            Object.keys(vm.searchParams).forEach(function (key, index) {
                vm.searchParams[key] = '';
            });

            vm.gridOptions.data = [];
            vm.gridOptions.totalItems = null;
        };

        $scope.takeTrialAction = function (actionType, trialId) {
            if (actionType === 'Complete') {
                $state.go('main.trialDetail', {trialId: trialId});
            } else if (actionType === 'Update') {
                $state.go('main.trialDetail', {trialId: trialId, editType: 'update'});
            }
        };

        activate();

        /****************************** implementations **************************/

        function activate() {
            if (fromStateName !== 'main.pa.trialOverview') {
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
            if (sortColumns.length === 0) {
                //remove sorting
                vm.searchParams.sort = '';
                vm.searchParams.order = '';
            } else {
                vm.searchParams.sort = sortColumns[0].name; //sort the column
                switch (sortColumns[0].sort.direction) {
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
        } //sortChangedCallBack
    }
})();
