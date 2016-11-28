/**
 * Created by wangg5 on 04/05/16.
 *
 */

(function() {
    'use strict';
    angular.module('ctrpApp.widgets')
    .directive('commentPopover', popoverComment);

    popoverComment.$inject = ['$timeout', '$compile', '$popover'];

    function popoverComment($timeout, $compile, $popover) {
        var defaultTemplateUrl = 'app/modules/widgets/popover/_default_popover_comment.tpl.html';
        var directiveObj = {
            restrict: 'A',
            scope: {
                model: '=commentPopover', // data object (a reference) or string
                saveHandler: '&onSave',
                statusToggler: '&toggleStatus',
                isDeleted: '@'
            },
            link: linkerFn
        };

        return directiveObj;

        function linkerFn(scope, element, attrs) {

            var popover = $popover(element, {
                title: 'Reason for Deletion',
                // contentTemplate: attrs.template || defaultTemplateUrl,
                templateUrl: attrs.template || defaultTemplateUrl,
                html: true,
                trigger: 'manual',
                placement: 'auto left',
                animation: 'am-flip-x',
                content: 'Please add your comment',
                autoClose: true,
                scope: scope
            });

            // callback for the click event
            element.bind('click', function() {
                 if (scope.$eval(attrs.isDeleted) === false) {
                    // show the popover only when the item is not deleted yet
                    popover.show();
                } else {
                    // if deleted, toggle its status
                    scope.statusToggler();
                }
            });

            scope.$on('$destroy', cleanupPopover); // clean up the popover
            scope.saveComment = saveComment;
            scope.cancelComment = cancelComment;
            scope.errorMsg = null;
            function saveComment(comment) {
                if (!angular.isDefined(comment) || comment.length === 0) {
                    scope.errorMsg = 'Comment is required';
                    return;
                }
                scope.saveHandler({why_deleted: comment});
                popover.hide();
                scope.errorMsg = null;
            }

            function cancelComment() {
                popover.hide();
                scope.errorMsg = null;
            }

            function cleanupPopover() {
                scope.errorMsg = null;
                popover.destroy();
            }

            $compile(element.contents())(scope); // compile the template
        } // linkerFn
    }

})();
