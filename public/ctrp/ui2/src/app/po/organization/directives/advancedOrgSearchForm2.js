/**
 * Created by wangg5 on 9/9/15.
 */

(function () {

    'use strict';

    angular.module('ctrp.app.po')
        .directive('ctrpAdvancedOrgSearchForm2', ctrpAdvancedOrgSearchForm2);

    ctrpAdvancedOrgSearchForm2.$inject = ['OrgService', 'GeoLocationService', 'Common', '$location', '$state',
        'MESSAGES', 'uiGridConstants', '_', 'toastr', '$anchorScroll', '$compile', 'UserService','DateService'];

    function ctrpAdvancedOrgSearchForm2(OrgService, GeoLocationService, Common, $location, $state,
                                        MESSAGES, uiGridConstants, _, toastr, $anchorScroll, $compile, UserService,DateService) {

        var directiveObj = {
            restrict: 'E',
            scope: {
                showGrid: '=?', //boolean, optional
                usedInModal: '=?', //boolean, option
                maxRowSelectable: '=', //int, required
                curationMode: '=?',
                orgSearchResults: '@orgSearchResults',
                selectedOrgsArray: '@selectedOrgsArray'
            },
            templateUrl: 'app/po/organization/directives/advancedOrgSearchFormTemplate2.html',
            link: linkFn,
            controller: ctrpAdvancedOrgSearchController
        };

        return directiveObj;

        /************************* implementations below *******************************/

        function linkFn(scope, element, attrs) {
            // $compile(element.contents())(scope);
        } //linkFn

        //_, $anchorScroll,
        function ctrpAdvancedOrgSearchController($scope) {

            var fromStateName = $state.fromState.name || '';
            $scope.searchParams = OrgService.getInitialOrgSearchParams();
            $scope.watchCountrySelection = OrgService.watchCountrySelection();
            $scope.selectedRows = [];
            $scope.sourceContextArr = [];
            $scope.sourceStatuses = [];
            $scope.nullifiedId = '';
            $scope.warningMessage = '';
            $scope.curationShown = false;
            $scope.curationModeEnabled = false;
            $scope.searchWarningMessage = '';
            $scope.userRole = !!UserService.getUserRole() ? UserService.getUserRole().split("_")[1].toLowerCase() : '';
            $scope.dateFormat = DateService.getFormats()[1];


            //$scope.maxRowSelectable = $scope.maxRowSelectable == undefined ? 0 : $scope.maxRowSelectable; //default to 0
            $scope.maxRowSelectable = $scope.maxRowSelectable === 'undefined' ? Number.MAX_VALUE : $scope.maxRowSelectable; //Number.MAX_SAFE_INTEGER; //default to MAX
            //console.log('maxRowSelectable: ' + $scope.maxRowSelectable);
            if ($scope.maxRowSelectable > 0) {
                $scope.curationModeEnabled = true;
            } else {
                $scope.curationModeEnabled = false;
            }
            //override the inferred curationModeEnabled if 'curationMode' attribute has been set in the directive
            $scope.curationModeEnabled = $scope.curationMode === 'undefined' ? $scope.curationModeEnabled : $scope.curationMode;
            $scope.usedInModal = $scope.usedInModal === 'undefined' ? false : $scope.usedInModal;
            $scope.showGrid = $scope.showGrid === 'undefined' ? false : $scope.showGrid;


            $scope.typeAheadNameSearch = function () {
                var wildcardOrgName = $scope.searchParams.name.indexOf('*') > -1 ? $scope.searchParams.name : '*' + $scope.searchParams.name + '*';
                //search context: 'CTRP', to avoid duplicate names
                return OrgService.searchOrgs({name: wildcardOrgName, source_context: "CTRP"}).then(function (res) {
                    //remove duplicates
                    var uniqueNames = [];
                    var orgNames = [];
                    orgNames = res.orgs.map(function (org) {
                        return org.name;
                    });

                    return uniqueNames = orgNames.filter(function (name) {
                        return uniqueNames.indexOf(name) === -1;
                    });
                });
            }; //typeAheadNameSearch


            /* searchOrgs */
            $scope.searchOrgs = function (newSearchFlag) {

                if (newSearchFlag === 'fromStart') {
                    $scope.searchParams.start = 1;
                }
                // console.log("In searchOrgs " + JSON.stringify($scope.searchParams));

                //Checking to see if any search parameter was entered. If not, it should throw a warning to the user to select atleast one parameter.
                // Right now, ignoring the alias parameter as it is set to true by default. To refactor and look at default parameters instead of hardcoding -- radhika
                var isEmptySearch = true;
                var ignoreKeys = ['rows', 'alias', 'start','wc_search'];

                _.keys($scope.searchParams).forEach(function (key) {

                    if(ignoreKeys.indexOf(key) === -1 && $scope.searchParams[key] != '')
                        isEmptySearch = false;
                });
                if(isEmptySearch && newSearchFlag === 'fromStart') {
                    $scope.searchWarningMessage = "At least one selection value must be entered prior to running the search";
                } else {
                    $scope.searchWarningMessage = "";
                }

                $scope.searchParams.date_range_arr = DateService.getDateRange($scope.searchParams.startDate, $scope.searchParams.endDate);
                if ($scope.searchParams.date_range_arr.length === 0) {
                    delete $scope.searchParams.date_range_arr;
                }

                if(!isEmptySearch) { //skip searching if empty search
                    OrgService.searchOrgs($scope.searchParams).then(function (data) {
                        // console.log("received data for org search: " + JSON.stringify(data));
                        if ($scope.showGrid && data.orgs) {
                            $scope.gridOptions.data = data.orgs;
                            $scope.gridOptions.totalItems = data.total;

                            //pin the selected rows, if any, at the top of the results
                            _.each($scope.selectedRows, function (curRow, idx) {
                                var ctrpId = curRow.entity.id;
                                var indexOfCurRowInGridData = Common.indexOfObjectInJsonArray($scope.gridOptions.data, 'id', ctrpId);
                                if (indexOfCurRowInGridData > -1) {
                                    $scope.gridOptions.data.splice(indexOfCurRowInGridData, 1);
                                    $scope.gridOptions.totalItems--;
                                }
                                $scope.gridOptions.data.unshift(curRow.entity);
                                $scope.gridOptions.totalItems++;
                            });

                            $location.hash('org_search_results');
                            //$anchorScroll();
                        }
                        $scope.$parent.orgSearchResults = data; //{orgs: [], total, }
                        // console.log($scope.$parent);

                    }).catch(function (error) {
                        console.log("error in retrieving orgs: " + JSON.stringify(error));
                    });
                }
            }; //searchOrgs


            /* resetSearch */
            $scope.resetSearch = function () {
                $scope.searchParams = OrgService.getInitialOrgSearchParams();
                var temp = $scope.searchParams.wc_search;
                var excludedKeys = ['alias','wc_search'];
                Object.keys($scope.searchParams).forEach(function (key) {

                    if (excludedKeys.indexOf(key) === -1) {
                        $scope.searchParams[key] = '';
                    }

                });

                $scope.searchParams['alias'] = true;
                $scope.searchParams['wc_search'] = temp;
                // $scope.searchOrgs();
                $scope.$parent.orgSearchResults = {};
                $scope.gridOptions.data = [];
                $scope.gridOptions.totalItems = null;
                $scope.searchWarningMessage = '';

                if (angular.isDefined($scope.$parent.orgSearchResults)) {
                    $scope.$parent.orgSearchResults = {};
                }
                if (angular.isDefined($scope.$parent.selectedOrgsArray)) {
                    $scope.$parent.selectedOrgsArray = [];
                }
            }; //resetSearch


            /* nullify entity */
            $scope.nullifyEntity = function (rowEntity) {
                // console.log("chosen to nullify the row: " + JSON.stringify(rowEntity));
                var isActive = rowEntity.source_status && rowEntity.source_status.indexOf('Act') > -1;
                var isNullified = rowEntity.source_status && rowEntity.source_status.indexOf('Nul') > -1;
                if (isNullified || isActive || !rowEntity.nullifiable) {
                    //warning to user for nullifying active entity
                    if (!rowEntity.nullifiable)
                        $scope.warningMessage = 'The PO ID: ' + rowEntity.id + ' has an Active CTEP ID, nullification is prohibited';
                    else if (isActive)
                        $scope.warningMessage = 'The PO ID: ' + rowEntity.id + ' has an Active source status, nullification is prohibited';
                    else
                        $scope.warningMessage = 'The PO ID: ' + rowEntity.id + ' was nullified already, nullification is prohibited';
                    $scope.nullifiedId = '';
                    $scope.nullifiedOrgName = '';
                    //  console.log('cannot nullify this row, because it is active');
                } else {
                    $scope.warningMessage = '';
                    $scope.nullifiedId = rowEntity.id || '';
                    $scope.nullifiedOrgName = rowEntity.name;
                }
            }; //nullifyEntity


            /* commit nullification */
            $scope.commitNullification = function () {

                OrgService.curateOrg($scope.toBeCurated).then(function (res) {
                    // console.log('successful in curation: res is: ' + JSON.stringify(res));
                    initCurationObj();
                    clearSelectedRows();
                    $scope.searchOrgs();
                    toastr.success('Curation was successful', 'Curated!');
                }).catch(function (err) {
                    toastr.error('There was an error in curation', 'Curation error');
                });

            }; //commitNullification

            $scope.rowFormatter = function( row ) {
                if (!$scope.usedInModal) {
                    var isCTEPContext = row.entity.source_context && row.entity.source_context.indexOf('CTEP') > -1;
                    return isCTEPContext;
                } else {
                    return false;
                }
            };

            /**
             * Open calendar
             * @param $event
             * @param type
             */
            $scope.openCalendar = function ($event, type) {
                // $event.preventDefault();
                //$event.stopPropagation();

                if (type === "end") {
                    $scope.endDateOpened = true;// !$scope.endDateOpened;
                } else {
                    $scope.startDateOpened = true;// !$scope.startDateOpened;
                }
            }; //openCalendar


            $scope.getDateRange = function(range) {
                var today = new Date();
                switch (range) {
                    case 'today':
                        $scope.searchParams.startDate = today;
                        $scope.searchParams.endDate = today;;
                        break;
                    case 'yesterday':
                        $scope.searchParams.startDate = moment().add(-1, 'days').toDate();
                        $scope.searchParams.endDate = moment().add(-1, 'days').toDate();
                        break;
                    case 'last7':
                        $scope.searchParams.startDate = moment().add(-7, 'days').toDate();
                        $scope.searchParams.endDate = moment().add(0, 'days').toDate();
                        break;
                    case 'last30':
                        $scope.searchParams.startDate = moment().add(-30, 'days').toDate();
                        $scope.searchParams.endDate = moment().add(0, 'days').toDate();
                        break;
                    case 'thisMonth':
                        $scope.searchParams.startDate = moment([today.getFullYear(), today.getMonth()]).toDate();
                        $scope.searchParams.endDate = today;
                        break;
                    case 'lastMonth':
                        $scope.searchParams.startDate = moment([today.getFullYear(), today.getMonth()-1]).toDate();
                        $scope.searchParams.endDate = moment(today).subtract(1, 'months').endOf('month').toDate();
                        break;
                    default:
                        $scope.searchParams.startDate = '';
                        $scope.searchParams.endDate = '';
                }
            };


            activate();

            function activate() {
                getPromisedData();
                prepareGidOptions();

                if (fromStateName != 'main.orgDetail') {
                    $scope.resetSearch();
                } else {
                   $scope.searchOrgs(); //refresh search results
                }
                watchCountryAndGetStates();
                //listenToStatesProvinces();
                watchReadinessOfCuration();
                hideHyperLinkInModal();
                watchCurationMode();
                watchCurationModeSubRoutine();
            }


            /* private helper functions below */
            function getPromisedData() {
                //get source contexts
                OrgService.getSourceContexts().then(function (contexts) {
                    //console.log("received contexts: " + JSON.stringify(contexts));
                    contexts.sort(Common.a2zComparator());
                    $scope.sourceContexts = contexts;
                });

                //get source statuses
                OrgService.getSourceStatuses().then(function (statuses) {
                    //console.log("received statuses: " + JSON.stringify(statuses));
                    if (statuses && angular.isArray(statuses)) {
                        statuses.sort(Common.a2zComparator());
                        $scope.sourceStatuses = statuses;
                    }
                });

                //get countries
                GeoLocationService.getCountryList().then(function (countries) {
                    // countries.sort(Common.a2zComparator());
                    $scope.countries = countries;
                });
            } //getPromisedData


            function watchCountryAndGetStates() {
                $scope.$watch('searchParams.country', function (newVal, oldVal) {
                    $scope.states = [];

                    if (!!newVal && newVal != oldVal) {
                        GeoLocationService.getStateListInCountry(newVal)
                            .then(function (response) {
                                $scope.states = response;
                            }).catch(function (err) {
                                // $scope.states.length = 0; //no states or provinces found
                            });
                    }

                }, true);
            } //watchCountryAndGetStates


            /**
             * callback function for sorting UI-Grid columns
             * @param grid
             * @param sortColumns
             */
            function sortChangedCallBack(grid, sortColumns) {

                if (sortColumns.length === 0) {
                    //console.log("removing sorting");
                    //remove sorting
                    $scope.searchParams.sort = '';
                    $scope.searchParams.order = '';
                } else {
                    $scope.searchParams.sort = sortColumns[0].name; //sort the column
                    switch (sortColumns[0].sort.direction) {
                        case uiGridConstants.ASC:
                            $scope.searchParams.order = 'ASC';
                            break;
                        case uiGridConstants.DESC:
                            $scope.searchParams.order = 'DESC';
                            break;
                        case 'undefined':
                            break;
                    }
                }

                //do the search with the updated sorting
                $scope.searchOrgs();
            } //sortChangedCallBack


            /**
             * ****************DOUBLE CHECK this *****************
             *
             * callback function for selection rows
             * @param row
             */
            function rowSelectionCallBack(row) {


                if ($scope.maxRowSelectable > 0 && $scope.curationShown || $scope.usedInModal) {
                    if (row.isSelected) {

                        //console.log('row is selected: ' + JSON.stringify(row.entity));
                        if ($scope.selectedRows.length < $scope.maxRowSelectable) {
                            $scope.selectedRows.unshift(row);
                            pushToParentScope(row.entity);
                           // $scope.$parent.selectedOrgsArray.push(row.entity);
                        } else {
                            var deselectedRow = $scope.selectedRows.pop();
                            deselectedRow.isSelected = false;
                            $scope.nullifiedId = deselectedRow.entity.id === $scope.nullifiedId ? '' : $scope.nullifiedId;
                            $scope.selectedRows.unshift(row);
                            $scope.gridApi.grid.refresh(); //refresh grid

                            var curRowSavedIndex = OrgService.indexOfOrganization($scope.$parent.selectedOrgsArray, deselectedRow.entity);
                            $scope.$parent.selectedOrgsArray.splice(curRowSavedIndex, 1);
                            spliceInParentScope(curRowSavedIndex);
                            pushToParentScope(row.entity);
                           // $scope.$parent.selectedOrgsArray.push(row.entity);
                        }
                    }
                    else {
                        //de-select the row
                        //remove it from the $scope.selectedRows, if exists
                        var needleIndex = -1;
                        _.each($scope.selectedRows, function (existingRow, idx) {
                            if (existingRow.entity.id === row.entity.id) {
                                needleIndex = idx;
                                return;
                            }
                        });

                        if (needleIndex > -1) {
                            var deselectedRowArr = $scope.selectedRows.splice(needleIndex, 1);
                            deselectedRowArr[0].isSelected = false;
                            //reset the nullifiedId if the row is de-selected
                            $scope.nullifiedId = deselectedRowArr[0].entity.id === $scope.nullifiedId ? '' : $scope.nullifiedId;
                            $scope.curationReady = false;

                        }
                        var curRowSavedIndex = OrgService.indexOfOrganization($scope.$parent.selectedOrgsArray, row.entity);
                        $scope.$parent.selectedOrgsArray.splice(curRowSavedIndex, 1);
                        spliceInParentScope(curRowSavedIndex);
                    }
                } else {
                    row.isSelected = false; //do not show selection visually
                }
            } //rowSelectionCallBack


            /**
             * push row entity to the parent controller
             * @param entity
             */
            function pushToParentScope(entity) {
                if (angular.isDefined($scope.$parent.selectedOrgsArray)) {
                    $scope.$parent.selectedOrgsArray.push(entity);

                }
            }


            /**
             * Splice out the row entity from parent scope
             * @param entityIndex
             */
            function spliceInParentScope(entityIndex) {
                if (angular.isDefined($scope.$parent.selectedOrgsArray) && entityIndex > -1) {
                    $scope.$parent.selectedOrgsArray.splice(entityIndex, 1);
                }
            }


            /* prepare grid layout and data options */
            function prepareGidOptions() {
                $scope.gridOptions = OrgService.getGridOptions($scope.usedInModal);
                $scope.gridOptions.isRowSelectable = function (row) {
                    var isCTEPContext =row.entity.source_context  && row.entity.source_context.indexOf('CTEP') > -1;
                    if ($scope.usedInModal) {
                        return true;
                    }
                    else if (isCTEPContext) {
                        return false;
                    } else {
                        return true;
                    }
                };
                $scope.gridOptions.enableVerticalScrollbar = 2; //uiGridConstants.scrollbars.NEVER;
                $scope.gridOptions.enableHorizontalScrollbar = 2; //uiGridConstants.scrollbars.NEVER;
                $scope.gridOptions.onRegisterApi = function (gridApi) {
                    $scope.gridApi = gridApi;
                    $scope.gridApi.core.on.sortChanged($scope, sortChangedCallBack);
                    $scope.gridApi.pagination.on.paginationChanged($scope, function (newPage, pageSize) {
                        $scope.searchParams.start = newPage;
                        $scope.searchParams.rows = pageSize;
                        $scope.searchOrgs();
                    });

                    gridApi.selection.on.rowSelectionChanged($scope, rowSelectionCallBack);
                    gridApi.selection.on.rowSelectionChangedBatch($scope, function (rows) {
                        _.each(rows, function (row, index) {
                            rowSelectionCallBack(row);
                        });
                    });
                }; //gridOptions

                /**
                 * Toggle curation on and off
                 */
                $scope.toggleCurationMode = function () {
                    $scope.curationShown = !$scope.curationShown;
                };


                $scope.$watch('curationShown', function (newVal, oldVal) {

                    $scope.gridOptions.columnDefs[0].visible = newVal;
                    if (newVal) {
                        //purge the container for rows to be curated when not on curation mode
                        while ($scope.selectedRows.length > 0) {
                            //alert('len '+$scope.selectedRows.length);
                            // vm.selectedRows.pop().isSelected = false;
                            var deselectedRow = $scope.selectedRows.pop();
                            deselectedRow.isSelected = false;
                            $scope.nullifiedId = deselectedRow.entity.id === $scope.nullifiedId ? '' : $scope.nullifiedId;
                        }
                    } else {
                        // initializations for curation
                        $scope.selectedRows = [];
                        $scope.nullifiedId = '';
                        $scope.warningMessage = '';
                    }

                    if (newVal != oldVal) {
                        $scope.gridApi.grid.refresh();
                    }
                });
            } //prepareGridOptions


            /**
             * watch the readiness of curation submission
             */
            function watchReadinessOfCuration() {
                $scope.$watch('nullifiedId', function (curVal, preVal) {
                    initCurationObj();
                    $scope.toBeCurated.id_to_be_nullified = $scope.nullifiedId;
                    if ($scope.selectedRows.length === $scope.maxRowSelectable && $scope.nullifiedId) {
                        _.each($scope.selectedRows, function (curRow) {
                            if (curRow.entity.id != $scope.nullifiedId) {
                                $scope.toBeCurated['id_to_be_retained'] = curRow.entity.id;
                                return;
                            }
                        });
                    }

                    if ($scope.toBeCurated.id_to_be_nullified && $scope.toBeCurated.id_to_be_retained) {
                        $scope.curationReady = true;
                    }
                }, true);
            } //watchReadinessOfCuration


            /**
             * initialize curation object and curation ready status
             */
            function initCurationObj() {
                $scope.toBeCurated = {'id_to_be_nullified': '', 'id_to_be_retained': ''};
                $scope.curationReady = false;
                return;
            } //initCurationObj


            /**
             * clear up the selectedRows array,
             * @returns {*} the last row being cleared, empty array
             */
            function clearSelectedRows() {
                var deselectedRow = null;
                while ($scope.selectedRows.length > 0) {
                    deselectedRow = $scope.selectedRows.shift();
                    deselectedRow.isSelected = false;
                }
                if (angular.isDefined($scope.$parent.selectedOrgsArray)) {
                    $scope.$parent.selectedOrgsArray = [];
                }

                return deselectedRow;
            }


            function hideHyperLinkInModal() {
                $scope.$watch('usedInModal', function (newVal, oldVal) {
                    // $scope.resetSearch();
                    //find the organization name index in the column definitions
                    var orgNameIndex = Common.indexOfObjectInJsonArray($scope.gridOptions.columnDefs, 'name', 'name');
                    if (newVal) {
                        //unlink the name if used in modal
                        if (orgNameIndex > -1) {
                            $scope.gridOptions.columnDefs[orgNameIndex].cellTemplate = '<div class="ui-grid-cell-contents tooltip-uigrid" ' +
                                'title="{{COL_FIELD}}">{{COL_FIELD CUSTOM_FILTERS}}</div>';
                        }
                    } else {
                        // $scope.gridOptions = OrgService.getGridOptions();
                        $scope.gridOptions.columnDefs[orgNameIndex].cellTemplate = '<div class="ui-grid-cell-contents tooltip-uigrid" title="{{COL_FIELD}}">' +
                            '<a ui-sref="main.orgDetail({orgId : row.entity.id })">{{COL_FIELD CUSTOM_FILTERS}}</a></div>';
                        //make visible if it is not in modal and curator mode is off.
                    }
                });
            } //hideHyperLinkInModal


            function watchCurationMode() {
                $scope.$on(MESSAGES.CURATION_MODE_CHANGED, function() {
                   watchCurationModeSubRoutine();
                });
            }

            function watchCurationModeSubRoutine() {
                $scope.curationShown = UserService.isCurationModeEnabled() || false;
            }


        } //ctrpAdvancedOrgSearchController
    }

})();
