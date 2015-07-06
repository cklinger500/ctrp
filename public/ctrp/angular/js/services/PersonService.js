/**
 * Created by wus4 on 7/2/15.
 */

(function () {
    'use strict';

    angular.module('ctrpApp')
        .factory('PersonService', PersonService);

    PersonService.$inject = ['PromiseService', 'URL_CONFIGS','$log', '$rootScope'];

    function PersonService(PromiseService, URL_CONFIGS, $log, $rootScope) {

        var initPersonSearchParams = {
            name: "",
            po_id: "",
            source_id: "",
            source_status: "",
            prefix: "",
            suffix: "",
            email: "",
            phone: "",

            //for pagination and sorting
            sort: "",
            order: "",
            rows: 10,
            start: 1
            }; //initial Person Search Parameters

        var gridOptions = {
            enableColumnResizing: true,
            rowHeight: 60,
            paginationPageSizes: [10, 25, 50, 100],
            paginationPageSize: 10,
            useExternalPagination: true,
            useExternalSorting: true,
            enableGridMenu: true,
            enableFiltering: true,
            columnDefs: [
                {name: 'id', enableSorting: true, displayName: 'PO ID', width: '7%'},
                {name: 'name', enableSorting: true, width: '20%',
                    cellTemplate: '<div class="ui-grid-cell-contents tooltip-uigrid" title="{{COL_FIELD}}">' +
                    '<a ui-sref="main.orgDetail({orgId : row.entity.id })">{{COL_FIELD CUSTOM_FILTERS}}</a></div>'
                },
                {name: 'source_id', displayName: 'Source ID', enableSorting: true, width: '10%'},
                {name: 'source_status', displayName: 'Source Status', enableSorting: true, width: '13%'},
                {name: 'prefix', enableSorting: true, width: '10%'},
                {name: 'suffix', enableSorting: true, width: '12%'},
                {name: 'email', enableSorting: true, width: '18%',
                    cellTemplate: '<div class="ui-grid-cell-contents tooltip-uigrid" title="{{COL_FIELD}}">' +
                    '{{COL_FIELD CUSTOM_FILTERS}}</div>'
                },
                {name: 'phone', enableSorting: true, width: '10%'}
            ]
        };

        var services = {
            getAllPeople : getAllPeople,
            getPersonById : getPersonById,
            upsertPerson : upsertPerson,
            searchPeople : searchPeople,
            getInitialPersonSearchParams : getInitialPersonSearchParams,
            getGridOptions : getGridOptions,
            getSourceStatuses : getSourceStatuses,
            deletePerson : deletePerson
        };

        return services;



        /*********************** implementations *****************/

        function getAllPeople() {
            return PromiseService.getData(URL_CONFIGS.PERSON_LIST);
        } //getAllPeople


        function getPersonById(personId) {
            return PromiseService.getData(URL_CONFIGS.A_PERSON + personId + '.json');
        } //getPersonById


        /**
         * Update or insert a new person
         *
         * @param orgObj
         * @returns {*}
         */
        function upsertPerson(orgObj) {
            if (personObj.new) {
                //create a new person
                $log.info('creating an person: ' + JSON.stringify(personObj));
                return PromiseService.postDataExpectObj(URL_CONFIGS.PERSON_LIST, personObj);
            }

            //update an existing person
            var configObj = {}; //empty config
            return PromiseService.updateObj(URL_CONFIGS.A_PERSON + personObj.id + ".json", personObj, configObj);
        } //upsertPerson




        /**
         *
         * @param searchParams, JSON object whose keys can include:
         * name, po_id, source_id, source_status, family_name, address, address2, city, state_province, country,
         * postal_code, and email
         *
         * @returns Array of JSON objects
         */
        function searchPeople(searchParams) {
            if (!!searchParams) {
                return PromiseService.postDataExpectObj(URL_CONFIGS.SEARCH_PERSON, searchParams);
            }
        } //searchPeople




        /**
         * get initial paramater object for people search
         * @return initPersonSearchParams
         */
        function getInitialPersonSearchParams() {
            return initPersonSearchParams;
        } //getInitialPersonSearchParams



        function getGridOptions() {
            return gridOptions;
        }

        /**
         *
         * @returns {Array}, sorted A-Z
         */
        function getStatesOrProvinces() {
            return statesOrProvinces;
        }



        /**
         * A helper function:
         * Use $rootScope to broadcast messages
         * @param msgCode
         * @param msgContent
         */
        function broadcastMsg(msgCode, msgContent) {
            $rootScope.$broadcast(msgCode, {content: msgContent});
        } //broadcastMsg


        /**
         * retrieve source statuses from backend service
         * @return {promise}
         */
        function getSourceStatuses() {
            return PromiseService.getData(URL_CONFIGS.SOURCE_STATUSES);
        } //getSourceStatuses


        /**
         * delete an person with the given personId
         *
         * @param personId
         * @returns {*}
         */
        function deletePerson(personId) {
            return PromiseService.deleteObjFromBackend(URL_CONFIGS.A_PERSON + personId + ".json");
        }




    }


})();