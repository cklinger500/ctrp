/**
 * Created by wus4 on 7/7/15.
 */

(function () {
    'use strict';

    angular.module('ctrp.app.po')
        .controller('ModalInstanceFamilyCtrl', ModalInstanceFamilyCtrl);


    ModalInstanceFamilyCtrl.$inject = ['$uibModalInstance', 'FamilyService', 'familyId', '$timeout'];

    function ModalInstanceFamilyCtrl($uibModalInstance, FamilyService, familyId, $timeout) {
        var vm = this;
        vm.modalTitle = 'Please confirm';
        vm.deletionStatus = '';
        vm.disableBtn = false;

        vm.ok = function() {
            vm.disableBtn = true;

            FamilyService.deleteFamily(familyId).then(function(data) {
                var status = data.status;

                if (status >= 200 && status <= 210) {
                    vm.modalTitle = 'Deletion is successful';
                    timeoutCloseModal('Permanently deleted', status); //204 for successful deletion
                }
            }).catch(function(err) {
                vm.modalTitle = 'Deletion failed';
                console.log('failed to delete the family, error code: ' + err.status);
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
            }, 2500);
        }

    }

})();
