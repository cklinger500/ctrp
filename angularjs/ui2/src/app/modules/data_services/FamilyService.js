/**
 * Created by wus4 on 7/2/15.
 */

(function () {
    'use strict';

    angular.module('ctrp.module.dataservices')
        .factory('FamilyService', FamilyService);

    FamilyService.$inject = ['PromiseService', 'URL_CONFIGS','$log',
                '$rootScope','PromiseTimeoutService','UserService'];

    function FamilyService(PromiseService, URL_CONFIGS, $log,
                $rootScope, PromiseTimeoutService,UserService) {

        var initFamilySearchParams = {
            name: '',
            wc_search: true,
            po_id: '',
            family_status:'',
            family_type:'',
            //for pagination and sorting
            sort: '',
            order: '',
            rows: 20,
            start: 1
        }; //initial Family Search Parameters

        var gridOptions = {
            enableColumnResizing: true,
            totalItems: null,
            rowHeight: 22,
            paginationPageSizes: [20, 50, 100],
            paginationPageSize: 20,
            useExternalPagination: true,
            useExternalSorting: true,
            enableGridMenu: true,
            enableFiltering: false,
            enableHorizontalScrollbar: 2,
            enableVerticalScrollbar: 2,
            columnDefs: [
                {name: 'name', enableSorting: true, displayName: 'Family Name', minWidth: '120', width: '*', sort: { direction: 'asc', priority: 1},
                    cellTemplate: '<div class="ui-grid-cell-contents tooltip-uigrid" title="{{COL_FIELD}}">' +
                    '<a ui-sref="main.familyDetail({familyId : row.entity.id })">{{COL_FIELD CUSTOM_FILTERS}}</a></div>'
                },
                {name: 'family_status', displayName: 'Family Status', enableSorting: true, minWidth: '100', width: '*'},
                {name: 'family_type', displayName: 'Family Type', enableSorting: true, minWidth: '120', width: '*'},
                {name: 'aff_org_count', displayName: 'Membership Size', minWidth: '170', width: '*'}
            ]
        };

        var services = {
            getAllFamilies : getAllFamilies,
            getFamilyById : getFamilyById,
            upsertFamily : upsertFamily,
            searchFamilies : searchFamilies,
            getInitialFamilySearchParams : getInitialFamilySearchParams,
            getGridOptions : getGridOptions,
            deleteFamily : deleteFamily,
            getFamilyStatuses : getFamilyStatuses,
            getFamilyTypes : getFamilyTypes,
            getFamilyRelationships :getFamilyRelationships,
            getAffiliatedOrgsByFamilyId :getAffiliatedOrgsByFamilyId,
            checkUniqueFamily : checkUniqueFamily
        };

        return services;



        /*********************** implementations *****************/

        function getAllFamilies() {
            return PromiseService.getData(URL_CONFIGS.FAMILY_LIST);
        } //getAllPeople


        function getFamilyById(familyId) {
            return PromiseService.getData(URL_CONFIGS.A_FAMILY + familyId + '.json');
        } //getFamilyById

        function getAffiliatedOrgsByFamilyId(familyId) {
            return PromiseService.getData(URL_CONFIGS.A_FAMILY + familyId + '/get_orgs.json');
        }
        /**
         * Update or insert a new family
         *
         * @param familyObj
         * @returns {*}
         */
        function upsertFamily(familyObj) {
            if (familyObj.new) {
                //create a new family
                $log.info('creating a family: ' + JSON.stringify(familyObj));
                return PromiseService.postDataExpectObj(URL_CONFIGS.FAMILY_LIST, familyObj);
            }

            //update an existing family
            var configObj = {}; //empty config
            return PromiseService.updateObj(URL_CONFIGS.A_FAMILY + familyObj.id + '.json', familyObj, configObj);
        } //upsertfamily




        /**
         *
         * @param searchParams, JSON object whose keys can include:
         * name, status and type
         *
         * @returns Array of JSON objects
         */
        function searchFamilies(searchParams) {
            if (!!searchParams) {
                return PromiseService.postDataExpectObj(URL_CONFIGS.SEARCH_FAMILY, searchParams);
            }
        } //searchPeople




        /**
         * get initial paramater object for people search
         * @return initFamilySearchParams
         */
        function getInitialFamilySearchParams() {
            var user_role= !!UserService.getUserRole() ? UserService.getUserRole().split('_')[1].toLowerCase() : '';
            var curator_role = 'curator';
            if(user_role.toUpperCase() !== curator_role.toUpperCase()) {
                initFamilySearchParams.wc_search = false;
            }
            return initFamilySearchParams;
        } //getInitialFamilySearchParams



        function getGridOptions() {
            return gridOptions;
        }


        /**
         * retrieve family statuses from backend service
         * @return {promise}
         */
        function getFamilyStatuses() {
            return PromiseService.getData(URL_CONFIGS.FAMILY_STATUSES);
        } //getFamilyStatuses

        /**
         * retrieve family types from backend service
         * @return {promise}
         */
        function getFamilyTypes() {
            return PromiseService.getData(URL_CONFIGS.FAMILY_TYPES);
        } //getFamilyStatuses

        function getFamilyRelationships() {
            return PromiseService.getData(URL_CONFIGS.FAMILY_RELATIONSHIPS);
        }

        /**
         * delete an family with the given familyId
         *
         * @param familyId
         * @returns {*}
         */
        function deleteFamily(familyId) {
            return PromiseService.deleteObjFromBackend(URL_CONFIGS.A_FAMILY + familyId + '.json');
        }

        /**
         * Check if a family name is unique
         *
         * @param curationObject, JSON object: {'family_name': ''}
         */
        function checkUniqueFamily(name) {
            return PromiseTimeoutService.postDataExpectObj(URL_CONFIGS.UNIQUE_FAMILY, name);
        }



    }


})();
