/**
 * Created by wangg5 on 6/1/15.
 */

(function () {
    'use strict';

    angular.module('ctrp.app.user')
        .controller('userCtrl', userCtrl);

    userCtrl.$inject = ['$scope', 'UserService', 'AppSettingsService'];

    function userCtrl($scope, UserService, AppSettingsService) {
        var vm = this;

        AppSettingsService.getSettings({ setting: 'LOGIN_BULLETIN', external: true }).then(function (response) {
            var status = response.status;

            if (status >= 200 && status <= 210) {
                vm.loginBulletin = response.data[0] ? response.data[0].settings : null;
            }
        });

        vm.processing = false;

        vm.userObj = {
            'user': {
                username: '',
                password: '',
                source: 'Angular'
            },
            'type': vm.type,
            'processing': vm.processing
        };

        /* Clears out sign-in form if user rejects GSA notice */
        $scope.$on('gsaReject', function(e, data) {
            vm.userObj.user.password = '';
            vm.userObj.user.username = '';
            vm.userObj.processing = false;
        });

        vm.authenticate = function() {
            return UserService.login(vm.userObj);
        }; // authenticate
    }
})();
