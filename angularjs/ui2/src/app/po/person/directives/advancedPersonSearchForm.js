/**
 * Created by wangg5 on 8/21/15.
 *
 * Directive component for showing advanced person search form
 *
 * Usage example: show the results in the ui-grid, allows max row slection to 2, and curationMode is false
 *
 * @show-grid, @curation-mode are optional, defaulted to false
 * @max-row-seletable is required (integer), if not set explicitly --> it is defaulted to 0
 *
 * <div class="row">
 *   <ctrp-advanced-person-search-form show-grid="true" max-row-selectable="2" curation-mode="false"></ctrp-advanced-person-search-form>
 *  </div>
 *
 ***********************************************************************************************************************
 * If the container scope of this directive needs to access the person search results and/or the selected persons,     *
 * initialize personSearchResults to JSON object {} and selectedPersonsArray to array [] in the container scope, e.g.  *
 *                                                                                                                     *
 * $scope.personSearchResults = {};                                                                                    *
 * $scope.selectedPersonsArray = [];                                                                                   *
 *                                                                                                                     *
 * *********************************************************************************************************************
 *
 *
 */


(function () {

    'use strict';

    angular.module('ctrp.app.po')
        .directive('ctrpAdvancedPersonSearchForm', ctrpAdvancedPersonSearchForm);

    ctrpAdvancedPersonSearchForm.$inject = ['PersonService', 'Common', 'UserService', 'DateService',
            'uiGridConstants', '$timeout', '_', 'toastr', 'OrgService', '$compile', 'MESSAGES', '$state'];


    function ctrpAdvancedPersonSearchForm(PersonService, Common, uiGridConstants, UserService, DateService,
                                          $timeout,  _, toastr, OrgService, $compile, MESSAGES, $state) {

        var directiveObj = {
            restrict: 'E',
            scope: {
                showGrid: '=?',  //boolean, optional; default to false
                usedInModal: '=?', //boolean, optional; default to false
                maxRowSelectable : '=', //int, optional; if not not set, use MAX_VALUE -> can select all results
                curationMode: '=?', // boolean, optional; default to false unless maxRowSelectable is set to > 0
                sourceContextOnly: '=?', // enable source context only. If not set, default to 'CTRP' if used in modal
                personSearchResults: '@personSearchResults',
                selectedPersonsArray: '@selectedPersonsArray',
            },
            templateUrl: 'app/po/person/directives/advancedPersonSearchFormTemplate.html',
            link: linkFn,
            controller: advPersonSearchDirectiveController
        };

        return directiveObj;

        function linkFn(scope, element, attrs) {
            //actions
            scope.searchParams.source_context = scope.sourceContextOnly;
        } //linkFn

        function advPersonSearchDirectiveController($scope, uiGridConstants, UserService, DateService, OrgService, $state) {

            var fromStateName = $state.fromState.name || '';
            _setupState();

            //actions:
            $scope.commitNullification = commitNullification;
            $scope.nullifyEntity = nullifyEntity;

            OrgService.setTypeAheadOrgNameSearch($scope.scope);
            if ($scope.maxRowSelectable > 0) {
                $scope.curationModeEnabled = true;
            } else {
                $scope.curationModeEnabled = false;
            }

            //override the inferred curationModeEnabled if 'curationMode' attribute has been set in the directive
            $scope.curationModeEnabled = angular.isDefined($scope.curationMode) ? $scope.curationMode : $scope.curationModeEnabled;
            $scope.usedInModal = angular.isDefined($scope.usedInModal) ? $scope.usedInModal : false;
            if ($scope.usedInModal) {
                $scope.sourceContextOnly = $scope.sourceContextOnly || 'CTRP';
                $scope.searchParams.source_context = $scope.sourceContextOnly;
                $scope.searchParams.source_status = 'ACT'; // search only Active source status in modal
            }
            // $scope.sourceContextOnly = angular.isDefined($scope.sourceContextOnly) && $scope.usedInModal ? $scope.sourceContextOnly : undefined;
            $scope.showGrid = angular.isDefined($scope.showGrid) ? $scope.showGrid : false;

            $scope.searchPeople = function (newSearchFlag) {
                if (newSearchFlag === 'fromStart') {
                    $scope.searchParams.start = 1;
                }

                $scope.searchParams.date_range_arr = DateService.getDateRange($scope.searchParams.startDate, $scope.searchParams.endDate);
                if ($scope.searchParams.date_range_arr.length === 0) {
                    delete $scope.searchParams.date_range_arr;
                }

                //Checking to see if any search parameter was entered. If not, it should throw a warning to the user to select atleast one parameter.
                // Right now, ignoring the alias parameter as it is set to true by default. To refactor and look at default parameters instead of hardcoding -- radhika
                var isEmptySearch = true;
                var excludedKeys = ['sort', 'order','rows','start','wc_search'];

                if (!$scope.searchParams.organization_id) {
                    $scope.searchParams.affiliated_org_name = $scope.organization_name;
                    _.keys($scope.searchParams).forEach(function (key) {
                        if (excludedKeys.indexOf(key) === -1 && $scope.searchParams[key] !== '')
                            isEmptySearch = false;
                    });
                } else {
                    isEmptySearch = false;
                    $scope.searchParams.affiliated_org_name = undefined;
                }

                if(isEmptySearch && newSearchFlag === 'fromStart') {
                    $scope.searchWarningMessage = "At least one selection value must be entered prior to running the search";
                    $scope.warningMessage = ''; //hide the 0 rows message if no search parameter was supplied
                } else {
                    $scope.searchWarningMessage = "";
                }

                if(!isEmptySearch) { //skip searching if empty search
                    $scope.searching = true;
                    if ($scope.usedInModal) {
                        // in modal, search against CTRP context and Active people!
                        $scope.searchParams.source_context = $scope.sourceContextOnly || 'CTRP';
                        $scope.searchParams.source_status = 'ACT'; // source status should be active in the search for in modal use
                    }
                    PersonService.searchPeople($scope.searchParams).then(function (data) {
                        var status = data.status;

                        if (status >= 200 && status <= 210) {
                            if ($scope.showGrid && data.data.people) {
                                // console.log("received person search results: " + JSON.stringify(data.data.people));
                                $scope.gridOptions.data = data.data.people;
                                $scope.gridOptions.totalItems = data.data.total;
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
                            }
                            $scope.$parent.personSearchResults = data.data; //{people: [], total, }
                        }
                    }).catch(function (err) {
                        console.log('search people failed');
                    }).finally(function() {
                        console.log('search finished');
                        $scope.searching = false;
                    });
                }
            }; //searchPeople

            $scope.getDateRange = function(range) {
                var today = new Date();
                switch (range) {
                    case 'today':
                        $scope.searchParams.startDate = moment().subtract(0, 'days').startOf('day').toDate();
                        $scope.searchParams.endDate = moment().subtract(0, 'days').endOf('day').toDate();
                        break;
                    case 'yesterday':
                        $scope.searchParams.startDate = moment().subtract(1, 'days').startOf('day').toDate();
                        $scope.searchParams.endDate = moment().subtract(1, 'days').endOf('day').toDate();
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

            $scope.resetSearch = function () {
                // $scope.states.length = 0;
                $scope.searchParams = PersonService.getInitialPersonSearchParams();
                $scope.gridOptions.data = [];
                $scope.gridOptions.totalItems = null;
                var excludedKeys = ['wc_search'];
                _.keys($scope.searchParams).forEach(function (key) {
                    if (excludedKeys.indexOf(key) === -1) {
                        //$scope.searchParams[key] = '';
                        $scope.searchParams[key] = angular.isArray($scope.searchParams[key]) ? [] : '';
                    }
                });
                $scope.searchParams['wc_search'] = true;
                $scope.searchWarningMessage = '';
                if (angular.isDefined($scope.$parent.personSearchResults)) {
                    $scope.$parent.personSearchResults = {};
                }
                if (angular.isDefined($scope.$parent.selectedPersonsArray)) {
                    $scope.$parent.selectedPersonsArray = [];
                }
            }; //resetSearch

            $scope.rowFormatter = function( row ) {
                var isCTEPContext =row.entity.source_context  && row.entity.source_context.indexOf('CTEP') > -1;
                return isCTEPContext;
            };

            function nullifyEntity(rowEntity) {
                var sourceStatus = rowEntity.source_status || "active";
                var isActive = sourceStatus.toLowerCase() === 'active';
                var isNullified = sourceStatus.toLowerCase() === 'nullified';

                // console.log("chosen to nullify the row: ", rowEntity);
                if (isActive) {
                    $scope.warningMessage = 'The PO ID: ' + rowEntity.id + ' has an Active source status, nullification is prohibited';
                    $scope.nullifiedId = '';
                } else if (isNullified) {
                    $scope.warningMessage = 'The PO ID: ' + rowEntity.id + ' was nullified already, nullification is prohibited';
                    $scope.nullifiedId = '';
                } else {
                    PersonService.isPersonNullifiable(rowEntity.id).then(function(res) {
                        var status = res.server_response.status;
                        if (status >= 200 && status <= 210 && res.nullifiable !== true) {
                            $scope.warningMessage = 'The PO ID: ' + rowEntity.id + ' has an Active CTEP context associated to it, nullification is prohibited';
                            $scope.nullifiedId = '';
                        } else {
                            $scope.warningMessage = '';
                            $scope.nullifiedId = rowEntity.id || '';
                        }
                    }).catch(function(err) {
                        console.error('Error in nullifiable check: ', err);
                    });
                    $scope.warningMessage = '';
                    $scope.nullifiedId = rowEntity.id || '';
                }
            }; //nullifyEntity

            function commitNullification() {
                console.log('tobeCurated: ' + JSON.stringify($scope.toBeCurated));
                PersonService.curatePerson($scope.toBeCurated).then(function(res) {
                    var status = res.server_response.status;

                    if (status >= 200 && status <= 210 && res.nullify_success === true) {
                        initCurationObj();
                        clearSelectedRows();
                        $scope.searchPeople();
                        toastr.success('Curation was successful', 'Curated!');
                    }
                }).catch(function(err) {
                    toastr.error('There was an error in curation', 'Curation error', { timeOut: 0});
                });
            }; //commitNullification

            activate();

            /****************************** implementations **************************/
            function activate() {
                getPromisedData();
                prepareGidOptions();

                if (fromStateName != 'main.personDetail') {
                    $scope.resetSearch();
                } else {
                   $scope.searchPeople(); //refresh the search results
                }
                watchReadinessOfCuration();
                hideHyperLinkInModal();
                watchCurationMode();
                watchCurationModeSubRoutine();
                // $scope.searchPeople();

            } //activate


            /**
             * Hide hyper link on names in modal
             */
            function hideHyperLinkInModal() {
                $scope.$watch('usedInModal', function (newVal, oldVal) {
                    //find the organization name index in the column definitions
                    var firstNameIndex = Common.indexOfObjectInJsonArray($scope.gridOptions.columnDefs, 'name', 'fname');
                    var middleNameIndex = Common.indexOfObjectInJsonArray($scope.gridOptions.columnDefs, 'name', 'mname');
                    var lastNameIndex = Common.indexOfObjectInJsonArray($scope.gridOptions.columnDefs, 'name', 'lname');

                    if (newVal) {
                        //unlink the name if used in modal
                        if (firstNameIndex > -1) {
                            $scope.gridOptions.columnDefs[firstNameIndex].cellTemplate = '<div class="ui-grid-cell-contents tooltip-uigrid" ' +
                                'title="{{COL_FIELD}}">{{COL_FIELD CUSTOM_FILTERS}}</div>';

                            $scope.gridOptions.columnDefs[middleNameIndex].cellTemplate = '<div class="ui-grid-cell-contents tooltip-uigrid" ' +
                                'title="{{COL_FIELD}}">{{COL_FIELD CUSTOM_FILTERS}}</div>';

                            $scope.gridOptions.columnDefs[lastNameIndex].cellTemplate = '<div class="ui-grid-cell-contents tooltip-uigrid" ' +
                                'title="{{COL_FIELD}}">{{COL_FIELD CUSTOM_FILTERS}}</div>';
                        }
                    } else {
                        $scope.gridOptions.columnDefs[firstNameIndex].cellTemplate = '<div class="ui-grid-cell-contents tooltip-uigrid" title="{{COL_FIELD}}">' +
                            '<a ui-sref="main.personDetail({personId : row.entity.id })">{{COL_FIELD CUSTOM_FILTERS}}</a></div>';

                        $scope.gridOptions.columnDefs[middleNameIndex].cellTemplate = '<div class="ui-grid-cell-contents tooltip-uigrid" title="{{COL_FIELD}}">' +
                            '<a ui-sref="main.personDetail({personId : row.entity.id })">{{COL_FIELD CUSTOM_FILTERS}}</a></div>';

                        $scope.gridOptions.columnDefs[lastNameIndex].cellTemplate = '<div class="ui-grid-cell-contents tooltip-uigrid" title="{{COL_FIELD}}">' +
                            '<a ui-sref="main.personDetail({personId : row.entity.id })">{{COL_FIELD CUSTOM_FILTERS}}</a></div>';
                    }
                });
            } //hideHyperLinkInModal


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
                $scope.searchPeople();
            } //sortChangedCallBack


            /**
             * callback for handling row selection
             * @param row
             */
            function rowSelectionCallBack(row) {
                if ($scope.maxRowSelectable > 0 && $scope.curationShown || $scope.usedInModal) {
                    if (row.isSelected) {
                        console.log('row is selected: ', row.entity);
                        if ($scope.selectedRows.length < $scope.maxRowSelectable) {
                            $scope.selectedRows.unshift(row);
                            $scope.$parent.selectedPersonsArray.push(row.entity);
                        } else {
                            var deselectedRow = $scope.selectedRows.pop();
                            deselectedRow.isSelected = false;
                            $scope.nullifiedId = deselectedRow.entity.id === $scope.nullifiedId ? '' : $scope.nullifiedId;
                            $scope.selectedRows.unshift(row);
                            $scope.gridApi.grid.refresh(); //refresh grid

                            var curRowSavedIndex = OrgService.indexOfOrganization($scope.$parent.selectedPersonsArray, deselectedRow.entity);
                            $scope.$parent.selectedPersonsArray.splice(curRowSavedIndex, 1);
                            $scope.$parent.selectedPersonsArray.push(row.entity);
                        }
                    } else {
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
                        var curRowSavedIndex = OrgService.indexOfOrganization($scope.$parent.selectedPersonsArray, row.entity);
                        $scope.$parent.selectedPersonsArray.splice(curRowSavedIndex, 1);
                    }
                } else {
                    row.isSelected = false; //do not show selection visually
                }
            } //rowSelectionCallBack



            function getPromisedData() {
                OrgService.getSourceContexts().then(function(data) {
                    var status = data.server_response.status;

                    if (status >= 200 && status <= 210) {
                        $scope.sourceContextArr = data.sort(Common.a2zComparator());
                        if ($scope.usedInModal && !!$scope.sourceContextOnly) {
                            $scope.sourceContextArr = $scope.sourceContextArr.filter(function(c) {
                                return c.code === $scope.sourceContextOnly; // show only the source context assigned
                            });
                        }
                    }
                });

                OrgService.getSourceStatuses2().then(function(data) {
                    var status = data.server_response.status;

                    if (status >= 200 && status <= 210) {
                        $scope.sourceStatusArr = data.sort(Common.a2zComparator());
                        if ($scope.usedInModal) {
                            $scope.sourceStatusArr = $scope.sourceStatusArr.filter(function(s) {
                                return s.code === 'ACT';
                            });
                        }
                        watchSourceContext(); // trigger the watch for source context selection
                    }
                });

                OrgService.getServiceRequests().then(function (requests) {
                    var status = requests.server_response.status;

                    if (status >= 200 && status <= 210) {
                        $scope.serviceRequests = requests;
                    }
                    delete requests.server_response;
                });
            } //getPromisedData


            /**
             * Watch the curation switch to turn on/off the curation choices
             */
            function prepareGidOptions() {
                //ui-grid plugin options
                $scope.gridOptions = PersonService.getGridOptions($scope.usedInModal);
                $scope.gridOptions.isRowSelectable = function (row) {
                    var isCTEPContext =row.entity.source_context  && row.entity.source_context.indexOf('CTEP') > -1;
                    if (isCTEPContext && $scope.sourceContextOnly != 'CTEP') {
                        // if set to show sourceContextOnly to 'CTEP', then we should allow selection
                        return false;
                    } else {
                        return true;
                    }
                };
                $scope.gridOptions.enableVerticalScrollbar = 2; //uiGridConstants.scrollbars.NEVER;
                $scope.gridOptions.enableHorizontalScrollbar = 2; //uiGridConstants.scrollbars.NEVER;

                $scope.gridOptions.exporterAllDataFn = function () {
                    var allSearchParams = angular.copy($scope.searchParams);
                    var origGridColumnDefs = angular.copy($scope.gridOptions.columnDefs);

                    allSearchParams.start = null;
                    allSearchParams.rows = 10000000; // To get back all results, for now

                    return PersonService.searchPeople(allSearchParams).then(
                        function (data) {
                            var status = data.status;

                            if (status >= 200 && status <= 210) {
                                $scope.gridOptions.useExternalPagination = false;
                                $scope.gridOptions.useExternalSorting = false;
                                $scope.gridOptions.data = data['data']['people'];
                                $scope.gridOptions.columnDefs = origGridColumnDefs;
                            }
                        }
                    );
                };

                $scope.gridOptions.onRegisterApi = function (gridApi) {
                    $scope.gridApi = gridApi;
                    $scope.gridApi.core.on.sortChanged($scope, sortChangedCallBack);
                    $scope.gridApi.pagination.on.paginationChanged($scope, function (newPage, pageSize) {
                        $scope.searchParams.start = newPage;
                        $scope.searchParams.rows = pageSize;
                        $scope.searchPeople();
                    });

                    $scope.gridApi.selection.on.rowSelectionChanged($scope, rowSelectionCallBack);
                    $scope.gridApi.selection.on.rowSelectionChangedBatch($scope, function (rows) {
                        _.each(rows, function (row, index) {
                            rowSelectionCallBack(row);
                        });

                    }); //rowSelectionChangedBatch

                }; //gridOptions


                /**
                 * toggle the curation mode (on/off)
                 */
                $scope.toggleCurationMode = function() {
                    $scope.curationShown = !$scope.curationShown;
                }; //toggleCurationMode



                //watcher for $scope.curationShown
                $scope.$watch('curationShown', function(newVal, oldVal) {
                    $scope.gridOptions.columnDefs[0].visible = $scope.curationShown;

                    if (newVal) {
                        // $scope.selectedRows = [];
                        //clearSelectedRows();
                        $scope.nullifiedId = '';
                        $scope.warningMessage = '';
                    } else {
                        var lastRow = clearSelectedRows();
                        if (!!lastRow) {
                            $scope.nullifiedId = lastRow.entity.id === $scope.nullifiedId ? '' : $scope.nullifiedId;
                        }
                    }


                    //$scope.$parent.selectedPersonsArray = []; //$scope.selectedRows;
                    if (newVal != oldVal && $scope.gridApi) {
                        $scope.gridApi.grid.refresh();
                    }
                }, true);


            } //prepareGridOptions


            /**
             * Open calendar
             * @param $event
             * @param type
             */
            $scope.openCalendar = function ($event, type) {

                if (type === "end") {
                    $scope.endDateOpened = true;// !$scope.endDateOpened;
                } else {
                    $scope.startDateOpened = true;// !$scope.startDateOpened;
                }
            }; //openCalendar



            /**
             * watch the readiness of curation submission, default max row selection: 2
             */
            function watchReadinessOfCuration() {
                $scope.$watch('nullifiedId', function(curVal, preVal) {
                    initCurationObj();
                    $scope.toBeCurated.id_to_be_nullified = $scope.nullifiedId;
                    if ($scope.selectedRows.length === $scope.maxRowSelectable && $scope.nullifiedId) {
                        _.each($scope.selectedRows, function (curRow) {
                            if (curRow.entity.id === $scope.nullifiedId) {
                                $scope.nullifiedPerson = curRow.entity.lname + ', ' + curRow.entity.fname + ' ( ' + curRow.entity.id + ' )';
                            } else {
                                $scope.toBeCurated['id_to_be_retained'] = curRow.entity.id;
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
                if (angular.isDefined($scope.$parent.selectedPersonsArray)) {
                    $scope.$parent.selectedPersonsArray = [];
                }

                return deselectedRow;
            }

            function watchCurationMode() {
                $scope.$on(MESSAGES.CURATION_MODE_CHANGED, function() {
                   watchCurationModeSubRoutine();
                });
            }

            function watchCurationModeSubRoutine() {
                $scope.curationShown = UserService.isCurationModeEnabled() || false;
            }

            // dynamically select the list of source statuses for the selected source context
            function watchSourceContext() {
                $scope.$watch('searchParams.source_context', function(newVal, oldVal) {

                    if (!newVal) {
                        // for All source contexts
                        $scope.curSourceStatuses = _.uniq($scope.sourceStatusArr, function(status, key, code) {
                            return status.code;
                        });
                    } else {
                        var context = _.findWhere($scope.sourceContextArr, {code: newVal});
                        var contextId = !!context ? context.id : 2;
                        $scope.curSourceStatuses = $scope.sourceStatusArr.filter(function(status) {
                            return status.source_context_id === contextId;
                        });
                    }

                });
            }

            function _setupState() {
                $scope.maxRowSelectable = $scope.maxRowSelectable === 'undefined' ? Number.MAX_VALUE : $scope.maxRowSelectable ; //default to MAX_VALUE
                $scope.searchParams = PersonService.getInitialPersonSearchParams();
                $scope.sourceContextArr = []; //sourceContextObj;
                $scope.sourceStatusArr = []; //sourceStatusObj;
                $scope.curSourceStatuses = []; // subset of source statuses for the selected source context
                $scope.nullifiedId = '';
                $scope.warningMessage = '';
                $scope.selectedRows = [];
                $scope.curationShown = false;
                $scope.curationModeEnabled = false;
                $scope.processingStatuses = OrgService.getProcessingStatuses();
                $scope.serviceRequests = [];
                $scope.dateFormat = DateService.getFormats()[1];
                // console.log('dateFormat: ' + $scope.dateFormat);
                $scope.dateOptions = DateService.getDateOptions();
                $scope.startDateOpened = ''; //false;
                $scope.endDateOpened = ''; // false;
                $scope.searchWarningMessage = '';
                $scope.searching = false;
                $scope.scope = $scope;
            } // _setupState

        } //advPersonSearchDirectiveController

    }


})();
