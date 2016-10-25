

(function () {
    'use strict';

    angular.module('ctrp.app.pa')
        .controller('pamTrialListCtrl', pamTrialListCtrl);

    pamTrialListCtrl.$inject = ['UserService', 'toastr', 'PromiseTimeoutService', 'uiGridConstants', 'userDetailObj','MESSAGES', '$rootScope', '$scope', '$filter', 'URL_CONFIGS', 'uiGridExporterConstants', 'uiGridExporterService'];

    function pamTrialListCtrl(UserService, toastr, PromiseTimeoutService, uiGridConstants, userDetailObj, MESSAGES, $rootScope, $scope, $filter, URL_CONFIGS, uiGridExporterConstants, uiGridExporterService) {
        var vm = this;

        vm.userDetails = userDetailObj;
        vm.isCurationEnabled = UserService.isCurationModeEnabled();
        vm.selectedOrgsArray = [];
        vm.savedSelection = [];
        vm.states = [];
        vm.userRole = UserService.getUserRole();


        /**** TRIALS *****/
        // Initial Search Parameters
        var TrialSearchParams = function (){
            return {
                sort: 'submission_received_date',
                order: 'asc',
                rows: 25,
                start: 1
            }
        };
        var idTemplateWrite = '<div class="ui-grid-cell-contents tooltip-uigrid" title="{{COL_FIELD}}">' +
                '<a ui-sref="main.pa.trialOverview.trialIdentification({trialId : row.entity.trial_id })">{{COL_FIELD}}</a></div>';
        var idTemplateRead = '<div class="ui-grid-cell-contents tooltip-uigrid" title="{{COL_FIELD}}">' +
                '<a ui-sref="main.viewTrial({trialId : row.entity.trial_id })">{{COL_FIELD}}</a></div>';

        var completionDatePickerTemplate = '<div class="ui-grid-datepicker"><i class="glyphicon glyphicon-edit"></i>' +
            '<input class="completion-date-click" ng-disabled="!grid.appScope.isCurationEnabled" class="completion-date-change" ng-focus="grid.appScope.closeToolTips()" readonly="true" ' +
            'uib-popover-template="\'complete-date-popover.html\'" popover-append-to-body="true" data-style="primary" popover-title="Set {{row.entity.nci_id}} Completion Date" ' +
            'value="{{row.entity.expected_abstraction_completion_date}}" /></div>' +
            '<script type="text/ng-template" id="complete-date-popover.html">' +
            '<div class="change-date"><div class="input-group date datepicker ui-grid-datepicker">' +
            '<input id="date-{{row.entity.id}}" min-date="row.entity.submission_received_date" class="form-control" readonly="true"  show-button-bar="true" ' +
            'datepicker-append-to-body="false" ng-model="row.entity.expected_abstraction_completion_date" close-text="Close" show-weeks="true" ' +
            'ng-disabled="grid.appScope.isCurationEnabled?false:true" ng-click="opened = true;" uib-datepicker-popup="dd-MMM-yyyy" is-open="opened" ' +
            'datepicker-options="grid.appScope.dateOptions" type="text" date-formatter>' +

            '<span class="input-group-btn">' +
            '<label for="date-{{row.entity.id}}" class="btn btn-primary"><i class="glyphicon glyphicon-calendar"></i></label>' +
            '</span></div>' +
            '<textarea placeholder="Put your comments here" class="completion-date-comments" ng-model="row.entity.expected_abstraction_completion_date_comments"></textarea></div>' +

            '<div class="row tooltip-footer">' +
            '<button type="button" class="btn btn-primary pull-right" ng-click="grid.appScope.dateModifyFlag(row.entity)" ' +
            'id="save_btn"> <i class="glyphicon glyphicon-ok"></i>  Save</button>' +

             '<button type="button" class="btn btn-warning pull-right" ng-click="grid.appScope.closeToolTips()" >' +
             '<i class="glyphicon glyphicon-remove"></i> Cancel</button>' +
            '</div>' +
        '</script>';

        vm.chooseTransferTrials = false;
        vm.showTransferTrialsModal = false;
        vm.showAddTrialsModal = false;

        vm.export_row_type = "visible";
        vm.export_column_type = "visible";
        vm.searchParams = new TrialSearchParams;
        vm.viewCount = vm.searchParams.start + vm.searchParams.rows - 1;
        vm.gridTrialsSubmittedOptions = {
            enableColumnResizing: true,
            totalItems: null,
            rowHeight: 22,
            paginationPageSizes: [10, 25, 50, 100, 1000],
            paginationPageSize: 25,
            useExternalPagination: true,
            useExternalSorting: true,
            enableFiltering: false,
            enableVerticalScrollbar: 2,
            enableHorizontalScrollbar: 2,
            columnDefs: [
                {
                    name: 'nci_id',
                    enableSorting: true,
                    displayName: 'NCI Trial Identifier',
                    width: '180'
                },
                {
                    name: 'submission_type_label',
                    displayName: 'Submission Type',
                    enableSorting: true,
                    width: '*',
                    minWidth: '150'
                },
                {
                    name: 'submission_received_date',
                    displayName: 'Submitted On',
                    enableSorting: true,
                    cellFilter: 'date:\'dd-MMM-yyyy\'',
                    width: '*',
                    minWidth: '150'
                },
                {
                    name: 'expected_abstraction_completion_date',
                    displayName: 'Expected Abstraction Completion Date',
                    enableSorting: true,
                    cellFilter: 'date:\'dd-MMM-yyyy\'',
                    minWidth: '200',
                    cellTemplate: completionDatePickerTemplate,
                    sortable : false
                },
                {
                    name: 'submission_acceptance_date',
                    displayName: 'Accepted',
                    enableSorting: true,
                    cellFilter: 'date:\'dd-MMM-yyyy\'',
                    width: '*',
                    minWidth: '200'
                },
                {
                    name: 'onhold_date',
                    displayName: 'Current On-Hold Date',
                    enableSorting: true,
                    cellFilter: 'date:\'dd-MMM-yyyy\'',
                    width: '*',
                    minWidth: '200'
                },
                {
                    name: 'administrative_processing_completed_date',
                    displayName: 'Admin Abstraction Completed',
                    enableSorting: true,
                    cellFilter: 'date:\'dd-MMM-yyyy\'',
                    width: '*',
                    minWidth: '200'
                },
                {
                    name: 'administrative_qc_completed_date',
                    displayName: 'Admin QC Completed',
                    enableSorting: true,
                    cellFilter: 'date:\'dd-MMM-yyyy\'',
                    width: '*',
                    minWidth: '200'
                },
                {
                    name: 'scientific_processing_completed_date',
                    displayName: 'Scientific Abstraction Completed',
                    enableSorting: true,
                    cellFilter: 'date:\'dd-MMM-yyyy\'',
                    width: '*',
                    minWidth: '200'
                },
                {
                    name: 'scientific_qc_completed_date',
                    displayName: 'Scientific QC Completed',
                    enableSorting: true,
                    cellFilter: 'date:\'dd-MMM-yyyy\'',
                    width: '*',
                    minWidth: '200'
                },
                {
                    name: 'checkout',
                    displayName: 'Checked Out By',
                    enableSorting: true,
                    cellFilter: 'date:\'dd-MMM-yyyy\'',
                    cellTemplate: "<div class=\"ui-grid-cell-contents tooltip-uigrid\" >{{grid.appScope.getCheckOut(row.entity.checkout)}}</div>",
                    width: '*',
                    minWidth: '200'
                },
                {
                    name: 'trial_summary_report_ready_date',
                    displayName: 'Ready for TSR',
                    enableSorting: true,
                    cellFilter: 'date:\'dd-MMM-yyyy\'',
                    width: '*',
                    minWidth: '200'
                },
                {
                    name: 'business_days_since_submitted',
                    displayName: 'Business Days Since Submitted',
                    enableSorting: true,
                    width: '*',
                    minWidth: '200'
                }
            ],
            enableRowHeaderSelection : true,
            enableGridMenu: true,
            enableSelectAll: true,
            exporterCsvFilename: 'ctrp-abstraction-trials.csv',
            exporterMenuAllData: true,
            exporterMenuPdf: false,
            exporterMenuCsv: false,
            gridMenuCustomItems: [{
                title: 'Export All Data As CSV',
                order: 100,
                action: function ($event){
                    this.grid.api.exporter.csvExport(uiGridExporterConstants.ALL, uiGridExporterConstants.ALL);
                }
            }]
        };

        vm.getCheckOut =  UserService.getCheckOut;

        vm.gridTrialsSubmittedOptions.appScopeProvider = vm;

        vm.dateModifyFlag = function (row) {
            PromiseTimeoutService.postDataExpectObj(URL_CONFIGS.SUBMISSION_EXPECT_COMPLETE, {
                id: row.id,
                expected_abstraction_completion_date: row.expected_abstraction_completion_date,
                expected_abstraction_completion_date_comments: row.expected_abstraction_completion_date_comments
            }).then(function (data) {
                var status = data.server_response.status;

                if (status >= 200 && status <= 210) {
                    if (data.id) {
                        toastr.success('Expected Abstraction Completion Date has been updated', 'Operation Successful!');
                    }
                    vm.getUserSubmittedTrials();
                }
            }).catch(function (err) {
                console.log('Expected Abstraction Completion Date Update failed: ' + err);
            });
        };

        vm.closeToolTips = function() {
            var popovers = document.querySelectorAll('.popover');
            angular.forEach(popovers, function (popover) {
                var parentPopOver = angular.element(popover);
                if (parentPopOver.hasClass('in')) {
                   parentPopOver.remove();
                }
            });
        };

        vm.gridTrialsSubmittedOptions.onRegisterApi = function (gridApi) {
            vm.gridApi = gridApi;
            vm.gridApi.core.on.sortChanged($scope, sortSubmittedChangedCallBack);
            vm.gridApi.pagination.on.paginationChanged($scope, function (newPage, pageSize) {
                vm.searchParams.start = newPage;
                vm.searchParams.rows = pageSize;
                vm.getUserSubmittedTrials();
            });
        };
        vm.gridTrialsSubmittedOptions.exporterAllDataFn = function () {
            var allSearchParams = angular.copy(vm.searchParams);
            allSearchParams.start = null;
            allSearchParams.rows = null;
            return PromiseTimeoutService.postDataExpectObj(URL_CONFIGS.USER_SUBMITTED_TRIALS, allSearchParams).then(
                function (data) {
                    var status = data.server_response.status;

                    if (status >= 200 && status <= 210) {
                        vm.gridTrialsSubmittedOptions.useExternalPagination = false;
                        vm.gridTrialsSubmittedOptions.useExternalSorting = false;
                        vm.gridTrialsSubmittedOptions.data = data['trial_submissions'];
                    }
                }
            );
        };
        vm.getUserSubmittedTrials = function () {
            vm.closeToolTips();
            vm.gridTrialsSubmittedOptions.useExternalPagination = true;
            vm.gridTrialsSubmittedOptions.useExternalSorting = true;
            UserService.getUserTrialsSubmitted(vm.searchParams).then(function (data) {
                var status = data.server_response.status;

                if (status >= 200 && status <= 210) {
                    vm.read_access  = data.userReadAccess;
                    vm.write_access = data.userWriteAccess;

                    vm.gridTrialsSubmittedOptions.columnDefs[0].cellTemplate = vm.write_access ? idTemplateWrite :idTemplateRead;
                    vm.gridTrialsSubmittedOptions.totalItems = data.total;
                    vm.gridTrialsSubmittedOptions.data = data['trial_submissions'];
                    _.forEach(vm.gridTrialsSubmittedOptions.data, function (val) {
                        val.expected_abstraction_completion_date = moment(val.expected_abstraction_completion_date).format('DD-MMM-YYYY');
                    });


                    $rootScope.$broadcast('isWriteModeSupported', vm.write_access);
                }
            }).catch(function (err) {
                console.log('Get User Submitted Trials failed');
            });
        };
        vm.getUserSubmittedTrials();

        /****************** implementations below ***************/


        $scope.$on(vm.redirectToAllUsers, function () {
            vm.states = [];
        });

        /**
         * callback function for sorting UI-Grid columns
         * @param grid
         * @param sortColumns
         */
        function sortSubmittedChangedCallBack(grid, sortColumns) {

            if (sortColumns.length === 0) {
                vm.searchParams.sort = 'submission_received_date';
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
            vm.getUserSubmittedTrials();
        } //sortChangedCallBack

        //Listen to the write-mode switch
        $scope.$on(MESSAGES.CURATION_MODE_CHANGED, function() {
            vm.isCurationEnabled = UserService.isCurationModeEnabled();
        });
    }
}());
