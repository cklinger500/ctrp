/**
 * Created by schintal on 9/20/2015
 */

(function () {
    'use strict';

    angular.module('ctrp.app.user')
        .controller('userListCtrl', userListCtrl);

    userListCtrl.$inject = ['PromiseTimeoutService', 'toastr', '$state', '$scope', 'MESSAGES', 'UserService', 'uiGridConstants', 'PATrialService', '$timeout',
        'URL_CONFIGS', 'OrgService', 'uiGridExporterConstants', 'uiGridExporterService', '$stateParams'];

    function userListCtrl(PromiseTimeoutService, toastr, $state, $scope, MESSAGES, UserService, uiGridConstants, PATrialService, $timeout,
                          URL_CONFIGS, OrgService,uiGridExporterConstants, uiGridExporterService, $stateParams) {

        var vm = this;
        vm.curationMode = UserService.isCurationModeEnabled();
        vm.trialId = $stateParams.trialId;
        vm.ownerListMode = ( vm.trialId && !vm.setAddMode );
        vm.registeredUsersPage = $state.includes('main.registeredUsers');
        vm.searching = false;

        // Initial User Search Parameters
        var SearchParams = function (){
            return {
                username: vm.ownerListMode ? '*' : '',
                first_name: '',
                middle_name: '',
                last_name: '',
                email: '',
                phone: '',
                approved: '',
                rows: 25,
                registered_users: vm.registeredUsersPage ? true : false,
                start: 1
            }
        }; //initial User Search Parameters

        var optionOrg = {
            name: 'user_org_name',
            displayName: 'Organizational Affiliation',
            enableSorting: true,
            minWidth: '210',
            width: '*',
            cellTemplate: '<div class="ui-grid-cell-contents tooltip-uigrid" title="Organization Affiliation">{{COL_FIELD CUSTOM_FILTERS}}</div>'
        };

        var optionOrgFamilies = {
            name: 'organization_family',
            displayName: 'Organization Family',
            enableSorting: true,
            minWidth: '210',
            width: '*'
        };

        var optionRole = {
            name: 'admin_role',
            displayName: 'Site Administrator Privileges',
            enableSorting: true,
            width: '235'
        };

        var optionEmail = {
            name: 'receive_emails',
            displayName: 'e-mails',
            enableSorting: true,
            width: '120'
        };

        var optionPhone = {
            name: 'phone',
            displayName: 'Phone',
            enableSorting: true,
            minWidth: '100',
            width: '*',
            visible: false,
            cellTemplate: '<div class="ui-grid-cell-contents tooltip-uigrid" title="{{COL_FIELD}}">' + '{{COL_FIELD CUSTOM_FILTERS}}</div>'
        };

        var optionStatus = {
            name: 'user_status',
            displayName: 'Status',
            enableSorting: false,
            width: '90',
            cellTemplate: '<div class="ui-grid-cell-contents tooltip-uigrid" title="{{row.entity.user_status_name}}">{{row.entity.user_status_name}}</div>'
        };

        var optionStatusDate = {
            name: 'status_date',
            displayName: 'Status Date',
            enableSorting: true,
            width: '200',
            cellFilter: 'date:"medium"'};

        var userName = {
            name: 'username',
            enableSorting: true,
            displayName: 'Username',
            minWidth: '120',
            width: '*',
            cellTemplate: '<div class="ui-grid-cell-contents tooltip-uigrid" title="{{COL_FIELD}}">' +
            (vm.registeredUsersPage || vm.ownerListMode ? '<a ui-sref="main.regUserDetail({username : row.entity.username })">' : '<a ui-sref="main.userDetail({username : row.entity.username })">') +
            '{{row.entity.username.indexOf(\'nihusernothaveanaccount\') > - 1 ? \'\': row.entity.username}}</a></div>'
        };

        var firstName = {
            name: 'first_name',
            displayName: 'First Name',
            enableSorting: true,
            minWidth: '120',
            width: '*',
            cellTemplate: '<div class="ui-grid-cell-contents tooltip-uigrid" title="{{COL_FIELD}}">' +
            (vm.registeredUsersPage || vm.ownerListMode ? '<a ui-sref="main.regUserDetail({username : row.entity.username })">' : '<a ui-sref="main.userDetail({username : row.entity.username })">') +
            '{{COL_FIELD CUSTOM_FILTERS}}</a></div>'
        };

        var lastName = {
            name: 'last_name',
            displayName: 'Last Name',
            enableSorting: true,
            minWidth: '120',
            width: '*',
            cellTemplate: '<div class="ui-grid-cell-contents tooltip-uigrid" title="{{COL_FIELD}}">' +
            (vm.registeredUsersPage || vm.ownerListMode ? '<a ui-sref="main.regUserDetail({username : row.entity.username })">' : '<a ui-sref="main.userDetail({username : row.entity.username })">') +
            '{{COL_FIELD CUSTOM_FILTERS}}</a></div>'
        };

        var middleName = {
            name: 'middle_name',
            displayName: 'Middle Name',
            enableSorting: false,
            minWidth: '100',
            visible: false,
            width: '*',
            cellTemplate: '<div class="ui-grid-cell-contents tooltip-uigrid" title="{{COL_FIELD}}">' +
            (vm.registeredUsersPage || vm.ownerListMode ? '<a ui-sref="main.regUserDetail({username : row.entity.username })">' : '<a ui-sref="main.userDetail({username : row.entity.username })">') +
            '{{COL_FIELD CUSTOM_FILTERS}}</a></div>'
        };

        var userEmail = {
            name: 'email',
            displayName: 'Email',
            enableSorting: true,
            minWidth: '150',
            width: '*',
            cellTemplate: '<div class="ui-grid-cell-contents tooltip-uigrid" title="{{COL_FIELD}}">' +
            '{{COL_FIELD CUSTOM_FILTERS}}</div>'
        };

        var GridOptions = function (){
            return {
                enableColumnResizing: true,
                totalItems: null,
                rowHeight: 22,
                paginationPageSizes: [10, 25, 50, 100, 1000],
                paginationPageSize: 25,
                useExternalPagination: true,
                useExternalSorting: true,
                enableVerticalScrollbar: 2,
                enableHorizontalScrollbar: 2,
                enablePaging: true,
                enableFiltering: false,
                exporterCsvFilename: 'users.csv',
                columnDefs: [],
                enableGridMenu: true,
                enableSelectAll: true,
                exporterMenuAllData: true,
                exporterMenuPdf: false,
                exporterMenuCsv: false,
                gridMenuCustomItems: [{
                    title: 'Export All Data As CSV',
                    order: 100,
                    action: function ($event) {
                        this.grid.api.exporter.csvExport(uiGridExporterConstants.ALL, uiGridExporterConstants.ALL);
                    }
                }]
            }
        };

        //ui-grid plugin options
        vm.searchParams = new SearchParams();
        vm.gridOptions = new GridOptions();

        vm.initMode = false;

        vm.searchUsers = function (init_mode) {
            if (init_mode !== false) {
                vm.gridOptions.useExternalPagination = true;
                vm.gridOptions.useExternalSorting = true;
                vm.requireSelection = false;
                if (!vm.searchParams.organization_id) {
                    vm.searchParams.user_org_name = vm.organization_name;
                }

                /**
                 * If not, it should throw a warning to the user to select atleast one parameter.
                 * Right now, ignoring the alias parameter as it is set to true by default.
                 * To refactor and look at default parameters instead of hardcoding -- radhika
                 */
                var isEmptySearch = true;
                var excludedKeys = ['sort', 'order', 'rows', 'start'];
                Object.keys(vm.searchParams).forEach(function (key) {
                    if (excludedKeys.indexOf(key) === -1 && vm.searchParams[key] !== '' && vm.searchParams[key] !== undefined) {
                        isEmptySearch = false;
                    }
                });

                if (isEmptySearch) {
                    vm.searchWarningMessage = 'At least one selection value must be entered prior to running the search';
                    vm.gridOptions.data = [];
                    vm.gridOptions.totalItems = null;
                } else {
                    vm.searching = true;
                    vm.searchWarningMessage = '';
                    UserService.searchUsers(vm.searchParams).then(function (data) {
                        var status = data.server_response.status;

                        if (status >= 200 && status <= 210) {
                            if (!data.search_access) {
                                vm.searchWarningMessage = "You currently have no access to this search."
                            }
                            vm.gridOptions.data = data['users'];
                            vm.gridOptions.totalItems = data.total;
                        }
                    }).catch(function (err) {
                        console.log('Search Users failed: ' + err);
                    }).finally(function () {
                        vm.searching = false;
                    });
                }
                vm.initMode = true;
            }
        }; //searchUsers

        vm.resetSearch = function () {
            vm.searchParams = new SearchParams;
            vm.gridOptions.data = [];
            vm.gridOptions.totalItems = null;
            vm.removeOrgChoice();
            Object.keys(vm.searchParams).forEach(function (key) {
                vm.searchParams[key] = '';
            });
        }; //resetSearch

        vm.typeAheadParams = {};
        vm.typeAheadNameSearch = function () {
            return OrgService.typeAheadOrgNameSearch(vm.organization_name, vm.searchOrganizationFamily);
        };

        vm.setUserListTypeAheadOrg = function (searchObj) {
            var orgSearch = OrgService.setTypeAheadOrg(searchObj);
            vm.organization_name = orgSearch.organization_name;
            vm.userChosenOrg = orgSearch.organization_details;
            vm.searchParams.organization_id = vm.userChosenOrg.id;
        };

        vm.removeOrgChoice = function () {
            vm.userChosenOrg = null;
            vm.organization_name = vm.searchParams.user_org_name = vm.searchParams.organization_id = undefined;
        };

        /* remove ownership */
        vm.trialOwnershipRemoveIdArr = null;
        vm.confirmRemoveTrialOwnershipsPopUp = false;
        vm.confirmRemoveTrialsOwnerships = function (userIdArr) {
            vm.confirmRemoveTrialOwnershipsPopUp = true;
            vm.trialOwnershipRemoveIdArr = userIdArr;
        };
        vm.cancelRemoveTrialsOwnerships = function () {
            vm.confirmRemoveTrialOwnershipsPopUp = false;
        };

        vm.removeTrialsOwnerships = function () {
            var searchParams = {
                user_ids: vm.trialOwnershipRemoveIdArr,
                trial_ids: [vm.trialId]
            };
            UserService.endUserTrialsOwnership(searchParams).then(function (data) {
                var status = data.server_response.status;
                if (status >= 200 && status <= 210) {
                    if (data.results === 'success') {
                        toastr.success('Trial Ownerships Removed', 'Success!');
                        vm.searchUsers();
                        vm.gridApi.selection.clearSelectedRows();
                    }
                    vm.trialOwnershipRemoveIdArr = null;
                    vm.confirmRemoveTrialOwnershipsPopUp = false;
                }
            });
        };

        /* add ownership */

        vm.trialOwnershipAddIdArr = null;
        vm.confirmAddTrialOwnershipsPopUp = false;
        vm.confirmAddTrialsOwnerships = function (userIdArr) {
            vm.confirmAddTrialOwnershipsPopUp = true;
            vm.trialOwnershipAddIdArr = userIdArr;
        };
        vm.cancelAddTrialsOwnerships = function () {
            vm.confirmAddTrialOwnershipsPopUp = false;
        };

        vm.addTrialsOwnerships = function () {
            var searchParams = {
                user_ids: vm.trialOwnershipAddIdArr,
                trial_ids: [vm.trialId]
            };
            UserService.addUserTrialsOwnership(searchParams).then(function (data) {
                var status = data.server_response.status;
                if (status >= 200 && status <= 210) {
                    vm.trialOwnershipAddIdArr = null;
                    vm.confirmAddTrialOwnershipsPopUp = false;
                    $timeout(function() {
                        if (data.results && data.results.complete) {
                            toastr.success('Trial Ownerships Added', 'Success!');
                            vm.gridApi.selection.clearSelectedRows();
                            $scope.$parent.userView.setAddMode = false;
                        }
                    }, 1000);
                }
            });
        };

        vm.addOwnersSubmit = function () {
            if (validateSelection()) {
                vm.confirmAddTrialsOwnerships(_.chain(vm.gridApi.selection.getSelectedRows()).pluck('id').value());
            }
        };

        vm.removeOwnersSubmit = function () {
            if (validateSelection()) {
                vm.confirmRemoveTrialsOwnerships(_.chain(vm.gridApi.selection.getSelectedRows()).pluck('id').value());
            }
        };

        vm.clearSelectedRows = function () {
            vm.gridApi.selection.clearSelectedRows();
            vm.requireSelection = false;
        };

        function validateSelection() {
            if (!vm.gridApi.selection.getSelectedRows().length) {
                vm.requireSelection = true;
                return false;
            } else {
                return true;
            }
        }

        /****************************** implementations **************************/

        /**
         * callback function for sorting UI-Grid columns
         * @param grid
         * @param sortColumns
         */
        function sortUserListChangedCallBack(grid, sortColumns) {

            if (sortColumns.length === 0) {
                vm.searchParams.sort = 'username';
                vm.searchParams.order = 'asc';
            } else {
                vm.searchParams.sort = sortColumns[0].name; //sort the column
                switch (sortColumns[0].sort.direction) {
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
            vm.searchUsers();
        } //sortUserListChangedCallBack

        vm.displayTrialOwnershipGrid = function () {
            vm.gridOptions.gridMenuCustomItems = vm.ownerListMode ? new UserService.TransferTrialsRemoveGridItem($scope, vm): new UserService.TransferTrialsAddGridItem($scope, vm);

            vm.gridOptions.enablePaging = (vm.ownerListMode ? false: true);
            vm.gridOptions.enableFiltering = (vm.ownerListMode ? true : false);
            vm.gridOptions.exporterCsvFilename = (vm.ownerListMode ? 't' + vm.trialId + '_owners.csv' : 'users.csv');
            vm.ownerListMode = ( vm.trialId && !vm.setAddMode );
            vm.searchParams.rows = (vm.ownerListMode ? undefined: 25);
            vm.searchParams.trial_id = (vm.ownerListMode ? vm.trialId : undefined);
            vm.searchParams.registered_users = (vm.registeredUsersPage || vm.trialId ? true : false);
            vm.searchUsers();
        };

        //Listen to the write-mode switch
        $scope.$on(MESSAGES.CURATION_MODE_CHANGED, function() {
            vm.gridOptions.gridMenuCustomItems = new UserService.TransferTrialsRemoveGridItem($scope, vm);
            vm.curationMode = UserService.isCurationModeEnabled();
            if (!vm.curationMode) {
                vm.setAddMode = false;
            }
        });

        UserService.getCurrentUserDetails().then(function (currentUser) {
            var status = currentUser.server_response.status;

            if (status >= 200 && status <= 210) {
                vm.curUser =  currentUser;
                UserService.getUserStatuses().then(function (response) {
                    var userStatusResponse = response.status;

                    if (userStatusResponse >= 200 && userStatusResponse <= 210) {
                        vm.statusArr = response.data;
                        var allowedROLESITESU = ['ROLE_SITE-SU', 'ROLE_SUPER', 'ROLE_ABSTRACTOR'];
                        if (_.contains(allowedROLESITESU, vm.curUser.role)) {
                            vm.statusArrForROLESITESU = _.filter(vm.statusArr, function (item, index) {
                                return _.contains(['ACT', 'INR'], item.code);
                            });
                        }
                        if (vm.curUser.role === 'ROLE_ACCOUNT-APPROVER') {
                            vm.statusArrForROLEAPPROVER = _.filter(vm.statusArr, function (item, index) {
                                return _.contains(['ACT', 'INR'], item.code);
                            });
                        }
                    }
                });

                if (!vm.ownerListMode && !vm.registeredUsersPage && (vm.curUser.role === "ROLE_SITE-SU") ) {
                    if (vm.curUser.org_families.length) {
                        vm.searchOrganizationFamily = vm.curUser.org_families[0].name;
                    } else {
                        vm.searchOrganization = vm.curUser.organization.name;
                        vm.searchOrganizationFamily = '';
                    }
                    vm.searchType = vm.curUser.role;
                    vm.gridOptions.columnDefs.push(userName, firstName, middleName, lastName, userEmail, optionOrg, optionRole, optionEmail, optionPhone, optionStatus, optionStatusDate);
                } else if (!vm.ownerListMode && !vm.registeredUsersPage){
                    vm.gridOptions.columnDefs.push(userName, firstName, middleName, lastName, userEmail, optionOrg, optionOrgFamilies, optionRole, optionEmail, optionPhone, optionStatus, optionStatusDate);
                } else if (vm.ownerListMode || vm.registeredUsersPage) {
                    vm.gridOptions.columnDefs.push(userName, lastName, firstName, middleName, optionOrg, optionOrgFamilies);
                }

                vm.gridOptions.enableVerticalScrollbar = uiGridConstants.scrollbars.WHEN_NEEDED;
                vm.gridOptions.enableHorizontalScrollbar = uiGridConstants.scrollbars.WHEN_NEEDED;

                vm.gridOptions.onRegisterApi = function (gridApi) {
                    vm.gridApi = gridApi;
                    vm.gridApi.core.on.sortChanged($scope, sortUserListChangedCallBack);
                    vm.gridApi.pagination.on.paginationChanged($scope, function (newPage, pageSize) {
                        vm.searchParams.start = newPage;
                        vm.searchParams.rows = pageSize;
                        gridApi.selection.clearSelectedRows();
                        vm.searchUsers();
                    });
                };

                vm.gridOptions.exporterAllDataFn = function () {
                    var allSearchParams = angular.copy(vm.searchParams);
                    var origGridColumnDefs = angular.copy(vm.gridOptions.columnDefs);

                    //add extra fields here
                    //vm.gridOptions.columnDefs.push(middleName);

                    allSearchParams.start = null;
                    allSearchParams.rows = null;

                    return PromiseTimeoutService.postDataExpectObj(URL_CONFIGS.SEARCH_USER, allSearchParams).then(
                        function (data) {
                            var status = data.server_response.status;

                            if (status >= 200 && status <= 210) {
                                vm.gridOptions.useExternalPagination = false;
                                vm.gridOptions.useExternalSorting = false;
                                vm.gridOptions.data = data['users'];

                                vm.gridOptions.columnDefs = origGridColumnDefs;
                            }
                        }
                    );
                };

                if (vm.trialId) {
                    vm.curTrial = PATrialService.getCurrentTrialFromCache();
                    $scope.$watch('displayTrialOwnershipGrid', function() {
                        vm.displayTrialOwnershipGrid();
                    });
                }
            }
        });

    }

}());
