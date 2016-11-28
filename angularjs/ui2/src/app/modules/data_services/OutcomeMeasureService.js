/**
 * Created by wangg5 on 6/2/15.
 */

(function () {
    'use strict';

    angular.module('ctrp.module.dataservices')
        .factory('OutcomeMeasureService', OutcomeMeasureService);

    OutcomeMeasureService.$inject = ['URL_CONFIGS', 'MESSAGES', '$log', '_',
        'GeoLocationService', 'Common', '$rootScope', 'PromiseTimeoutService','UserService'];

    function OutcomeMeasureService(URL_CONFIGS, MESSAGES, $log, _,
                          GeoLocationService, Common, $rootScope,
                          PromiseTimeoutService,UserService) {

        var statesOrProvinces = [];
        var initOrgSearchParams = {
            name : '',
            alias: true,
            wc_search: true,
            // po_id : '',
            ctrp_id : '',
            source_context : '',
            source_id : '',
            source_status : '',
            family_name : '',
            address : '',
            address2 : '',
            city : '',
            state_province : '',
            country : '', //default country ? United States ?
            email : '',
            postal_code : '',
            phone: '',

            //for pagination and sorting
            sort: '',
            order: '',
            rows: 20,
            start: 1
        }; //initial Organization Search Parameters

        var gridOptions = {
            rowTemplate: '<div>'+
            '<div>' +
            ' <div ng-repeat="(colRenderIndex, col) in colContainer.renderedColumns track by col.colDef.name"' +
            ' class="ui-grid-cell" ng-class="{ \'ui-grid-row-header-cell\': col.isRowHeader,' +
            ' \'nonselectable-row\': grid.appScope.curationShown && grid.appScope.userRole === \'curator\' &&' +
            ' grid.appScope.rowFormatter( row )}" ui-grid-cell></div></div>',
            enableColumnResizing: true,
            totalItems: null,
            rowHeight: 22,
            // enableFullRowSelection: true,
            enableSelectAll: false,
            //enableRowSelection: false,
            paginationPageSizes: [20, 50, 100],
            paginationPageSize: 20,
            useExternalPagination: true,
            useExternalSorting: true,
            enableGridMenu: true,
            enableFiltering: true,
            columnDefs: [
                {name: 'outcome_measure_type', enableSorting: true, minWidth: '100', width: '*'},
                {name: 'title', enableSorting: true, minWidth: '100', width: '*'},
                {name: 'time_frame', enableSorting: true, minWidth: '100', width: '*'},
                {name: 'description', enableSorting: true, minWidth: '100', width: '*'},
                {name: 'safety_issue', enableSorting: true, minWidth: '100', width: '*'},
                {
                    name: 'Delete',
                    cellTemplate: '<button class="btn primary" ng-click="grid.appScope.deleteRow(row)">Delete</button>'
                }


            ]
        };

        var services = {
            getGridOptions : getGridOptions,
            getOutcomeMeasures : getOutcomeMeasures,
            getOutcomeMeasureTypes : getOutcomeMeasureTypes

        };

        return services;



        /*********************** implementations *****************/

        function getOutcomeMeasures(){
            return PromiseTimeoutService.getData(URL_CONFIGS.OUTCOME_MEASURE_LIST);

        }


        function getGridOptions() {
            return gridOptions;
        }

        /**
         * retrieve out come measures types from backend service
         * @return {promise}
         */
        function getOutcomeMeasureTypes() {
            return PromiseTimeoutService.getData(URL_CONFIGS.OUTCOME_MEASURE_TYPES);
        } //getSourceStatuses

    }


})();
