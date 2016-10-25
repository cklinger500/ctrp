/**
 * Created by schintal 9/25/2015
 */

(function () {
    'use strict';

    angular.module('ctrp.app.user')
        .controller('userChangePasswordCtrl', userChangePasswordCtrl);

    userChangePasswordCtrl.$inject = ['$scope', '$http', '$window', 'toastr', '$sce',
        '$state', '$timeout', 'UserService'];

    function userChangePasswordCtrl($scope, $http, $window, toastr, $state, $sce,
                      $timeout,  UserService) {
        var vm = this;

         var username = UserService.getLoggedInUsername();
        toastr.success('User ' + username);
        vm.userObj = {
            'local_user': {
                username: username,
                password: '',
                password_confirmation: '',
                current_password: ''
            },
            'type': vm.type
        };

        vm.updateUser = function () {
            UserService.upsertUserChangePassword(vm.userObj).then(function (response) {
                var status = response.server_response.status;

                if (status >= 200 && status <= 210) {
                    //toastr.success('User ' + vm.userObj + ' has been recorded', 'Operation Successful!');
                }
            }).catch(function (err) {
                console.log('Error in Changing the Password ' + JSON.stringify(vm.userObj));
            });
        };
    }

})();
