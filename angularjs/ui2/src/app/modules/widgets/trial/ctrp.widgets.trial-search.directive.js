/**
 * Created by wangg5 on 3/15/2016.
 */

(function() {
  'use strict';

  angular.module('ctrpApp.widgets')
  .directive('ctrpPaTrialSearch', ctrpPaTrialSearch);

  ctrpPaTrialSearch.$inject = ['$compile', '$log', '$timeout', '_', 'PATrialService',
      'UserService', '$mdToast', '$document', 'Common', 'MESSAGES', 'DateService', '$state'];

  function ctrpPaTrialSearch($compile, $log, $timeout, _, PATrialService, $mdToast, $document, Common, MESSAGES, DateService, $state) {

        var directive = {
          link: link,
          restrict: 'E',
          scope: {
            showGrid: '=?',
            usedInModal: '=?',
            maxRowSelectable: '=?',
            // trialSearchResults: '@',
            // selectedTrialsArray: '@'
          },
          controller: paTrialSearchCtrl,
          controllerAs: 'trialSearchView',
          templateUrl: 'app/modules/widgets/trial/ctrp.pa-trial-search-template.html'
        };

        return directive;

        function link(scope, element, attrs) {
            // scope.name = 'Tony';
        } //link

        function paTrialSearchCtrl($scope, $element, $attrs) {
            var vm = this;
            vm.searchParams = PATrialService.getInitialTrialSearchParams();
            vm.numTrialsFound = -1;
            // ag-grid options
            vm.gridOptions = getGridOptions();

            // actions
            vm.resetSearch = resetSearch;
            vm.searchTrials = searchTrials;

            activate();
            function activate() {
                _resolveFormFieldsData();
            }

            function _resolveFormFieldsData() {
                PATrialService.groupPATrialSearchFieldsData().then(function(res) {
                    vm.studySourceArr = res[0];
                    vm.phaseArr = res[1];
                    vm.primaryPurposeArr = res[2];
                    vm.trialStatusArr = res[3];
                    vm.protocolIdOriginArr = res[4];
                    vm.milestoneArr = res[5];
                    vm.researchCategoriesArr = res[6];
                    vm.nciDivArr = res[7];
                    vm.nciProgArr = res[8];
                    vm.submissionTypesArr = res[9];
                    vm.submissionMethodsArr = res[10];
                    vm.processingStatusArr = res[11];
                })
                .catch(function(err) {
                    console.error('failed to resolve: ', err);
                });
            }

            function searchTrials() {
                vm.searching = true;
                PATrialService.searchTrialsPa(vm.searchParams).then(function (data) {
                    var status = res.server_response.status;

                    if (status >= 200 && status <= 210) {
                        $log.info('received research results: ', data.trials);
                        vm.gridOptions.api.setRowData(data.trials);
                        vm.gridOptions.api.refreshView();
                        vm.numTrialsFound = data.trials.length;
                    }
                }).catch(function (err) {
                    console.log('search trial failed');
                }).finally(function() {
                    console.log('finished search');
                    vm.searching = false;
                });
            };


            function resetSearch() {
                vm.searchParams = PATrialService.getInitialTrialSearchParams();
                vm.gridOptions.api.setRowData([]);
                Object.keys(vm.searchParams).forEach(function(key, index) {
                    vm.searchParams[key] = '';
                });
                vm.searchWarningMessage = '';
            };

            var pageSize = 10; // 10 items per page
            function getGridOptions() {

                var options = {
                     enableServerSideSorting: true,
                     enableServerSideFilter: true,
                     rowModelType: 'pagination',
                     columnDefs: getColumnDefs(),
                     rowSelection: $scope.maxRowSelectable > 1 ? 'multiple' : 'single',
                     onSelectionChanged: onRowSelectionChanged, // for all rows
                     onRowSelected: rowSelectedCallback, // current selected row (single row)
                     enableColResize: true,
                     enableSorting: true,
                     enableFilter: true,
                     // groupHeaders: true,
                     rowHeight: 25,
                     onModelUpdated: onModelUpdated,
                     suppressRowClickSelection: false
                 };
                 // options.datasource = tableDataSource;
                 return options;
            }

            function onRowSelectionChanged() {
                var selectedRows = vm.gridOptions.api.getSelectedRows();
                var selectedNodes = vm.gridOptions.api.getSelectedNodes();
                var selectionCounts = vm.gridOptions.api.getSelectedNodes().length;

                if (selectionCounts > $scope.maxRowSelectable) {
                    var oldestNode = vm.gridOptions.api.getSelectedNodes()[0];
                    // vm.gridOptions.api.deselectNode(oldestNode, false); // deselect
                    vm.gridOptions.api.deselectIndex(0, true);
                }
            } // onRowSelectionChanged

            function rowSelectedCallback(event) {
                var curSelectedNode = event.node;
                var curSelectedRowObj = curSelectedNode.data;
                // var selectionCounts = vm.gridOptions.api.getSelectedNodes().length;
                var selectedRows = vm.gridOptions.api.getSelectedRows();
                // if (selectionCounts > $scope.maxRowSelectable) {
                //     var oldestNode = vm.gridOptions.api.getSelectedNodes()[0];
                //     // vm.gridOptions.api.deselectNode(oldestNode, false); // deselect
                //     vm.gridOptions.api.deselectIndex(0, true);
                // }
            }

            function onModelUpdated() {
                console.info('on model updated triggered!');
            } // onModelUpdated

            function getColumnDefs() {
                // {headerCellTemplate: '<strong>Head</strong>'}
                var colDefs = [
                    {headerName: '', width: 30, checkboxSelection: true,
                         suppressSorting: true, suppressMenu: true, pinned: true},
                    {headerName: 'NCI ID', field: 'nci_id', width: 150, unSortIcon: false, editable: false},
                    {headerName: 'Lead Protocol ID', field: 'lead_protocol_id', width: 170},
                    {headerName: 'Official Title', field: 'official_title', width: 240},
                    {headerName: 'Phase', field: 'phase', width: 70},
                    {headerName: 'Purpose', field: 'purpose', width: 100},
                    {headerName: 'Pilot?', field: 'pilot', width: 70},
                    {headerName: 'Principal Investigator', field: 'pi', width: 170},
                    {headerName: 'Lead Organization', field: 'lead_org', width: 180},
                    {headerName: 'Sponsor', field: 'sponsor', width: 150},
                    {headerName: 'Current Trial Status', field: 'current_trial_status', width: 150},
                    {headerName: 'Current Milestone', field: 'current_milestone', width: 170},
                    {headerName: 'Scientific Milestone', field: 'scientific_milestone', width: 190},
                    {headerName: 'Admin Milestone', field: 'admin_milestone', width: 180},
                    {headerName: 'Other IDs', field: 'other_ids', width: 120},
                    {headerName: 'Current Processing Status', field: 'current_processing_status', width: 160},
                    {headerName: 'Submission Type', field: 'submission_type', width: 150},
                    {headerName: 'Submission Method', field: 'submission_method', width: 160},
                    {headerName: 'Submission Source', field: 'submission_source', width: 160},
                    {headerName: 'NIH NCI Div', field: 'nih_nci_div', width: 130},
                    {headerName: 'NIH NCI Prog', field: 'nih_nci_prog', width: 130}
                 ];

                return colDefs;
            }

            var tableDataSource = {
                getRows: getRows,
                pageSize: vm.searchParams.rows,
                rowCount: 100,
                overflowSize: 100,
                maxConcurrentRequests: 3
            };

            function getRows(params) {
                params.startRow = (vm.searchParams.start - 1) * vm.searchParams.rows;
                params.endRow = vm.searchParams.start * vm.searchParams.rows;
                params.successCallback = function() {
                    console.info('success in getRows');
                }
                return params;
            }

        } //ctrpPATrialSearch
    }

})();
