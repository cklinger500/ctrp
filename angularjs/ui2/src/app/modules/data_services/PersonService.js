/**
 * Created by wus4 on 7/2/15.
 */

(function () {
    'use strict';

    angular.module('ctrp.module.dataservices')
        .factory('PersonService', PersonService);

    PersonService.$inject = ['PromiseService', 'URL_CONFIGS','$log',
            '$rootScope', 'PromiseTimeoutService','UserService','Common', 'uiGridExporterConstants', 'uiGridExporterService'];

    function PersonService(PromiseService, URL_CONFIGS, $log,
                $rootScope, PromiseTimeoutService,UserService,Common, uiGridExporterConstants, uiGridExporterService) {

        var initPersonSearchParams = {
            fname: '',
            mname: '',
            lname: '',
            //po_id: '',
            //ctrp_id: '',
            wc_search:true,
            source_context: '', //default
            source_id: '',
            source_status: '',
            prefix: '',
            suffix: '',
            email: '',
            phone: '',
            startDate: '',  //updated_at
            endDate: '',   //updated_at
            date_range_arr: [],
            affiliated_org_name: '',
            updated_by: '',

            //for pagination and sorting
            sort: 'lname',
            order: 'ASC',
            rows: 20,
            start: 1
            }; //initial Person Search Parameters

        var gridOptions = {
            rowTemplate: '<div ng-class="{ \'nonselectable-row-css-class\': grid.appScope.rowFormatter( row ) }">'+
            '<div>' +
            ' <div ng-repeat="(colRenderIndex, col) in colContainer.renderedColumns track by col.colDef.name"' +
            ' class="ui-grid-cell" ng-class="{ \'ui-grid-row-header-cell\': col.isRowHeader }"  ui-grid-cell></div>' +
            '</div>',
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
            enableFiltering: false,
            enableHorizontalScrollbar: 2,
            enableVerticalScrollbar: 2,
            exporterCsvFilename: 'persons.csv',
            exporterMenuAllData: true,
            exporterMenuPdf: false,
            exporterMenuCsv: false,
            gridMenuCustomItems: [{
                title: 'Export All Data As CSV',
                order: 100,
                action: function ($event){
                    this.grid.api.exporter.csvExport(uiGridExporterConstants.ALL, uiGridExporterConstants.ALL);
                }
            }],
            columnDefs: [
                {name: 'Nullify', displayName: 'Nullify',
                    enableSorting: false, enableFiltering: false,
                    minWidth: '75', width: '*',
                    cellTemplate: '<div ng-if="row.isSelected"><input type="radio" name="nullify"' +
                    ' ng-click="grid.appScope.nullifyEntity(row.entity)"></div>',
                    visible: false
                },
                {name: 'ctrp_id', enableSorting: true, displayName: 'CTRP ID', minWidth: '100', width: '*'},
                {name: 'multiview_ctep_id', enableSorting: true, displayName: 'CTEP ID', minWidth: '100', width: '*'},
                {name: 'fname', displayName: 'First', enableSorting: true,  minWidth: '100', width: '*',
                    cellTemplate: '<div class="ui-grid-cell-contents tooltip-uigrid" title="{{COL_FIELD}}">' +
                    '<a ui-sref="main.personDetail({personId : row.entity.id })">{{COL_FIELD CUSTOM_FILTERS}}</a></div>'
                },
                {name: 'mname', displayName: 'Middle', enableSorting: true, minWidth: '100', width: '*',
                    cellTemplate: '<div class="ui-grid-cell-contents tooltip-uigrid" title="{{COL_FIELD}}">' +
                    '<a ui-sref="main.personDetail({personId : row.entity.id })">{{COL_FIELD CUSTOM_FILTERS}}</a></div>'
                },
                {name: 'lname', displayName: 'Last', enableSorting: true, minWidth: '100', width: '*', sort: { direction: 'asc', priority: 1},
                    cellTemplate: '<div class="ui-grid-cell-contents tooltip-uigrid" title="{{COL_FIELD}}">' +
                    '<a ui-sref="main.personDetail({personId : row.entity.id })">{{COL_FIELD CUSTOM_FILTERS}}</a></div>'
                },

                {name: 'source_context', displayName: 'Source Context',
                    enableSorting: true, minWidth: '160', width: '*'},
                {name: 'source_status', displayName: 'Source Status', enableSorting: true, minWidth: '135', width: '*'},
                {name: 'source_id', displayName: 'Source ID', enableSorting: true, minWidth: '105', width: '*'},
                {name: 'email', enableSorting: true, minWidth: '105', width: '*',
                    cellTemplate: '<div class="ui-grid-cell-contents tooltip-uigrid" title="{{COL_FIELD}}">' +
                    '{{COL_FIELD CUSTOM_FILTERS}}</div>'
                },
                {name: 'phone', enableSorting: true, minWidth: '100', width: '*',
                    cellTemplate: '<div class="ui-grid-cell-contents tooltip-uigrid" title="{{COL_FIELD}}">' +
                    '{{COL_FIELD CUSTOM_FILTERS}}</div>'
                },
                {name: 'affiliated_orgs', displayName:'Affiliated Orgs',
                    minWidth: '150', width: '*', enableSorting: false, enableFiltering: false,
                    cellTemplate:'<div class="ui-grid-cell-contents tooltip-uigrid" ng-if="row.entity.affiliated_orgs.length > 0" title="{{COL_FIELD}}">{{COL_FIELD}}</div>' +
                    //' <master-directive button-label="Click to see" mod="row.entity.affiliated_orgs">' +
                    //'</master-directive></div>' +
                    '<div class="text-center" ng-show="row.entity.affiliated_orgs.length == 0">--</div>'},
                {name: 'updated_at', displayName: 'Last Updated Date',
                    type: 'date', cellFilter: 'date: "dd-MMM-yyyy H:mm"',
                    enableSorting: true, minWidth: '150', width: '*'},
                {name: 'updated_by', displayName: 'Last Updated By',
                    enableSorting: true, minWidth: '150', width: '*'},
                {name: 'prefix', enableSorting: true, minWidth: '75', width: '*'},
                {name: 'suffix', enableSorting: true, minWidth: '75', width: '*'},
                {name: 'id', displayName: 'Context ID', enableSorting: true, minWidth: '75', width: '*'},
                {name: 'processing_status', displayName: 'Processing Status', enableSorting: true, minWidth: '100', width: '*'},
                {name: 'service_request_name', displayName: 'Service Request', enableSorting: true, minWidth: '75', width: '*'},
            ]
        };

        var services = {
            getAllPeople : getAllPeople,
            getPersonById : getPersonById,
            upsertPerson : upsertPerson,
            searchPeople : searchPeople,
            getInitialPersonSearchParams : getInitialPersonSearchParams,
            getGridOptions : getGridOptions,
            getSourceContexts : getSourceContexts,
            getSourceStatuses : getSourceStatuses,
            deletePerson : deletePerson,
            getPoAffStatuses : getPoAffStatuses,
            curatePerson : curatePerson,
            checkUniquePerson : checkUniquePerson,
            extractFullName: extractFullName,
            associatePersonContext: associatePersonContext,
            removePersonAssociation: removePersonAssociation,
            cloneCtepPerson: cloneCtepPerson,
            isPersonNullifiable: isPersonNullifiable,
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
         * @param personObj
         * @returns {*}
         */
        function upsertPerson(personObj) {
            if (personObj.new) {
                //create a new person
                $log.info('creating n person: ' + JSON.stringify(personObj));
                return PromiseService.postDataExpectObj(URL_CONFIGS.PERSON_LIST, personObj);
            }

            //update an existing person
            var configObj = {}; //empty config
            return PromiseService.updateObj(URL_CONFIGS.A_PERSON + personObj.person.id + '.json', personObj, configObj);
        } //upsertPerson



        /**
         *
         * @param searchParams, JSON object whose keys can include:
         * fname, lname, po_id, source_id, source_status, prefix, suffix, email, phone
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
            var user_role= !!UserService.getUserRole() ? UserService.getUserRole().split('_')[1].toLowerCase() : '';
            // var curator_role = 'curator';
            if (user_role !== 'curator') {
                initPersonSearchParams.wc_search = false;
            }
            return initPersonSearchParams;
        } //getInitialPersonSearchParams

        function getGridOptions(usedInModal) {
            //var user_role= !!UserService.getUserRole() ? UserService.getUserRole().split('_')[1].toLowerCase() : '';
            var user_role = !!UserService.getUserRole() ? UserService.getUserRole() : '';
            var options = angular.copy(gridOptions); // make a copy

            if (user_role === 'ROLE_CURATOR') {
                // var updated_at_index = Common.indexOfObjectInJsonArray(options.columnDefs, 'name', 'updated_at');
                var updatedAtIndex = _.findIndex(options.columnDefs, {name: 'updated_at'});
                if (updatedAtIndex >= 0)
                    options.columnDefs.splice(updatedAtIndex, 1);

                var updatedByIndex = _.findIndex(options.columnDefs, {name: 'updated_by'});
                if (updatedByIndex >= 0)
                    options.columnDefs.splice(updatedByIndex,1);
            } else if (user_role === 'ROLE_TRIAL-SUBMITTER' || user_role === 'ROLE_SITE-SU') {
                // splice out columns: context id, Processing Status, and Service Request from trial submitter role
                var filtered = ['id', 'processing_status', 'service_request', 'updated_at', 'updated_by'];
                options.columnDefs = _.filter(options.columnDefs, function(col) {
                    return !_.contains(filtered, col.name);
                });
            }
            if (usedInModal === true) {
                // var nullify_index = Common.indexOfObjectInJsonArray(options.columnDefs, 'name', 'Nullify');
                var nullifyIndex = _.findIndex(options.columnDefs, {name: 'Nullify'});
                if (nullifyIndex > -1) {
                    options.columnDefs.splice(nullifyIndex, 1);
                }
            }

            return options;
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
         * retrieve source contexts from backend service
         * @return {promise}
         */
        function getSourceContexts() {
            return PromiseService.getData(URL_CONFIGS.SOURCE_CONTEXTS);
        } //getSourceContexts

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
            return PromiseService.deleteObjFromBackend(URL_CONFIGS.A_PERSON + personId + '.json');
        }


        /**
         * Retrieve PoAffiliationStatuses
         * @returns {*}
         */
        function getPoAffStatuses() {
            return PromiseTimeoutService.getData(URL_CONFIGS.PO_AFF_STATUSES);
        }

        function associatePersonContext(ctepPersonId, ctrpId) {
            // plug in the url params
            var url = URL_CONFIGS.ASSOCIATE_PERSON;
            url = url.replace('{:ctep_person_id}', ctepPersonId);
            url = url.replace('{:ctrp_id}', ctrpId);
            return PromiseTimeoutService.getData(url);
        }
        /**
         * Remove person context association
         * @param  {[type]} ctepPersonId [description]
         * @return {[type]}              [description]
         */
        function removePersonAssociation(ctepPersonId) {
            var url = URL_CONFIGS.REMOVE_PERSON_ASSOCIATION;
            url = url.replace('{:ctep_person_id}', ctepPersonId);
            return PromiseTimeoutService.getData(url);
        }

        function isPersonNullifiable(personId) {
            var url = URL_CONFIGS.PERSON_NULLIFIABLE;
            url = url.replace('{:person_id}', personId);
            return PromiseTimeoutService.getData(url);
        }

        /**
         * Nullify a person and merge his/her association to the retained person
         *
         * @param curationObject, JSON object: {'id_to_be_nullified': '', 'id_to_be_retained': ''}
         */
        function curatePerson(curationObject) {
            return PromiseTimeoutService.postDataExpectObj(URL_CONFIGS.CURATE_PERSON, curationObject);
        }

        function cloneCtepPerson(ctepPersonId, forceClone) {
            var data = {
                ctep_person_id: ctepPersonId,
                force_clone: forceClone || false,
            };
            return PromiseTimeoutService.postDataExpectObj(URL_CONFIGS.CLONE_CTEP_PERSON, data);
        }


        /**
         * Check if a person name is unique - based on First & last names only. No middle name.
         *
         * @param curationObject, JSON object: {'person_fname': '', 'person_lname': ''}
         */
        function checkUniquePerson(name) {
            return PromiseTimeoutService.postDataExpectObj(URL_CONFIGS.UNIQUE_PERSON, name);
        }


        /**
         * Extract the person's full name from the personObj
         * @param  {JSON} personObj [required fields: fname (String); mname (String); lname (String)]
         * @param  {String} format  'fl': 'first name last name', 'lf': 'last name, first name', 'lfm': 'last name, first name middle name'
         * @return {String}           [full name, e.g. 'John Middle Doe']
         */
        function extractFullName(personObj, format) {
            if (!personObj) {
                return '';
            }
            var fullName = '';
            var firstName = personObj.fname || '';
            var middleName = personObj.mname || '';
            var lastName = personObj.lname || '';

            if (format) {
                switch (format) {
                    case 'lf':
                        fullName = lastName + ', ' + firstName;
                        break;
                    case 'lfm':
                        fullName = lastName + ', ' + firstName + ' ' + middleName;
                        break;
                    default:
                        fullName = firstName + lastName;
                }
            } else {
                fullName += firstName;
                fullName += !!middleName ? (' ' + middleName) : '';
                fullName += !!lastName ? (' ' + lastName) : '';
            }

            return fullName;
        }
    }
})();
