/**
 * Created by wangg5 on 4/15/2016.
 */

(function() {
  'use strict';

  angular.module('ctrpApp.widgets')
  .directive('ctrpNcitInterventionsSearch', ctrpNcitInterventionsSearch);

  ctrpNcitInterventionsSearch.$inject = ['$timeout', '_', 'PATrialService', 'Common', '$compile', 'uiGridConstants'];

  function ctrpNcitInterventionsSearch($timeout, _, PATrialService, Common, $compile, uiGridConstants) {

      var directive = {
        link: linkerFn,
        priority: 2000,
        restrict: 'E',
        require: '^ngModel',
        scope: {
          maxRowSelectable: '=?',
          ngModel: '='
        },
        controller: nciInterventionsSearchCtrl,
        controllerAs: 'interventionsLookupView',
        templateUrl: 'app/modules/widgets/trial/ctrp.imported-ncit-interventions-search-template.html'
      };

      return directive;

      function linkerFn(scope, element, attrs, ngModelCtrl) {
         // $compile(element.contents())(scope); // compile the template
         scope.setSelectedIntervention = function(selection) {
             //console.info('selection is set: ', selection);
             ngModelCtrl.$setViewValue(selection); // set the value of the ng-model with the selection
         }; // setSelectedIntervention to be used in the below controller
      } // linkerFn

      function nciInterventionsSearchCtrl($scope, $element, $attrs) {
          var vm = this;
          vm.errorMsg = '';
          vm.lookupInterventions = lookupInterventions;
          vm.resetSearch = resetSearch;
          // vm.confirmSelectedIntervention = confirmSelectedIntervention;
          vm.searchParams = _getSearchParams();
          vm.searchResults = _initResultsObj();
          vm.gridOptions = _getGridOptions();
          vm.curSelectedRow = '';
          $scope.submitted = false; // form submitted?

          $scope.$on('$destroy', function() {vm.curSelectedRow = '';}); // clean up

          function lookupInterventions(params) {
              $scope.submitted = true;
              if (params.intervention_name.length === 0) {
                  vm.errorMsg = 'Intervention Name is Required';
                  return;
              }
              vm.errorMsg = '';
              PATrialService.lookupNcitInterventions(params).then(function(res) {
                  var status = res.server_response.status;

                  if (status >= 200 && status <= 210) {
                     res.server_response = null;
                     vm.searchResults = res;
                     vm.gridOptions.data = res.data;
                     vm.gridApi.core.refresh();
                     vm.gridOptions.totalItems = res.total;
                 }
              }).catch(function(err) {
                  console.error('err in the lookup: ', err);
                  vm.searchResults = _initResultsObj();
              });
          };

         function resetSearch() {
              $scope.submitted = false;
              vm.searchParams = _getSearchParams();
              vm.gridOptions.data = [];
              vm.gridOptions.totalItems = null;
              vm.searchResults.total = -1;
          }

          function _getGridOptions() {
              var gridOptions = {};
              // gridOptions.enableColumnResizing = true;
              gridOptions.totalItems = null;
              gridOptions.rowHeight = 22;
              gridOptions.enableSelectAll = false;
              gridOptions.paginationPageSizes = [20, 50, 100];
              gridOptions.paginationPageSize = 20;
              gridOptions.useExternalPagination = true;
              gridOptions.useExternalSorting = true;
              gridOptions.enableGridMenu = true;
              gridOptions.enableFiltering = true;
              gridOptions.multiSelect = $scope.maxRowSelectable > 1;
              // columns
              gridOptions.columnDefs = getColumnDefs();
              gridOptions.enableVerticalScrollbar = 2;
              gridOptions.enableHorizontalScrollbar = 2;
              // call backs for events
              gridOptions.onRegisterApi = function(gridApi) {
                  vm.gridApi = gridApi;
                  vm.gridApi.core.on.sortChanged($scope, sortChangedCallBack);
                  vm.gridApi.pagination.on.paginationChanged($scope, function(newPage, pageSize) {
                      vm.searchParams.start = newPage;
                      vm.searchParams.rows = pageSize;
                      lookupInterventions(vm.searchParams);
                  });
                  vm.gridApi.core.refresh();

                  gridApi.selection.on.rowSelectionChanged($scope, rowSelectionCallBack);
                  gridApi.selection.on.rowSelectionChangedBatch($scope, function(rows) {
                      _.each(rows, function(row, index) {
                        rowSelectionCallBack(row);
                      });
                  });
              }
              return gridOptions;
          } // _getGridOptions

          function sortChangedCallBack(grid, sortColumns) {
              if (sortColumns.length === 0) {
                  //console.log("removing sorting");
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
                      case 'undefined':
                          break;
                  }
              }
              lookupInterventions(vm.searchParams);
          } // sortChangedCallBack

          function rowSelectionCallBack(rowObj, event) {
             // console.info('rowSelectionCallBack: ', event, rowObj.entity);
                if (rowObj.isSelected) {
                    vm.curSelectedRow = rowObj.entity;
                    $scope.setSelectedIntervention(rowObj.entity || '');
                } else {
                    rowObj.isSelected = false;
                    vm.curSelectedRow = '';
                    $scope.setSelectedIntervention('');
                }
          } // rowSelectionCallBack

          function getColumnDefs() {
              return [
                  {
                      name:'preferred_name',
                      headerName: 'Preferred Name',
                      width:'20%',
                      enableSorting: true,
                      enableFiltering: true,
                      sort: {direction: 'asc', priority: 1},
                      cellTemplate: '<div class="ui-grid-cell-contents tooltip-uigrid" title="{{COL_FIELD}}">{{COL_FIELD CUSTOM_FILTERS}}</div>'
                  },
                  {
                      name:'c_code',
                      headerName: 'C\-Code',
                      width:'7%',
                      enableSorting: true,
                      enableFiltering: true,
                      sort: {direction: 'asc', priority: 1},
                      cellTemplate: '<div class="ui-grid-cell-contents tooltip-uigrid" title="{{COL_FIELD}}">{{COL_FIELD CUSTOM_FILTERS}}</div>'
                  },
                  {
                      name:'synonyms',
                      headerName: 'Synonyms',
                      width:'35%',
                      enableSorting: true,
                      enableFiltering: true,
                      cellTemplate: '<div class="ui-grid-cell-contents tooltip-uigrid" title="{{COL_FIELD}}">{{COL_FIELD CUSTOM_FILTERS}}</div>'
                  },
                  {
                      name: 'definition',
                      headerName: 'Definition',
                      width: '*',
                      enableSorting: false,
                      enableFiltering: false,
                      cellTemplate: '<div class="ui-grid-cell-contents tooltip-uigrid" title="{{COL_FIELD}}">{{COL_FIELD CUSTOM_FILTERS}}</div>'
                  }
              ];
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
                  rows: 20,
                  start: 1,
                  intervention_name: '' // against either preferred_name or synonyms in ncit_interventions table
              };
          } // _getSearchParams
      } // nciInterventionsSearchCtrl


  }

  })();
