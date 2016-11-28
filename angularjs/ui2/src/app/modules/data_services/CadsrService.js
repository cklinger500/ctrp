/**
 * Created by wangg5 on 6/2/15.
 */

(function () {
    'use strict';

    angular.module('ctrp.module.dataservices')
        .factory('CadsrService', CadsrService);

    CadsrService.$inject = ['URL_CONFIGS', 'MESSAGES', '$log', '_',
        'GeoLocationService', 'Common', '$rootScope', 'PromiseTimeoutService','UserService'];

    function CadsrService(URL_CONFIGS, MESSAGES, $log, _,
                          GeoLocationService, Common, $rootScope,
                          PromiseTimeoutService,UserService) {

        var statesOrProvinces = [];
        var initialCadsrSearchParams = {

            highlight_query_text: 'Yes',
            case_sensitive_search: 'No',
            public_id : '',
            search_term : '',

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
                {name: 'pv_name',displayName:'Permissible Value (with synonyms)', enableSorting: true, minWidth: '100', width: '*'},
                {name: 'meaning', enableSorting: true, minWidth: '100', width: '*'},
                {name: 'description', enabledSorting: true , minWidth: '100', width: '*'},
                {name: 'cadsr_id',displayName:'Public ID', enabledSorting: true , minWidth: '100', width: '*'}
            ]
        };

        var services = {
            getInitialCadsrSearchParams : getInitialCadsrSearchParams,
            getGridOptions : getGridOptions,
            searchCadsrs: searchCadsrs
        };

        return services;



        /*********************** implementations *****************/

        function searchCadsrs(obj){
            return PromiseTimeoutService.postDataExpectObj(URL_CONFIGS.CADSR_SEARCH, obj);

        }


        function getGridOptions() {
            return gridOptions;
        }

        function getInitialCadsrSearchParams() {
            return initialCadsrSearchParams;
        }



    }


})();
