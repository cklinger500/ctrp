/**
 * Created by wangg5 on 4/15/2016.
 */

(function() {
  'use strict';

  angular.module('ctrpApp.widgets')
  .directive('ctrpNcitInterventionsSearch', ctrpNcitInterventionsSearch);

  ctrpNcitInterventionsSearch.$inject = ['$timeout', '_', 'PATrialService', 'Common', '$compile'];

  function ctrpNcitInterventionsSearch($timeout, _, PATrialService, Common, $compile) {

      var directive = {
        link: linkerFn,
        priority: 2000,
        restrict: 'E',
        require: '^ngModel',
        scope: {
          maxRowSelectable: '=?'
        },
        controller: nciInterventionsSearchCtrl,
        controllerAs: 'interventionsLookupView',
        templateUrl: 'app/modules/widgets/trial/ctrp.imported-ncit-interventions-search-template.html'
      };

      return directive;

      function linkerFn(scope, element, attrs, ngModelCtrl) {
          console.info('in linkerFn: ', scope.maxRowSelectable);
         // $compile(element.contents())(scope); // compile the template
         scope.setSelectedRow = function(selection) {
             console.info('selection is set: ', selection);
             ngModelCtrl.$setViewValue(selection); // set the value of the ng-model with the selection
         }; // setSelectedRow to be used in the below controller
      } // linkerFn

      function nciInterventionsSearchCtrl($scope, $element, $attrs) {
          var vm = this;
          vm.lookupInterventions = lookupInterventions;
          vm.resetSearch = resetSearch;
          vm.searchParams = _getSearchParams();
          vm.searchResults = _initResultsObj();
          vm.gridOptions = _getGridOptions();

          function lookupInterventions(params) {
              PATrialService.lookupNcitInterventions(params).then(function(res) {
                 console.info('res from the interventions lookup: ', res);
                 res.server_response = null;
                 vm.searchResults = res;
                 vm.gridOptions.api.setRowData(res.data);
                 vm.gridOptions.api.refreshView();
              }).catch(function(err) {
                  console.error('err in the lookup: ', err);
                  vm.searchResults = _initResultsObj();
              });
          };

         function resetSearch() {
              vm.searchParams = _getSearchParams();
              vm.gridOptions.api.setRowData([]);
          };

          function _getGridOptions() {

              var options = {
                   enableServerSideSorting: true,
                   enableServerSideFilter: true,
                   rowModelType: 'pagination',
                   columnDefs: getColumnDefs(),
                   rowSelection: vm.maxRowSelectable > 1 ? 'multiple' : 'single',
                //   onSelectionChanged: onRowSelectionChanged, // for all rows
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
          } // _getGridOptions

          function rowSelectedCallback(event) {
            //   console.info('is node selected? ', vm.gridOptions.api.isNodeSelected(event.node), event.node.id);
              var curSelectedNode = event.node;
            //   console.log('node props: ', curSelectedNode);
              var curSelectedRowObj = curSelectedNode.data;
              $scope.setSelectedRow(curSelectedRowObj); // method from linkerFn
              var selectedRows = vm.gridOptions.api.getSelectedRows();
          }

          function onModelUpdated() {
              console.info('on model updated triggered!');
          } // onModelUpdated

          function getColumnDefs() {
              // {headerCellTemplate: '<strong>Head</strong>'}
              var colDefs = [
                  {headerName: 'Select', width: 80, checkboxSelection: true,
                       suppressSorting: true, suppressMenu: true, pinned: true},
                  {headerName: 'Preferred Name', field: 'preferred_name', width: 280, unSortIcon: false, editable: true},
                  {headerName: 'Other Names', field: 'synonyms', width: 370},
                  {headerName: 'Type Code', field: 'type_code', width: 140},
                  {headerName: 'ClinicalTrials.gov Type Code', field: 'ct_gov_type_code', width: 220},
                  {headerName: 'Description', field: 'description'},
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

          function _initResultsObj() {
              var results = angular.copy(vm.searchParams);
              results.data = [];
              results.total = -1;
              return results;
          }

          function _getSearchParams() {
              return {
                  sort: '',
                  order: '',
                  rows: 10,
                  start: 1,
                  intervention_name: '' // against either preferred_name or synonyms in ncit_interventions table
              };
          } // _getSearchParams
      } // nciInterventionsSearchCtrl


  }

  })();
