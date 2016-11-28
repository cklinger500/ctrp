/**
 * Created by wangg5 on 7/22/15.
 */

(function () {
    'use strict';
    angular.module('ctrp.module.dataservices')
        .service('UserService', UserService);

    UserService.$inject = ['LocalCacheService', 'TrialService', 'PromiseTimeoutService', '$log', '$uibModal', 'uiGridExporterConstants',
        '$timeout', '$state', 'toastr', 'Common', 'DMZ_UTILS', 'URL_CONFIGS', 'AppSettingsService', '$rootScope'];

    function UserService(LocalCacheService, TrialService, PromiseTimeoutService, $log, $uibModal, uiGridExporterConstants,
                         $timeout, $state, toastr, Common, DMZ_UTILS, URL_CONFIGS, AppSettingsService, $rootScope) {

        var service = this;
        var appVersion = '';
        var appRelMilestone = '';
        var userCtrl = null;
        var pageHasDirtyFormChecking = false;
        var isSigningOut = false;


        this.initVars = function() {
            pageHasDirtyFormChecking = false;
            isSigningOut = false;
        }

        /**
         * Check if the the user/viewer is logged in by checking the
         * local cache for existence of both token and username
         * @returns {boolean}
         */
        this.isLoggedIn = function () {
            var token = LocalCacheService.getCacheWithKey('token');
            var username = LocalCacheService.getCacheWithKey('username');

            return !!token && !!username;
        }; //isLoggedIn


        this.getUserType = function () {
            return LocalCacheService.getCacheWithKey('user_type');
        };

        this.getWriteModesArr = function() {
            return LocalCacheService.getCacheWithKey('write_modes');
        };

        this.login = function (userObj) {
            userObj.processing = true;

            PromiseTimeoutService.postDataExpectObj('/ctrp/sign_in.json', userObj)
                .then(function (data) {
                    var status = data.server_response.status;

                    if (status >= 200 && status <= 210) {
                        if (data.token) {
                            LocalCacheService.cacheItem('token', data.token);
                            LocalCacheService.cacheItem('username', userObj.user.username);
                            LocalCacheService.cacheItem('user_id', data.user_id);
                            _setAppVersion(data.app_version);
                            LocalCacheService.cacheItem('user_role', data.role);
                            LocalCacheService.cacheItem('user_type', data.user_type);
                            //array of write_modes for each area (e.g. pa or po)
                            LocalCacheService.cacheItem('write_modes', data.privileges || []);
                            LocalCacheService.cacheItem('curation_enabled', false);
                            toastr.success('Login is successful', 'Logged In!');
                            Common.broadcastMsg('signedIn');

                            $timeout(function () {
                                openGsaModal();
                            }, 500);
                        } else {
                            toastr.error('Login failed', 'Login error', { timeOut: 0});
                        }
                    }
                }).catch(function (err) {
                    $log.error('error in log in: ' + JSON.stringify(err));
                }).finally(function() {
                    userObj.processing = false;
                });
        }; //login


        /**
         * Log out user from backend as well as removing local cache
         */
        this.logout = function() {
            if (userCtrl) {
                userCtrl.signedIn = false;
                userCtrl.username = '';
                userCtrl.userRole = '';
                userCtrl.isCurationEnabled = false;
                userCtrl.isCurationModeSupported = false;
            }
            var username = LocalCacheService.getCacheWithKey('username');
            var user_id = LocalCacheService.getCacheWithKey('user_id');
            PromiseTimeoutService.postDataExpectObj('/ctrp/sign_out.json', {user_id: user_id, username: username, source: 'Angular'})
                .then(function (data) {
                    var status = data.server_response.status;

                    if (status >= 200 && status <= 210) {
                        if (data.success) {
                            LocalCacheService.clearAllCache();
                            Common.broadcastMsg('loggedOut');
                            toastr.success('Success', 'Successfully logged out');

                            $timeout(function () {
                                $state.go('main.sign_in');
                            }, 200);
                        }
                    }
                }).catch(function (err) {
                    $log.error('error in logging out: ' + JSON.stringify(err));
                });

            isSigningOut = false;
        }

        /**
         * Sets user config parent controller as property of service
         */
        this.setUserConfig = function(controller) {
            userCtrl = controller;
        }

        /**
         * Getter/Setter for setting a flag if a page has the unsaved-changes directive (dirty form checker)
        */
        this.getUnsavedFormFlag = function() {
            return pageHasDirtyFormChecking;
        }
        this.setUnsavedFormFlag = function(flagVal) {
            pageHasDirtyFormChecking = flagVal;
        }

        /**
         * Getter/Setter for setting a signout flag for dirty form checking purposes
        */
        this.getSignoutFlagValue = function() {
            return isSigningOut;
        }
        this.setSignoutFlagValue = function(flagValue) {
            isSigningOut = flagValue;
        }

        /**
         *
         * @param searchParams, JSON object whose keys can include:
         * username, po_id, source_id, source_status, family_name and email
         *
         * @returns Array of JSON objects
         */
        this.searchUsers = function (searchParams) {
            var user_list = PromiseTimeoutService.postDataExpectObj(URL_CONFIGS.SEARCH_USER, searchParams);
            return user_list;
        }; //searchUsers


        /**
         * Get the logged in username from browser cache
         */
        this.getLoggedInUsername = function () {
            return LocalCacheService.getCacheWithKey('username') || '';
        };

        this.getCurrentUserId = function() {
            return LocalCacheService.getCacheWithKey('user_id') || null;
        };

        /**
         * This is to replace the *getLoggedInUsername* method
         * @return {[type]} [description]
         */
        this.currentUser = function () {
            return LocalCacheService.getCacheWithKey('username') || '';
        };

        this.getUserDetailsByUsername = function (username) {
            return PromiseTimeoutService.getData(URL_CONFIGS.A_USER + username + '.json');
        }; //getUserByName

        this.getCurrentUserDetails = function () {
            var username = LocalCacheService.getCacheWithKey('username');
            return PromiseTimeoutService.getData(URL_CONFIGS.A_USER + username + '.json');
        };

        this.userRequestAdmin = function (params) {
            PromiseTimeoutService.postDataExpectObj('/ctrp/users/request_admin/' + params.username, params)
                .then(function (data) {
                    var status = data.server_response.status;

                    if (status >= 200 && status <= 210) {
                        if(data[0].success) {
                            toastr.success('Success', 'Your Request for Admin Access has been sent.');
                        } else {
                            toastr.error('Your Request for Admin Access has NOT been sent. Please try again later.', 'Error', { timeOut: 0});
                        }
                    }
                });
        };

        /**
         * Get the user role of the logged in user
         * @returns {*|string}
         */
        this.getUserRole = function () {
            return LocalCacheService.getCacheWithKey('user_role') || '';
        };

        this.getUserRoleName = function(controller) {
            var userRole = service.getUserRole();
            if ( userRole ) {
                AppSettingsService.getSettings({setting: 'USER_ROLES'}).then(function (response) {
                    var status = response.status;

                    if (status >= 200 && status <= 210) {
                        var userRole = service.getUserRole();
                        var rolesArr = JSON.parse(response.data[0].settings);
                        var roleName = _.find(rolesArr, function (obj) {
                            return obj.id === userRole
                        }).name.toLowerCase();
                        controller.userRoleName = roleName;
                    }
                }).catch(function (err) {
                    console.log("Error in retrieving USER_ROLES " + err);
                    return '';
                });
            }
        };

        this.getAppVersion = function () {
            return LocalCacheService.getCacheWithKey('app_version') || '';
        };


        /**
         * Get the app version from DMZ utils when the user has not been authenticated
         * @returns {*} Promise
         */
        this.getAppVerFromDMZ = function () {
            return PromiseTimeoutService.getData(DMZ_UTILS.APP_VERSION);
        };

        this.setAppVersion = function (version) {
            _setAppVersion(version);
        };

        this.setAppRelMilestone = function (milestone) {
            _setAppRelMilestone(milestone);
        };

        this.getAppVersion = function () {
            return LocalCacheService.getCacheWithKey('app_version');
        };

        this.getAppRelMilestone = function () {
            return LocalCacheService.getCacheWithKey('app_rel_milestone');
        };

        this.getGsa = function () {
            return PromiseTimeoutService.getData(URL_CONFIGS.USER_GSA);
        };

        this.upsertUser = function (userObj) {
            //update an existing user
            var configObj = {};
            return PromiseTimeoutService.updateObj(URL_CONFIGS.A_USER + userObj.username + '.json', userObj, configObj);
        };

        this.upsertUserChangePassword = function (userObj) {
            //update an existing user
            var configObj = {}; //empty config
            return PromiseTimeoutService.postDataExpectObj(URL_CONFIGS.A_USER_CHANGEPASSWORD, userObj, configObj);
        }; //upsertUserChangePassword

        this.getUserTrialsOwnership = function (searchParams) {
            var user_list = PromiseTimeoutService.postDataExpectObj(URL_CONFIGS.USER_TRIALS, searchParams);
            return user_list;
        }; //searchUsersTrialsOwnership

        this.getUserTrialsSubmitted = function (searchParams) {
            var user_list = PromiseTimeoutService.postDataExpectObj(URL_CONFIGS.USER_SUBMITTED_TRIALS, searchParams);
            return user_list;
        }; //searchUsersTrialsSubmitted

        this.getUserTrialsParticipation = function (searchParams) {
            var user_list = PromiseTimeoutService.postDataExpectObj(URL_CONFIGS.USER_SUBMITTED_TRIALS, searchParams);
            return user_list;
        }; //searchUsersTrialsSubmitted

        this.addUserTrialsOwnership = function (searchParams) {
            return PromiseTimeoutService.postDataExpectObj(URL_CONFIGS.USER_TRIALS_ADD, searchParams);
        }; //endUsersTrialsOwnership

        this.endUserTrialsOwnership = function (searchParams) {
            return PromiseTimeoutService.postDataExpectObj(URL_CONFIGS.USER_TRIALS_END, searchParams);
        }; //endUsersTrialsOwnership

        this.transferUserTrialsOwnership = function (searchParams) {
            return PromiseTimeoutService.postDataExpectObj(URL_CONFIGS.USER_TRIALS_TRANSFER, searchParams);
        }; //endUsersTrialsOwnership

        /**
         * Check if the curation mode is supported for the user role
         *
         */
        this.isCurationSupported = function () {
            return LocalCacheService.getCacheWithKey('write_modes');
        };


        /**
         * Getter for curation_enabled
         *
         * @returns {*|boolean}
         */
        this.isCurationModeEnabled = function () {
            return LocalCacheService.getCacheWithKey('curation_enabled') || false;
        };


        /**
         * given a sectionName (e.g. 'po'), check if allows global write mode For
         * the sectionName
         * @param  {String} sectionName [description]
         * @return {boolean}
         */
        this.isWriteModeSupportedForSection = function(sectionName) {
            var completeSectionNameKey = sectionName + '_write_mode';
            var queryObj = {};
            queryObj[completeSectionNameKey] = true; //only look for 'true'
            var writeModesArray = LocalCacheService.getCacheWithKey('write_modes');
            var objIndex = _.findIndex(writeModesArray, queryObj);

            return objIndex > -1;
        };


        /**
         * Set curation_enabled to true
         * @params curationMode, boolean
         */
        this.saveCurationMode = function (curationMode) {
            LocalCacheService.cacheItem('curation_enabled', curationMode);
        };

        this.getAllOrgUsers = function (searchParams) {
            service.allOrgUsers = PromiseTimeoutService.postDataExpectObj(URL_CONFIGS.SEARCH_USER, searchParams);
            return service.allOrgUsers;
        };

        this.getUserStatuses = function () {
            var statuses = AppSettingsService.getSettings({
                setting: 'USER_STATUSES',
                json_path: URL_CONFIGS.USER_STATUSES
            });
            return statuses;
        };

        this.createTransferTrialsOwnership = function (controller, trialIdArr) {
            service.getUserStatuses().then(function (response) {
                var status = response.status;

                if (status >= 200 && status <= 210) {
                    var review_id = _.where(response.data, {code: 'ACT'})[0].id;
                    service.getAllOrgUsers({
                        'organization_id': (controller.userDetails && controller.userDetails.organization ? controller.userDetails.organization.id: false) || controller.organization_id,
                        'family_id': (controller.userDetails && controller.userDetails.org_families[0] ? controller.userDetails.org_families[0].id: false) || controller.family_id,
                        'user_status_id': review_id
                    }).then(function (data) {
                        var status = data.server_response.status;

                        if (status >= 200 && status <= 210) {
                            if (controller.showTransferTrialsModal === false) {
                                controller.showTransferTrialsModal = true;
                            }
                            controller.userOptions = {
                                title: '',
                                type: 'users',
                                filterPlaceHolder: 'Start typing to filter the users below.',
                                labelAll: 'Unselected Users',
                                labelSelected: 'Selected Users',
                                helpMessage: ' Click on names to transfer users between selected and unselected.',
                                orderProperty: 'name',
                                resetItems: [],
                                items: [],
                                selectedItems: [],
                                openModal: controller.showTransferTrialsModal,
                                showSave: controller.showTransferTrialsModal,
                                confirmMessage: 'You have selected to transfer ownership of the trials to the Selected User(s) above.',
                                close: function () {
                                    controller.showTransferTrialsModal = false;
                                },
                                reset: function () {
                                    controller.userOptions.searchTerm = '';
                                    controller.userOptions.items = angular.copy(controller.userOptions.resetItems);
                                    controller.userOptions.selectedItems = [];
                                },
                                save: function () {
                                    var searchParams = {
                                        from_user_id: controller.userDetails.id,
                                        to_user_ids: []
                                    };
                                    var user_ids = _.chain(controller.userOptions.selectedItems).pluck('id').value();
                                    if (trialIdArr && trialIdArr.length){
                                        searchParams.to_user_ids = user_ids;
                                        searchParams.ids = trialIdArr;
                                    } else {
                                        searchParams.to_user_ids = user_ids;
                                    }

                                    service.transferUserTrialsOwnership(searchParams).then(function (data) {
                                        var status = data.server_response.status;

                                        if (status >= 200 && status <= 210) {
                                            if(data.results.complete === true) {
                                                toastr.success('Trial Ownership Transferred', 'Success!');
                                                if (controller.passiveTransferMode) {
                                                    controller.passiveTransferMode = false;
                                                    controller.updateUser(controller.checkForOrgChange());
                                                } else {
                                                    controller.getUserTrials();
                                                }
                                            }
                                        }
                                    });
                                }
                            };
                            _.each(data.users, function (user) {
                                if(user.id !== (controller.userDetails ? controller.userDetails.id : null)) {
                                    controller.userOptions.items.push({
                                        'id': user.id,
                                        'col1': user.last_name + ', ' + user.first_name + ' (' + user.username + ')',
                                        'col2': user.email,
                                        'col3': user.user_org_name
                                    });
                                }
                            });
                            controller.userOptions.resetItems = angular.copy(controller.userOptions.items);
                        }
                    });
                }
            });

        };

        function _getMenuArr() {
            return [
                {
                    title: 'Export All Data As CSV',
                    order: 100,
                    action: function ($event){
                        this.grid.api.exporter.csvExport(uiGridExporterConstants.ALL, uiGridExporterConstants.ALL);
                    }
                }
            ];
        }

        this.TransferTrialsRemoveGridItem = function (scope, controller) {
            var curUserRole = service.getUserRole();
            var menuArr = _getMenuArr();
            if (service.isCurationModeEnabled() && (curUserRole === 'ROLE_SUPER' || curUserRole === 'ROLE_ADMIN') && controller.ownerListMode) {
                menuArr.push(
                    {
                        title: 'Remove Selected User(s) from Trial',
                        order: 1,
                        shown: function () {
                            return controller.gridApi.selection.getSelectedRows().length > 0
                        },
                        action: function () {
                            controller.removeOwnersSubmit();
                        }
                    }
                );
            }
            return menuArr;
        };

        this.TransferTrialsAddGridItem = function (scope, controller) {
            var curUserRole = service.getUserRole();
            var menuArr = _getMenuArr();
            if (service.isCurationModeEnabled() && (curUserRole === 'ROLE_SUPER' || curUserRole === 'ROLE_ADMIN') && controller.setAddMode) {
                menuArr.push(
                    {
                        title: 'Assign Ownership to Selected User(s)',
                        order: 1,
                        shown: function () {
                            return controller.gridApi.selection.getSelectedRows().length > 0
                        },
                        action: function () {
                            controller.addOwnersSubmit();
                        }
                    }
                );
            }
            return menuArr;
        };

        this.TransferTrialsGridMenuItems = function (scope, controller) {
            var menuArr =
                [
                    {
                        title: 'Assign Ownership of Trials to ' + controller.userDetails.first_name + ' ' + controller.userDetails.last_name,
                        order: 1,
                        action: function ($event) {
                            scope.showSelectedTrialsModal = true;
                            TrialService.createTransferTrialsOwnership(controller);
                        }
                    },
                    {
                        title: 'Transfer Trial Ownership for All Trials',
                        order: 2,
                        action: function (){
                            service.createTransferTrialsOwnership(controller);
                        }
                    },
                    {
                        title: 'Transfer Ownership for Selected Trials',
                        order: 3,
                        shown: function () {
                            return controller.gridApi.selection.getSelectedRows().length > 0
                        },
                        action: function (){
                            service.createTransferTrialsOwnership(controller, _.chain(controller.gridApi.selection.getSelectedRows()).pluck('trial_id').value());
                        }
                    },
                    {
                        title: 'Remove Ownership of All Trials',
                        order: 4,
                        action: function (){
                            controller.confirmRemoveTrialsOwnerships();
                        }
                    },
                    {
                        title: 'Remove Ownership of Selected Trials',
                        order: 5,
                        shown: function () {
                            return controller.gridApi.selection.getSelectedRows().length > 0
                        },
                        action: function (){
                            controller.confirmRemoveTrialsOwnerships(_.chain(controller.gridApi.selection.getSelectedRows()).pluck('trial_id').value());
                        }
                    }
                ];
            var curUserRole = service.getUserRole();
            return (service.isCurationModeEnabled()
                        && (curUserRole === 'ROLE_SUPER'
                                || curUserRole === 'ROLE_ADMIN'
                                    || curUserRole === 'ROLE_ACCOUNT-APPROVER'
                                        || curUserRole === 'ROLE_SITE-SU')) ? menuArr : [];
        };

        /********* check out string formatter given value from db *******/
        this.getCheckOut = function ( checkOut ) {
            var checkOutStr = '';
            if (checkOut.split(',').length > 1) {
                if (checkOut.split(',')[0].split(' ')[0] === checkOut.split(',')[1].trim().split(' ')[0]) {
                    checkOutStr = checkOut.split(',')[0]+ '/SC';
                } else {
                    checkOutStr = checkOut;
                }
            } else {
                checkOutStr = checkOut;
            }
            return checkOutStr;
        };

        /******* helper functions *********/
        $rootScope.$on('$stateChangeSuccess', function(event) {
            service.initVars();
        });

        function _setAppVersion(version) {
            if (!version) {
                //if null or empty value
                appVersion = '';
                LocalCacheService.removeItemFromCache('app_version');
            } else {
                appVersion = version;
                LocalCacheService.cacheItem('app_version', version);
            }
            //notify listeners
            Common.broadcastMsg('updatedAppVersion');
        }

        function _setAppRelMilestone(milestone) {
            if (!milestone) {
                //if null or empty value
                appRelMilestone = '';
                LocalCacheService.removeItemFromCache('app_rel_milestone');
            } else {
                appRelMilestone = milestone;
                LocalCacheService.cacheItem('app_rel_milestone', milestone);
            }
            //notify listeners
            Common.broadcastMsg('updatedAppRelMilestone');
        }

        function openGsaModal() {

            (function() {
                var modalInstance = $uibModal.open({
                    templateUrl: 'app/user/gsa.html',
                    controller: 'gsaModalCtrl as gsaView',
                    size: 'lg',
                    backdrop: 'static',
                    resolve: {
                        UserService: 'UserService',
                        gsaObj: function (UserService) {
                            return UserService.getGsa();
                        }
                    }

                });

                modalInstance.result.then(function () {
                    //console.log('modal closed, TODO redirect');
                });
            })();
        }
    }
})();
