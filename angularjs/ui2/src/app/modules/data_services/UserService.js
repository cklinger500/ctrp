/**
 * Created by wangg5 on 7/22/15.
 */

(function () {
    'use strict';
    angular.module('ctrp.module.dataservices')
        .service('UserService', UserService);

    UserService.$inject = ['LocalCacheService', 'PromiseTimeoutService', 'AppSettingsService', '$log', '$uibModal',
        '$timeout', '$state', 'toastr', 'Common', 'DMZ_UTILS', 'PRIVILEGES', 'URL_CONFIGS', '$rootScope', 'uiGridConstants'];

    function UserService(LocalCacheService, PromiseTimeoutService, AppSettingsService, $log, $uibModal,
                         $timeout, $state, toastr, Common, DMZ_UTILS, PRIVILEGES, URL_CONFIGS, $rootScope, uiGridConstants) {

        var service = this;
        var appVersion = '';
        var appRelMilestone = '';
        var statusArr = [
            {id: 1, name: 'In Review'},
            {id: 2, name: 'Active'},
            {id: 3, name: 'Inactive'},
            {id: 4, name: 'Deleted'}
        ];
        var rolesArr = ['ROLE_RO', 'ROLE_SUPER', 'ROLE_ADMIN', 'ROLE_CURATOR', 'ROLE_ABSTRACTOR', 'ROLE_ABSTRACTOR-SU', 'ROLE_TRIAL-SUBMITTER', 'ROLE_ACCRUAL-SUBMITTER', 'ROLE_SITE-SU', 'ROLE_SERVICE-REST'];



        AppSettingsService.getSettings('USER_ROLES', true).then(function (response) {
            var rolesArrStr = response.data[0].settings.toString();

        }).catch(function (err) {
            console.log("Error in retrieving USER_ROLES.");
        });

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

            PromiseTimeoutService.postDataExpectObj('/ctrp/sign_in', userObj)
                .then(function (data) {
                    if (data.token) {
                        LocalCacheService.cacheItem('token', data.token);
                        LocalCacheService.cacheItem('username', userObj.user.username);
                        LocalCacheService.cacheItem('user_id', data.user_id); // cache user id
                        _setAppVersion(data.app_version);
                        LocalCacheService.cacheItem('user_role', data.role); //e.g. ROLE_SUPER
                        LocalCacheService.cacheItem('user_type', data.user_type); //e.g. LocalUser
                        //array of write_modes for each area (e.g. pa or po)
                        LocalCacheService.cacheItem('write_modes', data.privileges || []);
                        LocalCacheService.cacheItem('curation_enabled', false); //default: curation mode is off/false
                        toastr.success('Login is successful', 'Logged In!');
                        Common.broadcastMsg('signedIn');

                        $timeout(function () {
                            openGsaModal();
                        }, 500);
                    } else {
                        toastr.error('Login failed', 'Login error');
                        userObj.processing = false;
                    }
                }).catch(function (err) {
                    $log.error('error in log in: ' + JSON.stringify(err));
                });
        }; //login


        /**
         * Log out user from backend as well as removing local cache
         */
        this.logout = function () {
            var self = this;

            var username = LocalCacheService.getCacheWithKey('username');
            PromiseTimeoutService.postDataExpectObj('/ctrp/sign_out', {username: username, source: 'Angular'})
                .then(function (data) {
                    if (data.success) {
                        LocalCacheService.clearAllCache();
                        Common.broadcastMsg('loggedOut');
                        toastr.success('Success', 'Successfully logged out');

                        $timeout(function () {
                            $state.go('main.sign_in');
                        }, 200);
                    }
                    $log.info('success in log out: ' + JSON.stringify(data));
                }).catch(function (err) {
                    $log.error('error in logging out: ' + JSON.stringify(err));
                });
        }; //logout


        /**
         *
         * @param searchParams, JSON object whose keys can include:
         * username, po_id, source_id, source_status, family_name, address, address2, city, state_province, country,
         * postal_code, and email
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
                    if(data[0].success) {
                        toastr.success('Success', 'Your Request for Admin Access has been sent.');
                    } else {
                        toastr.error('Your Request for Admin Access has NOT been sent. Please try again later.', 'Error');
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

        this.getAppRelMilestoneFromDMZ = function () {
            return PromiseTimeoutService.getData(DMZ_UTILS.APP_REL_MILESTONE);
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

        this.getLoginBulletin = function () {
            return PromiseTimeoutService.getData(DMZ_UTILS.LOGIN_BULLETIN);
        };

        this.getGsa = function () {
            return PromiseTimeoutService.getData(URL_CONFIGS.USER_GSA);
        };

        this.upsertUser = function (userObj) {
            //update an existing user
            var configObj = {};
            return PromiseTimeoutService.updateObj(URL_CONFIGS.A_USER + userObj.username + '.json', userObj, configObj);
        };

        this.upsertUserSignup = function (userObj) {
            //update an existing user
            var configObj = {};
            console.log('userObj = ' + JSON.stringify(userObj));

            PromiseTimeoutService.postDataExpectObj(URL_CONFIGS.A_USER_SIGNUP, userObj)
                .then(function (data) {
                    console.log('login, data returned: ' + JSON.stringify(data["server_response"]));
                    if (data["server_response"] == 422 || data["server_response"]["status"] == 422) {
                        toastr.error('Sign Up failed', 'Login error');
                        for (var key in data) {
                            if (data.hasOwnProperty(key)) {
                                if (key != "server_response") {
                                    toastr.error("SignUp error:", key + " -> " + data[key]);
                                }
                            }
                        }
                        $state.go('main.signup');
                    } else {
                        toastr.success('Sign Up Success', 'You have been signed up');
                        $state.go('main.welcome_signup');
                    }
                }).catch(function (err) {
                    $log.error('error in log in: ' + JSON.stringify(err));
                });

        }; //upsertUserSignup

        this.upsertUserChangePassword = function (userObj) {
            //update an existing user
            var configObj = {}; //empty config
            console.log('upsertUserChangePassword userObj = ' + JSON.stringify(userObj));
            return PromiseTimeoutService.postDataExpectObj(URL_CONFIGS.A_USER_CHANGEPASSWORD, userObj, configObj);
        }; //upsertUserChangePassword


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

        this.getStatusArray = function() {
            return statusArr;
        };

        this.getRolesArray = function() {
            return rolesArr;
        };

        /******* helper functions *********/
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
                    console.log('modal closed, TODO redirect');
                });
            })();


        }
    }


})();
