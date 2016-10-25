
/**
 * Created by dullam, February 12th, 2016
 */

(function() {
    'use strict';
    angular.module('ctrp.app.pa.dashboard')
        .controller('trialHistoryCtrl', trialHistoryCtrl);

    trialHistoryCtrl.$inject = ['$scope', 'TrialService', 'MESSAGES',
        '$timeout', '_', 'PATrialService', 'toastr','AuditService','uiGridConstants','$uibModal','UserService','HOST','DateService','userDetailObj'];

    function trialHistoryCtrl($scope, TrialService, MESSAGES,
                                     $timeout, _, PATrialService, toastr,AuditService,uiGridConstants,$uibModal,UserService,HOST,DateService,userDetailObj) {
        var vm = this;
        vm.hasUserOpenedUpdates=false;

        /* Submissions Tab variables */
        vm.amendment_reasons_array = [];
        vm.isCollapsed = false;
        vm.showDeletedDocs = showDeletedDocs;
        vm.showDeletedDocuments=false;
        vm.toggleText= 'Show Deleted or Revised Documents';

        /* Updates Tab Variables */
        vm.updateParams = AuditService.getUpdateInitialSearchParams();
        vm.updatesGridOptions = AuditService.getUpdatesGridOptions();

        vm.submissionParams = AuditService.getSubmissionInitialSearchParams();
        /* Audit Trial Tab variables */
        vm.startDateOpened = false;
        vm.endDateOpened = false;
        vm.openCalendar = openCalendar;
        vm.loadAuditTrials = loadAuditTrials;
        vm.showAuditTrials = showAuditTrials;
        vm.searchWarningMessage = '';

        vm.auditGridOptions = AuditService.getAuditsGridOptions();
        var pageSize = 500;//audit grid page size

        vm.disableBtn = false;
        vm.auditParams = AuditService.getAuditInitialSearchParams();

        vm.showSubmissions= showSubmissions;
        vm.loadTrialSubmissions = loadTrialSubmissions;

        //This variable is being used by grid row to download a trial document.(Refer Audit Trial Service)
        $scope.downloadBaseUrl = HOST + '/ctrp/registry/trial_documents/download/';

        vm.submissionsGridOptions = AuditService.getSubmissionsGridOptions();
        vm.submissionsGridOptions.data = null;
        vm.submissionsGridOptions.totalItems = null;
        vm.submissionsGridOptions.exporterAllDataFn = function () {
            var trialId = $scope.$parent.paTrialOverview.trialDetailObj.id || vm.trialProcessingObj.trialId;

            vm.trialHistoryObj = {trial_id: trialId,start: vm.submissionParams.start, rows: vm.submissionParams.rows};
            vm.disableBtn = true;

            return AuditService.getSubmissions(vm.trialHistoryObj).then(function (data) {
                var status = data.server_response.status;

                if (status >= 200 && status <= 210) {
                    vm.submissionsGridOptions.data = data.trial_versions;
                    vm.submissionsGridOptions.totalItems = data.total;

                    _.each(vm.submissionsGridOptions.data, function(version) {
                        var docsArray = [];
                        _.each(version.docs, function(doc) {
                            docsArray.push(doc.file_name);
                        })

                        version.docs = docsArray.join(';');
                    });
                    console.log('export related: ', data.trial_versions);
                }
            }).catch(function (err) {
                console.log('Getting trial submissions failed');
            }).finally(function () {
                console.log('search finished');

                vm.disableBtn = false;
            });
        };
        vm.submissionsGridOptions.onRegisterApi = function (gridApi) {
            vm.gridApi = gridApi;
            vm.gridApi.pagination.on.paginationChanged($scope, function (newPage, pageSize) {
                vm.submissionParams.start = newPage;
                vm.submissionParams.rows = pageSize;
                vm.loadTrialSubmissions();
            });
        }; //gridOptions


        activate();
        function activate() {
            //vm.auditGridOptions = getGridOptions();
            vm.auditGridOptions.data =null;
            vm.auditGridOptions.totalItems = null;

            loadTrialSubmissions();

            showDeletedDocs();

        }

        function getGridOptions() {
            var options = {
                // rowData: vm.checkoutHistoryArr,
                rowModelType: 'pagination',
                columnDefs: getColumnDefs(),
                enableColResize: true,
                enableSorting: false,
                enableFilter: true,
                rowHeight: 30,
                angularCompileRows: true,
                suppressRowClickSelection: true,
                suppressSizeToFit: false,
            };

            return options;
        }


        function getColumnDefs() {
            var columns = [
                {field: 'created_at'},
                {field: 'event'},
                {field: 'nci_id'},
                {field: 'lead_protocol_id'},
                {field: 'official_title'}
            ];

            return columns;
        }



        /*Implementations below*/

        vm.toggleDeletedDocs = function toggleDeletedDocs() {

            vm.showDeletedDocuments = !vm.showDeletedDocuments;
            if (vm.toggleText == "Show Deleted or Revised Documents") {
                vm.toggleText = "Hide Deleted or Revised Documents"
            } else if (vm.toggleText="Hide Deleted or Revised Documents") {
                vm.toggleText = "Show Deleted or Revised Documents"

            }

        }

         function showSubmissions() {

             vm.loadTrialSubmissions();

        };

        function showAuditTrials() {

            var columnDefs = [
                {headerName: "Make", field: "make"},
                {headerName: "Model", field: "model"},
                {headerName: "Price", field: "price"}
            ];

            var rowData = [
                {make: "Toyota", model: "Celica", price: 35000},
                {make: "Ford", model: "Mondeo", price: 32000},
                {make: "Porsche", model: "Boxter", price: 72000}
            ];


            vm.auditGridOptions.data =null;
            vm.auditGridOptions.totalItems = null;

            vm.auditGridOptions.onRegisterApi = function (gridApi) {
                vm.gridApi = gridApi;
                vm.gridApi.pagination.on.paginationChanged($scope, function (newPage, pageSize) {
                    vm.auditParams.start = newPage;
                    vm.auditParams.rows = pageSize;
                    loadAuditTrials();
                });
            }; //gridOptions



            loadAuditTrials();
        }


        //** Updates Logic **//
        vm.showUpdates= function showUpdates() {
            if (!vm.hasUserOpenedUpdates) {
                vm.updatesGridOptions = AuditService.getUpdatesGridOptions();
                vm.updatesGridOptions.data = null;
                vm.updatesGridOptions.totalItems = null;
                vm.updatesGridOptions.enableVerticalScrollbar = 1;// uiGridConstants.scrollbars.WHEN_NEEDED;
                vm.updatesGridOptions.enableHorizontalScrollbar = 1;//uiGridConstants.scrollbars.WHEN_NEEDED;
                vm.updatesGridOptions.onRegisterApi = function (gridApi) {
                    console.log("cbc");
                    vm.gridApi = gridApi;

                    gridApi.expandable.on.rowExpandedStateChanged($scope, function (row) {


                    });

                    vm.gridApi.core.addRowHeaderColumn({
                        name: 'rowHeaderCol',
                        displayName: '',
                        width: 30,
                        cellTemplate: 'expandable_row_header_column.html'
                    });

                    vm.gridApi.pagination.on.paginationChanged($scope, function (newPage, pageSize) {
                        vm.updateParams.start = newPage;
                        vm.updateParams.rows = pageSize;
                        loadTrialUpdates();
                    });
                }; //gridOptions
                vm.updatesGridOptions.enableVerticalScrollbar = 1;//uiGridConstants.scrollbars.WHEN_NEEDED;
                vm.updatesGridOptions.enableHorizontalScrollbar = 1; // uiGridConstants.scrollbars.WHEN_NEEDED;
                loadTrialUpdates();
                vm.hasUserOpenedUpdates=true;
            }
        };

        function loadTrialUpdates() {
            var trialId = $scope.$parent.paTrialOverview.trialDetailObj.id || vm.trialProcessingObj.trialId;

            vm.trialHistoryObj = {trial_id: trialId, start: vm.updateParams.start, rows: vm.updateParams.rows};
            vm.disableBtn = true;

            AuditService.getUpdates(vm.trialHistoryObj).then(function (data) {
                var status = data.server_response.status;

                if (status >= 200 && status <= 210) {
                    console.log('received search results ***: ' + JSON.stringify(data.trial_versions));

                    for (var i = 0; i < data.trial_versions.length; i++) {
                        data.trial_versions[i].subGridOptions = {
                            data: data.trial_versions[i].fields_of_interest
                        };
                    }

                    vm.updatesGridOptions.data = data.trial_versions;
                    vm.updatesGridOptions.totalItems = data.total;
                }
            }).catch(function (err) {
                console.log('Getting trial updates failed');
            }).finally(function () {
                console.log('search finished');
                vm.disableBtn = false;
            });
        }


        //*** Submissions Tab Logic ***//
        function loadTrialSubmissions() {
            var trialId = $scope.$parent.paTrialOverview.trialDetailObj.id || vm.trialProcessingObj.trialId;

            vm.trialHistoryObj = {trial_id: trialId,start: vm.submissionParams.start, rows: vm.submissionParams.rows};
            vm.disableBtn = true;

            AuditService.getSubmissions(vm.trialHistoryObj).then(function (data) {
                var status = data.server_response.status;

                if (status >= 200 && status <= 210) {
                    console.log('received search results: ' + JSON.stringify(data.trial_versions));
                    vm.submissionsGridOptions.data = data.trial_versions;
                    vm.submissionsGridOptions.totalItems = data.total;
                    vm.amendment_reasons_array = data.amendement_reasons;
                    console.log("reasons" + JSON.stringify(vm.amendment_reasons_array));
                }
            }).catch(function (err) {
                console.log('Getting trial submissions failed');
            }).finally(function () {
                console.log('search finished');

                vm.disableBtn = false;
            });
        }

        function loadTrialDeletedDocs() {
            var trialId = $scope.$parent.paTrialOverview.trialDetailObj.id || vm.trialProcessingObj.trialId;

            vm.trialHistoryObj = {trial_id: trialId};
            vm.disableBtn = true;

            AuditService.getDeletedDocs(vm.trialHistoryObj).then(function (data) {
                var status = data.server_response.status;

                if (status >= 200 && status <= 210) {
                    vm.deleteDocsGridOptions.data = data.deleted_documents;
                    vm.deleteDocsGridOptions.totalItems = data.deleted_documents["length"];
                }
            }).catch(function (err) {
                console.log('Getting trial deleted documents failed');
            }).finally(function () {
                vm.disableBtn = false;
            });
        }



        function showDeletedDocs() {
            vm.deleteDocsGridOptions = AuditService.getDeleteDocsGridOptions();
            vm.deleteDocsGridOptions.data = null;
            vm.deleteDocsGridOptions.totalItems = null;
            loadTrialDeletedDocs();

        }




    //***Audit Trial Tab Logic ***//

        function onPageSizeChanged(newPageSize) {
            pageSize = new Number(newPageSize);
            //createNewDatasource(vm.checkoutHistoryArr);
        }


        function loadAuditTrials() {
            var trialId = $scope.$parent.paTrialOverview.trialDetailObj.id || vm.trialProcessingObj.trialId;
            var startDate = vm.start_date;
            var endDate = vm.end_date;
            vm.trialHistoryObj = {trial_id: trialId, start_date: startDate, end_date: endDate, start: vm.auditParams.start, rows: vm.auditParams.rows};
            vm.disableBtn = true;


            //if (startDate != null && endDate != null) {
                vm.searchWarningMessage=''
                AuditService.getAudits(vm.trialHistoryObj).then(function (data) {
                    var status = data.server_response.status;

                    if (status >= 200 && status <= 210) {
                        console.log('received search results: ' + JSON.stringify(data.trial_versions));
                       vm.auditGridOptions.rowData=data.trial_versions
                        //vm.auditGridOptions.api.setRowData(data.trial_versions);
                        //$scope.auditGridOptions.rowData = data.trial_versions

                        //vm.auditGridOptions.data = data.trial_versions;
                        //vm.auditGridOptions.api.refreshView();
                        //vm.auditGridOptions.api.sizeColumnsToFit();

                        vm.auditGridOptions.totalItems = data.total;
                    }
                }).catch(function (err) {
                    console.log('Getting audit trials failed');
                }).finally(function () {
                    console.log('search finished');
                    vm.searching = false;
                    vm.disableBtn = false;
                });
           // }else{
              //  vm.searchWarningMessage='Start Date and End Date can not be null'
            //}

        }



        function openCalendar($event, type) {
            $event.preventDefault();
            $event.stopPropagation();
            if (type === 'start_date') {
                vm.startDateOpened = !vm.startDateOpened;
            } else if (type === 'end_date') {
                vm.endDateOpened = !vm.endDateOpened;
            }
        }; //openCalendar




  //** ALL MODALS related to Updates and Submissions Tabs **//

        $scope.showTrialDocuments= function(grid, row,gr) {
                $uibModal.open({
                    templateUrl: 'showTrialDocsOnModal.html',
                    controller: ['$uibModalInstance', 'grid', 'row', ShowTrialDocumentsModalInstanceController],
                    controllerAs: 'vm',
                    size: 'md',
                    resolve: {
                        grid: function () { return grid; },
                        row: function () { return row; }
                    }
                });

        }

        /* @ngInject */
        function ShowTrialDocumentsModalInstanceController($uibModalInstance, grid, row) {
            var vm = this;
            vm.entity = angular.copy(row.entity);
            vm.docs = row.entity.docs;
            vm.downloadBaseUrl = $scope.downloadBaseUrl;
        }



        $scope.editRow= function(grid, row,gridType) {
            if(gridType == "updates") {
                $uibModal.open({
                    templateUrl: 'acknowledgeModal.html',
                    controller: ['$uibModalInstance', 'grid', 'row', UpdateModalInstanceController],
                    controllerAs: 'vm',
                    size: 'md',
                    resolve: {
                        grid: function () { return grid; },
                        row: function () { return row; }
                    }
                });
            } else if(gridType == "submissions") {
                $uibModal.open({
                    templateUrl: 'submissionsModal.html',
                    controller: ['$uibModalInstance', 'grid', 'row','reasonsArr', SubmissionModalInstanceController],
                    controllerAs: 'vm',
                    size: 'md',
                    resolve: {
                        grid: function () { return grid; },
                        row: function () { return row; },
                        reasonsArr: function () {return vm.amendment_reasons_array;}
                    }
                });
            }
        }

        /* @ngInject */
        function UpdateModalInstanceController($uibModalInstance, grid, row) {
            var vm = this;
            vm.entity = angular.copy(row.entity);
            vm.submission_num     =   row.entity.submission_num;
            vm.submission_date    =   moment(row.entity.submission_date).format('DD-MMM-YYYY'); //DateService.convertISODateToLocaleDateStr(row.entity.submission_date);
            vm.acknowledgeUpdate  =   acknowledgeUpdate;
            vm.disableBtn         =   false;

            function acknowledgeUpdate() {
                vm.entity.acknowledge ="Yes";
                vm.entity.acknowledge_date = moment().toDate();
                vm.entity.acknowledged_by = userDetailObj.first_name +" , "+ userDetailObj.last_name;
                var obj={'id':row.entity.id,
                    'acknowledge_comment':vm.entity.acknowledge_comment,
                    'acknowledge':vm.entity.acknowledge,
                    'acknowledge_date':vm.entity.acknowledge_date,
                    'acknowledged_by':vm.entity.acknowledged_by};

                vm.disableBtn = true;

                AuditService.upsertSubmission(obj).then(function(res) {
                    var status = res.server_response.status;

                    if (status >= 200 && status <= 210) {
                        //vm.entity.acknowledge_date = DateService.convertISODateToLocaleDateStr(vm.entity.acknowledge_date);
                        row.entity = angular.extend(row.entity, vm.entity);

                        toastr.clear();
                        toastr.success('Submission has been acknowledged', 'Operation Successful!');
                    }

                }).catch(function(err) {
                    console.log("Error while acknowledging trial submission ");
                }).finally(function() {
                    /* ADIL: We are catching most error codes in Interceptor so this isn't needed
                    if (resStatus>210) {
                    }
                     */
                    vm.disableBtn = false;

                });
                $uibModalInstance.close(row.entity);
            }

        }

        /* @ngInject */
        function SubmissionModalInstanceController($uibModalInstance, grid, row,reasonsArr) {
            var vm = this;
            vm.entity = angular.copy(row.entity);
            vm.entity.submission_num = row.entity.submission_num;
            vm.entity.submission_date =  row.entity.submission_date; //DateService.convertISODateToLocaleDateStr(row.entity.submission_date);
            vm.entity.amendment_num = row.entity.amendment_num;

            vm.reasonArr = reasonsArr;
            vm.updateSubmission = updateSubmission;
            vm.amendmentDateOpened = false;
            vm.openCalendar = openCalendar;
            vm.disableBtn = false;

            function openCalendar($event, type) {
                $event.preventDefault();
                $event.stopPropagation();
                if (type === 'amendment_date') {
                    vm.amendmentDateOpened = !vm.amendmentDateOpened;
                }
            }; //openCalendar

            function updateSubmission() {
                var obj={'id':row.entity.id,
                    'amendment_num':vm.entity.amendment_num,
                    'amendment_date':vm.entity.amendment_date,
                    'amendment_reason_id':vm.entity.amendment_reason_id};

                vm.disableBtn = true;

                AuditService.upsertSubmission(obj).then(function(res) {
                    var status = res.server_response.status;

                    if (status >= 200 && status <= 210) {
                        vm.entity.submission_type_list=[];
                        vm.entity.submission_type_list.push("Amendment");
                        vm.entity.submission_type_list.push("Date:" + vm.entity.amendment_date);
                        //vm.entity.submission_type_list.push("Date:" + DateService.convertISODateToLocaleDateStr(vm.entity.amendment_date));
                        vm.entity.submission_type_list.push("Reason:" +vm.entity.amendment_reason_id);
                        vm.entity.submission_type_list.push("Number:" +vm.entity.amendment_num);
                        vm.entity.submission_type ="Amendment";
                        row.entity = angular.extend(row.entity.submission_type_list, vm.entity.submission_type_list);
                        row.entity = angular.extend(row.entity, vm.entity);
                        toastr.clear();
                        toastr.success('Amendment has been updated', 'Operation Successful!');
                    }

                }).catch(function(err) {
                    console.log("Error while updating trial amendment");
                }).finally(function() {
                    vm.disableBtn = false;
                });

                $uibModalInstance.close(row.entity);

            }
        }
    } //trialHistoryCtrl

})();
