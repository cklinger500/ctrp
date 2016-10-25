/**
 * Created by wangg5 on 6/29/15.
 *
 * Confirmation modal for deleting an organization
 */

(function () {
    'use strict';

    angular.module('ctrp.app.po')
        .controller('ModalInstanceCtrl', ModalInstanceCtrl);

    ModalInstanceCtrl.$inject = ['$uibModalInstance', 'OrgService', 'orgId', '$timeout'];

    function ModalInstanceCtrl($uibModalInstance, OrgService, orgId, $timeout) {
        var vm = this;
        vm.modalTitle = 'Please confirm';
        vm.deletionStatus = '';
        vm.disableBtn = false;

        vm.ok = function() {
            vm.disableBtn = true;

            OrgService.deleteOrg(orgId).then(function(data) {
                var status = data.status;

                if (status >= 200 && status <= 210) {
                    if (status > 206) {
                        vm.modalTitle = 'Deletion failed';
                        timeoutCloseModal(data.data.family || data.data.person);
                        return;
                    }

                    vm.modalTitle = 'Deletion is successful';
                    timeoutCloseModal('Permanently deleted', data.status); //204 for successful deletion
                }
            }).catch(function(err) {
                vm.modalTitle = 'Deletion failed';
                console.log('failed to delete the organization, error code: ' + err.status);
                timeoutCloseModal(err.data || 'Failed to delete', err.status);
            }).finally(function() {
                vm.disableBtn = false;
            });
        };

        vm.cancel = function() {
            $uibModalInstance.dismiss('cancel');
        };


        function timeoutCloseModal (deletionStatus, httpStatusCode) {
            vm.deletionStatus = JSON.stringify(deletionStatus);
            $timeout(function() {
                if (httpStatusCode > 206) {
                    //failed deletion is treated the same as cancel
                    $uibModalInstance.dismiss('cancel');
                } else {
                    $uibModalInstance.close('delete');
                }
            }, 1500);
        }

    }

})();
