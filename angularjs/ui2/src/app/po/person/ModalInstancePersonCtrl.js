/**
 * Created by wus4 on 7/7/15.
 *
 * Modal confirmationf or deleting a person
 */

(function () {
    'use strict';

    angular.module('ctrp.app.po')
        .controller('ModalInstancePersonCtrl', ModalInstancePersonCtrl);


    ModalInstancePersonCtrl.$inject = ['$uibModalInstance', 'PersonService', 'personId', '$timeout'];

    function ModalInstancePersonCtrl($uibModalInstance, PersonService, personId, $timeout) {
        var vm = this;
        vm.modalTitle = "Please confirm";
        vm.deletionStatus = "";
        vm.ok = function() {
            var successMsg = 'Permanently deleted';
            var failMsg = 'Fail to delete';
            PersonService.deletePerson(personId).then(function(data) {
                console.log("delete data returned: " + JSON.stringify(data));
                vm.modalTitle = "Deletion was successful";
                var message = data.status == 204 ? successMsg : failMsg;
                vm.modalTitle = data.status == 204 ? vm.modalTitle : 'Deletion failed'
                timeoutCloseModal(message, data.status); //204 for successful deletion
            }).catch(function(err) {
                vm.modalTitle = "Deletion failed";
                console.log("failed to delete the person, error code: " + err.status);
                timeoutCloseModal(err.data || "Failed to delete", err.status);
            });
        };

        vm.cancel = function() {
            $uibModalInstance.dismiss('cancel');
        };


        function timeoutCloseModal (deletionStatus, httpStatusCode) {
            vm.deletionStatus = JSON.stringify(deletionStatus);
            console.log("deletion status = " + vm.deletionStatus);
            console.log("httpstatusCode = " + httpStatusCode);
            $timeout(function() {
                if (parseInt(httpStatusCode) > 206) {
                    //failed deletion is treated the same as cancel
                    $uibModalInstance.dismiss('cancel');
                } else {
                    $uibModalInstance.close('delete');
                }
            }, 2500);
        }

    }

})();
