/**
 * Created by schintal on 9/20/2015
 */

(function () {
    'use strict';

    angular.module('ctrp.app.user')
        .controller('userAssignTrialCtrl', userAssignTrialCtrl);

    userAssignTrialCtrl.$inject = ['toastr', 'userDetailObj', 'TrialService', 'OrgService', 'UserService', 'FamilyService', '$stateParams'];

    function userAssignTrialCtrl(toastr, userDetailObj, TrialService, OrgService, UserService, FamilyService, $stateParams) {
        var vm = this;
        vm.curUser = userDetailObj;
        vm.trialId = $stateParams.trialId;

        vm.typeAheadNameSearch = function () {
            return OrgService.typeAheadOrgNameSearch(vm.org_search_name, 'no_family');
        };

        vm.setAssignTrialTypeAheadOrg = function (searchObj) {
            var orgSearch = OrgService.setTypeAheadOrg(searchObj);
            vm.org_search_name = orgSearch.organization_name;
            vm.userChosenOrg = orgSearch.organization_details;
            vm.organization_id = vm.userChosenOrg.id;
            vm.family_id = undefined;
            vm.getFamilyTrialsUsers();
        };

        vm.removeOrgChoice = function () {
            vm.userChosenOrg = null;
            vm.organization_id = vm.org_search_name = undefined;
            vm.showSelects = vm.family_id || vm.organization_id;
            vm.showErrors = false;
        };

        vm.getFamilyTrialsUsers = function () {
            if (vm.family_id || vm.organization_id) {
                UserService.createTransferTrialsOwnership(vm);
                if (!vm.trialId) {
                    TrialService.createTransferTrialsOwnership(vm);
                }
                vm.showSelects = vm.family_id || vm.organization_id;
            }
            if (!vm.organization_id) {
                vm.removeOrgChoice();
            }
        };

        vm.resetAll = function () {
            vm.showErrors = false;
            vm.userOptions.reset();
            if (!vm.trialId) {
                vm.trialOptions.reset();
            }
        };

        vm.validateAssignment = function () {
            vm.showErrors = false;
            if ((!vm.trialId && vm.trialOptions.selectedItems.length === 0) || vm.userOptions.selectedItems.length === 0) {
                vm.showErrors = true;
            }
        };

        var submitAddOwnerships = function (params) {
            UserService.addUserTrialsOwnership(params).then(function (data) {
                var status = data.server_response.status;

                if (status >= 200 && status <= 210) {
                    if(data.results && data.results.complete === true) {
                        toastr.success('Trial Ownership(s) Created', 'Success!');
                        vm.resetAll();
                    }
                }
            });
        };

        var submitEndOwnerships = function (params, msg) {
            UserService.endUserTrialsOwnership(params).then(function (data) {
                var status = data.server_response.status;

                if (status >= 200 && status <= 210) {
                    if (data.results === 'success') {
                        toastr.success('Trial Ownership Removed', 'Success!');
                        vm.resetAll();
                    }
                }
            });
        };

        function getTrialsUsersSelection(){
            var searchParams = {};
            searchParams.user_ids = _.chain(vm.userOptions.selectedItems).pluck('id').value();
            if (!vm.trialId && vm.trialOptions.selectedItems.length) {
                searchParams.trial_ids = _.chain(vm.trialOptions.selectedItems).pluck('id').value();
            } else {
                searchParams.trial_ids = [vm.trialId];
                vm.setAddMode = false;
            }
            return searchParams;
        }
        
        vm.save = function () {
            if (vm.userOptions.selectedItems.length) {
                submitAddOwnerships(getTrialsUsersSelection());
            }
        };
        
        vm.removeTrialsOwnerships = function () {
            if (vm.userOptions.selectedItems.length) {
                submitEndOwnerships(getTrialsUsersSelection());
            }
        };

        vm.familySearchParams = {
            name: '*',
            wc_search: true,
            family_status:'Active',
            allrows: true
        };

        if(!(vm.curUser.org_families && vm.curUser.org_families[0])) {

            if(vm.curUser.organization && vm.curUser.organization.id) {
                vm.organization_id = vm.curUser.organization.id;
                vm.organization_name = vm.curUser.organization.name;
                vm.getFamilyTrialsUsers();
            }
        }

        if((vm.curUser.org_families && vm.curUser.org_families[0]) || vm.curUser.role === 'ROLE_ADMIN' || vm.curUser.role === 'ROLE_SUPER' || vm.curUser.role === 'ROLE_ABSTRACTOR') {
            FamilyService.searchFamilies(vm.familySearchParams).then(function (data) {
                var status = data.status;

                if (status >= 200 && status <= 210) {
                    if (data.data) {
                        vm.families = data.data.families;
                        if(vm.curUser.org_families[0] && vm.curUser.org_families[0].id) {
                            vm.family_id = vm.curUser.org_families[0].id;
                            vm.family_name = vm.curUser.org_families[0].name;
                            vm.getFamilyTrialsUsers();
                        }
                    }
                }
            }).catch(function (err) {
                console.log('family search people failed: ' + err);
            });
        }
    }
}());
