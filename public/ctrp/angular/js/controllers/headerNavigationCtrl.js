/**
 * Created by wangg5 on 7/22/15.
 */

(function() {
    'use strict';

    angular.module('ctrpApp')
        .controller('headerNavigationCtrl', headerNavigationCtrl);

    headerNavigationCtrl.$inject = ['UserService', '$scope'];

    function headerNavigationCtrl(UserService, $scope) {

        var vm = this;
        vm.signedIn = UserService.isLoggedIn();


        vm.logOut = function() {
            vm.signedIn = false;
            UserService.logout();
        }; //logOut


        activate();



        /*********implementations below***********/
        function activate() {
            listenToLoginEvent();
        }





        function listenToLoginEvent() {
            $scope.$on('signedIn', function() {
                vm.signedIn = UserService.isLoggedIn();
            });

            $scope.$on('loggedOut', function() {
                vm.signedIn = false;
            })
        } //listenToLoginEvent

    };


})();