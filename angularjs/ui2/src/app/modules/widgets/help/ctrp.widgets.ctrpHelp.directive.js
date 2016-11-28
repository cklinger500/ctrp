/**
 * Created by aasheer on 02/12/2016.
 */

(function() {

    'use strict';

    angular.module('ctrpApp.widgets')
        .directive('ctrpHelp', ctrpHelp);

    ctrpHelp.$inject = ['$uibModal', 'PromiseTimeoutService', 'HelpService'];

    function ctrpHelp($uibModal, PromiseTimeoutService, HelpService) {
        var directiveObj = {
            restrict: 'E',
            template: '<span role="button" class="glyphicon glyphicon-info-sign"></span>',
            link: function(scope, element, attrs) {
                element.bind('click', function() {
                    console.log('element is:', element);
                    console.log('element was clicked');

                    if (attrs.key) {
                        HelpService.setHelpDataKey(attrs.key);

                        var modalInstance = $uibModal.open({
                            templateUrl: 'app/modules/widgets/help/help-modal.html',
                            controller: 'helpModalCtrl as helpModalView',
                            size: 'sm',
                            resolve: {
                                HelpService: 'HelpService',
                                helpData: function (HelpService) {
                                    return HelpService.initData();
                                },
                            }
                        });
                    }
                });
            } //link
        };

        return directiveObj;
    }
})();
