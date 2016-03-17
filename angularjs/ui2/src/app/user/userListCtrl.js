/**
 * Created by schintal on 9/20/2015
 */

(function () {
    'use strict';

    angular.module('ctrp.app.user')
        .controller('userListCtrl', userListCtrl);

    userListCtrl.$inject = ['$scope', 'toastr', 'LocalCacheService',
    'UserService', 'uiGridConstants', '$location', '$anchorScroll'];

    function userListCtrl($scope, toastr, LocalCacheService,
        UserService, uiGridConstants, $location, $anchorScroll) {

        var vm = this;

        vm.statusArr = ['In Review', 'Active', 'Inactive', 'Deleted'];
        //toastr.success('Success', 'In userListCtrl');
        vm.searchParams = UserService.getInitialUserSearchParams();

        //ui-grid plugin options
        vm.gridOptions = UserService.getGridOptions();
        vm.gridOptions.enableVerticalScrollbar = uiGridConstants.scrollbars.WHEN_NEEDED;
        vm.gridOptions.enableHorizontalScrollbar = uiGridConstants.scrollbars.WHEN_NEEDED;
        vm.gridOptions.onRegisterApi = function (gridApi) {
            vm.gridApi = gridApi;
            vm.gridApi.core.on.sortChanged($scope, sortChangedCallBack);
            vm.gridApi.pagination.on.paginationChanged($scope, function (newPage, pageSize) {
                vm.searchParams.start = newPage;
                vm.searchParams.rows = pageSize;
                vm.searchUsers();
            });
        }; //gridOptions

        vm.searchUsers = function () {
            //toastr.success('Success', 'In userListCtrl, searchUsers');
            // vm.searchParams.name = vm.searchParams.name || '*';
            //console.log('searching params: ' + JSON.stringify(vm.searchParams));
            UserService.searchUsers(vm.searchParams).then(function (data) {
                //toastr.success('Success', 'In userListCtrl, UserService.searchUsers');
                console.log('received search results data: ' + JSON.stringify(data));
                vm.gridOptions.data = data['users']; //prepareGridData(data.data.orgs); //data.data.orgs;

                //console.log('vm grid: ' + JSON.stringify(vm.gridOptions.data));
                //console.log('received search results: ' + JSON.stringify(data.data));
                vm.gridOptions.totalItems =  data.total;

                $location.hash('users_search_results');
                //$anchorScroll();
            }).catch(function (err) {
                console.log('Search Users failed');
            });
        }; //searchUsers


        vm.resetSearch = function () {
            // vm.states.length = 0;
            vm.searchParams = UserService.getInitialUserSearchParams();
            vm.gridOptions.data.length = 0;
            vm.gridOptions.totalItems = null;

            Object.keys(vm.searchParams).forEach(function (key, index) {
                vm.searchParams[key] = '';
            });
        }; //resetSearch

        activate();

        /****************************** implementations **************************/


        function activate() {
            // vm.searchFamilies();
            // updateSearchResultsUponParamsChanges();
        } //activate

        /**
         * callback function for sorting UI-Grid columns
         * @param grid
         * @param sortColumns
         */
        function sortChangedCallBack(grid, sortColumns) {
            if (sortColumns.length === 0) {
                console.log('removing sorting');
                //remove sorting
                vm.searchParams.sort = '';
                vm.searchParams.order = '';
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
        } //sortChangedCallBack

    }

})();
