/**
 * Created by wangg5 on 04/07/16.
 *
 */

(function() {
    'use strict';
    angular.module('ctrpApp.widgets')
    .directive('ctrpConfirm', ctrpConfirm);

    ctrpConfirm.$inject = ['$timeout', '$compile', '$parse', '$popover'];

    function ctrpConfirm($timeout, $compile, $parse, $popover) {
        var defaultTemplateUrl = 'app/modules/widgets/popover/_default_popover_confirm.tpl.html';
        var directiveObj = {
            restrict: 'A',
            priority: 200,
            scope: {
                ngClick: '&ctrpClick'
            },
            link: linkerFn
        };

        return directiveObj;

        function linkerFn(scope, element, attrs) {
            var popover = $popover(element, {
                title: 'Please Confirm',
                templateUrl: attrs.confirmTemplate || defaultTemplateUrl,
                html: true,
                trigger: 'manual',
                placement: 'bottom',
                animation: 'am-flip-x',
                content: 'Please confirm this operation',
                autoClose: true,
                scope: scope
            });

            element.bind('click', function(event) {
                popover.event = event;
                if (!popover.$isShown) {
                    console.info('popover: ', popover);
                    popover.show();
                }
            });

            scope.$on('$destroy', cleanupPopover);
            scope.confirm = confirm;
            scope.cancel = cancel;

            function cancel() {
                popover.hide();
            }

            function confirm() {
                var buttonAction = $parse(attrs.ctrpClick);
                console.info('buttonAction: ', buttonAction);
                buttonAction(scope, {$event: popover.event}); // trigger the click action
                // scope.ngClick(); // trigger the click action, also works
                popover.hide();
            }

            function cleanupPopover() {
                popover.destroy();
            }

        } // linkerFn
    }

})();
