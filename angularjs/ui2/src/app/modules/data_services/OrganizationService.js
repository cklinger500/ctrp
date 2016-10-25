/**
 * Created by wangg5 on 6/2/15.
 */

(function () {
    'use strict';

    angular.module('ctrp.module.dataservices')
        .factory('OrgService', OrgService);

    OrgService.$inject = ['URL_CONFIGS', 'MESSAGES', '$log', '_',
        'GeoLocationService', 'Common', '$rootScope', 'PromiseTimeoutService','UserService', 'uiGridExporterConstants', 'uiGridExporterService'];

    function OrgService(URL_CONFIGS, MESSAGES, $log, _,
                        GeoLocationService, Common, $rootScope,
                        PromiseTimeoutService,UserService, uiGridExporterConstants, uiGridExporterService) {

        var statesOrProvinces = [];
        var initOrgSearchParams = {
            name : '',
            alias: true,
            wc_search: true,
            ctrp_id: '',
            source_context: '',
            source_id: '',
            source_status: '',
            family_name: '',
            address: '',
            address2: '',
            city: '',
            state_province : '',
            country: '', //default country ? United States ?
            email: '',
            postal_code: '',
            phone: '',
            processing_status: '',
            service_request_name: '',

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
            enableFiltering: false,
            exporterCsvFilename: 'organizations.csv',
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
                    enableSorting: false,
                    enableFiltering: false,
                    minWidth: '100', width: '*',
                    cellTemplate: '<div ng-if="row.isSelected"><input type="radio" name="nullify"' +
                    ' ng-click="grid.appScope.nullifyEntity(row.entity)"></div>',
                    visible: false
                },
                {name: 'ctrp_id', displayName: 'CTRP ID',
                    enableSorting: true,
                    minWidth: '100',
                    width: '*'},

                {name: 'multiview_ctep_id', displayName: 'CTEP ID', enableSorting: true, minWidth: '100', width: '*'},

                {
                    name: 'name', enableSorting: true, minWidth: '300', width: '*', sort: { direction: 'asc', priority: 1},
                    //this does not work for .id
                    cellTemplate: '<div class="ui-grid-cell-contents tooltip-uigrid"' +
                    ' title="{{COL_FIELD}}">' +
                    ' <a ui-sref="main.orgDetail({orgId : row.entity.id })">' +
                    ' {{COL_FIELD CUSTOM_FILTERS}}</a></div>'

                },
                {name: 'source_status', displayName: 'Source Status',
                    enableSorting: true, width: '150'},
                {name: 'source_context', displayName: 'Source Context',
                    enableSorting: true, width: '150'},
                {name: 'source_id', displayName: 'Source ID',
                    enableSorting: true, width: '150'},

                {name: 'aff_families_names', displayName: 'Family Name',
                    enableSorting: true, minWidth: '150', width: '*',height: '50%',
                    cellTemplate: '<div class="ui-grid-cell-contents tooltip-uigrid" ng-repeat="fam in row.entity.aff_families_names track by $index"' +
                    ' title="{{COL_FIELD}}">{{COL_FIELD}}</div>'
                },
                {name: 'phone_with_ext', displayName: 'Phone', enableSorting: true, minWidth: '170', width: '*'},
                {name: 'email', enableSorting: true, minWidth: '200', width: '*',
                    cellTemplate: '<div class="ui-grid-cell-contents tooltip-uigrid" title="{{COL_FIELD}}">' +
                    '{{COL_FIELD CUSTOM_FILTERS}}</div>'
                },
                {name: 'city', displayName: 'City',
                    enableSorting: true, minWidth: '150', width: '*'},
                {name: 'state_province', displayName: 'State',
                    enableSorting: true, minWidth: '150', width: '*'},
                {name: 'country', displayName: 'Country',
                    enableSorting: true, minWidth: '150', width: '*'},
                {name: 'postal_code', displayName: 'Postal Code',
                    enableSorting: true, minWidth: '150', width: '*'},
                {name: 'id', displayName: 'Context Org ID',
                    enableSorting: true, minWidth: '150', width: '150'},
                {name: 'processing_status', displayName: 'Processing Status',
                    enableSorting: true, minWidth: '150', width: '150'},
                {name: 'service_request_name', displayName: 'Service Request',
                    enableSorting: true, minWidth: '150', width: '150'},
                {name: 'updated_by', displayName: 'Last Updated By',
                    enableSorting: true, minWidth: '150', width: '*'},
                {name: 'updated_at', displayName: 'Last Updated Date',
                    type: 'date', cellFilter: 'date: "dd-MMM-yyyy H:mm"',
                    enableSorting: true, minWidth: '160', width: '*'}


            ]
        };

        var services = {
            getAllOrgs: getAllOrgs,
            getOrgById: getOrgById,
            upsertOrg: upsertOrg,
            getAssociatedOrgs: getAssociatedOrgs,
            disAssociateOrgs: disAssociateOrgs,
            searchOrgs: searchOrgs,
            getInitialOrgSearchParams: getInitialOrgSearchParams,
            getGridOptions: getGridOptions,
            watchCountrySelection: watchCountrySelection,
            getStatesOrProvinces: getStatesOrProvinces,
            getSourceContexts: getSourceContexts,
            getSourceStatuses: getSourceStatuses,
            deleteOrg: deleteOrg,
            indexOfOrganization: indexOfOrganization,
            preparePOAffiliationArr: preparePOAffiliationArr,
            initSelectedOrg: initSelectedOrg,
            curateOrg: curateOrg,
            findContextId: findContextId,
            checkUniqueOrganization: checkUniqueOrganization,
            typeAheadOrgNameSearch: typeAheadOrgNameSearch,
            setTypeAheadOrg: setTypeAheadOrg,
            getServiceRequests: getServiceRequests,
            getProcessingStatuses: getProcessingStatuses,
            cloneCtepOrg: cloneCtepOrg,
            getSourceStatuses2: getSourceStatuses2
        };

        return services;



        /*********************** implementations *****************/

        function getAllOrgs() {
            return PromiseTimeoutService.getData(URL_CONFIGS.ORG_LIST);
        } //getAllOrgs


        function getOrgById(orgId) {
            return PromiseTimeoutService.getData(URL_CONFIGS.AN_ORG + orgId + '.json');
        } //getOrgById


        /**
         * Update or insert a new organization
         *
         * @param orgObj
         * @returns {*}
         */
        function upsertOrg(orgObj) {
            if (orgObj.new) {
                return PromiseTimeoutService.postDataExpectObj(URL_CONFIGS.ORG_LIST, orgObj);
            }

            //update an existing organization
            var configObj = {};
            return PromiseTimeoutService.updateObj(URL_CONFIGS.AN_ORG + orgObj.id + '.json', orgObj, configObj);
        } //upsertOrg

        /**
         * Get associated organizations
         *
         * @param getAssociatedOrgs
         * @returns {*}
         */
        function getAssociatedOrgs(orgObj) {
            return PromiseTimeoutService.postDataExpectObj(URL_CONFIGS.ASSOCIATED_ORGS, orgObj);
        } //getAssociatedOrgs


        /**
         * dis associate organizations
         *
         * @param disAssociateOrgs
         * @returns {*}
         */
        function disAssociateOrgs(orgObj) {
            return PromiseTimeoutService.postDataExpectObj(URL_CONFIGS.DISASSOCIATE_ORGS, orgObj);
        } //disAssociateOrgs

        /**
         *
         * @param searchParams, JSON object whose keys can include:
         * name, po_id, source_id, source_status, family_name, address, address2, city, state_province, country,
         * postal_code, and email
         *
         * @returns Array of JSON objects
         */
        function searchOrgs(searchParams) {
            if (!!searchParams) {
                return PromiseTimeoutService.postDataExpectObj(URL_CONFIGS.SEARCH_ORG, searchParams);
            }
        } //searchOrgs




        /**
         * get initial paramater object for organizations search
         * @return initOrgSearchParams
         */
        function getInitialOrgSearchParams() {
            var user_role= !!UserService.getUserRole() ? UserService.getUserRole().split('_')[1].toLowerCase() : '';
            var curator_role = 'curator';
            if(user_role.toUpperCase() !== curator_role.toUpperCase()) {
                initOrgSearchParams.wc_search = false;
            }
            return initOrgSearchParams;
        } //getInitialOrgSearchParams



        function getGridOptions(usedInModal) {
            var allowedROLES= ['ROLE_ADMIN', 'ROLE_SUPER', 'ROLE_ABSTRACTOR', 'ROLE_CURATOR'];
            var user_role = UserService.getUserRole() ? UserService.getUserRole().toUpperCase() : '';

            var updated_at_index = Common.indexOfObjectInJsonArray(gridOptions.columnDefs, 'name', 'updated_at');
            var updated_by_index = Common.indexOfObjectInJsonArray(gridOptions.columnDefs, 'name', 'updated_by');

            if(!_.contains(allowedROLES, user_role)) {
                if (updated_at_index >= 0 )
                    gridOptions.columnDefs.splice(updated_at_index,1);
                if (updated_by_index >= 0)
                    gridOptions.columnDefs.splice(updated_by_index,1);
            }
            if(usedInModal){
                var nullify_index = Common.indexOfObjectInJsonArray(gridOptions.columnDefs, 'name', 'Nullify');
                if (nullify_index >= 0)
                   gridOptions.columnDefs.splice(nullify_index,1);
            }
            return gridOptions;
        }

        function setTypeAheadOrg (searchObj) {
            var splitVal = searchObj.split('<span class="hide">');
            var org_search_name = splitVal[0];
            var userChosenOrg = JSON.parse(splitVal[1].split('</span>')[0].replace(/"null"/g, 'null'));
            return  {
                organization_name: org_search_name,
                organization_details: userChosenOrg
            }
        };

        function typeAheadOrgNameSearch(field, family) {

            var wildcardOrgName = field.indexOf('*') > -1 ? field : '*' + field + '*';
            //search context: 'CTRP', to avoid duplicate names
            var queryObj = {
                name: wildcardOrgName,
                source_context: 'CTRP',
                source_status: 'Active'
            };

            if(family && family.length){
                if (family === 'no_family') {
                    queryObj['alias'] = false;
                    queryObj['rows'] = 25;
                    queryObj['no_family'] = true;
                } else {
                    queryObj['family_name'] = family;
                }
            }

            return searchOrgs(queryObj).then(function(res) {
                //remove duplicates
                var uniqueNames = [];
                var orgNames = [];

                var status = res.server_response.status;

                if (status >= 200 && status <= 210) {
                    orgNames = res.orgs.map(function (org) {
                        return org.name + ', ' + org.city + ', ' + org.state_province + ' ' + org.postal_code  + ', ' + org.country +
                        '<span class="hide">{' +
                                '"id":' + org.id +
                                ',"name": "' + org.name + '"' +
                                ',"address": "' + org.address + '"' +
                                ',"address2": "' + org.address2 + '"' +
                                ',"city": "' + org.city + '"' +
                                ',"state_province": "' + org.state_province + '"' +
                                ',"postal_code": "' + org.postal_code + '"' +
                                ',"country": "' + org.country + '"' +
                                ',"email": "' + org.email + '"' +
                                ',"phone": "' + org.phone + '"' +
                                ',"fax": "' + org.fax + '"' +
                            '}</span>';
                    });

                    return uniqueNames = orgNames.filter(function (name) {
                        return uniqueNames.indexOf(name) === -1;
                    });
                }
            });
        }

        /**
         * Return a watcher for the selected country name
         * @returns {Function}
         */
        function watchCountrySelection() {
            return function(countryName) {
                if (countryName) {

                    GeoLocationService.getStateListInCountry(countryName)
                        .then(function (response) {
                            var status = response.server_response.status;

                            if (status >= 200 && status <= 210) {
                                statesOrProvinces = response;

                                //states or provinces are not available
                                if (statesOrProvinces.length === 0) {
                                    broadcastMsg(MESSAGES.STATES_UNAVAIL, 'states or provinces are not available');
                                    return;
                                }
                                broadcastMsg(MESSAGES.STATES_AVAIL, 'come get your states or provinces');
                            }
                        }).catch(function (err) {
                            $log.info('error in retrieving states for country: ' + countryName);
                        });
                } else {
                    //countryName is not set
                    broadcastMsg(MESSAGES.STATES_UNAVAIL, 'states or provinces are not available');
                }
            };
        } //watchCountrySelection



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
         * retrieve source contexts from backend service
         * @return {promise}
         */
        function getSourceContexts() {
            return PromiseTimeoutService.getData(URL_CONFIGS.SOURCE_CONTEXTS);
        } //getSourceContexts

        /**
         * retrieve source statuses from backend service
         * @return {promise}
         */
        function getSourceStatuses(searchParams) {
            return PromiseTimeoutService.postDataExpectObj(URL_CONFIGS.SOURCE_STATUSES, searchParams);
        } //getSourceStatuses

        // retrieve ALL source statuses using GET
        function getSourceStatuses2() {
            return PromiseTimeoutService.getData(URL_CONFIGS.SOURCE_STATUSES2);
        }


        /**
         * delete an organization with the given orgId
         *
         * @param orgId
         * @returns {*}
         */
        function deleteOrg(orgId) {
            return PromiseTimeoutService.deleteObjFromBackend(URL_CONFIGS.AN_ORG + orgId + '.json');
        }

        function getProcessingStatuses() {
            return [
                {id: 1, name: 'Complete'},
                {id: 2, name: 'Incomplete'}
            ];
        }

        /**
         * Check if targetOrgsArr contains orgObj by checking the 'id' field
         *
         * @param targetOrgsArr
         * @param orgObj
         * @returns {Integer} index
         */
        function indexOfOrganization(targetOrgsArr, orgObj) {
            var index = -1;
            _.each(targetOrgsArr, function (org, idx) {
                if (org.id === orgObj.id) { //what if the user deletes the po_affiliation accidentally???
                    index = idx;
                    return;
                }
            });
            return index;
        } //indexOfOrganization


        /**
         * Clean up the organization by keeping the essential fields
         * (org_id, affiliate_status, effective_date, expiration_date)
         *
         *
         * @param savedSelectionArr
         * @returns {Array}
         */
        function preparePOAffiliationArr(savedSelectionArr) {
            var results = [];
            _.each(savedSelectionArr, function (org) {
                var cleanedOrg = {
                    'organization_id': org.id,
                    'po_affiliation_status_id': org.po_affiliation_status_id,
                    'effective_date': org.effective_date,
                    'expiration_date': org.expiration_date,
                    'id' : org.po_affiliation_id || '',
                    'lock_version': org.lock_version,
                    '_destroy' : org._destroy
                };
                results.push(cleanedOrg);
            });

            return results;
        } //preparePOAffiliationArr


        /**
         * Initialize the selected organization for its affiliation status, po_effective_date
         * po_expiration_date, etc
         *
         * @param org
         * @returns org
         */
        function initSelectedOrg(org) {
            org.po_affiliation_status_id = '';
            org.effective_date = new Date(); //today as the effective date
            org.expiration_date = '';
            org.opened_effective = false;
            org.opened_expiration = false;
            org._destroy = false;

            return org;
        } //initSelectedOrg

        /**
         * Nullify a Organization and merge his/her association to the retained Organizations
         *
         * @param curationObject, JSON object: {'id_to_be_nullified': '', 'id_to_be_retained': ''}
         */
        function curateOrg(curationObject) {
            return PromiseTimeoutService.postDataExpectObj(URL_CONFIGS.CURATE_ORG, curationObject);
        }

        function getServiceRequests() {
            return PromiseTimeoutService.getData(URL_CONFIGS.SERVICE_REQUESTS);
        }

        function cloneCtepOrg(orgId) {
            return PromiseTimeoutService.postDataExpectObj(URL_CONFIGS.CLONE_CTEP_ORG, {org_id: orgId});
        }


        /**
         * From the array of context (array of JSON objects), locate the context id for the contextName
         *
         * @param ctrpContextArr
         * @param key, String
         * @param contextName, String (e.g. 'CTRP')
         * @returns {number}
         */
        function findContextId(ctrpContextArr, key, contextName) {
            var ctrpContextId = -1; //not found
            var needleIndex = Common.indexOfObjectInJsonArray(ctrpContextArr, key, contextName);
            if (needleIndex > -1) {
                ctrpContextId = ctrpContextArr[needleIndex].id || -1;
            }
            return ctrpContextId;
        }


        /**
         * Check if an Organization name is unique - based on Name & Source context
         *
         * @param curationObject, JSON object: {'org_name': '', 'source_context_id': ''}
         */
        function checkUniqueOrganization(name) {
            return PromiseTimeoutService.postDataExpectObj(URL_CONFIGS.UNIQUE_ORG, name);
        }


    }


})();
