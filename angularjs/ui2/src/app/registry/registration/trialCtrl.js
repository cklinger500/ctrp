/**
 * Created by wus4 on 9/24/15.
 */

(function () {
    'use strict';

    angular.module('ctrp.app.registry').controller('trialCtrl', trialCtrl);

    trialCtrl.$inject = ['TrialService', 'uiGridConstants', 'uiGridExporterConstants', 'uiGridExporterService', '$scope', '$rootScope', 'Common', '$uibModal',
                         'studySourceObj', 'phaseObj', 'primaryPurposeObj', '$state', 'trialStatusObj','HOST','OrgService'];

    function trialCtrl(TrialService, uiGridConstants, uiGridExporterConstants, uiGridExporterService, $scope, $rootScope, Commo, $uibModal,
                       studySourceObj, phaseObj, primaryPurposeObj, $state, trialStatusObj,HOST,OrgService) {

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

        OrgService.setTypeAheadOrgNameSearch(vm);

        //ui-grid plugin options
        var actionTemplate = '<div ng-if="row.entity.actions.length > 0" class="btn-group" ng-class="{\'dropup\': grid.renderContainers.body.visibleRowCache.indexOf(row) > 4}">'
            + '<button class="btn btn-default btn-xs dropdown-toggle" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">'
            + 'Action <span class="caret"></span>'
            + '</button>'
            + '<ul class="dropdown-menu dropdown-menu-right"><li ng-repeat="action in row.entity.actions">'
            + '<a ng-if="action == \'add-my-site\'" ui-sref="main.addParticipatingSite({trialId: row.entity.id})">{{grid.appScope.capitalizeFirst(action)}}</a>'
            + '<a ng-if="action == \'update-my-site\'" ui-sref="main.participatingSiteDetail({psId: row.entity.my_site_id})">{{grid.appScope.capitalizeFirst(action)}}</a>'
            + '<a ng-if="action == \'manage-sites\'" ui-sref="main.manageParticipatingSite({trialId: row.entity.id})">{{grid.appScope.capitalizeFirst(action)}}</a>'
            + '<a ng-if="action == \'verify-data\'" ui-sref="main.verifyTrialData({trialId: row.entity.id})">{{grid.appScope.capitalizeFirst(action)}}</a>'
            + '<a ng-if="action == \'view-tsr\'" href="{{grid.appScope.downloadTSRUrl}}/{{row.entity.id}}">{{grid.appScope.capitalizeFirst(action)}}</a>'
            + '<a ng-if="[\'add-my-site\', \'update-my-site\', \'manage-sites\', \'verify-data\', \'view-tsr\'].indexOf(action) < 0" ui-sref="main.trialDetail({trialId: row.entity.id, editType: action})">{{grid.appScope.capitalizeFirst(action)}}</a>'
            + '</li></ul>'
            + '</div>';

        vm.gridOptions = {
            enableColumnResizing: true,
            totalItems: null,
            rowHeight: 22,
            enableRowSelection: true,
            enableRowHeaderSelection: true,
            paginationPageSizes: [20, 50, 100],
            paginationPageSize: 20,
            useExternalPagination: true,
            useExternalSorting: true,
            enableGridMenu: true,
            enableFiltering: false,
            columnDefs: [],
            exporterCsvFilename: 'trials.csv',
            exporterMenuAllData: true,
            exporterMenuPdf: false,
            exporterMenuCsv: false,
            gridMenuCustomItems: [{
                title: 'Export All Data As CSV',
                order: 100,
                action: function ($event){
                    this.grid.api.exporter.csvExport(uiGridExporterConstants.ALL, uiGridExporterConstants.ALL);
                }
            }]
        };

        $scope.$watch(function() {return vm.searchParams.searchType;}, function(newVal, oldVal) {
            if (newVal === 'My Trials') {
                vm.gridOptions.columnDefs = [
                    {
                        name: 'nci_id', displayName: 'NCI Trial Identifier', enableSorting: true, minWidth: '120', width: '*',
                        cellTemplate: '<div class="ui-grid-cell-contents tooltip-uigrid" title="{{COL_FIELD}}">' + '<a ui-sref="main.viewTrial({trialId: row.entity.id })">{{COL_FIELD CUSTOM_FILTERS}}</a></div>'
                    },
                    {
                        name: 'official_title', enableSorting: true, minWidth: '200', width: '*',
                        cellTemplate: '<div class="ui-grid-cell-contents tooltip-uigrid" title="{{COL_FIELD}}">' + '{{COL_FIELD CUSTOM_FILTERS}}</div>'
                    },
                    {
                        name: 'lead_org_name', displayName: 'Lead Organization', enableSorting: true, minWidth: '200', width: '*',
                        cellTemplate: '<div class="ui-grid-cell-contents tooltip-uigrid" title="{{COL_FIELD}}">' + '{{COL_FIELD CUSTOM_FILTERS}}</div>'
                    },
                    {
                        name: 'lead_protocol_id', displayName: 'Lead Org Trial Identifier', enableSorting: true, minWidth: '170', width: '*', sort: { direction: 'asc', priority: 1},
                        cellTemplate: '<div class="ui-grid-cell-contents tooltip-uigrid" title="{{COL_FIELD}}">' + '<a ui-sref="main.viewTrial({trialId: row.entity.id })">{{COL_FIELD CUSTOM_FILTERS}}</a></div>'
                    },
                    {
                        name: 'pi', displayName: 'Principal Investigator', enableSorting: true, minWidth: '200', width: '*',
                        cellTemplate: '<div class="ui-grid-cell-contents tooltip-uigrid" title="{{COL_FIELD}}">' + '{{COL_FIELD CUSTOM_FILTERS}}</div>'
                    },
                    {
                        name: 'ctg_id', displayName: 'ClinicalTrials.gov Identifier', enableSorting: false, minWidth: '180', width: '*',
                        cellTemplate: '<div class="ui-grid-cell-contents tooltip-uigrid" title="{{COL_FIELD}}">' + '{{COL_FIELD CUSTOM_FILTERS}}</div>'
                    },
                    {name: 'other_ids',displayName:'Other Identifiers', enableSorting: true, minWidth: '400', width: '25%',
                        cellTemplate: '<div class="ui-grid-cell-contents tooltip-uigrid" title="{{COL_FIELD}}">' + '{{COL_FIELD CUSTOM_FILTERS}}</div>'
                    },
                    {
                        name: 'current_trial_status', enableSorting: false, minWidth: '170', width: '*',
                        cellTemplate: '<div class="ui-grid-cell-contents tooltip-uigrid" title="{{COL_FIELD}}">' + '{{COL_FIELD CUSTOM_FILTERS}}</div>'
                    },
                    {
                        name: 'current_processing_status', enableSorting: false, minWidth: '220', width: '*',
                        cellTemplate: '<div class="ui-grid-cell-contents tooltip-uigrid" title="{{COL_FIELD}}">' + '{{COL_FIELD CUSTOM_FILTERS}}</div>'
                    },
                    {
                        name: 'display_name', displayName: 'Available Actions', enableSorting: false, minWidth: '100', width: '*',
                        cellTemplate: actionTemplate, cellClass: 'action-btn'
                    },
                    {
                        name: 'accrual_disease_term_name', displayName: 'Accrual Disease Terminology', enableSorting: false, minWidth: '90', width: '*'
                    },
                    {
                        name: 'phase_name', enableSorting: true, minWidth: '90', width: '*'
                    },
                    {
                        name: 'purpose', displayName: 'Primary Purpose', enableSorting: true, minWidth: '120', width: '*',
                        cellTemplate: '<div class="ui-grid-cell-contents tooltip-uigrid" title="{{COL_FIELD}}">' + '{{COL_FIELD CUSTOM_FILTERS}}</div>'
                    },
                    {
                        name: 'research_category_name', displayName: 'Clinical Research Category', enableSorting: false, minWidth: '120', width: '*'
                    },
                    {
                        name: 'start_date', displayName: 'Trial Start Date', enableSorting: false, minWidth: '120', width: '*',
                        cellTemplate: '<div class="ui-grid-cell-contents tooltip-uigrid" title="{{COL_FIELD}}">' + '{{COL_FIELD CUSTOM_FILTERS | date: "dd-MMM-yyyy"}}</div>'
                    },
                    {
                        name: 'responsible_party_name', enableSorting: false, minWidth: '170', width: '*'
                    },
                    {
                        name: 'sponsor_name', enableSorting: true, minWidth: '200', width: '*',
                        cellTemplate: '<div class="ui-grid-cell-contents tooltip-uigrid" title="{{COL_FIELD}}">' + '{{COL_FIELD CUSTOM_FILTERS}}</div>'
                    },
                    {
                        name: 'study_source_name', enableSorting: true, minWidth: '170', width: '*',
                        cellTemplate: '<div class="ui-grid-cell-contents tooltip-uigrid" title="{{COL_FIELD}}">' + '{{COL_FIELD CUSTOM_FILTERS}}</div>'
                    },
                    {
                        name: 'verification_date', displayName: 'Record Verification Date', enableSorting: false, minWidth: '120', width: '*',
                        cellTemplate: '<div class="ui-grid-cell-contents tooltip-uigrid" title="{{COL_FIELD}}">' + '{{COL_FIELD CUSTOM_FILTERS | date: "dd-MMM-yyyy"}}</div>'
                    },
                    {
                        name: 'submitter', enableSorting: false, minWidth: '200', width: '*',
                        cellTemplate: '<div class="ui-grid-cell-contents tooltip-uigrid" title="{{COL_FIELD}}">' + '{{COL_FIELD CUSTOM_FILTERS}}</div>'
                    },
                    {
                        name: 'primary_comp_date', displayName: 'Primary Completion Date', enableSorting: false, minWidth: '120', width: '*',
                        cellTemplate: '<div class="ui-grid-cell-contents tooltip-uigrid" title="{{COL_FIELD}}">' + '{{COL_FIELD CUSTOM_FILTERS | date: "dd-MMM-yyyy"}}</div>'
                    },
                    {
                        name: 'last_updated_at', displayName: 'Last Update Submitted', enableSorting: false, minWidth: '120', width: '*',
                        cellTemplate: '<div class="ui-grid-cell-contents tooltip-uigrid" title="{{COL_FIELD}}">' + '{{COL_FIELD CUSTOM_FILTERS | date: "dd-MMM-yyyy"}}</div>'
                    },
                    {
                        name: 'last_updated_by', displayName: 'Last Updater Name', enableSorting: false, minWidth: '200', width: '*',
                        cellTemplate: '<div class="ui-grid-cell-contents tooltip-uigrid" title="{{COL_FIELD}}">' + '{{COL_FIELD CUSTOM_FILTERS}}</div>'
                    },
                    {
                        name: 'last_amended_at', displayName: 'Last Amendment Submitted', enableSorting: false, minWidth: '120', width: '*',
                        cellTemplate: '<div class="ui-grid-cell-contents tooltip-uigrid" title="{{COL_FIELD}}">' + '{{COL_FIELD CUSTOM_FILTERS | date: "dd-MMM-yyyy"}}</div>'
                    },
                    {
                        name: 'last_amended_by', displayName: 'Last Amender Name', enableSorting: false, minWidth: '200', width: '*',
                        cellTemplate: '<div class="ui-grid-cell-contents tooltip-uigrid" title="{{COL_FIELD}}">' + '{{COL_FIELD CUSTOM_FILTERS}}</div>'
                    },
                    {
                        name: 'onhold_reason', displayName: 'On-Hold Reason', enableSorting: false, minWidth: '200', width: '*',
                        cellTemplate: '<div class="ui-grid-cell-contents tooltip-uigrid" title="{{COL_FIELD}}">' + '{{COL_FIELD CUSTOM_FILTERS}}</div>'
                    }
                ]
            } else if (newVal === 'All Trials') {
                vm.gridOptions.columnDefs = [
                    {
                        name: 'nci_id', displayName: 'NCI Trial Identifier', enableSorting: true, minWidth: '120', width: '*',
                        cellTemplate: '<div class="ui-grid-cell-contents tooltip-uigrid" title="{{COL_FIELD}}">' + '<a ui-sref="main.viewTrial({trialId: row.entity.id })">{{COL_FIELD CUSTOM_FILTERS}}</a></div>'
                    },
                    {
                        name: 'official_title', enableSorting: true, minWidth: '200', width: '*',
                        cellTemplate: '<div class="ui-grid-cell-contents tooltip-uigrid" title="{{COL_FIELD}}">' + '{{COL_FIELD CUSTOM_FILTERS}}</div>'
                    },
                    {
                        name: 'current_trial_status', enableSorting: false, minWidth: '170', width: '*',
                        cellTemplate: '<div class="ui-grid-cell-contents tooltip-uigrid" title="{{COL_FIELD}}">' + '{{COL_FIELD CUSTOM_FILTERS}}</div>'
                    },
                    {
                        name: 'lead_org_name', displayName: 'Lead Organization', enableSorting: true, minWidth: '200', width: '*',
                        cellTemplate: '<div class="ui-grid-cell-contents tooltip-uigrid" title="{{COL_FIELD}}">' + '{{COL_FIELD CUSTOM_FILTERS}}</div>'
                    },
                    {
                        name: 'lead_protocol_id', displayName: 'Lead Org Trial Identifier', enableSorting: true, minWidth: '170', width: '*', sort: { direction: 'asc', priority: 1},
                        cellTemplate: '<div class="ui-grid-cell-contents tooltip-uigrid" title="{{COL_FIELD}}">' + '<a ui-sref="main.viewTrial({trialId: row.entity.id })">{{COL_FIELD CUSTOM_FILTERS}}</a></div>'
                    },
                    {
                        name: 'ctg_id', displayName: 'ClinicalTrials.gov Identifier', enableSorting: false, minWidth: '180', width: '*',
                        cellTemplate: '<div class="ui-grid-cell-contents tooltip-uigrid" title="{{COL_FIELD}}">' + '{{COL_FIELD CUSTOM_FILTERS}}</div>'
                    },
                    {name: 'other_ids', displayName:'Other Identifiers',enableSorting: true, minWidth: '400', width: '25%',
                        cellTemplate: '<div class="ui-grid-cell-contents tooltip-uigrid" title="{{COL_FIELD}}">' + '{{COL_FIELD CUSTOM_FILTERS}}</div>'
                    },
                    {
                        name: 'pi', displayName: 'Principal Investigator', enableSorting: true, minWidth: '200', width: '*',
                        cellTemplate: '<div class="ui-grid-cell-contents tooltip-uigrid" title="{{COL_FIELD}}">' + '{{COL_FIELD CUSTOM_FILTERS}}</div>'
                    },
                    {
                        name: 'display_name', displayName: 'Available Actions', enableSorting: false, minWidth: '100', width: '*',
                        cellTemplate: actionTemplate, cellClass: 'action-btn'
                    }
                ]
            } else {
                vm.gridOptions.columnDefs = [
                    {
                        name: 'official_title', enableSorting: true, minWidth: '200', width: '*',
                        cellTemplate: '<div class="ui-grid-cell-contents tooltip-uigrid" title="{{COL_FIELD}}">' + '{{COL_FIELD CUSTOM_FILTERS}}</div>'
                    },
                    {
                        name: 'lead_org_name', displayName: 'Lead Organization', enableSorting: true, minWidth: '200', width: '*',
                        cellTemplate: '<div class="ui-grid-cell-contents tooltip-uigrid" title="{{COL_FIELD}}">' + '{{COL_FIELD CUSTOM_FILTERS}}</div>'
                    },
                    {
                        name: 'lead_protocol_id', displayName: 'Lead Org Trial Identifier', enableSorting: true, minWidth: '170', width: '*', sort: { direction: 'asc', priority: 1},
                        cellTemplate: '<div class="ui-grid-cell-contents tooltip-uigrid" title="{{COL_FIELD}}">' + '<a ui-sref="main.viewTrial({trialId: row.entity.id })">{{COL_FIELD CUSTOM_FILTERS}}</a></div>'
                    },
                    {
                        name: 'display_name', displayName: 'Available Actions', enableSorting: false, minWidth: '100', width: '*',
                        cellTemplate: actionTemplate, cellClass: 'action-btn'
                    }
                ]
            }
        });

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

        vm.gridOptions.exporterAllDataFn = function () {
            var allSearchParams = angular.copy(vm.searchParams);
            var origGridColumnDefs = angular.copy(vm.gridOptions.columnDefs);

            allSearchParams.start = null;
            allSearchParams.rows = 10000000; // To get back all results, for now

            return TrialService.searchTrials(allSearchParams).then(function (data) {
                var status = data.server_response.status;

                if (status >= 200 && status <= 210) {
                    vm.gridOptions.useExternalPagination = false;
                    vm.gridOptions.useExternalSorting = false;
                    vm.gridOptions.data = data['trials'];

                    vm.gridOptions.columnDefs = origGridColumnDefs;
                }
            });
        };


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

            if (!vm.searchParams.organization_id) {
                vm.searchParams.org = vm.organization_name;
                Object.keys(vm.searchParams).forEach(function (key) {
                    if (excludedKeys.indexOf(key) === -1 && vm.searchParams[key] && vm.searchParams[key] !== '' && vm.searchParams[key].length !== 0) {
                        isEmptySearch = false;
                    }
                });
            } else {
                vm.searchParams.org = undefined;
                isEmptySearch = false;
            }

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
                    var status = data.server_response.status;

                    if (status >= 200 && status <= 210) {
                        vm.gridOptions.data = data.trials;
                        vm.gridOptions.totalItems = data.total;
                    }
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
