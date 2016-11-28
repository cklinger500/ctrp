/**
 * Created by wangg5 on 04/07/16.
 * Usage example:
 * <button
 * 	ctrp-confirm
 * 	confirm-template="path/to/custom/template.html"
 * 	ctrp-click="deleteAll()"
 * > Delete
 * </button>
 *
 * <b>Note: </b> DO NOT use Angular's ng-click in the button that
 * uses ctrp-confirm directive, instead attach your delete action to
 * the ctrp-click attributes (like above)
 *
 * <b>confirm-template is optional, use it only when you need a custom template<b>
 *
 */

(function() {
    'use strict';
    angular.module('ctrpApp.widgets')
    .directive('ctrpConfirm', ctrpConfirm);

    ctrpConfirm.$inject = ['$timeout', '$compile', '$parse', '$popover', '$rootScope'];

    function ctrpConfirm($timeout, $compile, $parse, $popover, $rootScope) {
        var defaultTemplateUrl = 'app/modules/widgets/popover/_default_popover_confirm.tpl.html';
        var directiveObj = {
            restrict: 'A',
            priority: 200,
            scope: {
                ngClick: '&ctrpClick',
            },
            link: linkerFn
        };

        return directiveObj;

        function linkerFn(scope, element, attrs) {
            var popover;
            /*
            var popover = $popover(element, {
                title: 'Please Confirm',
                templateUrl: attrs.confirmTemplate || defaultTemplateUrl,
                html: true,
                trigger: 'manual',
                placement: 'top',
                animation: 'am-flip-x',
                content: attrs.confirmMsg || 'Are you sure?',
                autoClose: true,
                scope: scope
            });
            */
            // watch for the confirm-msg dynamically
            attrs.$observe('confirmMsg', function(newVal) {
                popover = $popover(element, {
                    title: 'Please Confirm',
                    templateUrl: attrs.confirmTemplate || defaultTemplateUrl,
                    html: true,
                    trigger: 'manual',
                    placement: attrs.placement || 'top',
                    animation: 'am-flip-x',
                    content: newVal || 'Are you sure?',
                    autoClose: true,
                    scope: scope
                });
            });

            element.bind('click', function(event) {
                if (attrs.confirmOff && attrs.confirmOff !== 'false') {
                    // trigger the click action and broadcast delete confirmation in case it is a secondary task in ctrp-submit directive
                    scope.ngClick();
                    $timeout(function() {
                        $rootScope.$broadcast('deleteConfirmationComplete');
                    }, 1500);
                } else {
                    popover.event = event;
                    if (!popover.$isShown) {
                        popover.show();
                    }
                }
            });

            scope.$on('$destroy', cleanupPopover);
            scope.confirm = confirm;
            scope.cancel = cancel;

            function cancel() {
                popover.hide();
            }

            function confirm() {
                var buttonAction = attrs.ctrpClick ? $parse(attrs.ctrpClick) : null;
                // buttonAction(scope, {$event: popover.event}); // trigger the click action, !not working!

                /* If no button action is provided, hand over control to ctrp-submit directive and broadcast event as needed */
                if (buttonAction) {
                    scope.ngClick(); // trigger the click action
                } else {
                    $rootScope.$broadcast('deleteConfirmationComplete');
                }

                popover.hide();
            }

            function cleanupPopover() {
                popover.destroy();
            }

        } // linkerFn
    }

})();
