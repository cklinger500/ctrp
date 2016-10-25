/**
 * Created by mdulla on 08/12/2015.
 */

(function () {
    'use strict';

    angular.module('ctrp.app.po')
        .controller('ModalInstanceFamilyMembersCtrl', ModalInstanceFamilyMembersCtrl);


    ModalInstanceFamilyMembersCtrl.$inject = ['$uibModalInstance', 'FamilyService', 'familyId', '$timeout'];

    function ModalInstanceFamilyMembersCtrl($uibModalInstance, FamilyService, familyId, $timeout) {
        var vm = this;
        vm.modalTitle = 'Family Memberships for ';
        FamilyService.getFamilyById(familyId).then(function(data) {
            var status = data.status;

            if (status >= 200 && status <= 210) {
                vm.familyName=data.data.name;
                vm.modalTitle= vm.modalTitle +vm.familyName;
            }
        });

        vm.close = function() {
            $uibModalInstance.dismiss('cancel');
        };

        vm.aff_orgs=[];
        FamilyService.getAffiliatedOrgsByFamilyId(familyId).then(function (data) {
            var status = data.status;

            if (status >= 200 && status <= 210) {
                vm.aff_orgs=data.data;
            }
        }).catch(function (error) {
            console.log('error in retrieving family member orgs: ' + JSON.stringify(error));
        });

    }

})();
