/**
 * Created by aasheer on 02/19/2016
 */

(function() {
    'use strict';

    angular.module('ctrpApp.widgets')
    .factory('HelpService', HelpService);

    HelpService.$inject = ['URL_CONFIGS', 'MESSAGES', '$log', '$rootScope', 'PromiseTimeoutService'];

    function HelpService(URL_CONFIGS, MESSAGES, $log, $rootScope, PromiseTimeoutService) {
        var vm = this;

        vm.helpData = {};
        vm.currentKey;

        vm.initData = function() {
            //var helpData = PromiseTimeoutService.getData(URL_CONFIGS.HELP_CONTENT);
            //helpData = vm.parseData(helpData);

            /* For testing only */
            var helpDataHeader = "Help Header";
            var helpDataContent = "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.<ul><li>test 1</li><li>test 2</li><li>test 3</li><li>test 4</li><li>test 5</li></ul>";

            return {
                header: helpDataHeader,
                content: helpDataContent
            };
        };

        vm.parseHelpContent = function(data) {
            /* Parse data here */
        };

        vm.getHelpData = function() {
            if (vm.key && vm.helpData.hasOwnProperty(vm.key)) {
                return vm.helpData[vm.key];
            } else {
                throw('No key with the name ' + vm.key + ' found.');
            }
        };

        vm.setHelpDataKey = function(key) {
            vm.currentKey = key;
        };

        return {
            initData: vm.initData,
            getHelpData: vm.getHelpData,
            setHelpDataKey: vm.setHelpDataKey
        };
    }
})();
