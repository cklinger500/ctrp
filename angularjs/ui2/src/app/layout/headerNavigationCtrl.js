/**
 * Created by wangg5 on 7/22/15.
 */

(function() {
    'use strict';

    angular.module('ctrp.app.layout')
        .controller('headerNavigationCtrl', headerNavigationCtrl);

    headerNavigationCtrl.$inject = ['UserService', '$scope', 'Idle', 'MESSAGES',
        '$uibModal', '$timeout', '$state', 'Common'];

    function headerNavigationCtrl(UserService, $scope, Idle, MESSAGES,
                                  $uibModal, $timeout, $state, Common) {

        var vm = this;
        vm.signedIn = UserService.isLoggedIn();
        vm.username = UserService.getLoggedInUsername();
        vm.userRole = !!UserService.getUserRole() ? UserService.getUserRole().split('_')[1].toLowerCase() : '';
        vm.isCurationEnabled = UserService.isCurationModeEnabled();
        vm.isCurationModeSupported = false;
        vm.warning = null;
        vm.timedout = null;
        vm.userRoleName = null;
        vm.currrentState = $state;
        vm.navbarIsActive = navbarIsActive;

        UserService.getUserRoleName(vm);

        vm.toggleCurationMode = function() {
            UserService.saveCurationMode(vm.isCurationEnabled);
            Common.broadcastMsg(MESSAGES.CURATION_MODE_CHANGED);
        };

        vm.logOut = function() {
            UserService.setUserConfig(vm);

            if (!UserService.getUnsavedFormFlag()) {
                UserService.logout();
                return;
            }

            UserService.setSignoutFlagValue(true);

            $state.go('main.sign_in', {}, {reload: true});
        }; //logOut

        activate();

        /*********implementations below***********/
        function activate() {
            listenToLoginEvent();
            watchForInactivity();
            watchStateName();
            listenToSectionWriteMode();
        }

        function listenToLoginEvent() {
            $scope.$on('signedIn', function() {
                pullUserInfo();
            });

            $scope.$on('loggedOut', function() {
                pullUserInfo();
                vm.signedIn = false;
            });
        } //listenToLoginEvent


        function pullUserInfo() {
            vm.signedIn = UserService.isLoggedIn();
            vm.username = UserService.getLoggedInUsername();
            vm.userRole = UserService.getUserRole().split('_')[1] || '';
            vm.userRole = !!vm.userRole ? vm.userRole.toLowerCase() : '';
            vm.isCurationEnabled = UserService.isCurationModeEnabled();
            UserService.getUserRoleName(vm);
        } //pullUserInfo

        function listenToSectionWriteMode() {
            $scope.$on('isWriteModeSupported', function(evt, val) {
                vm.isCurationModeSupported = val || false;
                if (!vm.isCurationModeSupported) {
                    vm.isCurationEnabled = false;
                    UserService.saveCurationMode(vm.isCurationEnabled);
                    Common.broadcastMsg(MESSAGES.CURATION_MODE_CHANGED);
                }
            });
        }

        /**
         * Observer for the vm.signedIn (boolean) status
         */
        function watchForInactivity() {
            $scope.$watch(function() {return vm.signedIn; }, function(curVal, preVal) {

                if (curVal === true) {
                    Idle.watch();
                    closeModals();
                    watchIdleEvents();
                } else {
                    Idle.unwatch();
                    // closeModals();
                }
            });
        } //watchForInactivity



        /*** helper functions **/

        function closeModals() {
            if (vm.warning) {
                vm.warning.close('closed');
                vm.warning = null;
            }

            if (vm.timedout) {
                vm.timedout.close('closed');
                vm.timedout = null;
            }
        } //closeModals


        /**
         * Watch idle events for start, end, and timeout
         */
        function watchIdleEvents() {

            $scope.$on('IdleStart', function() {
               closeModals();
                vm.warning = $uibModal.open({
                    templateUrl: 'warning-dialog.html',
                    windowClass: 'modal-danger'
                });
            }); //IdleStart

            $scope.$on('IdleEnd', function() {
               closeModals();
            }); //IdleEnd


            $scope.$on('IdleTimeout', function() {
                closeModals();

                $timeout(function() {
                    vm.logOut();
                    vm.timedout = $uibModal.open({
                        templateUrl: 'timedout-dialog.html',
                        windowClass: 'modal-danger'
                    });

                }, 500);

            });
        } //watchIdleEvents



        /**
         * Highlight the navbar according to the current state name
         * @param stateNames
         * @returns {boolean}
         */
        function navbarIsActive(stateNames) {
            return stateNames.indexOf(vm.currrentState.current.name) > -1;
        }


        /**
         * watch current state name
         */
        function watchStateName() {
            $scope.$watch(function() {return vm.currrentState.current.name;},
                function(newVal, oldVal) {
                if (newVal !== oldVal) {
                    // console.log('current state name: ' + vm.currrentState.current.name);
                }
            }, true);
        }


    }


})();
