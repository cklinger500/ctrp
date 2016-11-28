/**
 * Created by aasheer on 02/22/2016
 */

(function() {
    'use strict';
    angular.module('ctrpApp.widgets')
    .controller('helpModalCtrl', helpModalCtrl);

    helpModalCtrl.$inject = ['$scope', '$uibModalInstance', 'helpData'];

    function helpModalCtrl($scope, $uibModalInstance, helpData) {
        console.log('help data is: ', helpData);
        var vm = this;
        
        vm.helpData = helpData;
        vm.header = helpData.header;
        vm.content = helpData.content;

        console.log($scope.helpContent)

        vm.cancel = function() {
            $uibModalInstance.dismiss('cancel');
        };
    }
})();
