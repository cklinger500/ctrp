/**
 * Created by wangg5, May 6th, 2016
 */

(function() {
    'use strict';
    angular.module('ctrp.app.pa.dashboard')
        .controller('checkoutHistoryCtrl', checkoutHistoryCtrl);

    checkoutHistoryCtrl.$inject = ['$scope', 'checkoutHistoryArr', '$filter', '_',
        '$timeout', 'MESSAGES', 'PATrialService', '$stateParams'];

    function checkoutHistoryCtrl($scope, checkoutHistoryArr, $filter, _,
            $timeout, MESSAGES, PATrialService, $stateParams) {
        var vm = this;
        var curTrialId = $stateParams.trialId;
        var pageSize = 20;
        vm.gridOptions = getGridOptions();
        vm.disableBtn = false;

        activate();
        function activate() {
            populateGrid(checkoutHistoryArr);
            listenToCheckouts();
        }

        function populateGrid(arrData) {
            $timeout(function() {
                delete arrData.server_response; // remove the field in the server response

                vm.checkoutHistoryArr = _splitRecordsByType(arrData); // update the cache
                createNewDatasource(vm.checkoutHistoryArr);
                // vm.gridOptions.api.setRowData(vm.checkoutHistoryArr);
                vm.gridOptions.api.refreshView();
                vm.gridOptions.api.sizeColumnsToFit();
            }, 0);
        }

        /**
         * Split the checkout history array by 'admin' and 'scientific' and
         * rearrange them by time in ascending order (earlier time first -> later time last),
         * match each checkout object with its corresponding checkin object
         *
         * @param  {Array} historyArr Array of checkout or checkin objects
         * @return {Array}           rearranged checkout-checkin objects in array
         */
        function _splitRecordsByType(historyArr) {
            var reorderedArr = [];
            if (angular.isArray(historyArr)) {
                var checkoutinRecordArr = historyArr.slice(); // array clone
                while(checkoutinRecordArr.length > 0) {
                    var checkoutRecord = checkoutinRecordArr.shift();
                    var checkinRecord = {};
                    var checkinRecordIndex = _.findIndex(checkoutinRecordArr, {abstraction_type: checkoutRecord.abstraction_type, category: 'Checkin'});
                    if (checkinRecordIndex > -1) {
                        checkinRecord = checkoutinRecordArr.splice(checkinRecordIndex, 1)[0];
                    }

                    var mergedRecord = {
                        abstraction_type: checkoutRecord.abstraction_type,
                        checkout_time: checkoutRecord.created_at,
                        checkout_username: checkoutRecord.username,
                        checkin_time: checkinRecord.created_at || '',
                        checkin_username: checkinRecord.username || '',
                        checkin_comment: checkinRecord.checkin_comment || ''
                    };
                    reorderedArr.push(mergedRecord);
                }
            } // _splitRecordsByType

            return reorderedArr;
        }

        // grid listen to the checkin checkout event in trial overview
        function listenToCheckouts() {
            $scope.$on(MESSAGES.TRIALS_CHECKOUT_IN_SIGNAL, function(event, data) {
                event.preventDefault();
                vm.disableBtn = true;

                PATrialService.getTrialCheckoutHistory(curTrialId).then(function(data) {
                    var status = data.server_response.status;

                    if (status >= 200 && status <= 210) {
                        populateGrid(data);
                    }
                }).finally(function() {
                    vm.disableBtn = false;
                });
            });
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

        function onPageSizeChanged(newPageSize) {
            pageSize = new Number(newPageSize);
            createNewDatasource(vm.checkoutHistoryArr);
        }

        function createNewDatasource(allRecords) {
            if (!allRecords) {
                return;
            }
            var dataSource = {
                pageSize: pageSize,
                getRows: function(params) {
                    var curPage = vm.checkoutHistoryArr.slice(params.startRow, params.endRow);
                    var lastRow = (allRecords.length <= params.endRow) ? allRecords.length : -1;
                    params.successCallback(curPage, lastRow);
                }
            };
            vm.gridOptions.api.setDatasource(dataSource);
        }


        function getColumnDefs() {
            var columns = [
                {headerName: 'Type', width: 60, field: 'abstraction_type', cellRenderer: _renderCellType},
                {headerName: 'Check Out',
                 children: [
                     {headerName: 'Check Out Time', width: 75, field: 'checkout_time', cellRenderer: _renderCellDate},
                     {headerName: 'Check Out User', width: 80, field: 'checkout_username', cellRenderer: _renderToolTip},
                    ]
                },
                {headerName: 'Check In',
                 children: [
                     {headerName: 'Check In Time', width: 75, field: 'checkin_time', cellRenderer: _renderCellDate},
                     {headerName: 'Check In User', width: 80, field: 'checkin_username', cellRenderer: _renderToolTip},
                     {headerName: 'Check In Comment',field: 'checkin_comment', cellRenderer: _renderToolTip, suppressSizeToFit: false}
                    ]
                }
            ];

            return columns;
        }

        function _renderCheckoutIcon(params) {
            if (!angular.isDefined(params.value)) {
                return '';
            }
            var category = $filter('toProperCase')(params.value);
            var renderedText = category;
            if (category === 'Checkout') {
                renderedText += ' <i class="glyphicon glyphicon-log-out"></i>';
            } else if (category === 'Checkin') {
                renderedText += ' <i class="glyphicon glyphicon-log-in"></i>'
            }
            return '<span>' + renderedText + '</span>';
        }

        function _renderToolTip(params) {
            if (!angular.isDefined(params.value)) {
                return '';
            }
            return '<span uib-tooltip="' + params.value + '">' + params.value +'</span>';
        }

        function _renderCellType(params) {
            if (!angular.isDefined(params.value)) {
                return '';
            }

            var formattedType = $filter('toProperCase')(params.value);
            return formattedType;
        }

        function _renderCellDate(params) {
            return $filter('date')(params.value, 'dd-MMM-yyyy H:mm');
        }
    } // checkoutHistoryCtrl

})();
