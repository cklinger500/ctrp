/**
 * Created by schintal 9/25/2015
 */

(function () {
    'use strict';

    angular.module('ctrp.app.user')
        .controller('userSignupCtrl', userSignupCtrl);

    userSignupCtrl.$inject = ['$scope', 'AppSettingsService', 'UserService', 'PromiseTimeoutService', 'OrgService', 'URL_CONFIGS', 'toastr', '$log', '$state'];

    function userSignupCtrl($scope, AppSettingsService, UserService, PromiseTimeoutService, OrgService, URL_CONFIGS, toastr, $log, $state) {
        var vm = this;

        $scope.signup_form = {};

        var UserObj = function () {
            return {
                'user': {
                    domain: '',
                    username: '',
                    first_name: '',
                    last_name: '',
                    email: '',
                    organization_id: '',
                    phone: '',
                    phone_ext: '',
                    user_type: 'LdapUser'
                },
                'type': vm.type
            };
        };

        vm.userObj = new UserObj();
        vm.timestamp = Date.now();

        vm.selectedUserFunctions = function () {
            var selectedArr = [];
            _.each(vm.selectedFunctionsObj[vm.userObj.user.domain], function (selected, func) {
                if (selected) {
                    selectedArr.push(func);
                }
            });
            vm.userObj.user.selected_function = '';
        };

        vm.typeAheadNameSearch = function () {
            return OrgService.typeAheadOrgNameSearch(vm.org_search_name);
        };

        vm.setSignUpTypeAheadOrg = function (searchObj) {
            var orgSearch = OrgService.setTypeAheadOrg(searchObj);
            vm.org_search_name = orgSearch.organization_name;
            vm.userChosenOrg = orgSearch.organization_details;
            vm.userObj.user.organization_id = vm.userChosenOrg.id;
        };

        vm.removeOrgChoice = function () {
            vm.userChosenOrg = null;
            vm.org_search_name = vm.userObj.user.organization_id = undefined;
        };

        vm.exitSignUpForm = function () {
            vm.reset();
            vm.defaultSignUp = vm.NihSignUp = false;
        };

        vm.updateUser = function () {
            upsertUserSignup(vm.userObj);
        };

        vm.reset = function () {
            vm.userObj = new UserObj();
            vm.removeOrgChoice();
        };

        vm.validateUserName = function() {
            UserService.searchUsers({username: vm.userObj.user.username}).then(function (data) {
                var status = data.server_response.status;

                if (status >= 200 && status <= 210) {
                    if (data.total >  0 ){
                        vm.newUserNameInvalid = true;
                    } else {
                        vm.newUserNameInvalid = false;
                    }
                }
            }).catch(function (err) {
                console.log('Search Users failed: ' + err);
            });
        };

        var upsertUserSignup = function (userObj) {
            $scope.processing = true;
            PromiseTimeoutService.postDataExpectObj(URL_CONFIGS.A_USER_SIGNUP, userObj).then(function (data) {
                var status = data.server_response.status || data.status;

                if (status >= 200 && status <= 210) {
                    toastr.success('Sign Up Success', 'You have been signed up');
                    vm.userObj = new UserObj();
                    vm.exitSignUpForm();
                    vm.signUpComplete = true;
                }

                /* The error code (422 in this case) should be handled by the interceptor so the code below is not needed. Commenting out for now */
                /*
                    toastr.error('Sign Up failed', 'Login error', { timeOut: 0});
                    for (var key in data) {
                        if (data.hasOwnProperty(key)) {
                            if (key !== 'server_response') {
                                toastr.error('SignUp error:', key + ' -> ' + data[key], { timeOut: 0});
                            }
                        }
                    }
                    $state.go('main.signup');
                */
            }).catch(function (err) {
                $log.error('error in log in: ' + JSON.stringify(err));
                $state.go('main.signup');
            }).finally(function() {
                $scope.processing = false;
            });
        };
    }
}());
